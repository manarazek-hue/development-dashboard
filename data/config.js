const DASHBOARD_CONFIG = {

    exchangeRate: {
        AED_TO_EGP: 13.50,
        updated: "2026-08-21"
    },

    funding: {
        raisedEGP: 0,

        // Replace this with your actual InstaPay payment link.
        instapayUrl: "https://example.com/REPLACE-WITH-YOUR-INSTAPAY-LINK"
    },

    sections: {

        music: {
            title: "Music Development",
            eyebrow: "MUSIC DEVELOPMENT",
            description: "Equipment for recording, production and music creation.",

            products: [

                {
                    id: "microphone",
                    category: "MICROPHONE",
                    name: "Condenser Microphone",
                    description: "Studio condenser microphone for vocals and instruments.",
                    status: "needed",

                    egypt: {
                        price: 6500,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 399,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "audio-interface",
                    category: "AUDIO",
                    name: "Audio Interface / Sound Card",
                    description: "USB audio interface for microphones, headphones and instruments.",
                    status: "needed",

                    egypt: {
                        price: 8000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 450,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "midi-controller",
                    category: "MIDI",
                    name: "MIDI Controller",
                    description: "Compact MIDI keyboard/controller for music production.",
                    status: "needed",

                    egypt: {
                        price: 7000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 350,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "laptop-ram",
                    category: "MEMORY",
                    name: "16 GB Laptop RAM",
                    description: "Laptop memory upgrade. Exact module must be verified for compatibility.",
                    status: "needed",

                    egypt: {
                        price: 2200,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 130,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "ssd-500",
                    category: "STORAGE",
                    name: "500 GB SSD",
                    description: "Fast SSD storage upgrade.",
                    status: "optional",

                    egypt: {
                        price: 2200,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 125,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "ssd-1tb",
                    category: "STORAGE",
                    name: "1 TB SSD",
                    description: "High-capacity SSD for projects, samples and applications.",
                    status: "needed",

                    egypt: {
                        price: 3800,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 220,
                        url: "https://www.amazon.ae/"
                    }
                }
            ]
        },


        coding: {
            title: "Coding Development",
            eyebrow: "CODING DEVELOPMENT",
            description: "Components for a powerful coding, development and local AI workstation.",

            products: [

                {
                    id: "cpu",
                    category: "PROCESSOR",
                    name: "High Performance CPU",
                    description: "Modern multi-core processor for development and productivity.",
                    status: "needed",

                    egypt: {
                        price: 16000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 950,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "gpu",
                    category: "GRAPHICS",
                    name: "NVIDIA GPU — 16 GB VRAM Target",
                    description: "CUDA-capable GPU for AI workloads and GPU development.",
                    status: "needed",

                    egypt: {
                        price: 40000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 2300,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "motherboard",
                    category: "MOTHERBOARD",
                    name: "Motherboard",
                    description: "Motherboard matched to the selected CPU and workstation components.",
                    status: "needed",

                    egypt: {
                        price: 9000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 500,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "desktop-ram",
                    category: "MEMORY",
                    name: "64 GB RAM",
                    description: "High-capacity system memory for development and AI workloads.",
                    status: "needed",

                    egypt: {
                        price: 7000,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 390,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "nvme",
                    category: "STORAGE",
                    name: "2 TB NVMe SSD",
                    description: "High-speed primary storage for operating system, development and models.",
                    status: "needed",

                    egypt: {
                        price: 6500,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 360,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "psu",
                    category: "POWER",
                    name: "Power Supply",
                    description: "Quality PSU sized appropriately for the selected CPU and GPU.",
                    status: "needed",

                    egypt: {
                        price: 5500,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 310,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "case",
                    category: "CASE",
                    name: "PC Case",
                    description: "Airflow-focused case with sufficient GPU and cooling clearance.",
                    status: "needed",

                    egypt: {
                        price: 4500,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 250,
                        url: "https://www.amazon.ae/"
                    }
                },

                {
                    id: "cooler",
                    category: "COOLING",
                    name: "CPU Cooler",
                    description: "Cooling solution appropriate for the selected processor.",
                    status: "needed",

                    egypt: {
                        price: 3500,
                        url: "https://www.amazon.eg/"
                    },

                    uae: {
                        price: 200,
                        url: "https://www.amazon.ae/"
                    }
                }

            ]
        }
    }
};
