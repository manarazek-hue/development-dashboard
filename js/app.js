(() => {
    "use strict";

    const config = DASHBOARD_CONFIG;
    const rate = config.exchangeRate.AED_TO_EGP;
    const STORAGE_KEY = "developmentDashboardV23";

    let state = loadState();

    const views = {
        home: document.getElementById("homeView"),
        products: document.getElementById("productsView"),
        funding: document.getElementById("fundingView")
    };

    function defaultState() {
        return {
            selections: {},
            included: {}
        };
    }

    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

            return saved || defaultState();
        } catch {
            return defaultState();
        }
    }

    function saveState() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );
    }

    function money(value, currency = "EGP") {
        if (!Number.isFinite(value)) {
            return "N/A";
        }

        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(value) + " " + currency;
    }

    function isAvailable(offer) {
        return Boolean(
            offer &&
            offer.available &&
            Number.isFinite(offer.price) &&
            offer.price > 0 &&
            offer.url
        );
    }

    function egyptFinal(product) {
        if (!isAvailable(product.egypt)) {
            return Infinity;
        }

        return (
            product.egypt.price +
            (product.egypt.extraCostsEGP || 0)
        );
    }

    function uaeListingEGP(product) {
        if (!isAvailable(product.uae)) {
            return Infinity;
        }

        return product.uae.price * rate;
    }

    function uaeFinal(product) {
        if (!isAvailable(product.uae)) {
            return Infinity;
        }

        return (
            uaeListingEGP(product) +
            (product.uae.extraCostsEGP || 0)
        );
    }

    function recommended(product) {
        const eg = egyptFinal(product);
        const ae = uaeFinal(product);

        if (!Number.isFinite(eg) && !Number.isFinite(ae)) {
            return "none";
        }

        if (!Number.isFinite(eg)) {
            return "uae";
        }

        if (!Number.isFinite(ae)) {
            return "egypt";
        }

        if (eg === ae) {
            return "same";
        }

        return eg < ae ? "egypt" : "uae";
    }

    function getSelection(product) {
        const saved = state.selections[product.id];

        if (
            saved === "egypt" &&
            isAvailable(product.egypt)
        ) {
            return "egypt";
        }

        if (
            saved === "uae" &&
            isAvailable(product.uae)
        ) {
            return "uae";
        }

        const best = recommended(product);

        if (best === "egypt" || best === "uae") {
            return best;
        }

        return null;
    }

    function isIncluded(product) {
        if (
            Object.prototype.hasOwnProperty.call(
                state.included,
                product.id
            )
        ) {
            return Boolean(state.included[product.id]);
        }

        // Needed products start included.
        // Optional products start excluded.
        return product.status === "needed";
    }

    function selectedFinal(product) {
        if (!isIncluded(product)) {
            return 0;
        }

        const selection = getSelection(product);

        if (!selection) {
            return 0;
        }

        const cost =
            selection === "egypt"
                ? egyptFinal(product)
                : uaeFinal(product);

        if (!Number.isFinite(cost)) {
            return 0;
        }

        return cost * (product.quantity || 1);
    }

    function sectionTarget(section) {
        return section.products.reduce(
            (total, product) =>
                total + selectedFinal(product),
            0
        );
    }

    function allTarget() {
        return Object.values(config.sections).reduce(
            (total, section) =>
                total + sectionTarget(section),
            0
        );
    }

    function showView(name, scrollToTop = true) {
        Object.values(views).forEach(view =>
            view.classList.remove("active")
        );

        views[name].classList.add("active");

        if (scrollToTop) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    function ownedHTML(section) {
        if (!section.owned || !section.owned.length) {
            return "";
        }

        return `
            <div class="owned-section">

                <div class="owned-heading">
                    <p class="eyebrow">
                        CURRENT EQUIPMENT
                    </p>

                    <h2>Already Owned</h2>

                    <p>
                        These items are already available and
                        are not included in the funding target.
                    </p>
                </div>

                <div class="owned-grid">

                    ${section.owned.map(item => `
                        <article class="owned-card">

                            <div class="owned-check">
                                ✓ OWNED
                            </div>

                            <div class="product-category">
                                ${item.category}
                            </div>

                            <h3>${item.name}</h3>

                            <strong>${item.model}</strong>

                            <p>
                                ${item.details}
                            </p>

                        </article>
                    `).join("")}

                </div>

            </div>
        `;
    }

    function unavailableOffer(country) {
        const label =
            country === "egypt"
                ? "AMAZON EGYPT"
                : "AMAZON UAE";

        return `
            <div class="offer unavailable-offer">

                <div class="store">
                    <span>${label}</span>
                </div>

                <div class="unavailable-label">
                    NOT AVAILABLE
                </div>

                <p class="product-description">
                    No current listing has been added
                    for this store.
                </p>

            </div>
        `;
    }

    function availableOffer(product, country) {
        const offer = product[country];

        const isEgypt = country === "egypt";

        const finalCost =
            isEgypt
                ? egyptFinal(product)
                : uaeFinal(product);

        const current =
            getSelection(product) === country;

        const best =
            recommended(product) === country;

        const storeName =
            isEgypt
                ? "AMAZON EGYPT"
                : "AMAZON UAE";

        const price =
            isEgypt
                ? money(offer.price)
                : money(offer.price, "AED");

        const converted =
            isEgypt
                ? "Native currency: EGP"
                : `Listing ≈ ${money(
                    uaeListingEGP(product)
                )}`;

        return `
            <div class="
                offer
                ${best ? "cheapest" : ""}
                ${current ? "chosen-offer" : ""}
            ">

                <a
                    class="offer-link"
                    href="${offer.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <div class="store">
                        <span>${storeName}</span>
                        <span>↗</span>
                    </div>

                    <div class="price">
                        ${price}
                    </div>

                    <div class="converted">
                        ${converted}
                    </div>

                    <div class="converted">
                        Additional costs:
                        ${money(
                            offer.extraCostsEGP || 0
                        )}
                    </div>

                    <div class="final-cost">
                        Estimated final:
                        ${money(finalCost)}
                    </div>

                    <span class="amazon-button">
                        View exact item on Amazon →
                    </span>

                </a>

                <button
                    class="
                        select-offer
                        ${current
                            ? "selected-offer"
                            : ""}
                    "
                    data-select="${country}"
                    data-product="${product.id}"
                >
                    ${current
                        ? "SELECTED"
                        : "SELECT"}
                    ${isEgypt ? "EGYPT" : "UAE"}
                </button>

            </div>
        `;
    }

    function comparisonHTML(product) {
        const best = recommended(product);

        if (best === "none") {
            return `
                No active Amazon listings currently
                available for comparison.
            `;
        }

        if (best === "same") {
            return `
                Estimated final costs are currently equal.
            `;
        }

        const eg = egyptFinal(product);
        const ae = uaeFinal(product);

        if (
            Number.isFinite(eg) &&
            Number.isFinite(ae)
        ) {
            const difference =
                Math.abs(eg - ae);

            return `
                ${best.toUpperCase()}
                currently appears cheaper by
                approximately
                ${money(difference)}.
            `;
        }

        return `
            ${best.toUpperCase()}
            is currently the only available
            Amazon listing.
        `;
    }

    function productHTML(product) {
        const included = isIncluded(product);

        return `
            <article
                class="
                    product
                    ${included
                        ? ""
                        : "product-not-included"}
                "
                id="product-${product.id}"
            >

                <div class="product-head">

                    <div>

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <h2>
                            ${product.name}
                        </h2>

                        <strong>
                            ${product.model}
                        </strong>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <p class="product-description">
                            ${product.specifications.join(
                                " • "
                            )}
                        </p>

                        <small>
                            Quantity:
                            ${product.quantity || 1}
                            · Checked
                            ${product.lastChecked}
                        </small>

                    </div>

                    <span class="status">
                        ${product.status}
                    </span>

                </div>


                <div class="include-control">

                    <label class="include-label">

                        <input
                            type="checkbox"
                            data-include="${product.id}"
                            ${included ? "checked" : ""}
                        >

                        <span>
                            Include this item in
                            funding target
                        </span>

                    </label>

                    <span class="
                        inclusion-state
                        ${included
                            ? "included-state"
                            : "excluded-state"}
                    ">
                        ${included
                            ? "INCLUDED"
                            : "NOT INCLUDED"}
                    </span>

                </div>


                <div class="offers">

                    ${
                        isAvailable(product.egypt)
                            ? availableOffer(
                                product,
                                "egypt"
                            )
                            : unavailableOffer(
                                "egypt"
                            )
                    }

                    ${
                        isAvailable(product.uae)
                            ? availableOffer(
                                product,
                                "uae"
                            )
                            : unavailableOffer(
                                "uae"
                            )
                    }

                </div>


                <div class="comparison">
                    ${comparisonHTML(product)}
                </div>

            </article>
        `;
    }

    function attachControls(sectionKey) {
        document
            .querySelectorAll("[data-select]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const scrollY =
                            window.scrollY;

                        state.selections[
                            button.dataset.product
                        ] =
                            button.dataset.select;

                        saveState();

                        renderSection(
                            sectionKey,
                            true,
                            scrollY
                        );

                        renderGlobalFunding();
                    }
                );
            });

        document
            .querySelectorAll("[data-include]")
            .forEach(input => {

                input.addEventListener(
                    "change",
                    () => {

                        const scrollY =
                            window.scrollY;

                        state.included[
                            input.dataset.include
                        ] =
                            input.checked;

                        saveState();

                        renderSection(
                            sectionKey,
                            true,
                            scrollY
                        );

                        renderGlobalFunding();
                    }
                );
            });
    }

    function renderSection(
        key,
        preserveScroll = false,
        previousScroll = 0
    ) {
        const section =
            config.sections[key];

        document.getElementById(
            "sectionEyebrow"
        ).textContent =
            section.eyebrow;

        document.getElementById(
            "sectionTitle"
        ).textContent =
            section.title;

        document.getElementById(
            "sectionDescription"
        ).textContent =
            section.description;

        document.getElementById(
            "productGrid"
        ).innerHTML = `
            ${ownedHTML(section)}

            <div class="shopping-heading">
                <p class="eyebrow">
                    DEVELOPMENT ROADMAP
                </p>

                <h2>
                    Planned Equipment
                </h2>

                <p>
                    Include only the items you
                    currently want counted toward
                    the funding target.
                </p>
            </div>

            ${section.products
                .map(productHTML)
                .join("")}
        `;

        document.getElementById(
            "sectionSummary"
        ).innerHTML = `
            <div class="summary-box">

                <p class="eyebrow">
                    SELECTED PURCHASE PLAN
                </p>

                <div class="summary-grid">

                    <div class="metric">
                        <span class="metric-label">
                            Section Target
                        </span>

                        <span class="metric-value">
                            ${money(
                                sectionTarget(section)
                            )}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Exchange Rate
                        </span>

                        <span class="metric-value">
                            1 AED =
                            ${rate.toFixed(2)}
                            EGP
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Rate Updated
                        </span>

                        <span class="metric-value">
                            ${config.exchangeRate.updated}
                        </span>
                    </div>

                </div>

                <p class="warning">
                    UAE conversion is a planning
                    estimate. Verify current price,
                    availability, shipping, customs,
                    warranty and compatibility before
                    purchasing.
                </p>

            </div>
        `;

        attachControls(key);

        showView(
            "products",
            !preserveScroll
        );

        if (preserveScroll) {
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: previousScroll,
                    behavior: "instant"
                });
            });
        }
    }

    function fundingNumbers() {
        const music =
            sectionTarget(
                config.sections.music
            );

        const coding =
            sectionTarget(
                config.sections.coding
            );

        const target =
            music + coding;

        const raised =
            config.funding.raisedEGP;

        const remaining =
            Math.max(
                target - raised,
                0
            );

        const percent =
            target > 0
                ? Math.min(
                    (raised / target) * 100,
                    100
                )
                : 0;

        return {
            music,
            coding,
            target,
            raised,
            remaining,
            percent
        };
    }

    function renderGlobalFunding() {
        const f = fundingNumbers();

        document.getElementById(
            "globalFunding"
        ).innerHTML = `

            <p class="eyebrow">
                DEVELOPMENT FUND
            </p>

            <div class="funding-grid">

                <div class="metric">
                    <span class="metric-label">
                        Music Target
                    </span>

                    <span class="metric-value">
                        ${money(f.music)}
                    </span>
                </div>

                <div class="metric">
                    <span class="metric-label">
                        Coding Target
                    </span>

                    <span class="metric-value">
                        ${money(f.coding)}
                    </span>
                </div>

                <div class="metric">
                    <span class="metric-label">
                        Overall Target
                    </span>

                    <span class="metric-value">
                        ${money(f.target)}
                    </span>
                </div>

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="
                        width:
                        ${f.percent}%
                    "
                ></div>

            </div>

            <small>
                ${money(f.raised)}
                confirmed raised
                ·
                ${money(f.remaining)}
                remaining
                ·
                ${f.percent.toFixed(1)}%
                funded
            </small>
        `;
    }

    function renderFunding() {
        const f = fundingNumbers();

        const hasInstaPay =
            config.funding.instapayUrl &&
            config.funding.instapayUrl
                .startsWith("http");

        document.getElementById(
            "fundingDetails"
        ).innerHTML = `

            <div class="funding-box">

                <div class="funding-grid">

                    <div class="metric">
                        <span class="metric-label">
                            Overall Target
                        </span>

                        <span class="metric-value">
                            ${money(f.target)}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Confirmed Raised
                        </span>

                        <span class="metric-value">
                            ${money(f.raised)}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Remaining
                        </span>

                        <span class="metric-value">
                            ${money(f.remaining)}
                        </span>
                    </div>

                </div>

                <div class="progress">

                    <div
                        class="progress-bar"
                        style="
                            width:
                            ${f.percent}%
                        "
                    ></div>

                </div>

                <p>
                    ${f.percent.toFixed(1)}%
                    funded
                </p>

                ${
                    hasInstaPay
                    ? `
                        <a
                            class="contribute-button"
                            href="${
                                config.funding
                                    .instapayUrl
                            }"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contribute with InstaPay ↗
                        </a>
                    `
                    : `
                        <p class="warning">
                            InstaPay contribution
                            link has not been
                            configured yet.
                        </p>
                    `
                }

                <p class="warning">
                    The dashboard does not process
                    payments or collect banking
                    credentials. Funding is updated
                    only after a contribution is
                    confirmed received.
                </p>

            </div>
        `;

        showView("funding");
    }

    document
        .querySelectorAll("[data-section]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    renderSection(
                        button.dataset.section
                    );
                }
            );
        });

    document
        .getElementById("homeBtn")
        .addEventListener(
            "click",
            () => showView("home")
        );

    document
        .getElementById("backBtn")
        .addEventListener(
            "click",
            () => showView("home")
        );

    document
        .getElementById("fundBackBtn")
        .addEventListener(
            "click",
            () => showView("home")
        );

    document
        .getElementById("fundBtn")
        .addEventListener(
            "click",
            renderFunding
        );

    document.getElementById(
        "exchangeDisplay"
    ).textContent =
        `1 AED ≈ ${rate.toFixed(2)} EGP`;

    renderGlobalFunding();

})();
