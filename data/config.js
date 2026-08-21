const DASHBOARD_CONFIG = {
    version: "2.0",

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
            description: "Recording, production, performance and laptop upgrades.",

            products: [
                {
                    id: "microphone",
                    category: "MICROPHONE",
                    name: "Condenser Microphone",
                    model: "Model to be selected",
                    description: "Studio condenser microphone for vocals and instruments.",
                    specifications: ["Condenser", "Studio recording"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 6500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 399,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "audio-interface",
                    category: "AUDIO",
                    name: "Audio Interface",
                    model: "Model to be selected",
                    description: "USB audio interface for microphone and instrument recording.",
                    specifications: ["USB", "XLR input", "Headphone monitoring"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 8000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 450,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "midi-controller",
                    category: "MIDI",
                    name: "MIDI Controller",
                    model: "Model to be selected",
                    description: "Keyboard/controller for music production.",
                    specifications: ["USB MIDI"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 7000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 350,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "laptop-ram",
                    category: "MEMORY",
                    name: "16 GB Laptop RAM",
                    model: "Compatibility must be verified",
                    description: "Memory upgrade for the current laptop.",
                    specifications: ["16 GB", "Laptop SO-DIMM"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 2200,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 130,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "ssd-500",
                    category: "STORAGE",
                    name: "500 GB SSD",
                    model: "Compatibility must be verified",
                    description: "SSD storage upgrade.",
                    specifications: ["500 GB"],
                    image: "",
                    status: "optional",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 2200,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 125,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "ssd-1tb",
                    category: "STORAGE",
                    name: "1 TB SSD",
                    model: "Compatibility must be verified",
                    description: "Primary storage expansion for projects and samples.",
                    specifications: ["1 TB"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 3800,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 220,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                }
            ]
        },

        coding: {
            title: "Coding Development",
            eyebrow: "CODING DEVELOPMENT",
            description: "A complete workstation for software development and local AI.",

            products: [
                {
                    id: "cpu",
                    category: "PROCESSOR",
                    name: "Desktop CPU",
                    model: "Model to be selected",
                    description: "Modern multi-core desktop processor.",
                    specifications: ["Multi-core"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 16000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 950,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "gpu",
                    category: "GRAPHICS",
                    name: "NVIDIA GPU",
                    model: "16 GB VRAM target",
                    description: "CUDA-capable GPU for local AI and development.",
                    specifications: ["NVIDIA", "CUDA", "16 GB VRAM target"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 40000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 2300,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "motherboard",
                    category: "MOTHERBOARD",
                    name: "Motherboard",
                    model: "Matched to selected CPU",
                    description: "Desktop motherboard for the workstation.",
                    specifications: ["CPU compatibility required"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 9000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "desktop-ram",
                    category: "MEMORY",
                    name: "64 GB Desktop RAM",
                    model: "Model to be selected",
                    description: "High-capacity workstation memory.",
                    specifications: ["64 GB"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 7000,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 390,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "nvme",
                    category: "STORAGE",
                    name: "2 TB NVMe SSD",
                    model: "Model to be selected",
                    description: "High-speed primary workstation storage.",
                    specifications: ["2 TB", "NVMe"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 6500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 360,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "psu",
                    category: "POWER",
                    name: "Power Supply",
                    model: "Model to be selected",
                    description: "Quality PSU sized for the selected GPU and CPU.",
                    specifications: ["80 Plus target"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 5500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 310,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "case",
                    category: "CASE",
                    name: "PC Case",
                    model: "Model to be selected",
                    description: "Airflow-focused workstation chassis.",
                    specifications: ["GPU clearance required"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 4500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 250,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "cooler",
                    category: "COOLING",
                    name: "CPU Cooler",
                    model: "Model to be selected",
                    description: "CPU cooling appropriate for the final processor.",
                    specifications: ["CPU/socket compatibility required"],
                    image: "",
                    status: "needed",
                    quantity: 1,
                    lastChecked: "2026-08-21",

                    egypt: {
                        price: 3500,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 200,
                        extraCostsEGP: 0,
                        url: "https://www.amazon.ae/"
                    }
                }
            ]
        }
    }
};
