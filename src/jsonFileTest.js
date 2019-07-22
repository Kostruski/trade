const fetchData = [
  {
    date: 1405699200,
    high: 0.0045388,
    low: 0.00403001,
    open: 0.00404545,
    close: 0.00435873,
    volume: 44.34555992,
    quoteVolume: 10311.88079097,
    weightedAverage: 0.00430043
  },
  {
    date: 1405713600,
    high: 0.00435,
    low: 0.00412,
    open: 0.00428012,
    close: 0.00412,
    volume: 19.12271662,
    quoteVolume: 4531.85801066,
    weightedAverage: 0.00421961
  },
  {
    date: 1405728000,
    high: 0.00435161,
    low: 0.00406,
    open: 0.00411473,
    close: 0.00435161,
    volume: 35.18169499,
    quoteVolume: 8430.50936646,
    weightedAverage: 0.00417313
  },
  {
    date: 1405742400,
    high: 0.00459,
    low: 0.0043418,
    open: 0.00435173,
    close: 0.00437,
    volume: 21.66886127,
    quoteVolume: 4839.66822966,
    weightedAverage: 0.00447734
  },
  {
    date: 1405756800,
    high: 0.00481,
    low: 0.004353,
    open: 0.004395,
    close: 0.0048,
    volume: 27.82215185,
    quoteVolume: 6030.09964751,
    weightedAverage: 0.00461387
  },
  {
    date: 1405771200,
    high: 0.005,
    low: 0.00449999,
    open: 0.00480001,
    close: 0.00456151,
    volume: 42.07775011,
    quoteVolume: 8939.84242503,
    weightedAverage: 0.00470676
  },
  {
    date: 1405785600,
    high: 0.00480258,
    low: 0.0044996,
    open: 0.00456152,
    close: 0.00456,
    volume: 31.62572444,
    quoteVolume: 6899.23074697,
    weightedAverage: 0.00458394
  },
  {
    date: 1405800000,
    high: 0.00486,
    low: 0.00440658,
    open: 0.00456,
    close: 0.00461299,
    volume: 25.39349312,
    quoteVolume: 5440.08231107,
    weightedAverage: 0.00466785
  },
  {
    date: 1405814400,
    high: 0.00473999,
    low: 0.00441991,
    open: 0.00462,
    close: 0.00441991,
    volume: 13.38329573,
    quoteVolume: 2962.41191331,
    weightedAverage: 0.0045177
  },
  {
    date: 1405828800,
    high: 0.00448074,
    low: 0.00426001,
    open: 0.0044199,
    close: 0.00435,
    volume: 17.12789699,
    quoteVolume: 3927.53152442,
    weightedAverage: 0.00436098
  },
  {
    date: 1405843200,
    high: 0.00455254,
    low: 0.00419,
    open: 0.00434999,
    close: 0.00435539,
    volume: 23.39336702,
    quoteVolume: 5429.98784936,
    weightedAverage: 0.00430818
  },
  {
    date: 1405857600,
    high: 0.00454822,
    low: 0.00415825,
    open: 0.00438736,
    close: 0.00416553,
    volume: 27.66542043,
    quoteVolume: 6397.37082615,
    weightedAverage: 0.00432449
  },
  {
    date: 1405872000,
    high: 0.00450668,
    low: 0.00416986,
    open: 0.00416986,
    close: 0.00441068,
    volume: 15.52004758,
    quoteVolume: 3571.7107093,
    weightedAverage: 0.00434527
  },
  {
    date: 1405886400,
    high: 0.00449488,
    low: 0.00407997,
    open: 0.00434509,
    close: 0.00429031,
    volume: 40.70823808,
    quoteVolume: 9422.74597047,
    weightedAverage: 0.0043202
  },
  {
    date: 1405900800,
    high: 0.00575001,
    low: 0.00423484,
    open: 0.00429167,
    close: 0.00468,
    volume: 125.77967637,
    quoteVolume: 25178.55993412,
    weightedAverage: 0.0049955
  },
  {
    date: 1405915200,
    high: 0.00495331,
    low: 0.00466568,
    open: 0.00473736,
    close: 0.00469995,
    volume: 17.7225888,
    quoteVolume: 3730.73037346,
    weightedAverage: 0.00475043
  },
  {
    date: 1405929600,
    high: 0.0047,
    low: 0.0046,
    open: 0.00469991,
    close: 0.00465988,
    volume: 17.27285318,
    quoteVolume: 3738.92204034,
    weightedAverage: 0.00461974
  },
  {
    date: 1405944000,
    high: 0.00484468,
    low: 0.004556,
    open: 0.00461001,
    close: 0.00470002,
    volume: 35.68157161,
    quoteVolume: 7658.69769939,
    weightedAverage: 0.00465896
  },
  {
    date: 1405958400,
    high: 0.00479,
    low: 0.0045001,
    open: 0.00470002,
    close: 0.00469547,
    volume: 22.37561163,
    quoteVolume: 4827.85879638,
    weightedAverage: 0.00463468
  },
  {
    date: 1405972800,
    high: 0.00514317,
    low: 0.00469547,
    open: 0.00469551,
    close: 0.00496999,
    volume: 73.82387208,
    quoteVolume: 14888.50369914,
    weightedAverage: 0.00495844
  },
  {
    date: 1405987200,
    high: 0.005497,
    low: 0.0049,
    open: 0.00501499,
    close: 0.0049842,
    volume: 70.68226735,
    quoteVolume: 13636.38167174,
    weightedAverage: 0.00518335
  },
  {
    date: 1406001600,
    high: 0.00512957,
    low: 0.00483,
    open: 0.0049842,
    close: 0.00505536,
    volume: 42.67366276,
    quoteVolume: 8662.5241774,
    weightedAverage: 0.00492623
  },
  {
    date: 1406016000,
    high: 0.00522222,
    low: 0.0049377,
    open: 0.005055,
    close: 0.00496,
    volume: 32.57474664,
    quoteVolume: 6443.20622815,
    weightedAverage: 0.00505567
  },
  {
    date: 1406030400,
    high: 0.00520011,
    low: 0.00485003,
    open: 0.00499,
    close: 0.00502572,
    volume: 49.96884711,
    quoteVolume: 9931.99766459,
    weightedAverage: 0.00503109
  },
  {
    date: 1406044800,
    high: 0.00537797,
    low: 0.00499,
    open: 0.00512,
    close: 0.00509,
    volume: 54.40822751,
    quoteVolume: 10624.06918107,
    weightedAverage: 0.00512122
  },
  {
    date: 1406059200,
    high: 0.00538,
    low: 0.00501,
    open: 0.00509,
    close: 0.00515242,
    volume: 66.37523518,
    quoteVolume: 12841.36261097,
    weightedAverage: 0.00516886
  },
  {
    date: 1406073600,
    high: 0.00532271,
    low: 0.004851,
    open: 0.00515231,
    close: 0.004909,
    volume: 46.23618238,
    quoteVolume: 9306.29158793,
    weightedAverage: 0.00496827
  },
  {
    date: 1406088000,
    high: 0.00537,
    low: 0.00451002,
    open: 0.004909,
    close: 0.00482097,
    volume: 117.74074338,
    quoteVolume: 24319.78193296,
    weightedAverage: 0.00484135
  },
  {
    date: 1406102400,
    high: 0.00492,
    low: 0.0046,
    open: 0.00485999,
    close: 0.00482156,
    volume: 24.63313582,
    quoteVolume: 5180.299116,
    weightedAverage: 0.00475515
  },
  {
    date: 1406116800,
    high: 0.00494999,
    low: 0.00464,
    open: 0.00482156,
    close: 0.00466,
    volume: 33.94252093,
    quoteVolume: 7097.76615685,
    weightedAverage: 0.00478214
  },
  {
    date: 1406131200,
    high: 0.0051878,
    low: 0.004501,
    open: 0.004654,
    close: 0.00480002,
    volume: 70.63015195,
    quoteVolume: 14612.01959405,
    weightedAverage: 0.0048337
  },
  {
    date: 1406145600,
    high: 0.004998,
    low: 0.00471001,
    open: 0.00480001,
    close: 0.00471001,
    volume: 20.26647051,
    quoteVolume: 4192.44807759,
    weightedAverage: 0.00483404
  },
  {
    date: 1406160000,
    high: 0.00483,
    low: 0.00463103,
    open: 0.00479938,
    close: 0.00463308,
    volume: 8.16425699,
    quoteVolume: 1728.2114925,
    weightedAverage: 0.0047241
  },
  {
    date: 1406174400,
    high: 0.00474333,
    low: 0.00463104,
    open: 0.00463534,
    close: 0.00463105,
    volume: 9.25888426,
    quoteVolume: 1990.58919442,
    weightedAverage: 0.00465132
  },
  {
    date: 1406188800,
    high: 0.00463106,
    low: 0.004269,
    open: 0.00463105,
    close: 0.0043,
    volume: 70.31446073,
    quoteVolume: 15784.37919349,
    weightedAverage: 0.00445468
  },
  {
    date: 1406203200,
    high: 0.004899,
    low: 0.004265,
    open: 0.0043,
    close: 0.00442,
    volume: 116.79936227,
    quoteVolume: 25230.97842462,
    weightedAverage: 0.0046292
  },
  {
    date: 1406217600,
    high: 0.00448212,
    low: 0.00415013,
    open: 0.00444527,
    close: 0.00415121,
    volume: 57.92876209,
    quoteVolume: 13564.01667601,
    weightedAverage: 0.00427076
  },
  {
    date: 1406232000,
    high: 0.00429205,
    low: 0.00377015,
    open: 0.00415553,
    close: 0.00393025,
    volume: 144.12760446,
    quoteVolume: 36047.33202914,
    weightedAverage: 0.00399828
  },
  {
    date: 1406246400,
    high: 0.0042,
    low: 0.00381779,
    open: 0.00394021,
    close: 0.0041,
    volume: 38.03940717,
    quoteVolume: 9445.53237367,
    weightedAverage: 0.00402723
  },
  {
    date: 1406260800,
    high: 0.0043,
    low: 0.00401075,
    open: 0.00406224,
    close: 0.004121,
    volume: 29.58010041,
    quoteVolume: 7031.18045261,
    weightedAverage: 0.00420698
  },
  {
    date: 1406275200,
    high: 0.004457,
    low: 0.004121,
    open: 0.004121,
    close: 0.00426538,
    volume: 38.82941558,
    quoteVolume: 8951.30109545,
    weightedAverage: 0.00433785
  },
  {
    date: 1406289600,
    high: 0.00445,
    low: 0.00409,
    open: 0.004382,
    close: 0.00418491,
    volume: 53.07769144,
    quoteVolume: 12644.64776974,
    weightedAverage: 0.00419764
  },
  {
    date: 1406304000,
    high: 0.0044,
    low: 0.0041,
    open: 0.0041671,
    close: 0.00421011,
    volume: 56.52849076,
    quoteVolume: 13469.26566779,
    weightedAverage: 0.00419685
  },
  {
    date: 1406318400,
    high: 0.00456,
    low: 0.0042101,
    open: 0.00428133,
    close: 0.00450001,
    volume: 39.52689354,
    quoteVolume: 8886.07287611,
    weightedAverage: 0.00444818
  },
  {
    date: 1406332800,
    high: 0.00459899,
    low: 0.00440876,
    open: 0.00453525,
    close: 0.00451099,
    volume: 24.64762502,
    quoteVolume: 5451.14721053,
    weightedAverage: 0.00452154
  },
  {
    date: 1406347200,
    high: 0.004779,
    low: 0.0044092,
    open: 0.00443525,
    close: 0.00445992,
    volume: 50.33233069,
    quoteVolume: 10927.16003762,
    weightedAverage: 0.00460616
  },
  {
    date: 1406361600,
    high: 0.00458524,
    low: 0.0044,
    open: 0.00445992,
    close: 0.0044,
    volume: 24.49095881,
    quoteVolume: 5524.32906015,
    weightedAverage: 0.00443329
  },
  {
    date: 1406376000,
    high: 0.00439999,
    low: 0.00423002,
    open: 0.00438,
    close: 0.00423006,
    volume: 12.92450092,
    quoteVolume: 3030.7169964,
    weightedAverage: 0.0042645
  },
  {
    date: 1406390400,
    high: 0.0046887,
    low: 0.00423168,
    open: 0.00425,
    close: 0.00456275,
    volume: 48.61658002,
    quoteVolume: 10688.5992339,
    weightedAverage: 0.00454845
  },
  {
    date: 1406404800,
    high: 0.0046,
    low: 0.00441,
    open: 0.00456275,
    close: 0.00442,
    volume: 14.80328236,
    quoteVolume: 3290.5668494,
    weightedAverage: 0.0044987
  },
  {
    date: 1406419200,
    high: 0.00442,
    low: 0.004346,
    open: 0.00442,
    close: 0.00439405,
    volume: 23.81869809,
    quoteVolume: 5422.7170631,
    weightedAverage: 0.00439239
  },
  {
    date: 1406433600,
    high: 0.00440285,
    low: 0.00422106,
    open: 0.00440199,
    close: 0.004222,
    volume: 34.13658326,
    quoteVolume: 7892.10084685,
    weightedAverage: 0.00432541
  },
  {
    date: 1406448000,
    high: 0.0043055,
    low: 0.00422107,
    open: 0.004222,
    close: 0.00422107,
    volume: 17.30396132,
    quoteVolume: 4085.49702143,
    weightedAverage: 0.00423546
  },
  {
    date: 1406462400,
    high: 0.00422111,
    low: 0.00410153,
    open: 0.00422107,
    close: 0.00421,
    volume: 24.1721793,
    quoteVolume: 5824.56577825,
    weightedAverage: 0.00415003
  },
  {
    date: 1406476800,
    high: 0.00440285,
    low: 0.00415,
    open: 0.00420484,
    close: 0.00430053,
    volume: 19.97557455,
    quoteVolume: 4696.31742371,
    weightedAverage: 0.00425345
  },
  {
    date: 1406491200,
    high: 0.00452,
    low: 0.00428811,
    open: 0.00436648,
    close: 0.00431,
    volume: 39.37170852,
    quoteVolume: 8881.77692121,
    weightedAverage: 0.00443286
  },
  {
    date: 1406505600,
    high: 0.00431,
    low: 0.004229,
    open: 0.00431,
    close: 0.004229,
    volume: 9.49935908,
    quoteVolume: 2229.17501417,
    weightedAverage: 0.00426137
  },
  {
    date: 1406520000,
    high: 0.0044,
    low: 0.00417,
    open: 0.004229,
    close: 0.00435,
    volume: 23.07816414,
    quoteVolume: 5425.3236874,
    weightedAverage: 0.00425378
  },
  {
    date: 1406534400,
    high: 0.00435728,
    low: 0.00423,
    open: 0.00435728,
    close: 0.00427957,
    volume: 23.18550829,
    quoteVolume: 5426.22407437,
    weightedAverage: 0.00427286
  },
  {
    date: 1406548800,
    high: 0.0045493,
    low: 0.00423051,
    open: 0.00428001,
    close: 0.00434817,
    volume: 52.72229275,
    quoteVolume: 11916.40047136,
    weightedAverage: 0.00442434
  },
  {
    date: 1406563200,
    high: 0.0044,
    low: 0.0043,
    open: 0.00437288,
    close: 0.00439017,
    volume: 23.30260575,
    quoteVolume: 5371.44833328,
    weightedAverage: 0.00433823
  },
  {
    date: 1406577600,
    high: 0.00462053,
    low: 0.00435524,
    open: 0.00435524,
    close: 0.00462053,
    volume: 55.93770492,
    quoteVolume: 12411.03019366,
    weightedAverage: 0.00450709
  },
  {
    date: 1406592000,
    high: 0.004719,
    low: 0.00432,
    open: 0.0046,
    close: 0.00458001,
    volume: 111.41063389,
    quoteVolume: 24377.16414634,
    weightedAverage: 0.00457028
  },
  {
    date: 1406606400,
    high: 0.0049998,
    low: 0.0045,
    open: 0.00458636,
    close: 0.00465082,
    volume: 78.9277376,
    quoteVolume: 16740.26759619,
    weightedAverage: 0.00471484
  },
  {
    date: 1406620800,
    high: 0.0048,
    low: 0.0046,
    open: 0.00465082,
    close: 0.00470688,
    volume: 24.40220524,
    quoteVolume: 5206.08837634,
    weightedAverage: 0.00468724
  },
  {
    date: 1406635200,
    high: 0.00480001,
    low: 0.00464,
    open: 0.00472998,
    close: 0.00471199,
    volume: 33.34783522,
    quoteVolume: 7107.85917442,
    weightedAverage: 0.00469168
  },
  {
    date: 1406649600,
    high: 0.00481969,
    low: 0.004579,
    open: 0.00471199,
    close: 0.00467801,
    volume: 39.19837902,
    quoteVolume: 8345.70763276,
    weightedAverage: 0.00469683
  },
  {
    date: 1406664000,
    high: 0.00470543,
    low: 0.004403,
    open: 0.00469603,
    close: 0.00446497,
    volume: 37.76834328,
    quoteVolume: 8304.84751712,
    weightedAverage: 0.00454774
  },
  {
    date: 1406678400,
    high: 0.00450078,
    low: 0.00434001,
    open: 0.00446497,
    close: 0.0043853,
    volume: 15.00269719,
    quoteVolume: 3417.0275239,
    weightedAverage: 0.00439056
  },
  {
    date: 1406692800,
    high: 0.00449899,
    low: 0.00437665,
    open: 0.00438531,
    close: 0.00442931,
    volume: 5.91705394,
    quoteVolume: 1331.00209609,
    weightedAverage: 0.00444556
  },
  {
    date: 1406707200,
    high: 0.004451,
    low: 0.00434002,
    open: 0.00442931,
    close: 0.00434002,
    volume: 11.74056553,
    quoteVolume: 2691.3130405,
    weightedAverage: 0.00436239
  },
  {
    date: 1406721600,
    high: 0.00450081,
    low: 0.00433,
    open: 0.00434002,
    close: 0.00440271,
    volume: 27.08150425,
    quoteVolume: 6154.46276267,
    weightedAverage: 0.0044003
  },
  {
    date: 1406736000,
    high: 0.00452033,
    low: 0.004371,
    open: 0.00442034,
    close: 0.00451666,
    volume: 18.7042663,
    quoteVolume: 4175.72069019,
    weightedAverage: 0.00447929
  },
  {
    date: 1406750400,
    high: 0.004599,
    low: 0.004441,
    open: 0.00447359,
    close: 0.00444725,
    volume: 15.14366494,
    quoteVolume: 3352.04174851,
    weightedAverage: 0.00451774
  },
  {
    date: 1406764800,
    high: 0.00449538,
    low: 0.00439,
    open: 0.00444687,
    close: 0.00442911,
    volume: 16.73224671,
    quoteVolume: 3769.61142361,
    weightedAverage: 0.00443871
  },
  {
    date: 1406779200,
    high: 0.00464,
    low: 0.0044179,
    open: 0.00442911,
    close: 0.00445009,
    volume: 24.65874708,
    quoteVolume: 5388.57553082,
    weightedAverage: 0.00457611
  },
  {
    date: 1406793600,
    high: 0.00458887,
    low: 0.00445,
    open: 0.00445009,
    close: 0.00445004,
    volume: 21.02292436,
    quoteVolume: 4699.52729726,
    weightedAverage: 0.00447341
  },
  {
    date: 1406808000,
    high: 0.0045,
    low: 0.004411,
    open: 0.00445004,
    close: 0.00442466,
    volume: 31.48658932,
    quoteVolume: 7101.00495536,
    weightedAverage: 0.0044341
  },
  {
    date: 1406822400,
    high: 0.00444681,
    low: 0.00434002,
    open: 0.00441294,
    close: 0.0044,
    volume: 23.50610681,
    quoteVolume: 5350.97594223,
    weightedAverage: 0.00439286
  }
];

const chartData1Style = {
    color: "red",
    domain: { x: [0, 80], y: [0, 100] },
    labelText: "this is lorem chart",
    bigTextH1: "Description Title",
    bigTextP: "additional description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis impedit pariatur velit earum consequuntur nostrum odit animi sed doloremque sit, suscipit necessitatibus quod deserunt? Molestiae quo corporis omnis fuga.",
    chartTitle: "Chart Title"
}



// const x = Date(data[0].date); //43
// console.log(x)
// const y = x.split(" ");
// const dates = y.splice(1,3).join("-")
// console.log(dates);

//  const data = fetchData.map(el => ({date: Date(el.date).split(" ").splice(1,4).join("-"), open: Math.round(el.open*10000)
// const data = fetchData.map(el => ({date: Date(el.date)}))
const dataSource1 = fetchData.map((el, i) => ({
  x: i,
  y: Math.round(el.open * 10000)
}));
const dataSource2 = fetchData.map((el, i) => ({
  x: i,
  y: Math.round(el.open * 10000 * Math.random())
}));


export { dataSource1 };
export { dataSource2 };
export { chartData1Style };
// export { chartData2Style };




