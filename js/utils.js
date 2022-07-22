const setSize = (num) => {
  var fontSize = document.documentElement.style.fontSize.split("px")[0];
  if (fontSize) {
    const scale = document.documentElement.clientWidth / 1080;
    return scale * num;
  } else {
    return num;
  }
};

const setColor = (a, b, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => {
  return new echarts.graphic.LinearGradient(x1, y1, x2, y2, [
    {
      offset: 0,
      color: a,
    },
    {
      offset: 1,
      color: b,
    },
  ]);
};

const rand = () => (Math.random() * 26 + 10).toFixed(0);
const creatId = () => {
  const d = new Date().getTime();
  return `chart${d.toString(rand())}${Math.random().toString(rand()).slice(2)}`;
};

const initLineChart = (data, callBack) => {
  let options = data.options || {};
  const font = {
    color: "#8F9FB3",
    fontSize: setSize(29),
    fontweight: 400,
  };

  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }
  let option = {
    color: options.color || [
      "#5BB1FC",
      "#FFB461",
      "#7B77F2",
      "#006cff",
      "#5b5b5b",
      "#6ec6c9",
    ],
    title: options.title,
    grid: {
      left: options.left || "2%",
      bottom: options.bottom || setSize(10),
      right: options.right || "1%",
      top: options.top || setSize(80),
      containLabel: true,
    },
    legend: {
      top: 0,
      left: "center",
      icon: "rect",
      itemGap: setSize(35),
      itemWidth: setSize(23),
      itemHeight: setSize(23),
      textStyle: {
        ...font,
      },
      ...options.legend,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        ...font,
      },
    },
    xAxis: {
      type: "category",
      data: data.xAxis,
      name: options.xAxisName,
      nameTextStyle: {
        verticalAlign: "bottom",
        padding: [0, 0, setSize(-16), 0],
      },
      axisLabel: {
        ...font,
        formatter: options.axisLabel,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#8F9FB3",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        name: options.unit,
        nameGap: setSize(36),
        nameTextStyle: {
          ...font,
          padding: [0, setSize(70), 0, 0],
        },
        axisLabel: {
          ...font,
          formatter: (n) => {
            return n;
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
            type: "dotted",
            color: "rgba(143, 159, 179, .3)",
          },
        },
      },
      {
        type: "value",
        name: options.unit1,
        nameGap: setSize(36),
        nameTextStyle: {
          ...font,
          padding: [0, 0, 0, setSize(70)],
        },
        axisLabel: {
          ...font,
          formatter: (n) => {
            return n;
          },
        },
        splitLine: {
          lineStyle: {
            width: 1,
            type: "dotted",
            color: "rgba(143, 159, 179, .3)",
          },
        },
      },
    ],
    series: data.series,
  };
  myChart.setOption(option, true);

  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });

  if (callBack) {
    myChart.on("legendselectchanged", (params) => {
      callBack(params.name);
    });
  }
};

const initBarChart = (data) => {
  let options = data.options || {};
  const font = {
    color: "rgba(102, 102, 102, 1)",
    fontSize: setSize(35),
    fontweight: 400,
  };
  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }
  let option = {
    color: options.color || [
      "#5BB1FC",
      "#FFB461",
      "#7B77F2",
      "#006cff",
      "#5b5b5b",
      "#6ec6c9",
    ],
    title: options.title,
    grid: {
      left: options.left || "2%",
      bottom: options.bottom || setSize(10),
      right: options.right || "1%",
      top: options.top || setSize(80),
      containLabel: true,
    },
    legend: {
      top: 0,
      left: "center",
      icon: "rect",
      itemGap: setSize(35),
      itemWidth: setSize(23),
      itemHeight: setSize(23),
      textStyle: {
        ...font,
      },
      ...options.legend,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        ...font,
      },
    },
    xAxis: {
      type: "value",
      name: options.xAxisName,
      nameTextStyle: {
        verticalAlign: "bottom",
        padding: [0, 0, setSize(-16), 0],
      },
      axisLabel: {
        ...font,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "category",
        name: options.unit,
        nameGap: setSize(36),
        nameTextStyle: {
          ...font,
          padding: [0, setSize(70), 0, 0],
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          ...font,
          formatter: (n) => {
            return n;
          },
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: data.xAxis,
      },
    ],
    series: data.series,
  };
  myChart.setOption(option, true);
  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};

const initPieChart = (data, callBack) => {
  let options = data.options || {};
  const font = {
    color: "#8F9FB3",
    fontSize: setSize(29),
    fontweight: 400,
  };
  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }

  let option = {
    color: options.color || [
      "rgba(11, 139, 251, 1)",
      "rgba(108, 208, 255, 1)",
      "rgba(71, 222, 146, 1)",
      "rgba(255, 180, 97, 1)",
      "rgba(122, 118, 241, 1)",
    ],
    title: [
      {
        left: "center",
        top: options.top || "34%",
        z: 99,
        text: options.total.value + (options.total.unit || ""),
        itemGap: setSize(8),
        textStyle: {
          color: "rgba(60, 128, 242, 1)",
          fontSize: setSize(69),
        },
        subtext: options.total.name,
        subtextStyle: {
          color: "rgba(102, 102, 102, 1)",
          fontSize: setSize(35),
          lineHeight: setSize(40),
        },
      },
    ],
    tooltip: {
      trigger: "item",
      textStyle: {
        ...font,
      },
    },
    series: [
      {
        type: "pie",
        radius: options.radius || ["50%", "72%"],
        center: ["50%", "50%"],
        data: data.series,
        showEmptyCircle: true,
        label: {
          show: options.label,
        },
      },
    ],
  };
  myChart.setOption(option, true);
  callBack(myChart);
  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};

const initGaugeChart = (data) => {
  let options = data.options || {};
  const font = {
    color: "rgba(143, 159, 179, 1)",
    fontSize: setSize(29),
    fontweight: 400,
  };

  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }

  let value = 0;
  if (options.pie) {
    value = data.value >= 170 ? 170 : data.value;
  }
  let option = {
    title: [
      {
        text: data.value,
        top: "40%",
        left: "center",
        itemGap: setSize(6),
        textStyle: {
          fontSize: setSize(80),
          color: "rgba(60, 128, 242, 1)",
          fontWeight: "bold",
        },
        subtext: options.unit,
        subtextStyle: {
          fontSize: setSize(29),
          color: "rgba(102, 102, 102, 1)",
        },
      },
      {
        show: options.pie,
        text: "Y辐射空气吸收\n剂量率均值",
        top: "64%",
        left: "center",
        textStyle: {
          fontSize: setSize(35),
          color: "rgba(102, 102, 102, 1)",
        },
      },
    ],
    series: [
      {
        type: "gauge",
        radius: "88%",
        center: ["50%", "60%"],
        min: options.max ? 50 : 0,
        max: options.max || 300,
        splitNumber: 6,
        startAngle: 210,
        endAngle: -30,
        axisLine: {
          lineStyle: {
            color: [[1, "rgba(80, 144, 255, 1)"]],
            width: 1,
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: data.value,
          },
        ],
      },
      {
        type: "gauge",
        radius: "80%",
        center: ["50%", "60%"],
        min: options.max ? 50 : 0,
        max: options.max || 300,
        splitNumber: options.splitNumber || 6,
        startAngle: 210,
        endAngle: -30,
        axisLine: {
          lineStyle: {
            width: setSize(50),
            color: [
              [1 / 6, "rgba(98, 240, 98, 1)"],
              [2 / 6, "rgba(246, 227, 65, 1)"],
              [3 / 6, "rgba(236, 134, 35, 1)"],
              [4 / 6, "rgba(226, 91, 38, 1)"],
              [5 / 6, "rgba(208, 56, 56, 1)"],
              [1, "rgba(208, 19, 50, 1)"],
            ],
          },
        },
        pointer: {
          show: !options.pie || false,
          offsetCenter: ["-20%", 0],
          length: "70%",
          itemStyle: {
            color: "rgba(204, 204, 204, 1)",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          // show: false,
          distance: setSize(-90),
          length: setSize(16),
          lineStyle: {
            color: "rgba(80, 144, 255, 1)",
            width: 1,
          },
        },
        axisLabel: {
          ...font,
          distance: setSize(-20),
        },
        detail: {
          valueAnimation: true,
          formatter: () => {
            return data.label;
          },
          color: options.color || "inherit",
          fontSize: setSize(40),
          backgroundColor: "rgba(240, 240, 240, 1)",
          borderRadius: setSize(14),
          // padding: [setSize(13), setSize(50)]
          width: setSize(140),
          height: setSize(58),
          offsetCenter: [0, "72%"],
        },
        data: [
          {
            value: data.value,
          },
        ],
      },
    ],
  };

  if (options.pie) {
    option.series[1].axisLine.lineStyle.color = [
      [
        value / options.max,
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(72, 167, 73, 1)",
          },
          {
            offset: value > 110 > 0.5 ? 0.5 : 1,
            color: "rgba(254, 196, 88, 1)",
          },
          {
            offset: 1,
            color: "rgba(232, 82, 83, 1)",
          },
        ]),
      ],
      [1, "rgba(229, 229, 229, 1)"],
    ];
  }

  myChart.setOption(option, true);

  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};

const initLiquidfillChart = (data) => {
  let options = data.options || {};
  const font = {
    color: "rgba(255, 255, 255, 1)",
    fontSize: setSize(80),
    fontweight: 400,
  };

  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }
  let option = {
    title: {
      text: "水质指数",
      bottom: "30%",
      left: "center",
      textStyle: {
        fontSize: setSize(35),
        color: "rgba(255, 255, 255, 1)",
      },
    },
    series: [
      {
        type: "liquidFill",
        radius: "80%",
        data: [data.value],
        label: {
          color: "#fff",
          insideColor: "transparent",
          formatter: () => {
            return data.value;
          },
          textStyle: {
            ...font,
            fontWeight: "bold",
          },
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: "rgba(230, 230, 230, 1)",
            borderWidth: 1,
          },
        },
        itemStyle: {
          color: setColor("rgba(69, 159, 247, 1)", "rgba(39, 201, 250, 1)"),
        },
        backgroundStyle: {
          color: "rgba(225, 247, 255, 1)",
        },
      },
    ],
  };

  myChart.setOption(option, true);

  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};

const map = (data) => {
  console.log(data);
  let options = data.options || {};
  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }
  var domImgHover = document.createElement("img");
  domImgHover.style.height =
    domImgHover.height =
    domImgHover.width =
    domImgHover.style.width =
      "8px";
  domImgHover.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII=";

  let geoCoordMapJSON = handeshenJson();
  let geoCoordMap = {
    东城区: [116.418757, 39.917544],
    西城区: [116.366794, 39.915309],
    朝阳区: [116.486409, 39.921489],
    丰台区: [116.286968, 39.863642],
    石景山区: [116.195445, 39.914601],
    海淀区: [116.310316, 39.956074],
    门头沟区: [116.105381, 39.937183],
    房山区: [116.139157, 39.735535],
    通州区: [116.658603, 39.902486],
    顺义区: [116.653525, 40.128936],
    昌平区: [116.235906, 40.218085],
    大兴区: [116.338033, 39.728908],
    怀柔区: [116.637122, 40.324272],
    平谷区: [117.112335, 40.144783],
    密云区: [116.843352, 40.377362],
    延庆区: [115.985006, 40.465325],
  };
  echarts.registerMap("beijing", geoCoordMapJSON);
  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  console.log(convertData(data.data));
  let option = {
    grid: {},
    tooltip: {
      backgroundColor: "rgba(2, 19, 24, 1)",
      className: "map-tooltip",
      textStyle: {
        fontSize: 30,
        color: "#fff",
      },
      formatter: (n) => {
        console.log(n);
        return `<div><p class="title">${
          n.name
        }</p><p><span>总设备: </span><span>0</span></p><p><span>在线: </span><span>${
          n.value || 0
        }</span></p><p><span>离线: </span><span>0</span></p></div>`;
      },
    },
    geo: {
      map: "beijing",
      aspectScale: 1,
      layoutCenter: ["50%", "50%"],
      layoutSize: "105%",
      itemStyle: {
        normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E",
              },
              {
                offset: 1,
                color: "#0673AD",
              },
            ],
            global: true,
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        },
        emphasis: {
          areaColor: "#0f5d9d",
        },
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            normal: {
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
            },
          },
          label: {
            show: true,
            color: "#FFFFFF",
            fontSize: 28,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        mapType: "beijing",
        aspectScale: 1,
        layoutCenter: ["50%", "50%"],
        zoom: 1,
        scaleLimit: {
          min: 1,
          max: 2,
        },
        emphasis: {
          itemStyle: {
            areaColor: {
              image: domImgHover,
              repeat: 'repeat',
          },
            borderColor: "#2ab8ff",
            borderWidth: 1,
            shadowColor: "rgba(0, 255, 255, 0.7)",
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 1,
            label: {
              show: false,
            },
          },
          label: {
            color: "#fff",
          },
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 28,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },

        data: data.data,
      },
      {
        name: "散点",
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: {
          brushType: "fill",
        },
        itemStyle: {
          normal: {
            color: "#1cccff",
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
        data: convertData(data.data),

        symbolSize: function (val) {
          return 2 * val[2];
        },
        showEffectOn: "render",
      },
    ],
  };

  myChart.setOption(option, true, 0);

  let index = 0;
  const autoTooltip = () => {
    console.log(data.data.length);
    setTimeout(function () {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      if (index >= data.data.length) {
        index = 0;
      }
      autoTooltip();
    }, 1000);
  };

  autoTooltip();

  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};
