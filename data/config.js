const DASHBOARD_CONFIG = {
    version: "2.2",

    exchangeRate: {
        AED_TO_EGP: 13.50,
        updated: "2026-08-21"
    },

    funding: {
        raisedEGP: 0,
        instapayUrl: ""
    },

    sections: {

        music: {
            title: "Music Development",
            eyebrow: "MUSIC DEVELOPMENT",
            description:
                "Build on the equipment already owned with targeted recording, production, DJ and laptop upgrades.",

            owned: [
                {
                    name: "Lenovo IdeaPad L340-15IRH Gaming",
                    model: "81LK",
                    category: "LAPTOP",
                    details:
                        "Intel Core i5-9300H • NVIDIA GTX 1650 4 GB • 8 GB RAM • 128 GB SSD • 1 TB HDD"
                },
                {
                    name: "Audio-Technica Headphones",
                    model: "Already owned",
                    category: "MONITORING",
                    details: "Headphones for recording, monitoring and production."
                },
                {
                    name: "PreSonus Studio Monitors",
                    model: "Already owned",
                    category: "MONITORING",
                    details: "Studio speakers for playback and monitoring."
                },
                {
                    name: "Microphone Boom Arm / Stand",
                    model: "Already owned",
                    category: "RECORDING ACCESSORY",
                    details: "Adjustable microphone support."
                },
                {
                    name: "Microphone Pop Filter",
                    model: "Already owned",
                    category: "RECORDING ACCESSORY",
                    details: "Pop filter for vocal recording."
                },
                {
                    name: "3 m XLR Microphone Cable",
                    model: "Already owned",
                    category: "RECORDING ACCESSORY",
                    details: "Balanced XLR microphone cable."
                }
            ],

            products: [

                {
                    id: "microphone-usb",
                    category: "RECORDING",
                    name: "Behringer C-1U USB Condenser Microphone",
                    model: "Behringer C-1U",
                    description:
                        "Budget USB condenser microphone that can connect directly to the laptop without requiring an audio interface.",
                    specifications: [
                        "USB condenser microphone",
                        "Direct laptop connection",
                        "Vocal and instrument recording",
                        "Low-cost starter recording route"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 4400,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B001QXCYZY"
                    },

                    uae: {
                        available: true,
                        price: 190.82,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B001QXCYZY"
                    }
                },

                {
                    id: "midi-controller",
                    category: "PRODUCTION",
                    name: "M-Audio Oxygen 25 MIDI Controller",
                    model: "M-Audio Oxygen 25 family",
                    description:
                        "25-key USB MIDI controller for virtual instruments, melodies, production controls and DAW work.",
                    specifications: [
                        "25 keys",
                        "USB MIDI",
                        "Velocity-sensitive",
                        "Production controls"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 8899,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B08ZPYLC3N"
                    },

                    uae: {
                        available: true,
                        price: 358.13,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B092XJ45ZB"
                    }
                },

                {
                    id: "laptop-ram",
                    category: "LAPTOP UPGRADE",
                    name: "16 GB Crucial Laptop RAM",
                    model: "Crucial DDR4 SO-DIMM",
                    description:
                        "Memory upgrade for the Lenovo IdeaPad L340-15IRH Gaming.",
                    specifications: [
                        "16 GB",
                        "DDR4 SO-DIMM",
                        "Egypt listing: DDR4-3200",
                        "UAE listing: DDR4-2666",
                        "Laptop currently operates memory at 2400 MT/s",
                        "Final compatibility should be verified before purchase"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 5299,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0CWLSMGCT"
                    },

                    uae: {
                        available: true,
                        price: 499,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B08BBVS7WP"
                    }
                },

                {
                    id: "primary-ssd",
                    category: "LAPTOP UPGRADE",
                    name: "Kingston NV3 1 TB NVMe SSD",
                    model: "SNV3S/1000G",
                    description:
                        "1 TB NVMe SSD targeted to replace the laptop's current 128 GB primary Samsung SSD.",
                    specifications: [
                        "1 TB",
                        "M.2 2280",
                        "NVMe",
                        "Current primary SSD: Samsung MZALQ128HBHQ-000L2",
                        "Final laptop compatibility should be verified before purchase"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 6749.79,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0DBR3DZWG"
                    },

                    uae: {
                        available: true,
                        price: 530,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0DBR3DZWG"
                    }
                },

                {
                    id: "audio-interface",
                    category: "OPTIONAL RECORDING UPGRADE",
                    name: "Behringer U-Phoria UMC22",
                    model: "UMC22",
                    description:
                        "Optional USB audio interface for an expandable XLR microphone and monitoring setup.",
                    specifications: [
                        "USB audio interface",
                        "XLR microphone input",
                        "48V phantom power",
                        "Instrument input",
                        "Headphone monitoring"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: false,
                        price: 0,
                        extraCostsEGP: 0,
                        url: ""
                    },

                    uae: {
                        available: true,
                        price: 221,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B07N7YDZR2"
                    }
                },

                {
                    id: "microphone-xlr",
                    category: "OPTIONAL RECORDING UPGRADE",
                    name: "Behringer C-3 XLR Condenser Microphone",
                    model: "Behringer C-3",
                    description:
                        "Expandable XLR condenser microphone option for use with a suitable phantom-powered audio interface.",
                    specifications: [
                        "XLR",
                        "Condenser microphone",
                        "Selectable pickup patterns",
                        "Requires compatible audio interface",
                        "Existing XLR cable already owned"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 4999,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B000KUA8EI"
                    },

                    uae: {
                        available: true,
                        price: 258,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B000KUA8EI"
                    }
                },

                {
                    id: "dj-numark",
                    category: "DJ DEVELOPMENT",
                    name: "Numark Mixtrack Platinum FX",
                    model: "Mixtrack Platinum FX",
                    description:
                        "Full DJ controller and current best-value candidate for developing DJ performance skills.",
                    specifications: [
                        "DJ controller",
                        "Jog-wheel displays",
                        "Performance controls",
                        "Built-in audio interface"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 25500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B087S1ZNNT"
                    },

                    uae: {
                        available: true,
                        price: 1005.57,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B087S1ZNNT"
                    }
                },

                {
                    id: "dj-pioneer",
                    category: "DJ DEVELOPMENT",
                    name: "Pioneer DJ DDJ-REV1",
                    model: "DDJ-REV1",
                    description:
                        "Alternative scratch-style DJ controller option with a Serato-oriented workflow.",
                    specifications: [
                        "DJ controller",
                        "Scratch-style layout",
                        "Serato-oriented workflow"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: false,
                        price: 0,
                        extraCostsEGP: 0,
                        url: ""
                    },

                    uae: {
                        available: true,
                        price: 1199,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B09VH3M3LL"
                    }
                },

                {
                    id: "dj-controller-bag",
                    category: "DJ ACCESSORY",
                    name: "PGmoon DJ Controller Bag",
                    model: "PGmoon DJ controller backpack/bag",
                    description:
                        "Optional carrying bag for compatible DJ controllers and accessories.",
                    specifications: [
                        "DJ equipment carrying bag",
                        "Multiple storage pockets",
                        "Controller compatibility must be checked before purchase",
                        "Listing mentions Hercules Inpulse 200 MK2 and Numark Party Mix II compatibility"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: false,
                        price: 0,
                        extraCostsEGP: 0,
                        url: ""
                    },

                    uae: {
                        available: true,
                        price: 352.63,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0CW6F7T87"
                    }
                },

                {
                    id: "secondary-ssd",
                    category: "FUTURE LAPTOP UPGRADE",
                    name: "Secondary 1–2 TB SATA SSD",
                    model: "Future upgrade",
                    description:
                        "Optional future replacement for the existing Western Digital 1 TB mechanical hard drive.",
                    specifications: [
                        "2.5-inch SATA SSD",
                        "1 TB minimum",
                        "2 TB preferred if budget permits",
                        "Existing HDD remains usable"
                    ],
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: false,
                        price: 0,
                        extraCostsEGP: 0,
                        url: ""
                    },

                    uae: {
                        available: false,
                        price: 0,
                        extraCostsEGP: 0,
                        url: ""
                    }
                }
            ]
        },

        coding: {
            title: "Coding Development",
            eyebrow: "CODING & AI DEVELOPMENT",
            description:
                "A value-focused desktop workstation and workspace for software development, CUDA and local AI.",

            owned: [],

            products: [
                {
                    id: "cpu",
                    category: "PC",
                    name: "Value-Focused Desktop CPU",
                    model: "Ryzen 7-class target",
                    description:
                        "Strong multi-core CPU without spending unnecessarily on a flagship processor.",
                    specifications: [
                        "AM5 preferred",
                        "Ryzen 7 class",
                        "Strong development performance"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 16000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 950,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "gpu",
                    category: "PC",
                    name: "NVIDIA CUDA GPU",
                    model: "16 GB VRAM preferred",
                    description:
                        "GPU prioritized for local AI, CUDA, PyTorch, Whisper and model inference.",
                    specifications: [
                        "NVIDIA",
                        "CUDA",
                        "16 GB VRAM preferred",
                        "12 GB considered if substantially cheaper"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 40000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 2300,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "motherboard",
                    category: "PC",
                    name: "AM5 Motherboard",
                    model: "B650-class target",
                    description:
                        "Reliable motherboard without paying for unnecessary enthusiast features.",
                    specifications: [
                        "AM5",
                        "DDR5",
                        "2+ M.2 slots preferred"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 9000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "desktop-ram",
                    category: "PC",
                    name: "32 GB DDR5 RAM",
                    model: "2 × 16 GB",
                    description:
                        "Practical initial memory capacity with room to upgrade later.",
                    specifications: [
                        "32 GB",
                        "2 × 16 GB",
                        "DDR5"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 5000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 280,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "nvme",
                    category: "PC",
                    name: "2 TB NVMe SSD",
                    model: "Value NVMe target",
                    description:
                        "Primary storage for development environments, AI models and active projects.",
                    specifications: [
                        "2 TB",
                        "M.2 NVMe"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 6500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 360,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "psu",
                    category: "PC",
                    name: "Quality 750–850 W PSU",
                    model: "ATX 3.x target",
                    description:
                        "Reliable PSU appropriately sized for the final NVIDIA GPU.",
                    specifications: [
                        "750–850 W",
                        "80 Plus Gold preferred",
                        "ATX 3.x preferred"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 5500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 310,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "cooler",
                    category: "PC",
                    name: "Value Air CPU Cooler",
                    model: "AM5 compatible",
                    description:
                        "Reliable air cooling without unnecessary liquid-cooling expense.",
                    specifications: [
                        "AM5 compatible",
                        "Air cooler",
                        "CPU clearance must match case"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 2500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 150,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "case",
                    category: "PC",
                    name: "High-Airflow PC Case",
                    model: "Value ATX/mATX chassis",
                    description:
                        "Simple case with good airflow and enough GPU clearance.",
                    specifications: [
                        "Good airflow",
                        "GPU clearance",
                        "Compatible motherboard size"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 4000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 225,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "desk",
                    category: "WORKSPACE",
                    name: "Computer / Development Desk",
                    model: "Value workstation desk",
                    description:
                        "Stable workspace for the computer, displays and development equipment.",
                    specifications: [
                        "120–160 cm width target",
                        "60+ cm depth preferred",
                        "Stable construction",
                        "Gaming branding not required"
                    ],
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 5000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        available: true,
                        price: 300,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                }
            ]
        }
    }
};
