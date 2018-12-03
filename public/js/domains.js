window.domains = {
    domains: {
        'Emerald Spiral': {
            regent: 'Gretta Seligsdotter',
            regencyGenerated: 30,
            regencyAccumulated: 18,
            treasury: 11,
            description: 'The emerald Spiral is favored by traditional Rjurik over its rival, the Oaken Grove, which appeals more to souther, urbanized Rjurik. The Spiral\'s members are mostly wilderness druids who live in the trackless lands of northern and eastern Rjurik realms. Emerald Spiral druids tend to be more martial those of the Grove, its members actively battling the humanoids and awnsheghlien of the Rjurik wilds. Although this usually involves sabotage and misdirection of the enemy rather than open violence, the Emerald Spiral druids are still much less pacifistic than their city-dwelling counterparts.'
        },
        'Oaken Grove': {
            regent: 'Gunther Brandt',
            regencyGenerated: 61,
            regencyAccumulated: 42,
            treasury: 30,
            description: 'The Oaken Grove of Erik is a faith that appeals primarily to urban Rjurik and those who live in the Taelshore. Wilderness Rjurik, or those of the Northlands and Wild Lands, consider the Oaken Grove to be somewhat "foregin," but the church continues to gain adherents. In the wilder realms, the Grove has yet to make serious inroads on teh power of the other major temple of Erik, the Emerald Spiral.',
        },
        Hjolvar: {
            regent: 'Uldviik',
            regencyGeneraged: 12,
            regencyAccumulated: 10,
            treasury: 3,
            description: 'Hjolvar did not exist until 20 years ago, when Uldviik declared himself regent of the newly formed realm.',
        },
    },
    regents: {
        'Gretta Seligsdotter': {tooltip: 'FRj; Pr 12, Erik; Vo, major, 28; CG'},
        'Gunther Brandt': {tooltip: 'MBr; Pr 10, Erik; Re, major, 32; CG'},
        Uldviik: {tooltip: 'MRj; F6; Re, major, 22; LN'},
    },
    provinces: {
        Belik: {
            domain: 'Hjolvar',
            level: 0,
            maxSource: 7,
            holdings: {
                law: {'Hjolvar': 0},
                temple: {'Emerald Spiral': 0},
            },
        },
        Djurik: {
            domain: 'Hjolvar',
            level: 1,
            maxSource: 6,
            holdings: {
                law: {'Hjolvar': 1},
            },
        },
        Freikstaad: {
            domain: 'Hjolvar',
            level: 0,
            maxSource: 7,
            holdings: {
                law: {'Hjolvar': 0},
                temple: {'Emerald Spiral': 0},
            },
        },
        Hruthjik: {
            domain: 'Hjolvar',
            level: 1,
            maxSource: 6,
            holdings: {
                law: {'Hjolvar': 1},
                temple: {'Emerald Spiral': 1},
            },
        },
        Junfjor: {
            domain: 'Hjolvar',
            level: 0,
            maxSource: 7,
            holdings: {},
        },
        Kopingdal: {
            domain: 'Hjolvar',
            level: 4,
            maxSource: 3,
            holdings: {
                law: {'Hjolvar': 2},
                temple: {'Emerald Spiral': 2},
            },
        },
        Svinoy_island: {
            domain: 'Hjolvar',
            level: 1,
            maxSource: 6,
            constructions: {
                fortification: 1,
            },
            holdings: {
                law: {'Hjolvar': 1},
                temple: {'Oaken Grove': 0},
            },
        },
        Tarlhaas: {
            domain: 'Hjolvar',
            level: 0,
            maxSource: 7,
            holdings: {},
        },
        Vaaltrand: {
            domain: 'Hjolvar',
            level: 0,
            maxSource: 7,
            holdings: {
                temple: {'Emerald Spiral': 0},
            },
        },
    },
};
