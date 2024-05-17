const staticLocations = [
  {
    id: 1,
    name: 'Ben Nevis',
  },
  {
    id: 2,
    name: 'Ben Macdui',
  },
  {
    id: 3,
    name: 'Braeriach',
  },
  {
    id: 4,
    name: 'Ben Macdui North Top',
  },
  {
    id: 5,
    name: 'Cairn Toul',
  },
  {
    id: 6,
    name: 'Carn na Criche',
  },
  {
    id: 7,
    name: 'Sgor an Lochain Uaine',
  },
  {
    id: 8,
    name: 'Stob Coire Sputan Dearg',
  },
  {
    id: 9,
    name: 'Cairn Gorm',
  },
  {
    id: 10,
    name: 'Stob Coire an Lochain',
  },
  {
    id: 11,
    name: 'Aonach Beag',
  },
  {
    id: 12,
    name: 'Carn Dearg (NW)',
  },
  {
    id: 13,
    name: 'Aonach Mor',
  },
  {
    id: 14,
    name: 'Carn Mor Dearg',
  },
  {
    id: 15,
    name: 'Ben Lawers',
  },
  {
    id: 16,
    name: 'Carn Dearg (NW) (old GR)',
  },
  {
    id: 17,
    name: 'Cairn Lochan',
  },
  {
    id: 18,
    name: 'Stob Coire an t-Saighdeir',
  },
  {
    id: 19,
    name: "Beinn a' Bhuird",
  },
  {
    id: 20,
    name: 'Sron na Lairige',
  },
  {
    id: 21,
    name: 'Beinn Mheadhoin',
  },
  {
    id: 22,
    name: 'Carn Eighe',
  },
  {
    id: 23,
    name: 'Mam Sodhail',
  },
  {
    id: 24,
    name: 'Carn Dearg Meadhonach',
  },
  {
    id: 25,
    name: "Beinn a' Bhuird South Top",
  },
  {
    id: 26,
    name: 'Stob Choire Claurigh',
  },
  {
    id: 27,
    name: "Beinn a' Bhuird South Top (old GR)",
  },
  {
    id: 28,
    name: 'Stob Coire an t-Sneachda',
  },
  {
    id: 29,
    name: 'Ben More',
  },
  {
    id: 30,
    name: "Cnap a' Chleirich",
  },
  {
    id: 31,
    name: 'Ben Avon - Leabaidh an Daimh Bhuidhe',
  },
  {
    id: 32,
    name: 'Stob Binnein',
  },
  {
    id: 33,
    name: 'Beinn Mheadhoin SW Top',
  },
  {
    id: 34,
    name: 'Beinn Bhrotain',
  },
  {
    id: 35,
    name: 'Lochnagar - Cac Carn Beag',
  },
  {
    id: 36,
    name: 'Derry Cairngorm',
  },
  {
    id: 37,
    name: "A' Chioch",
  },
  {
    id: 38,
    name: 'Sgurr na Lapaich',
  },
  {
    id: 39,
    name: 'Cnap Coire na Spreidhe',
  },
  {
    id: 40,
    name: 'Cac Carn Mor',
  },
  {
    id: 41,
    name: 'Sgurr nan Ceathramhnan',
  },
  {
    id: 42,
    name: 'Bidean nam Bian',
  },
  {
    id: 43,
    name: 'Ben Alder',
  },
  {
    id: 44,
    name: "Stob a' Choire Dhomhain",
  },
  {
    id: 45,
    name: 'Sgurr nan Ceathreamhnan West Top',
  },
  {
    id: 46,
    name: 'Bidean nam Bian West Top',
  },
  {
    id: 47,
    name: "Fiacaill a' Choire Chais",
  },
  {
    id: 48,
    name: 'Stob Coire Dhomhnuill',
  },
  {
    id: 49,
    name: 'Ben Avon North Tor',
  },
  {
    id: 50,
    name: 'Ben Avon West Top',
  },
  {
    id: 51,
    name: 'Geal-charn',
  },
  {
    id: 52,
    name: 'Ben Lui',
  },
  {
    id: 53,
    name: 'Sron Garbh',
  },
  {
    id: 54,
    name: 'Binnein Mor',
  },
  {
    id: 55,
    name: 'An Riabhachan',
  },
  {
    id: 56,
    name: 'Creag Meagaidh',
  },
  {
    id: 57,
    name: 'Ben Lui NW Top',
  },
  {
    id: 58,
    name: 'Ben Cruachan',
  },
  {
    id: 59,
    name: 'An Riabhachan NE Top',
  },
  {
    id: 60,
    name: 'Mullach Lochan nan Gabhar',
  },
  {
    id: 61,
    name: 'Meall Garbh',
  },
  {
    id: 62,
    name: 'Stob Coire na Ceannain',
  },
  {
    id: 63,
    name: "Beinn a' Ghlo - Carn nan Gabhar",
  },
  {
    id: 64,
    name: 'Clach Choutsaich',
  },
  {
    id: 65,
    name: 'Stob Choire Claurigh North Top',
  },
  {
    id: 66,
    name: 'Fiacaill Coire an t-Sneachda',
  },
  {
    id: 67,
    name: 'Carn Etchachan',
  },
  {
    id: 68,
    name: "A' Chraileag",
  },
  {
    id: 69,
    name: 'Stuc Gharbh Mhor',
  },
  {
    id: 70,
    name: 'Ben Avon South Tor',
  },
  {
    id: 71,
    name: 'An Stuc',
  },
  {
    id: 72,
    name: 'Creag Meagaidh East Top',
  },
  {
    id: 73,
    name: 'Stob Coire an Laoigh',
  },
  {
    id: 74,
    name: 'Sgor Gaoith',
  },
  {
    id: 75,
    name: 'Aonach Beag',
  },
  {
    id: 76,
    name: 'Stob Coire nan Lochan',
  },
  {
    id: 77,
    name: 'Stob Coire Easain',
  },
  {
    id: 78,
    name: 'Monadh Mor',
  },
  {
    id: 79,
    name: 'Sron Riach',
  },
  {
    id: 80,
    name: "Tom a' Choinnich",
  },
  {
    id: 81,
    name: 'Stuc Gharbh Mhor (old GR)',
  },
  {
    id: 82,
    name: 'Sgoran Dubh Mor',
  },
  {
    id: 83,
    name: "Carn a' Choire Bhoidheach",
  },
  {
    id: 84,
    name: 'Beinn Bhrotain East Top',
  },
  {
    id: 85,
    name: 'Ciste Dhubh',
  },
  {
    id: 86,
    name: 'Sgurr nan Conbhairean',
  },
  {
    id: 87,
    name: 'Sgurr Mor',
  },
  {
    id: 88,
    name: "Creagan a' Choire Etchachan",
  },
  {
    id: 89,
    name: "Meall a' Bhuiridh",
  },
  {
    id: 90,
    name: 'Stob Coire nam Beith',
  },
  {
    id: 91,
    name: 'Stob an t-Sluichd',
  },
  {
    id: 92,
    name: 'Caisteal',
  },
  {
    id: 93,
    name: "Stob a' Choire Mheadhoin",
  },
  {
    id: 94,
    name: "Stob a' Choire Leith",
  },
  {
    id: 95,
    name: 'Sron Bealach Beithe',
  },
  {
    id: 96,
    name: 'Beinn Eibhinn',
  },
  {
    id: 97,
    name: 'Stob Dearg',
  },
  {
    id: 98,
    name: 'Beinn Ghlas',
  },
  {
    id: 99,
    name: 'Stob Coire Bhealaich',
  },
  {
    id: 100,
    name: 'Mullach Fraoch-choire',
  },
];

export default staticLocations;
