const setSize = (num) => {
  let fontSize = document.documentElement.style.fontSize.split("px")[0];
  if (fontSize) {
    const scale = document.documentElement.clientWidth / 1920;
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
    color: "#fff",
    fontSize: setSize(16),
    fontweight: 400,
    fontFamily: "Alibaba",
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
      bottom: options.bottom || setSize(0),
      right: options.right || "1%",
      top: options.top || setSize(50),
      containLabel: true,
    },
    legend: {
      top: 0,
      left: "center",
      icon: "rect",
      itemGap: setSize(10),
      itemWidth: setSize(10),
      itemHeight: setSize(10),
      textStyle: {
        ...font,
      },
      ...options.legend,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.7)",

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
        nameGap: setSize(16),
        nameTextStyle: {
          ...font,
          padding: [0, setSize(-40), 0, 0],
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
        nameGap: setSize(16),
        nameTextStyle: {
          ...font,
          padding: [0, 0, 0, setSize(-40)],
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

  let index = 0,
    timer = null;

  const autoTooltip = () => {
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index,
    });
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    clearTimeout(timer);
    timer = setTimeout(function () {
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      if (index >= data.xAxis.length) {
        index = 0;
      }
      autoTooltip();
    }, 1000);
  };

  autoTooltip();

  myChart.on("mousemove", "series", (n) => {
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index,
    });
    clearTimeout(timer);
  });
  // myChart.getZr().on("mousemove", 'series', (param) => {
  //   if (param.event) {

  //   }
  //   clearTimeout(timer)
  // });
  myChart.on("globalout", "series", (n) => {
    autoTooltip();
  });
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
    color: "rgba(28, 204, 255, 1)",
    fontSize: setSize(25),
    fontweight: 400,
    fontFamily: "LCD",
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
      right: options.right || "4%",
      top: options.top || setSize(10),
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

const initTransverseBarChart = (data, callBack) => {
  let options = data.options || {},
    barWidth = 20;
  const font = {
    color: "rgba(102, 102, 102, 1)",
    fontSize: setSize(20),
    fontweight: 400,
  };

  const circle = {
    color: "#fff",
    width: setSize(22),
    height: setSize(22),
    lineHeight: setSize(76),
    fontSize: setSize(20),
    align: "center",
    verticalAlign: "top",
    borderRadius: setSize(22),
    fontFamily: "LCD",
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
      left: options.left || "3%",
      bottom: options.bottom || setSize(0),
      right: options.right || "2%",
      top: options.top || setSize(40),
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
    // tooltip: {},
    xAxis: {
      type: "value",
      name: options.xAxisName,
      max: options.max || null,
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
        inverse: true,
        offset: setSize(-10),
        position: "left",
        nameTextStyle: {
          ...font,
          padding: [0, setSize(60), 0, 0],
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          align: "left",
          formatter: (n, index) => {
            let idx = data.num + index + 1;
            if (idx <= 5) {
              return `{nt${idx}|${idx}}{text|${n}}`;
            } else {
              return `{nt|${idx}}{text|${n}}`;
            }
          },
          rich: {
            text: {
              fontFamily: "Alibaba",
              color: "#fff",
              align: "left",
              height: setSize(20),
              fontSize: setSize(20),
              padding: [setSize(-55), 0, 0, setSize(5)],
            },
            nt1: {
              backgroundColor: "rgba(73, 223, 255, .6)",
              ...circle,
            },
            nt2: {
              backgroundColor: "rgba(251, 205, 80, .6)",
              ...circle,
            },
            nt3: {
              backgroundColor: "rgba(71, 222, 146, .6)",
              ...circle,
            },
            nt4: {
              backgroundColor: "rgba(24, 239, 242, .6)",
              ...circle,
            },
            nt5: {
              backgroundColor: "rgba(60, 128, 242, .6)",
              ...circle,
            },
            nt: {
              backgroundColor: "rgba(28, 204, 255, .6)",
              ...circle,
            },
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
      {
        type: "category",
        inverse: true,
        offset: options.unit ? setSize(-470) : setSize(-210),
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: (n) => {
            return `{num|${n}}{unit|${options.unit || ""}}`;
          },
          rich: {
            num: {
              color: "rgba(28, 204, 255, 1)",
              align: "right",
              width: setSize(200),
              verticalAlign: "top",
              fontSize: setSize(28),
              fontFamily: "LCD",
              padding: [24, 0, 0, 0],
            },
            unit: {
              color: "rgba(143, 159, 179, 1)",
              align: "right",
              verticalAlign: "top",
              lineHeight: setSize(130),
              fontSize: setSize(10),
              padding: [0, 0, 0, setSize(13)],
            },
          },
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: data.series,
      },
    ],
    // series: [
    //   {
    //     type: "pictorialBar",
    //     legendHoverLink: false,
    //     symbol: "rect",
    //     symbolSize: [6, barWidth],
    //     symbolRepeat: true,
    //     itemStyle: {
    //       color: 'rgba(28, 204, 255, 1)',
    //     },
    //     z: 9,
    //     animationEasing: "elasticOut",
    //     animationDuration: 1,
    //     data: data.series,
    //   },
    //   {
    //     type: "pictorialBar",
    //     animationDuration: 0,
    //     symbolRepeat: "fixed",
    //     symbolMargin: "20%",
    //     symbol: "rect",
    //     symbolSize: [6, barWidth],
    //     itemStyle: {
    //       color: "rgba(28, 204, 255, .2)",
    //     },
    //     label: {
    //       show: false,
    //     },
    //     z: 0,
    //     animationEasing: "elasticOut",
    //     data: data.series,
    //   },
    // ],
    series: [
      {
        type: "bar",
        barWidth,
        legendHoverLink: false,
        symbolRepeat: true,
        silent: true,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgba(28, 204, 255, .5)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(28, 204, 255, 1)", // 100% 处的颜色
              },
            ],
          },
        },
        z: 1,
        animationEasing: "elasticOut",
        data: data.series,
      },
      {
        type: "pictorialBar",
        animationDuration: 0,
        symbolRepeat: "fixed",
        symbolMargin: "20%",
        symbol: "roundRect",
        symbolSize: [6, barWidth],
        itemStyle: {
          normal: {
            color: "rgba(28, 204, 255, .2)",
          },
        },
        label: {
          normal: {
            show: false,
            position: "right",
            offset: [0, 2],
            distance: 30,
            textStyle: {
              color: "#7AF8FF",
              fontSize: 14,
            },
            formatter: function (a, b) {
              return `${a.value}`;
            },
          },
        },
        z: 0,
        animationEasing: "elasticOut",
        data: data.series,
      },
      {
        type: "pictorialBar",
        itemStyle: {
          color: "#000",
        },
        symbolRepeat: "fixed",
        symbolMargin: 4,
        symbol: "roundRect",
        symbolClip: true,
        symbolSize: [2, barWidth],
        symbolPosition: "start",
        symbolOffset: [8, 0,],
        z: 2,
        animationEasing: "elasticOut",
        data: data.series,
      },
    ],
  };
  myChart.setOption(option, true);
  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
  if (callBack) {
    myChart.on("click", (params) => {
      callBack(params);
    });
  }
};

const initPieChart = (data, callBack) => {
  let options = data.options || {};
  const font = {
    color: "#fff",
    fontSize: setSize(18),
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
        top: options.top || "center",
        z: 99,
        text: options.total && options.total.value + (options.total.unit || ""),
        itemGap: setSize(8),
        textStyle: {
          color: options.color[0],
          fontSize: setSize(26),
          fontFamily: "LCD",
        },
        subtext: options.total.name,
        subtextStyle: {
          color: "rgba(102, 102, 102, 1)",
          fontSize: setSize(35),
          lineHeight: setSize(40),
        },
      },
    ],
    // tooltip: {
    //   trigger: "item",
    //   textStyle: {
    //     ...font,
    //   },
    // },
    series: [
      {
        type: "pie",
        radius: options.radius || ["55%", "65%"],
        center: ["50%", "50%"],
        data: data.series,
        showEmptyCircle: true,
        label: {
          show: options.label,
        },
      },
      {
        type: "pie",
        radius: options.radius || ["65%", "80%"],
        center: ["50%", "48%"],
        selectedOffset: 3,
        selectedMode: true,
        data: data.series1,
        showEmptyCircle: true,
        label: {
          show: options.label,
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
  let options = data.options || {};
  let myChart = echarts.getInstanceByDom(document.getElementById(data.id));
  if (myChart == null) {
    myChart = echarts.init(document.getElementById(data.id));
  }
  let domImgHover = document.createElement("img");
  domImgHover.style.height =
    domImgHover.height =
    domImgHover.width =
    domImgHover.style.width =
      "8px";
  domImgHover.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII=";

  let geoCoordMapJSON = handeshenJson();
  echarts.registerMap("beijing", geoCoordMapJSON);
  let convertData = function (data) {
    let res = data.map((n) => {
      let geoCoord = geoCoordMapJSON.features.find((item) => {
        return item.properties.name === n.name;
      });
      return (
        (geoCoord && {
          name: n.name,
          value: geoCoord && [...geoCoord.properties.center, n.value],
        }) ||
        {}
      );
    });
    return res;
  };

  let option = {
    grid: {},
    tooltip: {
      className: "tooltip",
      position: function (point, params, dom, rect, size) {
        let x = 0;
        let y = 0;

        let pointX = point[0];
        let pointY = point[1];

        let boxWidth = size.contentSize[0];
        let boxHeight = size.contentSize[1];

        if (boxWidth > pointX) {
          x = pointX + 10;
        } else {
          x = pointX - boxWidth + boxWidth / 2;
        }

        if (boxHeight > pointY) {
          y = 5;
        } else {
          y = pointY - boxHeight;
        }

        return [x, y];
      },
      backgroundColor: "rgba(0, 0, 0, 0)",
      textStyle: {
        fontSize: 30,
        color: "#fff",
      },
      formatter: (param) => {
        let n = data.data.find((nn) => {
          return nn.name === param.name;
        });
        if (!n) return;
        return `<div class="map-tooltip"><p class="title">${
          n.name
        }</p><p><span>总设备: </span><span class="num">2</span></p><p><span>在线: </span><span class="num">${
          n.value || 0
        }</span></p><p><span>离线: </span><span class="num">1</span></p></div>`;
      },
    },
    geo: {
      map: "beijing",
      aspectScale: 1,
      layoutCenter: ["50%", "50%"],
      layoutSize: "115%",
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
          shadowOffsetY: 20,
          opacity: 0.4,
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
        layoutSize: "115%",
        emphasis: {
          itemStyle: {
            areaColor: {
              image: domImgHover,
              repeat: "repeat",
            },
            // areaColor: 'rgba(251, 205, 80, .3)',

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
          textStyle: {
            fontFamily: "Alibaba",
            color: "#fff",
            fontSize: 20,
            padding: [0, -40, 0, 0],
          },
        },
        itemStyle: {
          areaColor: "rgba(28, 204, 255,.2)",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },

        data: data.data,
      },
      {
        name: "散点",
        type: "effectScatter",
        coordinateSystem: "geo",
        silent: true,
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
        // symbol: "pin",
        // symbolSize: [40, 60],
        // label: {
        //   show: true,
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 22,
        //   },
        //   formatter(value) {
        //     return value.data.value[2];
        //   },
        // },
        symbolSize: function (val) {
          return val && 2 * val[2];
        },
        showEffectOn: "render",
        data: convertData(data.data),
      },
    ],
  };

  myChart.setOption(option, true, 0);

  let index = 0,
    timer = null;

  const autoTooltip = () => {
    myChart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index,
    });
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index,
    });
    clearTimeout(timer);
    timer = setTimeout(function () {
      myChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: index,
      });
      index++;
      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
      if (index >= data.data.length) {
        index = 0;
      }
      autoTooltip();
    }, 1000);
  };

  autoTooltip();

  myChart.on("mousemove", "series", (n) => {
    myChart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: index,
    });
    clearTimeout(timer);
  });
  // myChart.getZr().on("mousemove", 'series', (param) => {
  //   if (param.event) {

  //   }
  //   clearTimeout(timer)
  // });
  myChart.on("globalout", "series", (n) => {
    autoTooltip();
  });

  window.addEventListener("resize", () => {
    myChart.setOption(option, true);
    myChart.resize();
  });
};
