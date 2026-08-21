(() => {
    "use strict";

    const config = DASHBOARD_CONFIG;
    const rate = config.exchangeRate.AED_TO_EGP;

    const views = {
        home: document.getElementById("homeView"),
        products: document.getElementById("productsView"),
        funding: document.getElementById("fundingView")
    };

    const money = (value, currency = "EGP") =>
        new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0
        }).format(value) + " " + currency;

    function showView(name) {
        Object.values(views).forEach(v => v.classList.remove("active"));
        views[name].classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function convertedUAE(product) {
        return product.uae.price * rate;
    }

    function cheaper(product) {
        const eg = product.egypt.price;
        const ae = convertedUAE(product);

        if (eg === ae) return "same";
        return eg < ae ? "egypt" : "uae";
    }

    function sectionTarget(section) {
        return section.products
            .filter(p => p.status !== "purchased")
            .reduce((sum, p) => {
                return sum + Math.min(
                    p.egypt.price,
                    convertedUAE(p)
                );
            }, 0);
    }

    function allTarget() {
        return Object.values(config.sections)
            .reduce((sum, section) => sum + sectionTarget(section), 0);
    }

    function productHTML(product) {
        const aeEGP = convertedUAE(product);
        const best = cheaper(product);
        const difference = Math.abs(product.egypt.price - aeEGP);

        return `
            <article class="product">

                <div class="product-head">
                    <div>
                        <div class="product-category">${product.category}</div>
                        <h2>${product.name}</h2>
                        <p class="product-description">
                            ${product.description}
                        </p>
                    </div>

                    <span class="status">${product.status}</span>
                </div>

                <div class="offers">

                    <a
                        class="offer ${best === "egypt" ? "cheapest" : ""}"
                        href="${product.egypt.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View ${product.name} on Amazon Egypt"
                    >
                        <div class="store">
                            <span>🇪🇬 AMAZON EGYPT</span>
                            <span>↗</span>
                        </div>

                        <div class="price">
                            ${money(product.egypt.price)}
                        </div>

                        <div class="converted">
                            Native currency: EGP
                        </div>

                        ${best === "egypt"
                            ? `<div class="cheaper-badge">
                                ✓ Cheaper by approximately ${money(difference)}
                               </div>`
                            : ""}

                        <span class="amazon-button">
                            View exact item on Amazon →
                        </span>
                    </a>


                    <a
                        class="offer ${best === "uae" ? "cheapest" : ""}"
                        href="${product.uae.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View ${product.name} on Amazon UAE"
                    >
                        <div class="store">
                            <span>🇦🇪 AMAZON UAE</span>
                            <span>↗</span>
                        </div>

                        <div class="price">
                            ${money(product.uae.price, "AED")}
                        </div>

                        <div class="converted">
                            ≈ ${money(aeEGP)}
                        </div>

                        ${best === "uae"
                            ? `<div class="cheaper-badge">
                                ✓ Cheaper by approximately ${money(difference)}
                               </div>`
                            : ""}

                        <span class="amazon-button">
                            View exact item on Amazon →
                        </span>
                    </a>

                </div>

            </article>
        `;
    }

    function renderSection(key) {
        const section = config.sections[key];

        document.getElementById("sectionEyebrow").textContent =
            section.eyebrow;

        document.getElementById("sectionTitle").textContent =
            section.title;

        document.getElementById("sectionDescription").textContent =
            section.description;

        document.getElementById("productGrid").innerHTML =
            section.products.map(productHTML).join("");

        const egyptTotal = section.products.reduce(
            (sum, product) => sum + product.egypt.price,
            0
        );

        const uaeAED = section.products.reduce(
            (sum, product) => sum + product.uae.price,
            0
        );

        const bestTarget = sectionTarget(section);

        document.getElementById("sectionSummary").innerHTML = `
            <div class="summary-box">

                <p class="eyebrow">PRICE SUMMARY</p>

                <div class="summary-grid">

                    <div class="metric">
                        <span class="metric-label">All from Egypt</span>
                        <span class="metric-value">
                            ${money(egyptTotal)}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">All from UAE</span>
                        <span class="metric-value">
                            ${money(uaeAED, "AED")}
                        </span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">
                            Lowest listed-price combination
                        </span>
                        <span class="metric-value">
                            ≈ ${money(bestTarget)}
                        </span>
                    </div>

                </div>

                <p class="warning">
                    UAE conversions do not include shipping, customs,
                    bank conversion charges or import fees.
                </p>

            </div>
        `;

        showView("products");
    }

    function renderGlobalFunding() {
        const target = allTarget();
        const raised = config.funding.raisedEGP;
        const remaining = Math.max(target - raised, 0);
        const percent = target > 0
            ? Math.min((raised / target) * 100, 100)
            : 0;

        document.getElementById("globalFunding").innerHTML = `
            <p class="eyebrow">OVERALL DEVELOPMENT FUND</p>

            <div class="funding-grid">
                <div class="metric">
                    <span class="metric-label">Current Target</span>
                    <span class="metric-value">${money(target)}</span>
                </div>

                <div class="metric">
                    <span class="metric-label">Confirmed Raised</span>
                    <span class="metric-value">${money(raised)}</span>
                </div>

                <div class="metric">
                    <span class="metric-label">Remaining</span>
                    <span class="metric-value">${money(remaining)}</span>
                </div>
            </div>

            <div class="progress">
                <div
                    class="progress-bar"
                    style="width:${percent}%"
                ></div>
            </div>

            <small>${percent.toFixed(1)}% funded</small>
        `;
    }

    function renderFunding() {
        const target = allTarget();
        const raised = config.funding.raisedEGP;
        const remaining = Math.max(target - raised, 0);

        const percent = target > 0
            ? Math.min((raised / target) * 100, 100)
            : 0;

        const validLink =
            config.funding.instapayUrl &&
            !config.funding.instapayUrl.includes("example.com");

        document.getElementById("fundingDetails").innerHTML = `
            <div class="funding-box">

                <div class="funding-grid">

                    <div class="metric">
                        <span class="metric-label">Equipment Target</span>
                        <span class="metric-value">${money(target)}</span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">Confirmed Contributions</span>
                        <span class="metric-value">${money(raised)}</span>
                    </div>

                    <div class="metric">
                        <span class="metric-label">Remaining</span>
                        <span class="metric-value">${money(remaining)}</span>
                    </div>

                </div>

                <div class="progress">
                    <div
                        class="progress-bar"
                        style="width:${percent}%"
                    ></div>
                </div>

                <p>${percent.toFixed(1)}% funded</p>

                ${
                    validLink
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
                        InstaPay link has not been configured yet.
                        Add it to data/config.js before publishing.
                    </p>
                    `
                }

                <p class="warning">
                    Contributions are counted only after they are actually
                    received and confirmed. Opening the InstaPay link does
                    not automatically increase the funding total.
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

    document.getElementById("homeBtn")
        .addEventListener("click", () => showView("home"));

    document.getElementById("backBtn")
        .addEventListener("click", () => showView("home"));

    document.getElementById("fundBackBtn")
        .addEventListener("click", () => showView("home"));

    document.getElementById("fundBtn")
        .addEventListener("click", renderFunding);

    document.getElementById("exchangeDisplay").textContent =
        `1 AED ≈ ${rate.toFixed(2)} EGP`;

    renderGlobalFunding();
})();
