(() => {
    "use strict";

    const config = DASHBOARD_CONFIG;

    const rate =
        config.exchangeRate.AED_TO_EGP;

    const STORAGE_KEY =
        "developmentDashboardV24";

    const state = loadState();

    let currentSection = null;


    const views = {
        home:
            document.getElementById(
                "homeView"
            ),

        products:
            document.getElementById(
                "productsView"
            ),

        funding:
            document.getElementById(
                "fundingView"
            ),

        presentation:
            document.getElementById(
                "presentationView"
            )
    };


    function defaultState() {
        return {
            included: {},
            source: {}
        };
    }


    function loadState() {
        try {
            return (
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_KEY
                    )
                ) ||
                defaultState()
            );
        }
        catch {
            return defaultState();
        }
    }


    function saveState() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );
    }


    function money(
        value,
        currency = "EGP"
    ) {
        if (!Number.isFinite(value)) {
            return "N/A";
        }

        return (
            new Intl.NumberFormat(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            ).format(value)
            +
            " "
            +
            currency
        );
    }


    function available(offer) {
        return Boolean(
            offer &&
            offer.available &&
            Number.isFinite(
                offer.price
            ) &&
            offer.price > 0 &&
            offer.url
        );
    }


    function egyptCost(product) {
        if (!available(product.egypt)) {
            return Infinity;
        }

        return (
            product.egypt.price +
            (
                product.egypt
                    .extraCostsEGP ||
                0
            )
        );
    }


    function uaeCost(product) {
        if (!available(product.uae)) {
            return Infinity;
        }

        return (
            product.uae.price *
            rate
            +
            (
                product.uae
                    .extraCostsEGP ||
                0
            )
        );
    }


    function cheapestSource(product) {
        const eg =
            egyptCost(product);

        const ae =
            uaeCost(product);

        if (
            !Number.isFinite(eg) &&
            !Number.isFinite(ae)
        ) {
            return null;
        }

        if (!Number.isFinite(eg)) {
            return "uae";
        }

        if (!Number.isFinite(ae)) {
            return "egypt";
        }

        return (
            eg <= ae
                ? "egypt"
                : "uae"
        );
    }


    function included(product) {
        if (
            Object.prototype
                .hasOwnProperty.call(
                    state.included,
                    product.id
                )
        ) {
            return Boolean(
                state.included[
                    product.id
                ]
            );
        }

        return (
            product.status ===
            "needed"
        );
    }


    function selectedSource(product) {
        const selected =
            state.source[
                product.id
            ];

        if (
            selected === "egypt" &&
            available(product.egypt)
        ) {
            return "egypt";
        }

        if (
            selected === "uae" &&
            available(product.uae)
        ) {
            return "uae";
        }

        return "undecided";
    }


    function estimatedProductCost(
        product
    ) {
        if (!included(product)) {
            return 0;
        }

        const selected =
            selectedSource(product);

        let cost;

        if (selected === "egypt") {
            cost =
                egyptCost(product);
        }
        else if (
            selected === "uae"
        ) {
            cost =
                uaeCost(product);
        }
        else {
            const best =
                cheapestSource(product);

            if (best === "egypt") {
                cost =
                    egyptCost(product);
            }
            else if (
                best === "uae"
            ) {
                cost =
                    uaeCost(product);
            }
            else {
                return 0;
            }
        }

        if (!Number.isFinite(cost)) {

            if (
                product.localOffer &&
                product.localOffer.available &&
                Number.isFinite(product.localOffer.price)
            ) {
                cost = product.localOffer.price;
            }
            else {
                return 0;
            }
        }

        return (
            cost *
            (product.quantity || 1)
        );
    }


    function sectionTarget(section) {
        const productsTotal =
            section.products.reduce(
                (sum, product) =>
                    sum +
                    estimatedProductCost(
                        product
                    ),
                0
            );

        const localBuildTotal =
            section.localBuild &&
            section.localBuild.enabled &&
            Number.isFinite(
                section.localBuild.priceEGP
            )
                ? section.localBuild.priceEGP
                : 0;

        return productsTotal + localBuildTotal;
    }


    function fundingNumbers() {
        // Financial totals are normalized to piasters before
        // combining them so displayed section totals always
        // reconcile exactly with the overall total.

        const musicRaw =
            sectionTarget(
                config.sections.music
            );

        const codingRaw =
            sectionTarget(
                config.sections.coding
            );

        const music =
            Math.round(
                musicRaw * 100
            ) / 100;

        const coding =
            Math.round(
                codingRaw * 100
            ) / 100;

        const target =
            Math.round(
                (music + coding) * 100
            ) / 100;

        const raised =
            Math.round(
                config.funding.raisedEGP * 100
            ) / 100;

        const remaining =
            Math.max(
                Math.round(
                    (target - raised) * 100
                ) / 100,
                0
            );

        const percent =
            target > 0
                ? Math.min(
                    raised /
                    target *
                    100,
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

    function showView(
        name,
        scroll = true
    ) {
        Object.values(views)
            .forEach(view => {
                view.classList
                    .remove("active");
            });

        views[name]
            .classList
            .add("active");

        if (scroll) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        updateMobileFunding();
    }


    function renderLocalBuild(section) {
        const area =
            document.getElementById(
                "localBuildArea"
            );

        if (
            !section.localBuild ||
            !section.localBuild.enabled
        ) {
            area.innerHTML = "";
            return;
        }

        const build =
            section.localBuild;

        area.innerHTML = `
            <section class="local-build-statement">

                <div class="local-build-header">

                    <div>
                        <p class="eyebrow">
                            LOCAL BUILD OPTION
                        </p>

                        <h2>
                            ${build.title}
                        </h2>
                    </div>

                    <div class="local-build-price">
                        ${money(build.priceEGP)}
                    </div>

                </div>

                <div class="local-build-source">
                    <span>
                        PURCHASE SOURCE
                    </span>

                    <strong>
                        ${build.source}
                    </strong>

                    <span class="local-location">
                        ${build.location}
                    </span>
                </div>

                <p class="local-build-description">
                    ${build.description}
                </p>

                <div class="local-build-requirements">

                    ${build.requirements
                        .map(
                            item =>
                                `<span>&#10003; ${item}</span>`
                        )
                        .join("")}

                </div>

                <div class="local-build-footer">
                    LOCAL PURCHASE &middot; ASSEMBLED IN EGYPT
                </div>

            </section>
        `;
    }


    function renderOwned(section) {
        const area =
            document.getElementById(
                "ownedArea"
            );

        if (
            !section.owned ||
            !section.owned.length
        ) {
            area.innerHTML = "";
            return;
        }

        area.innerHTML = `
            <details
                class="owned-section"
                open
            >

                <summary
                    class="owned-summary"
                >
                    <strong>
                        Current Setup
                    </strong>

                    <span
                        class="owned-count"
                    >
                        ${
                            section.owned
                                .length
                        }
                        OWNED
                    </span>
                </summary>

                <div class="owned-grid">

                    ${
                        section.owned
                            .map(item => `
                                <article
                                    class="owned-card"
                                >
                                    <span
                                        class="owned-badge"
                                    >
                                        &#10003; OWNED &middot;
                                        ${item.category}
                                    </span>

                                    <h3>
                                        ${item.name}
                                    </h3>

                                    <strong>
                                        ${item.model}
                                    </strong>

                                    <p>
                                        ${item.details}
                                    </p>
                                </article>
                            `)
                            .join("")
                    }

                </div>

            </details>
        `;
    }


    function marketOffer(
        product,
        country
    ) {
        const offer =
            product[country];

        const label =
            country === "egypt"
                ? "AMAZON EGYPT"
                : "AMAZON UAE";

        if (!available(offer)) {
            return `
                <div
                    class="
                        market-offer
                        unavailable
                    "
                >
                    <div
                        class="market-header"
                    >
                        ${label}
                    </div>

                    <div
                        class="market-price"
                    >
                        Not available
                    </div>
                </div>
            `;
        }

        const best =
            cheapestSource(product) ===
            country;

        const rawPrice =
            country === "egypt"
                ? money(
                    offer.price
                )
                : money(
                    offer.price,
                    "AED"
                );

        const finalPrice =
            country === "egypt"
                ? egyptCost(product)
                : uaeCost(product);

        return `
            <div
                class="
                    market-offer
                    ${best ? "best" : ""}
                "
            >

                <div
                    class="market-header"
                >
                    <span>
                        ${label}
                    </span>

                    ${
                        best
                            ? `
                                <span
                                    class="best-badge"
                                >
                                    BEST PRICE
                                </span>
                            `
                            : ""
                    }
                </div>

                <div
                    class="market-price"
                >
                    ${rawPrice}
                </div>

                ${
                    country === "uae"
                        ? `
                            <div
                                class="
                                    market-converted
                                "
                            >
                                ≈
                                ${money(
                                    finalPrice
                                )}
                            </div>
                        `
                        : `
                            <div
                                class="
                                    market-converted
                                "
                            >
                                Final estimate:
                                ${money(
                                    finalPrice
                                )}
                            </div>
                        `
                }

                <a
                    class="amazon-link"
                    href="${offer.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on Amazon ↗
                </a>

            </div>
        `;
    }


    function recommendation(product) {
        const best =
            cheapestSource(product);

        if (!best) {
            return (
                "No current market reference available."
            );
        }

        const eg =
            egyptCost(product);

        const ae =
            uaeCost(product);

        if (
            Number.isFinite(eg) &&
            Number.isFinite(ae)
        ) {
            const diff =
                Math.abs(
                    eg - ae
                );

            return (
                `${best === "egypt"
                    ? "Egypt"
                    : "UAE"} currently has the lower reference price by approximately ${money(diff)}.`
            );
        }

        return (
            `${best === "egypt"
                ? "Egypt"
                : "UAE"} is currently the only available Amazon reference.`
        );
    }


    function sourceButton(
        product,
        source,
        label
    ) {
        const current =
            selectedSource(product);

        let disabled = false;

        if (
            source === "egypt" &&
            !available(product.egypt)
        ) {
            disabled = true;
        }

        if (
            source === "uae" &&
            !available(product.uae)
        ) {
            disabled = true;
        }

        return `
            <button
                class="
                    source-button
                    ${
                        current === source
                            ? "active"
                            : ""
                    }
                "
                data-source="${source}"
                data-product="${product.id}"
                ${disabled
                    ? "disabled"
                    : ""}
            >
                ${label}
            </button>
        `;
    }


    function localOfferHTML(product) {
        if (!product.localOffer || !product.localOffer.available) {
            return "";
        }

        return `
            <div class="local-offer-card">

                <div class="local-offer-top">
                    <span class="local-badge">
                        ${product.localOffer.label || "LOCAL OPTION"}
                    </span>

                    <span class="local-seller">
                        ${product.localOffer.seller}
                    </span>
                </div>

                <div class="local-price">
                    ${money(product.localOffer.price)}
                </div>

                <div class="market-converted">
                    Complete-build budget reference
                </div>

                <div class="local-note">
                    Final components and availability will be
                    confirmed with the supplier before purchase.
                </div>

            </div>
        `;
    }

    function productCard(product) {
        const isIncluded =
            included(product);

        return `
            <article
                class="
                    product-card
                    ${
                        isIncluded
                            ? "included"
                            : "excluded"
                    }
                "
                id="product-${product.id}"
            >

                <div class="product-main">

                    <div>

                        <div
                            class="
                                product-category
                            "
                        >
                            ${product.category}
                        </div>

                        <h3
                            class="
                                product-name
                            "
                        >
                            ${product.name}
                        </h3>

                        <div
                            class="
                                product-model
                            "
                        >
                            ${product.model}
                        </div>

                    </div>


                    <button
                        class="
                            inclusion-button
                            ${
                                isIncluded
                                    ? "on"
                                    : ""
                            }
                        "
                        data-toggle-inclusion="
                            ${product.id}
                        "
                    >
                        ${
                            isIncluded
                                ? "● INCLUDED"
                                : "○ NOT INCLUDED"
                        }
                    </button>

                </div>


                ${localOfferHTML(product)}

                <div class="price-row">

                    ${
                        marketOffer(
                            product,
                            "egypt"
                        )
                    }

                    ${
                        marketOffer(
                            product,
                            "uae"
                        )
                    }

                </div>


                <div class="source-row">

                    <span
                        class="source-label"
                    >
                        Purchase source
                    </span>

                    <div
                        class="source-buttons"
                    >

                        ${
                            sourceButton(
                                product,
                                "undecided",
                                "Undecided"
                            )
                        }

                        ${
                            sourceButton(
                                product,
                                "egypt",
                                "Egypt"
                            )
                        }

                        ${
                            sourceButton(
                                product,
                                "uae",
                                "UAE"
                            )
                        }

                    </div>

                </div>


                <div class="recommendation">
                    ${recommendation(product)}
                </div>


                <details
                    class="product-details"
                >

                    <summary>
                        Details +
                    </summary>

                    <div
                        class="
                            details-content
                        "
                    >

                        <p>
                            ${product.description}
                        </p>

                        <ul>
                            ${
                                product
                                    .specifications
                                    .map(
                                        spec =>
                                            `<li>${spec}</li>`
                                    )
                                    .join("")
                            }
                        </ul>

                        <p>
                            Quantity:
                            ${product.quantity || 1}
                        </p>

                        <p>
                            Price checked:
                            ${product.lastChecked}
                        </p>

                    </div>

                </details>

            </article>
        `;
    }


    function attachProductControls(
        sectionKey
    ) {
        document
            .querySelectorAll(
                "[data-toggle-inclusion]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset
                                .toggleInclusion
                                .trim();

                        const product =
                            config
                                .sections[
                                    sectionKey
                                ]
                                .products
                                .find(
                                    p =>
                                        p.id === id
                                );

                        state.included[id] =
                            !included(product);

                        saveState();

                        rerenderSection(
                            sectionKey
                        );
                    }
                );
            });


        document
            .querySelectorAll(
                "[data-source]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (button.disabled) {
                            return;
                        }

                        const id =
                            button.dataset
                                .product;

                        state.source[id] =
                            button.dataset
                                .source;

                        saveState();

                        rerenderSection(
                            sectionKey
                        );
                    }
                );
            });
    }


    function rerenderSection(key) {
        const y =
            window.scrollY;

        renderSection(
            key,
            false
        );

        requestAnimationFrame(
            () => {
                window.scrollTo({
                    top: y,
                    behavior: "instant"
                });
            }
        );
    }


    function renderSection(
        key,
        scroll = true
    ) {
        currentSection = key;

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


        renderLocalBuild(section);
        renderOwned(section);


        const target =
            sectionTarget(section);

        const includedCount =
            section.products
                .filter(included)
                .length;


        document.getElementById(
            "sectionHeroStats"
        ).innerHTML = `
            <span class="metric-label">
                Current Target
            </span>

            <span class="metric-value">
                ${money(target)}
            </span>

            <span class="funding-small">
                ${includedCount}
                items included
            </span>
        `;


        document.getElementById(
            "productGrid"
        ).innerHTML =
            section.products
                .map(productCard)
                .join("");


        document.getElementById(
            "sectionSummary"
        ).innerHTML = `
            <div class="summary-card">

                <div
                    class="metric-grid"
                >

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            Section Target
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${money(target)}
                        </span>
                    </div>

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            Included
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${includedCount}
                        </span>
                    </div>

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            AED Rate
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${rate.toFixed(2)}
                        </span>
                    </div>

                </div>

                <div class="notice">
                    Undecided items use the
                    cheapest currently available
                    market reference when estimating
                    the funding target. No purchase
                    source is selected automatically.
                </div>

            </div>
        `;


        attachProductControls(key);

        showView(
            "products",
            scroll
        );

        updateGlobalFunding();
    }


    function updateGlobalFunding() {
        const f =
            fundingNumbers();

        const content = `
            <div class="metric-grid">

                <div>
                    <span
                        class="metric-label"
                    >
                        Music
                    </span>

                    <span
                        class="metric-value"
                    >
                        ${money(f.music)}
                    </span>
                </div>

                <div>
                    <span
                        class="metric-label"
                    >
                        Coding
                    </span>

                    <span
                        class="metric-value"
                    >
                        ${money(f.coding)}
                    </span>
                </div>

                <div>
                    <span
                        class="metric-label"
                    >
                        Overall
                    </span>

                    <span
                        class="metric-value"
                    >
                        ${money(f.target)}
                    </span>
                </div>

            </div>

            <div class="progress-track">
                <div
                    class="progress-fill"
                    style="
                        width:
                        ${f.percent}%
                    "
                ></div>
            </div>

            <div class="funding-small">
                ${money(f.raised)}
                raised &middot;
                ${money(f.remaining)}
                remaining &middot;
                ${f.percent.toFixed(1)}%
                funded
            </div>
        `;


        document.getElementById(
            "globalFunding"
        ).innerHTML =
            content;


        document.getElementById(
            "homeFundingCard"
        ).innerHTML = `
            <span class="metric-label">
                Overall Development Goal
            </span>

            <span class="metric-value">
                ${money(f.target)}
            </span>

            <div class="progress-track">
                <div
                    class="progress-fill"
                    style="
                        width:
                        ${f.percent}%
                    "
                ></div>
            </div>

            <div class="funding-small">
                ${f.percent.toFixed(1)}%
                funded
            </div>
        `;

        updateMobileFunding();
    }


    function updateMobileFunding() {
        const f =
            fundingNumbers();

        let label =
            "Overall Goal";

        let value =
            f.target;

        if (currentSection) {
            label =
                currentSection === "music"
                    ? "Music Goal"
                    : "Coding Goal";

            value =
                currentSection === "music"
                    ? f.music
                    : f.coding;
        }

        document.getElementById(
            "mobileFundingBar"
        ).innerHTML = `
            <div>
                <div
                    class="
                        mobile-funding-label
                    "
                >
                    ${label}
                </div>

                <div
                    class="
                        mobile-funding-value
                    "
                >
                    ${money(value)}
                </div>
            </div>

            <button
                id="mobileContributeBtn"
                class="primary-button"
            >
                Contribute
            </button>
        `;

        document.getElementById(
            "mobileContributeBtn"
        ).addEventListener(
            "click",
            openContributionModal
        );
    }


    function renderFunding() {
        currentSection = null;

        const f =
            fundingNumbers();

        const hasInstaPay =
            config.funding
                .instapayUrl &&
            config.funding
                .instapayUrl
                .startsWith("http");


        document.getElementById(
            "fundingDetails"
        ).innerHTML = `
            <div class="funding-card">

                <div
                    class="metric-grid"
                >

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            Target
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${money(f.target)}
                        </span>
                    </div>

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            Raised
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${money(f.raised)}
                        </span>
                    </div>

                    <div>
                        <span
                            class="
                                metric-label
                            "
                        >
                            Remaining
                        </span>

                        <span
                            class="
                                metric-value
                            "
                        >
                            ${money(f.remaining)}
                        </span>
                    </div>

                </div>


                <div
                    class="progress-track"
                >
                    <div
                        class="progress-fill"
                        style="
                            width:
                            ${f.percent}%
                        "
                    ></div>
                </div>


                ${
                    hasInstaPay
                        ? `
                            <a
                                class="
                                    contribute-link
                                "
                                href="${
                                    config
                                        .funding
                                        .instapayUrl
                                }"
                                target="_blank"
                                rel="
                                    noopener
                                    noreferrer
                                "
                            >
                                Contribute with
                                InstaPay ↗
                            </a>
                        `
                        : `
                            <div
                                class="notice"
                            >
                                InstaPay contribution
                                link has not been
                                configured yet.
                            </div>
                        `
                }


                <div class="notice">
                    This website does not process
                    payments or collect banking
                    credentials. The raised amount
                    changes only after funds are
                    confirmed received.
                </div>

            </div>
        `;

        showView("funding");
    }



    // ========================================================
    // PRESENTATION
    // ========================================================

    function officialFundingNumbers() {
        // Public presentation figures.
        //
        // These represent the official project plan and do not
        // change when a visitor experiments with Music/Coding
        // product selections in their browser.

        const music =
            19459.62;

        const coding =
            62031.89;

        const target =
            81491.51;

        const raised =
            Math.round(
                config.funding.raisedEGP * 100
            ) / 100;

        const remaining =
            Math.max(
                Math.round(
                    (target - raised) * 100
                ) / 100,
                0
            );

        const percent =
            target > 0
                ? Math.min(
                    raised /
                    target *
                    100,
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


    function renderPresentation() {
        currentSection = null;

        const f =
            officialFundingNumbers();


        document.getElementById(
            "presentationFundingHero"
        ).innerHTML = `
            <div class="metric-grid">

                <div>
                    <span class="metric-label">
                        Music
                    </span>

                    <span class="metric-value">
                        ${money(f.music)}
                    </span>
                </div>

                <div>
                    <span class="metric-label">
                        Coding
                    </span>

                    <span class="metric-value">
                        ${money(f.coding)}
                    </span>
                </div>

                <div>
                    <span class="metric-label">
                        Total Goal
                    </span>

                    <span class="metric-value">
                        ${money(f.target)}
                    </span>
                </div>

            </div>

            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width:${f.percent}%"
                ></div>

            </div>

            <div class="funding-small">
                ${money(f.raised)}
                actually received ·
                ${money(f.remaining)}
                still needed
            </div>
        `;


        document.getElementById(
            "presentationMusicTarget"
        ).textContent =
            money(f.music);


        document.getElementById(
            "presentationCodingTarget"
        ).textContent =
            money(f.coding);


        document.getElementById(
            "plainMusicBudget"
        ).textContent =
            money(f.music);


        document.getElementById(
            "plainCodingBudget"
        ).textContent =
            money(f.coding);


        document.getElementById(
            "plainBudgetBreakdown"
        ).innerHTML = `
            <div>
                <span>
                    Music
                </span>

                <strong>
                    ${money(f.music)}
                </strong>
            </div>

            <div>
                <span>
                    New Computer & Workspace
                </span>

                <strong>
                    ${money(f.coding)}
                </strong>
            </div>

            <div class="plain-budget-total">
                <span>
                    Total Goal
                </span>

                <strong>
                    ${money(f.target)}
                </strong>
            </div>
        `;


        document.getElementById(
            "presentationFinalFunding"
        ).innerHTML = `
            <span>
                Current Goal
            </span>

            <strong>
                ${money(f.target)}
            </strong>
        `;


        showView(
            "presentation"
        );


        const url =
            new URL(
                window.location.href
            );


        url.searchParams.set(
            "view",
            "presentation"
        );


        history.replaceState(
            {},
            "",
            url
        );
    }

    function leavePresentationURL() {
        const url =
            new URL(
                window.location.href
            );

        url.searchParams.delete(
            "view"
        );

        history.replaceState(
            {},
            "",
            url
        );
    }


    async function sharePresentation() {
        const url =
            new URL(
                window.location.href
            );

        url.searchParams.set(
            "view",
            "presentation"
        );

        const shareURL =
            url.toString();

        if (navigator.share) {
            try {
                await navigator.share({
                    title:
                        "Development Infrastructure & Growth Roadmap",

                    text:
                        "Music, Coding & AI Development Roadmap",

                    url:
                        shareURL
                });
            }
            catch {
                // Share cancelled by user.
            }

            return;
        }

        try {
            await navigator.clipboard.writeText(
                shareURL
            );

            const button =
                document.getElementById(
                    "sharePresentationBtn"
                );

            const original =
                button.textContent;

            button.textContent =
                "Link Copied &#10003;";

            setTimeout(
                () => {
                    button.textContent =
                        original;
                },
                1800
            );
        }
        catch {
            window.prompt(
                "Copy presentation link:",
                shareURL
            );
        }
    }


    // ========================================================
    // CONTRIBUTION PLEDGE
    // ========================================================

    function generatePledgeReference() {
        const now = new Date();

        const year =
            now.getFullYear();

        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                now.getDate()
            ).padStart(2, "0");

        const random =
            Math.random()
                .toString(36)
                .slice(2, 8)
                .toUpperCase();

        return (
            `PLEDGE-${year}${month}${day}-${random}`
        );
    }


    function openContributionModal() {
        const modal =
            document.getElementById(
                "contributionModal"
            );

        const formView =
            document.getElementById(
                "pledgeFormView"
            );

        const successView =
            document.getElementById(
                "pledgeSuccessView"
            );

        const form =
            document.getElementById(
                "contributionForm"
            );

        const error =
            document.getElementById(
                "pledgeError"
            );

        form.reset();

        error.hidden = true;

        formView.hidden = false;
        successView.hidden = true;

        const f =
            fundingNumbers();

        document.getElementById(
            "pledgeTargetSummary"
        ).innerHTML = `
            <div class="pledge-target-item">
                <span>Music</span>
                <strong>
                    ${money(f.music)}
                </strong>
            </div>

            <div class="pledge-target-item">
                <span>Coding</span>
                <strong>
                    ${money(f.coding)}
                </strong>
            </div>

            <div class="pledge-target-item">
                <span>Overall</span>
                <strong>
                    ${money(f.target)}
                </strong>
            </div>
        `;

        modal.hidden = false;

        document.body
            .classList
            .add("modal-open");

        setTimeout(
            () => {
                document.getElementById(
                    "contributorName"
                ).focus();
            },
            50
        );
    }


    function closeContributionModal() {
        document.getElementById(
            "contributionModal"
        ).hidden = true;

        document.body
            .classList
            .remove("modal-open");
    }


    async function submitContributionPledge(event) {
        event.preventDefault();

        const form =
            document.getElementById(
                "contributionForm"
            );

        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );

        const error =
            document.getElementById(
                "pledgeError"
            );

        const name =
            document.getElementById(
                "contributorName"
            ).value.trim();

        const email =
            document.getElementById(
                "contributorEmail"
            ).value.trim();

        const message =
            document.getElementById(
                "contributionMessage"
            ).value.trim();

        const purpose =
            document.getElementById(
                "contributionPurpose"
            ).value;

        const amount =
            Number(
                document.getElementById(
                    "contributionAmount"
                ).value
            );


        if (!name) {
            error.textContent =
                "Please enter your name.";

            error.hidden = false;
            return;
        }


        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            error.textContent =
                "Please enter a valid contribution amount.";

            error.hidden = false;
            return;
        }


        const endpoint =
            config.funding
                .pledgeEndpoint;


        if (
            !endpoint ||
            !endpoint.startsWith(
                "https://formspree.io/f/"
            )
        ) {
            error.textContent =
                "The pledge email service has not been configured.";

            error.hidden = false;
            return;
        }


        error.hidden = true;

        submitButton.disabled = true;

        const originalText =
            submitButton.textContent;

        submitButton.textContent =
            "Sending...";


        const reference =
            generatePledgeReference();

        const now =
            new Date();

        const f =
            fundingNumbers();


        const payload = {
            _subject:
                `New Development Pledge &mdash; ${money(amount)}`,

            name:
                name,

            contribution:
                money(amount),

            amount_egp:
                amount,

            allocation_preference:
                purpose,

            contributor_email:
                email || "Not provided",

            message:
                message || "No message",

            pledge_reference:
                reference,

            submitted:
                now.toLocaleString(),

            music_target:
                money(f.music),

            coding_target:
                money(f.coding),

            overall_target:
                money(f.target),

            payment_status:
                "PLEDGE ONLY &mdash; NOT PAID",

            source:
                "Development Dashboard"
        };


        try {

            const response =
                await fetch(
                    endpoint,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                payload
                            )
                    }
                );


            if (!response.ok) {

                let detail = "";

                try {
                    const result =
                        await response.json();

                    detail =
                        result.error ||
                        result.message ||
                        "";
                }
                catch {
                    // No JSON response.
                }

                throw new Error(
                    detail ||
                    `Submission failed (${response.status})`
                );
            }


            document.getElementById(
                "successName"
            ).textContent =
                name;


            document.getElementById(
                "successAmount"
            ).textContent =
                money(amount);


            document.getElementById(
                "successReference"
            ).textContent =
                reference;


            document.getElementById(
                "successDate"
            ).textContent =
                now.toLocaleString();


            document.getElementById(
                "pledgeFormView"
            ).hidden = true;


            document.getElementById(
                "pledgeSuccessView"
            ).hidden = false;


            console.log(
                "Pledge submitted:",
                reference
            );

        }
        catch (submissionError) {

            console.error(
                "Pledge submission failed:",
                submissionError
            );

            error.textContent =
                "We couldn't submit your pledge. Please check your connection and try again.";

            error.hidden = false;

        }
        finally {

            submitButton.disabled =
                false;

            submitButton.textContent =
                originalText;
        }
    }

    document
        .querySelectorAll(
            "[data-section]"
        )
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
        .querySelectorAll(
            "[data-nav-section]"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    renderSection(
                        button.dataset
                            .navSection
                    );
                }
            );
        });


    document.getElementById(
        "homeBtn"
    ).addEventListener(
        "click",
        () => {
            currentSection = null;
            showView("home");
        }
    );


    document.getElementById(
        "backBtn"
    ).addEventListener(
        "click",
        () => {
            currentSection = null;
            showView("home");
        }
    );


    document.getElementById(
        "fundBackBtn"
    ).addEventListener(
        "click",
        () => {
            currentSection = null;
            showView("home");
        }
    );


    document.getElementById(
        "fundBtn"
    ).addEventListener(
        "click",
        openContributionModal
    );


    document.getElementById(
        "exchangeDisplay"
    ).textContent =
        `1 AED ≈ ${rate.toFixed(2)} EGP`;


    document.getElementById(
        "contributionForm"
    ).addEventListener(
        "submit",
        submitContributionPledge
    );


    document.getElementById(
        "closeContributionModal"
    ).addEventListener(
        "click",
        closeContributionModal
    );


    document.getElementById(
        "cancelContribution"
    ).addEventListener(
        "click",
        closeContributionModal
    );


    document.getElementById(
        "finishContribution"
    ).addEventListener(
        "click",
        closeContributionModal
    );


    document.getElementById(
        "contributionModal"
    ).addEventListener(
        "click",
        event => {
            if (
                event.target.id ===
                "contributionModal"
            ) {
                closeContributionModal();
            }
        }
    );


    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Escape" &&
                !document.getElementById(
                    "contributionModal"
                ).hidden
            ) {
                closeContributionModal();
            }
        }
    );




    document.getElementById(
        "presentationNavBtn"
    ).addEventListener(
        "click",
        renderPresentation
    );


    document.getElementById(
        "homePresentationBtn"
    ).addEventListener(
        "click",
        renderPresentation
    );


    document.getElementById(
        "presentationBackBtn"
    ).addEventListener(
        "click",
        () => {
            leavePresentationURL();
            showView("home");
        }
    );


    document.getElementById(
        "sharePresentationBtn"
    ).addEventListener(
        "click",
        sharePresentation
    );


    document.getElementById(
        "presentationContributeBtn"
    ).addEventListener(
        "click",
        openContributionModal
    );


    document.getElementById(
        "presentationFinalContributeBtn"
    ).addEventListener(
        "click",
        openContributionModal
    );


    document.getElementById(
        "plainContributeBtn"
    ).addEventListener(
        "click",
        openContributionModal
    );


    document.getElementById(
        "presentationMusicOpenBtn"
    ).addEventListener(
        "click",
        () => {
            leavePresentationURL();
            renderSection("music");
        }
    );


    document.getElementById(
        "presentationCodingOpenBtn"
    ).addEventListener(
        "click",
        () => {
            leavePresentationURL();
            renderSection("coding");
        }
    );


    document.getElementById(
        "presentationMusicBtn"
    ).addEventListener(
        "click",
        () => {
            leavePresentationURL();
            renderSection("music");
        }
    );


    document.getElementById(
        "presentationCodingBtn"
    ).addEventListener(
        "click",
        () => {
            leavePresentationURL();
            renderSection("coding");
        }
    );


    updateGlobalFunding();


    const initialView =
        new URLSearchParams(
            window.location.search
        ).get("view");


    if (
        initialView ===
        "presentation"
    ) {
        renderPresentation();
    }

})();




