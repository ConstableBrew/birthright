window.domains = {
    domains: {
        'Emerald Spiral': {
            key: 'Emerald Spiral',
            name: 'Emerald Spiral',
            regent: 'Gretta Seligsdotter',
            regencyGenerated: 30,
            regencyAccumulated: 18,
            treasury: 11,
            description: 'The emerald Spiral is favored by traditional Rjurik over its rival, the Oaken Grove, which appeals more to souther, urbanized Rjurik. The Spiral\'s members are mostly wilderness druids who live in the trackless lands of northern and eastern Rjurik realms. Emerald Spiral druids tend to be more martial those of the Grove, its members actively battling the humanoids and awnsheghlien of the Rjurik wilds. Although this usually involves sabotage and misdirection of the enemy rather than open violence, the Emerald Spiral druids are still much less pacifistic than their city-dwelling counterparts.'
        },
        'Oaken Grove': {
            key: 'Oaken Grove',
            name: 'Oaken Grove',
            regent: 'Gunther Brandt',
            regencyGenerated: 61,
            regencyAccumulated: 42,
            treasury: 30,
            description: 'The Oaken Grove of Erik is a faith that appeals primarily to urban Rjurik and those who live in the Taelshore. Wilderness Rjurik, or those of the Northlands and Wild Lands, consider the Oaken Grove to be somewhat "foregin," but the church continues to gain adherents. In the wilder realms, the Grove has yet to make serious inroads on teh power of the other major temple of Erik, the Emerald Spiral.',
        },
        'Nilsvaar': {
            key: 'Nilsvaar',
            name: 'Nilsvaar',
            regent: 'Nilsvaar',
            regencyGeneraged: 12,
            regencyAccumulated: 10,
            treasury: 3,
            description: 'In recent years the scattered Rjurik tribes of the Wild Lands suffered a period of unrest after King of Halskapa died of advanced age. King Uldviik\'s two sons feuded for power, drastically reducing the realm\'s military standing. Nilsvaar, a merchant from Hjolvar and rumored to be the pirate Black Fiend, surprised all when he stepped in with a unit of exotic varsk riders and support of mercenary units from Danigau and claimed the throne for himself. Shortly after reining in the Jarals of Halskapa, Jarl Ulrich of Kvigmar attacked in an attempt to free the people of Halskapa. Several years of continual skirmishing passed before Nilsvaar reduced Jarl Ulrich to the point of surrender. Kvigmar and Hjolvar are now a single realm under self-crowned King Nilsvaar.',
        },
        'Temple of Moradin': {
            key: 'Temple of Moradin',
            name: 'Jarldom of Thorin Ungarth',
            regent: 'Thorin Ungarth',
        },
        'Thorin Ungarth': {
            key: 'Thorin Ungarth',
            name: 'Jarldom of Thorin Ungarth',
            regent: 'Thorin Ungarth',
        },
        'Rhaegar Taengress': {
            key: 'Rhaegar Taengress',
            name: 'Jarldom of Rhaegar Taengress',
            regent: 'Rhaegar Taengress',
        },
        'Bjorn': {
            key: 'Bjorn',
            name: 'Jarldom of Bjorn',
            regent: 'Bjorn',
        },
        'Rainer': {
            key: 'Rainer',
            name: 'Jarldom of Rainer',
            regent: 'Rainer',
        },
        'Daegandal': {
            key: 'Daegandal',
            name: 'Jarldom of Daegandal',
            regent: 'Daegandal',
        },
        'Selena Clairmonte': {
            key: 'Selena Clairmonte',
            name: 'Jarldom of Selena Clairmonte',
            regent: 'Selena Clairmonte',
        },
        'Gautrek Raknarsson': {
            key: 'Gautrek Raknarsson',
            name: 'Jarldom of Gautrek Raknarsson',
            regent: 'Gautrek Raknarsson',
        },
    },
    regents: {
        'Gretta Seligsdotter': {
            key: 'Gretta Seligsdotter',
            name: 'Gretta Seligsdotter',
            tooltip: 'FRj; Pr 12, Erik; Vo, major, 17; CG',
        },
        'Gunther Brandt': {
            key: 'Gunther Brandt',
            name: 'Gunther Brandt',
            tooltip: 'MBr; Pr 10, Erik; Re, major, 19; CG',
        },
        'Nilsvaar': {
            key: 'Nilsvaar',
            name: 'Nilsvaar',
            tooltip: 'MRj; F11; Re, major, 15; LN',
            vassals: [
                'Thorin Ungarth',
                'Rhaegar Taengress',
                'Bjorn',
                'Rainer',
                'Daegandal',
                'Selena Clairmonte',
                'Gautrek Raknarsson',
            ],
        },
        'Thorin Ungarth': {
            key: 'Thorin Ungarth',
            name: 'Thorin Ungarth',
            player: 'deadpool_qc',
            lord: 'Nilsvaar',
        },
        'Rhaegar Taengress': {
            key: 'Rhaegar Taengress',
            name: 'Rhaegar Taengress',
            player: 'Aldrusian',
            lord: 'Nilsvaar',
        },
        'Bjorn': {
            key: 'Bjorn',
            name: 'Bjorn',
            player: 'Khotanos',
            lord: 'Nilsvaar',
        },
        'Rainer': {
            key: 'Rainer',
            name: 'Rainer',
            player: 'Brokenfocus',
            lord: 'Nilsvaar',
        },
        'Daegandal': {
            key: 'Daegandal',
            name: 'Daegandal',
            player: 'ArnoldPoodle',
            lord: 'Nilsvaar',
        },
        'Selena Clairmonte': {
            key: 'Selena Clairmonte',
            name: 'Selena Clairmonte',
            player: 'Redbarron219',
            lord: 'Nilsvaar',
        },
        'Gautrek Raknarsson': {
            key: 'Gautrek Raknarsson',
            name: 'Gautrek Raknarsson',
            player: 'DarK_RaideR',
            lord: 'Nilsvaar',
        }
    },
    provinces: {
        Belik: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 7,
            holdings: {
                law: {'Nilsvaar': 0},
                temple: {'Emerald Spiral': 0},
            },
        },
        Djurik: {
            domain: 'Thorin Ungarth',
            level: 2,
            sourcePotential: 5,
            holdings: {
                law: {'Nilsvaar': 1},
                temple: {'Thorin Ungarth': 1},
                guild: {'Thorin Ungarth': 1},
            },
        },
        Freikstaad: {
            domain: 'Rhaegar Taengress',
            level: 2,
            sourcePotential: 5,
            holdings: {
                law: {'Nilsvaar': 0, 'Rhaegar Taengress': 1},
                temple: {'Emerald Spiral': 0},
                guild: {'Rhaegar Taengress': 1},
            },
        },
        Hruthjik: {
            domain: 'Nilsvaar',
            level: 1,
            sourcePotential: 6,
            holdings: {
                law: {'Nilsvaar': 1},
                temple: {'Emerald Spiral': 1},
            },
        },
        Junfjor: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 7,
            holdings: {},
        },
        Kopingdal: {
            domain: 'Nilsvaar',
            level: 4,
            sourcePotential: 3,
            holdings: {
                law: {'Nilsvaar': 2},
                temple: {'Emerald Spiral': 2},
            },
        },
        Svinoy_island: {
            name: 'Sivnoy Island',
            domain: 'Bjorn',
            level: 1,
            sourcePotential: 6,
            constructions: {
                fortification: 1,
            },
            holdings: {
                law: {'Nilsvaar': 1},
                temple: {'Oaken Grove': 0},
                guild: {'Bjorn': 0},
            },
        },
        Tarlhaas: {
            domain: 'Gautrek Raknarsson',
            level: 3,
            sourcePotential: 4,
            holdings: {
                law: {'Gautrek Raknarsson': 1},
                temple: {'Gautrek Raknarsson': 1},
            },
        },
        Vaaltrand: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 7,
            holdings: {
                temple: {'Emerald Spiral': 0},
            },
        },
        Dhovjiir: {
            domain: 'Nilsvaar',
            level: 1,
            sourcePotential: 6,
            holdings: {
                temple: {'Emerald Spiral': 1},
            },
        },
        Jharvild: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 6,
        },
        Kvigmarheim: {
            domain: 'Nilsvaar',
            level: 4,
            sourcePotential: 2,
            holdings: {
                law: {Nilsvaar: 2},
                temple: {'Emerald Spiral': 1},
                guild: {Nilsvaar: 2},
            },
        },
        Sjalikfjord: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 7,
        },
        Virskaap: {
            domain: 'Nilsvaar',
            level: 0,
            sourcePotential: 7,
        },
        'Zeph-na': {
            domain: 'Selena Clairmonte',
            level: 4,
            sourcePotential: 4,
            holdings: {
                law: {'Selena Clairmonte': 1},
            },
            military: {
                'Selena Clairmonte': [
                    {name: 'Irregulars'},
                ],
            },
        },
        Nulthan: {
            domain: 'Rainer',
            level: 2,
            sourcePotential: 7,
            holdings: {
                law: {'Rainer': 2},
                guild: {'Rainer': 1},
            },
            military: {
                'Rainer': [
                    {name: 'Infantry'},
                ],
            },
        },
        'Raka-zai': {
            domain: 'Daegandal',
            level: 1,
            sourcePotential: 8,
            holdings: {
                law: {'Daegandal': 1},
                source: {'Daegandal': 0},
            },
            military: {
                'Daegandal': [
                    {name: 'Irregulars'},
                ],
            },
        },
    },
};
