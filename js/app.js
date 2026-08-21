(() => {
    "use strict";

    const config = DASHBOARD_CONFIG;
    const rate = config.exchangeRate.AED_TO_EGP;
    const STORAGE_KEY = "developmentDashboardV2";

    let state = loadState();

    const views = {
        home: document.getElementById("homeView"),
        products: document.getElementById("productsView"),
        funding: document.getElementById("fundingView")
    };

    let currentSection = null;

    function money(value, currency = "EGP") {
        return new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0
        }).format(value) + " " + currency;
    }

    function loadState() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
                selections: {},
                optional: {}
            };
        } catch {
            return {
                selections: {},
                optional: {}
            };
        }
    }

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function showView(name, scrollToTop = true) {
        Object.values(views).forEach(v => v.classList.remove("active"));
        views[name].classList.add("active");

        if (scrollToTop) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function uaeListingEGP(product) {
        return product.uae.price * rate;
    }

    function egyptFinal(product) {
        return product.egypt.price + (product.egypt.extraCostsEGP || 0);
    }

    function uaeFinal(product) {
        return uaeListingEGP(product) + (product.uae.extraCostsEGP || 0);
    }

    function recommended(product) {
        if (egyptFinal(product) === uaeFinal(product)) return "same";
        return egyptFinal(product) < uaeFinal(product) ? "egypt" : "uae";
    }

    function getSelection(product) {
        return state.selections[product.id] || recommended(product);
    }

    function productEnabled(product) {
        if (product.status === "purchased") return false;
        if (product.status === "needed") return true;

        if (product.status === "optional") {
            return Boolean(state.optional[product.id]);
        }

        return false;
    }

    function selectedFinal(product) {
        if (!productEnabled(product)) return 0;

        const selection = getSelection(product);

        const price =
            selection === "egypt"
                ? egyptFinal(product)
                : uaeFinal(product);

        return price * (product.quantity || 1);
    }

    function sectionTarget(section) {
        return section.products.reduce(
            (sum, product) => sum + selectedFinal(product),
            0
        );
    }

    function allTarget() {
        return Object.values(config.sections).reduce(
            (sum, section) => sum + sectionTarget(section),
            0
        );
    }

    function choiceButton(product, country, label) {
        const selected = getSelection(product) === country;

        return `
            <button
                class="select-offer ${selected ? "selected-offer" : ""}"
                data-select="${country}"
                data-product="${product.id}"
            >
                ${selected ? "SELECTED" : "SELECT"} ${label}
            </button>
        `;
    }

    function productHTML(product) {
        const aeConverted = uaeListingEGP(product);
        const egFinal = egyptFinal(product);
        const aeFinal = uaeFinal(product);
        const best = recommended(product);

        const difference = Math.abs(egFinal - aeFinal);

        const optionalEnabled =
            product.status === "optional" &&
            Boolean(state.optional[product.id]);

        return `
            <article class="product">

                <div class="product-head">
                    <div>
                        <div class="product-category">${product.category}</div>

                        <h2>${product.name}</h2>

                        <strong>${product.model}</strong>

                        <p class="product-description">
                            ${product.description}
                        </p>

                        <p class="product-description">
                            ${product.specifications.join(" • ")}
                        </p>

                        <small>
                            Quantity: ${product.quantity}
                            · Checked ${product.lastChecked}
                        </small>
                    </div>

                    <span class="status">
                        ${product.status}
                    </span>
                </div>


                ${
                    product.status === "optional"
                    ? `
                    <div class="optional-control">
                        <label>
                            <input
                                type="checkbox"
                                data-optional="${product.id}"
                                ${optionalEnabled ? "checked" : ""}
                            >
                            Include this optional item in funding target
                        </label>
                    </div>
                    `
                    : ""
                }


                <div class="offers">

                    <div class="offer ${best === "egypt" ? "cheapest" : ""}">

                        <a
                            href="${product.egypt.url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="offer-link"
                        >
                            <div class="store">
                                <span>AMAZON EGYPT</span>
                                <span>↗</span>
                            </div>

                            <div class="price">
                                ${money(product.egypt.price)}
                            </div>

                            <div class="converted">
                                Additional costs:
                                ${money(product.egypt.extraCostsEGP || 0)}
                            </div>

                            <div class="final-cost">
                                Estimated final:
                                ${money(egFinal)}
                            </div>

                            <span class="amazon-button">
                                View exact item on Amazon →
                            </span>
                        </a>

                        ${choiceButton(product, "egypt", "EGYPT")}

                    </div>


                    <div class="offer ${best === "uae" ? "cheapest" : ""}">

                        <a
                            href="${product.uae.url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="offer-link"
                        >
                            <div class="store">
                                <span>AMAZON UAE</span>
                                <span>↗</span>
                            </div>

                            <div class="price">
                                ${money(product.uae.price, "AED")}
                            </div>

                            <div class="converted">
                                Listing ≈ ${money(aeConverted)}
                            </div>

                            <div class="converted">
                                Shipping/import/other:
                                ${money(product.uae.extraCostsEGP || 0)}
                            </div>

                            <div class="final-cost">
                                Estimated final:
                                ${money(aeFinal)}
                            </div>

                            <span class="amazon-button">
                                View exact item on Amazon →
                            </span>
                        </a>

                        ${choiceButton(product, "uae", "UAE")}

                    </div>

                </div>

                <div class="comparison">
                    ${
                        best === "same"
                        ? "Estimated final costs are equal."
                        : `${best.toUpperCase()} currently appears cheaper by approximately ${money(difference)}.`
                    }
                </div>

            </article>
        `;
    }

    function attachProductControls(sectionKey) {
        document.querySelectorAll("[data-select]").forEach(button => {
            button.addEventListener("click", () => {
                state.selections[button.dataset.product] =
                    button.dataset.select;

                saveState();
                renderSection(sectionKey, true);
                renderGlobalFunding();
            });
        });

        document.querySelectorAll("[data-optional]").forEach(input => {
            input.addEventListener("change", () => {
                state.optional[input.dataset.optional] = input.checked;

                saveState();
                renderSection(sectionKey, true);
                renderGlobalFunding();
            });
        });
    }

    function renderSection(key, preserveScroll = false) {
        currentSection = key;

        const previousScrollY = window.scrollY;

        const section = config.sections[key];

        document.getElementById("sectionEyebrow").textContent =
            section.eyebrow;

        document.getElementById("sectionTitle").textContent =
            section.title;

        document.getElementById("sectionDescription").textContent =
            section.description;

        document.getElementById("productGrid").innerHTML =
            section.products.map(productHTML).join("");

        const target = sectionTarget(section);

        document.getElementById("sectionSummary").innerHTML = `
            <div class="summary-box">
                <p class="eyebrow">SELECTED PURCHASE PLAN</p>

                <div class="summary-grid">
                    <div class="metric">
                        <span class="metric-label">
                            Section Target
                        </span>

                        <span class="metric-value">
                            ${money(target)}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Exchange Rate
                        </span>

                        <span class="metric-value">
                            1 AED = ${rate.toFixed(2)} EGP
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
                    Estimated costs are planning values only.
                    Verify Amazon pricing, availability, shipping,
                    customs, warranty and compatibility before purchase.
                </p>
            </div>
        `;

        attachProductControls(key);
        showView("products", !preserveScroll);

        if (preserveScroll) {
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: previousScrollY,
                    behavior: "instant"
                });
            });
        }
    }

    function fundingNumbers() {
        const music = sectionTarget(config.sections.music);
        const coding = sectionTarget(config.sections.coding);
        const target = music + coding;
        const raised = config.funding.raisedEGP;
        const remaining = Math.max(target - raised, 0);

        return {
            music,
            coding,
            target,
            raised,
            remaining,
            percent: target
                ? Math.min((raised / target) * 100, 100)
                : 0
        };
    }

    function renderGlobalFunding() {
        const f = fundingNumbers();

        document.getElementById("globalFunding").innerHTML = `
            <p class="eyebrow">DEVELOPMENT FUND</p>

            <div class="funding-grid">

                <div class="metric">
                    <span class="metric-label">Music Target</span>
                    <span class="metric-value">${money(f.music)}</span>
                </div>

                <div class="metric">
                    <span class="metric-label">Coding Target</span>
                    <span class="metric-value">${money(f.coding)}</span>
                </div>

                <div class="metric">
                    <span class="metric-label">Overall Target</span>
                    <span class="metric-value">${money(f.target)}</span>
                </div>

            </div>

            <div class="progress">
                <div
                    class="progress-bar"
                    style="width:${f.percent}%"
                ></div>
            </div>

            <small>
                ${money(f.raised)} confirmed raised
                · ${money(f.remaining)} remaining
                · ${f.percent.toFixed(1)}% funded
            </small>
        `;
    }

    function renderFunding() {
        const f = fundingNumbers();

        const hasInstaPay =
            config.funding.instapayUrl &&
            config.funding.instapayUrl.startsWith("http");

        document.getElementById("fundingDetails").innerHTML = `
            <div class="funding-box">

                <div class="funding-grid">

                    <div class="metric">
                        <span class="metric-label">Overall Target</span>
                        <span class="metric-value">${money(f.target)}</span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">Confirmed Raised</span>
                        <span class="metric-value">${money(f.raised)}</span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">Remaining</span>
                        <span class="metric-value">${money(f.remaining)}</span>
                    </div>

                </div>

                <div class="progress">
                    <div
                        class="progress-bar"
                        style="width:${f.percent}%"
                    ></div>
                </div>

                <p>${f.percent.toFixed(1)}% funded</p>

                ${
                    hasInstaPay
                    ? `
                    <a
                        class="contribute-button"
                        href="${config.funding.instapayUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contribute with InstaPay ↗
                    </a>
                    `
                    : `
                    <p class="warning">
                        InstaPay contribution link has not been configured.
                    </p>
                    `
                }

                <p class="warning">
                    The dashboard does not process payments or collect
                    banking credentials. Funding is updated only after
                    a contribution is confirmed received.
                </p>

            </div>
        `;

        showView("funding");
    }

    document.querySelectorAll("[data-section]").forEach(button => {
        button.addEventListener("click", () => {
            renderSection(button.dataset.section);
        });
    });

    document.getElementById("homeBtn").addEventListener(
        "click",
        () => showView("home")
    );

    document.getElementById("backBtn").addEventListener(
        "click",
        () => showView("home")
    );

    document.getElementById("fundBackBtn").addEventListener(
        "click",
        () => showView("home")
    );

    document.getElementById("fundBtn").addEventListener(
        "click",
        renderFunding
    );

    document.getElementById("exchangeDisplay").textContent =
        `1 AED ≈ ${rate.toFixed(2)} EGP`;

    renderGlobalFunding();

})();

