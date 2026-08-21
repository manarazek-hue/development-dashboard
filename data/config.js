const DASHBOARD_CONFIG = {
    version: "2.2",

    exchangeRate: {
        AED_TO_EGP: 13.50,
        updated: "2026-08-21"
    },

    funding: {
        raisedEGP: 0,
        instapayUrl: "",

        pledgeEndpoint: "https://formspree.io/f/xeajdavk"
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
                    name: "Boom Arm / Stand",
                    model: "Already owned",
                    category: "MICROPHONE ACCESSORY",
                    details: "Adjustable microphone support."
                },
                {
                    name: "Pop Filter",
                    model: "Already owned",
                    category: "MICROPHONE ACCESSORY",
                    details: "Pop filter for vocal recording."
                },
                {
                    name: "3 m XLR Cable",
                    model: "Already owned",
                    category: "MICROPHONE ACCESSORY",
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
                "Funding a capable software-development and local-AI workstation. Amazon listings are market references used to establish expected equipment costs; final purchases may come from Computer Mall or another trusted supplier.",

            localBuild: {
                enabled: true,

                title: "PC Assembly Budget",

                priceEGP: 60000,

                source: "Mall el Bustan",

                location: "Egypt",

                description:
                    "A complete coding and local-AI workstation can be assembled locally within this target budget. Final components will be selected at purchase time based on availability, compatibility and best value.",

                requirements: [
                    "NVIDIA CUDA GPU",
                    "12 GB VRAM minimum",
                    "16 GB VRAM preferred",
                    "32 GB system RAM minimum",
                    "Modern multi-core processor",
                    "1 TB+ NVMe SSD",
                    "Reliable branded power supply",
                    "Upgradeable platform preferred"
                ]
            },
            owned: [
                {
                    name: "Lenovo IdeaPad L340-15IRH Gaming",
                    model: "81LK",
                    category: "CURRENT CODING MACHINE",
                    details:
                        "Intel Core i5-9300H • NVIDIA GTX 1650 4 GB • 8 GB RAM • Existing development machine"
                }
            ],

            products: [

                // =================================================
                // COMPLETE LOCAL BUILD
                // =================================================

                {
                    id: "coding-gpu",

                    category: "COMPONENT REFERENCE",

                    name: "NVIDIA 16 GB AI GPU",

                    model: "ASUS 16 GB-class GPU reference",

                    description:
                        "Market-price reference for the most important AI component. The target is an NVIDIA CUDA GPU with approximately 16 GB of VRAM; the Egypt and UAE references may represent different suitable models.",

                    specifications: [
                        "NVIDIA CUDA required",
                        "16 GB VRAM target",
                        "Local AI / PyTorch",
                        "faster-whisper",
                        "Demucs",
                        "Transformers",
                        "Ollama/local model workloads",
                        "Reference listings do not need to be identical models"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 36522.44,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0F7WB6LSH"
                    },

                    uae: {
                        available: true,
                        price: 2839.55,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0F4DVKSZ4"
                    }
                },


                // =================================================
                // CPU REFERENCE
                // =================================================

                {
                    id: "coding-cpu",

                    category: "COMPONENT REFERENCE",

                    name: "Ryzen 7-Class Processor",

                    model: "Modern multi-core development CPU reference",

                    description:
                        "Price references for the processor class required by the development workstation. Final CPU will be selected together with a compatible motherboard and RAM platform.",

                    specifications: [
                        "8-core class target",
                        "Strong software development performance",
                        "Docker and multitasking",
                        "CPU-heavy audio processing",
                        "Final CPU/motherboard/RAM must use a compatible platform",
                        "Egypt reference: Ryzen 7 5800X",
                        "UAE reference: Ryzen 7 7700X"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 12800,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0815XFSGK"
                    },

                    uae: {
                        available: true,
                        price: 831.69,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0BBHHT8LY"
                    }
                },


                // =================================================
                // MOTHERBOARD REFERENCE
                // =================================================

                {
                    id: "coding-motherboard",

                    category: "COMPONENT REFERENCE",

                    name: "MSI B850M Gaming WiFi Motherboard",

                    model: "B850M / AM5-class platform reference",

                    description:
                        "Modern motherboard reference for an upgradeable DDR5 development workstation.",

                    specifications: [
                        "Modern AMD platform",
                        "DDR5",
                        "NVMe storage support",
                        "Wi-Fi",
                        "Final motherboard must match the selected CPU"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 9599.94,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B096Y414R3"
                    },

                    uae: {
                        available: true,
                        price: 697.69,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B096Y414R3"
                    }
                },


                // =================================================
                // RAM REFERENCE
                // =================================================

                {
                    id: "coding-ram",

                    category: "COMPONENT REFERENCE",

                    name: "32 GB Corsair Vengeance DDR5",

                    model: "32 GB DDR5-6000 desktop memory reference",

                    description:
                        "Desktop DDR5 memory reference for the development workstation.",

                    specifications: [
                        "32 GB total target",
                        "2 × 16 GB target",
                        "DDR5",
                        "6000 MT/s class",
                        "Desktop memory",
                        "Final kit must be compatible with selected motherboard/CPU"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 33999,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0DZ935RX9"
                    },

                    uae: {
                        available: true,
                        price: 1945,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0GGJ79NR3"
                    }
                },


                // =================================================
                // STORAGE REFERENCE
                // =================================================

                {
                    id: "coding-storage",

                    category: "COMPONENT REFERENCE",

                    name: "2 TB Crucial NVMe SSD",

                    model: "2 TB NVMe storage reference",

                    description:
                        "High-capacity primary storage reference for development environments, AI models, datasets and active projects.",

                    specifications: [
                        "2 TB target",
                        "M.2 NVMe",
                        "Primary workstation storage",
                        "Reference listings may represent different Crucial generations"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 12600,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0B25MJ1YT"
                    },

                    uae: {
                        available: true,
                        price: 973.09,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0DC8RVRBZ"
                    }
                },


                // =================================================
                // PSU REFERENCE
                // =================================================

                {
                    id: "coding-psu",

                    category: "COMPONENT REFERENCE",

                    name: "MSI 750 W Power Supply",

                    model: "750 W quality PSU reference",

                    description:
                        "Reliable power-supply reference for the workstation. Final wattage must be appropriate for the selected GPU.",

                    specifications: [
                        "750 W class",
                        "Reputable manufacturer",
                        "80 Plus Gold-class target",
                        "Final PSU must be sized for GPU",
                        "Avoid generic power supplies"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 5690,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0CC3QBGDL"
                    },

                    uae: {
                        available: true,
                        price: 319.14,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0BSLJMCRP"
                    }
                },


                // =================================================
                // COOLER REFERENCE
                // =================================================

                {
                    id: "coding-cooler",

                    category: "COMPONENT REFERENCE",

                    name: "Cooler Master CPU Air Cooler",

                    model: "AM5-compatible air-cooling reference",

                    description:
                        "Value-focused air-cooling reference. No expensive liquid cooling is required for the funding target.",

                    specifications: [
                        "Air cooling",
                        "AM5 compatibility target",
                        "Final cooler must match CPU socket",
                        "Case clearance must be checked"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 1699,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0FXJZG91W"
                    },

                    uae: {
                        available: true,
                        price: 109.40,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0CGJ1J5KL"
                    }
                },


                // =================================================
                // CASE REFERENCE
                // =================================================

                {
                    id: "coding-case",

                    category: "COMPONENT REFERENCE",

                    name: "Airflow PC Case",

                    model: "ATX/mATX airflow case reference",

                    description:
                        "Representative case pricing. Final case will be selected based on motherboard size, GPU clearance and airflow.",

                    specifications: [
                        "Good airflow",
                        "GPU clearance",
                        "Motherboard compatibility",
                        "No premium/RGB requirement",
                        "Egypt reference: Havit CF923",
                        "UAE reference: Tortox Nimbus"
                    ],

                    status: "optional",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 3500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B0GHYY8QMH"
                    },

                    uae: {
                        available: true,
                        price: 199,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0GWXN23PY"
                    }
                },


                // =================================================
                // DESK - SEPARATE FROM PC BUILD
                // =================================================

                {
                    id: "coding-desk",

                    category: "WORKSPACE",

                    name: "Development Computer Desk",

                    model: "120–160 cm workstation desk target",

                    description:
                        "Desk for the coding/AI workstation. This requirement is independent of whether the computer is assembled locally or purchased from individual components.",

                    specifications: [
                        "Stable construction",
                        "120–160 cm width target",
                        "60 cm+ depth preferred",
                        "Enough space for computer and displays",
                        "Egypt reference: CubiCubi desk",
                        "UAE reference: Portal-AE desk",
                        "Local purchase may be preferable because of transport size"
                    ],

                    status: "needed",

                    quantity: 1,

                    lastChecked: "2026-08-21",

                    egypt: {
                        available: true,
                        price: 2499,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/dp/B09DV958KK"
                    },

                    uae: {
                        available: true,
                        price: 150.51,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/dp/B0DYPB8HCQ"
                    }
                }
            ]
        }
    }
};



