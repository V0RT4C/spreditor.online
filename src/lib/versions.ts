export const isValidDATFile = (signature : string) => versions.filter((v) => v.dat === signature.toUpperCase() ).length > 0;
export const isValidSPRFile = (signature : string) => versions.filter((v) => v.spr === signature.toUpperCase() ).length > 0;

export const getInfoFromDATSignature = (signature : string) => { 
    const filtered = versions.filter((v) => v.dat === signature.toUpperCase());
    if (filtered.length > 0){
        return filtered;
    }else{
        return null;
    }
}

export const getInfoFromSPRSignature = (signature : string) => { 
    const filtered = versions.filter((v) => v.spr === signature.toUpperCase());
    if (filtered.length > 0){
        return filtered;
    }else{
        return null;
    }
}

export const versions = [
    {
        value: 700,
        string: "7.00",
        dat: "unknown",
        spr: "3D6D5CA3",
        otb: "0"
    },
    {
        value: 710,
        string: "7.10",
        dat: "3DFF4B2A",
        spr: "3DFF4AEB",
        otb: "0"
    },
    {
        value: 730,
        string: "7.30",
        dat: "411A6233",
        spr: "411A6279",
        otb: "0"
    },
    {
        value: 740,
        string: "7.40",
        dat: "41BF619C",
        spr: "41B9EA86",
        otb: "1"
    },
    {
        value: 750,
        string: "7.50",
        dat: "42F81973",
        spr: "42F81949",
        otb: "1"  
    },
    {
        value: 755,
        string: "7.55",
        dat: "437B2B8F",
        spr: "434F9CDE",
        otb: "2"
    },
    {
        value: 760,
        string: "7.60",
        dat: "439D5A33",
        spr: "439852BE",
        otb: "3"
    },
    {
        value: 770,
        string: "7.70",
        dat: "439D5A33",
        spr: "439852BE",
        otb: "3"
    },
    {
        value: 780,
        string: "7.80",
        dat: "44CE4743",
        spr: "44CE4206",
        otb: "4"
    },
    {
        value: 790,
        string: "7.90",
        dat: "457D854E",
        spr: "457957C8",
        otb: "5"
    },
    {
        value: 792,
        string: "7.92",
        dat: "459E7B73",
        spr: "45880FE8",
        otb: "6"  
    },
    {
        value: 800,
        string: "8.00",
        dat: "467FD7E6",
        spr: "467F9E74",
        otb: "7"
    },
    {
        value: 810,
        string: "8.10",
        dat: "475D3747",
        spr: "475D0B01",
        otb: "8"
    },
    {
        value: 811,
        string: "8.11",
        dat: "47F60E37",
        spr: "47EBB9B2",
        otb: "9"
    },
    {
        value: 820,
        string: "8.20",
        dat: "486905AA",
        spr: "4868ECC9",
        otb: "10"
    },
    {
        value: 830,
        string: "8.30",
        dat: "48DA1FB6",
        spr: "48C8E712",
        otb: "11"  
    },
    {
        value: 840,
        string: "8.40",
        dat: "493D607A",
        spr: "493D4E7C",
        otb: "12"
    },
    {
        value: 841,
        string: "8.41",
        dat: "49B7CC19",
        spr: "49B140EA",
        otb: "13"
    },
    {
        value: 842,
        string: "8.42",
        dat: "49C233C9",
        spr: "49B140EA",
        otb: "14"
    },
    {
        value: 850,
        string: "8.50 v1",
        dat: "4A49C5EB",
        spr: "4A44FD4E",
        otb: "15"
    },
    {
        value: 850,
        string: "8.50 v2",
        dat: "4A4CC0DC",
        spr: "4A44FD4E",
        otb: "15"
    },
    {
        value: 850,
        string: "8.50 v3",
        dat: "4AE97492",
        spr: "4ACB5230",
        otb: "15"
    },
    {
        value: 852,
        string: "8.52",
        dat: "4A4CC0DC",
        spr: "4A44FD4E",
        otb: "0"
    },
    {
        value: 853,
        string: "8.53",
        dat: "4AE97492",
        spr: "4ACB5230",
        otb: "0"
    },
    {
        value: 854,
        string: "8.54 v1",
        dat: "4B1E2CAA",
        spr: "4B1E2C87",
        otb: "16"
    },
    {
        value: 854,
        string: "8.54 v2",
        dat: "4B0D46A9",
        spr: "4B0D3AFF",
        otb: "16"
    },
    {
        value: 854,
        string: "8.54 v3",
        dat: "4B28B89E",
        spr: "4B1E2C87",
        otb: "17"
    },
    {
        value: 855,
        string: "8.55",
        dat: "4B98FF53",
        spr: "4B913871",
        otb: "18"
    },
    {
        value: 860,
        string: "8.60 v1",
        dat: "4C28B721",
        spr: "4C220594",
        otb: "19"
    },
    {
        value: 860,
        string: "8.60 v2",
        dat: "4C2C7993",
        spr: "4C220594",
        otb: "20"
    },
    {
        value: 861,
        string: "8.61",
        dat: "4C6A4CBC",
        spr: "4C63F145",
        otb: "21"
    },
    {
        value: 862,
        string: "8.62",
        dat: "4C973450",
        spr: "4C63F145",
        otb: "22"
    },
    {
        value: 870,
        string: "8.70",
        dat: "4CFE22C5",
        spr: "4CFD078A",
        otb: "23"
    },
    {
        value: 871,
        string: "8.71",
        dat: "4D41979E",
        spr: "4D3D65D0",
        otb: "24"
    },
    {
        value: 872,
        string: "8.72",
        dat: "4DAD1A1A",
        spr: "4DAD1A32",
        otb: "25"
    },
    {
        value: 900,
        string: "9.00",
        dat: "4DBAA20B",
        spr: "4DAD1A32",
        otb: "27"
    },
    {
        value: 910,
        string: "9.10",
        dat: "4E12DAFF",
        spr: "4E12DB27",
        otb: "28"
    },
    {
        value: 920,
        string: "9.20",
        dat: "4E807C08",
        spr: "4E807C23",
        otb: "29"
    },
    {
        value: 940,
        string: "9.40",
        dat: "4EE71DE5",
        spr: "4EE71E06",
        otb: "30"
    },
    {
        value: 944,
        string: "9.44 v0",
        dat: "4F0EEFBB",
        spr: "4F0EEFEF",
        otb: "31"
    },
    {
        value: 944,
        string: "9.44 v1",
        dat: "4F105168",
        spr: "4F1051D7",
        otb: "32"
    },
    {
        value: 944,
        string: "9.44 v2",
        dat: "4F16C0D7",
        spr: "4F1051D7",
        otb: "33"
    },
    {
        value: 944,
        string: "9.44 v3",
        dat: "4F3131CF",
        spr: "4F3131F6",
        otb: "34"
    },
    {
        value: 946,
        string: "9.46",
        dat: "4F75B7AB",
        spr: "4F5DCEF7",
        otb: "35"
    },
    {
        value: 950,
        string: "9.50",
        dat: "4F75B7AB",
        spr: "4F75B7CD",
        otb: "36"
    },
    {
        value: 952,
        string: "9.52",
        dat: "4F857F6C",
        spr: "4F857F8E",
        otb: "37"
    },
    {
        value: 953,
        string: "9.53",
        dat: "4FA11252",
        spr: "4FA11282",
        otb: "38"
    },
    {
        value: 954,
        string: "9.54",
        dat: "4FD5956B",
        spr: "4FD595B7",
        otb: "39"
    },
    {
        value: 960,
        string: "9.60",
        dat: "4FFA74CC",
        spr: "4FFA74F9",
        otb: "40"
    },
    {
        value: 961,
        string: "9.61",
        dat: "50226F9D",
        spr: "50226FBD",
        otb: "41"
    },
    {
        value: 963,
        string: "9.63",
        dat: "503CB933",
        spr: "503CB954",
        otb: "42"
    },
    {
        value: 970,
        string: "9.70",
        dat: "5072A490",
        spr: "5072A567",
        otb: "43"
    },
    {
        value: 980,
        string: "9.80",
        dat: "50C70674",
        spr: "50C70753",
        otb: "44"
    },
    {
        value: 981,
        string: "9.81",
        dat: "50D1C5B6",
        spr: "50D1C685",
        otb: "45"
    },
    {
        value: 982,
        string: "9.82",
        dat: "512CAD09",
        spr: "512CAD68",
        otb: "46"
    },
    {
        value: 983,
        string: "9.83",
        dat: "51407B67",
        spr: "51407BC7",
        otb: "47"
    },
    {
        value: 985,
        string: "9.85",
        dat: "51641A1B",
        spr: "51641A84",
        otb: "48"
    },
    {
        value: 986,
        string: "9.86",
        dat: "5170E904",
        spr: "5170E96F",
        otb: "49"
    },
    {
        value: 1010,
        string: "10.10",
        dat: "51E3F8C3",
        spr: "51E3F8E9",
        otb: "50"
    },
    {
        value: 1020,
        string: "10.20",
        dat: "5236F129",
        spr: "5236F14F",
        otb: "51"
    },
    {
        value: 1021,
        string: "10.21",
        dat: "526A5068",
        spr: "526A5090",
        otb: "52"
    },
    {
        value: 1030,
        string: "10.30",
        dat: "52A59036",
        spr: "52A5905F",
        otb: "53"
    },
    {
        value: 1031,
        string: "10.31",
        dat: "52AED581",
        spr: "52AED5A7",
        otb: "54"
    },
    {
        value: 1032,
        string: "10.32",
        dat: "52D8D0A9",
        spr: "52D8D0CE",
        otb: "0"
    },
    {
        value: 1034,
        string: "10.34",
        dat: "52E74AB5",
        spr: "52E74ADA",
        otb: "0"
    },
    {
        value: 1035,
        string: "10.35",
        dat: "52FDFC2C",
        spr: "52FDFC54",
        otb: "55"
    },
    {
        value: 1036,
        string: "10.36",
        dat: "53159C7E",
        spr: "53159CA9",
        otb: "0"
    },
    {
        value: 1037,
        string: "10.37",
        dat: "531EA82E",
        spr: "531EA856",
        otb: "0"
    },
    {
        value: 1038,
        string: "10.38",
        dat: "5333C199",
        spr: "5333C1C3",
        otb: "0"
    },
    {
        value: 1039,
        string: "10.39",
        dat: "535A50AD",
        spr: "535A50D5",
        otb: "0"
    },
    {
        value: 1040,
        string: "10.40",
        dat: "5379984D",
        spr: "53799876",
        otb: "0"
    },
    {
        value: 1041,
        string: "10.41",
        dat: "5383504E",
        spr: "53835077",
        otb: "0"
    },
    {
        value: 1050,
        string: "10.50",
        dat: "53B6460E",
        spr: "53B64639",
        otb: "0"
    },
    {
        value: 1051,
        string: "10.51",
        dat: "53C8CC17",
        spr: "53C8CC3F",
        otb: "0"
    },
    {
        value: 1052,
        string: "10.52",
        dat: "53E898BD",
        spr: "53E898E5",
        otb: "0"
    },
    {
        value: 1053,
        string: "10.53",
        dat: "53FAD76E",
        spr: "53FAD799",
        otb: "0"
    },
    {
        value: 1054,
        string: "10.54",
        dat: "540D3A47",
        spr: "53E898E5",
        otb: "0"
    },
    {
        value: 1055,
        string: "10.55",
        dat: "54128727",
        spr: "54128755",
        otb: "0"
    },
    {
        value: 1056,
        string: "10.56",
        dat: "542143B0",
        spr: "542143DE",
        otb: "0"
    }
]