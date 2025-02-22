var $builtinmodule = function(name) {
  function fill(arr, val) {
    if (Array.prototype.fill) {
      return Array.prototype.fill.bind(arr)(val, arguments[2], arguments[3]);
    }

    // Steps 1-2.
    if (arr == null) {
      throw new TypeError('arr is null or not defined');
    }

    var O = Object(arr);

    // Steps 3-5.
    var len = O.length >>> 0;

    // Steps 6-7.
    var start = arguments[2];
    var relativeStart = start >> 0;

    // Step 8.
    var k = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) :
      Math.min(relativeStart, len);

    // Steps 9-10.
    var end = arguments[3];
    var relativeEnd = end === undefined ?
      len : end >> 0;

    // Step 11.
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) :
      Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      O[k] = value;
      k++;
    }

    // Step 13.
    return O;
  }


  var mod = {};

  var COLORS = [
    [255, 89, 149],  [182, 227, 84],  [254, 237, 108], [140, 237, 255],
    [158, 111, 254], [137, 156, 161], [248, 248, 242], [191, 70, 70],
    [81, 96, 131],   [249, 38, 114],  [130, 180, 20],  [253, 151, 31],
    [86, 194, 214],  [128, 131, 132], [140, 84, 254],  [70, 84, 87]
  ];

  var KWARGS = ['title', 'width', 'height', 'range', 'include_x_axis', 'x_title', 'y_title', 'title_font_size', 'fill', 'stroke', 'x_labels'];

  function Chart(options) {
    this._options = options;
    this._data = [];
  }

  function rgba(rgb, a) {
    return 'rgba(' + rgb.join(',') + ',' + a + ')';
  }

  Chart.prototype.add = function(label, values) {
    this._data.unshift({
      name: label,
      color: rgba(COLORS[this._data.length%COLORS.length], 0.75),
      data: values,
      marker : {
        symbol: 'circle'
      },
      stack : 1
    });

    return '';
  }

  Chart.prototype.render = function(renderer) {
    var options = this._options;
    var $elem = Sk.domOutput('<div></div>');
    var title_style = {
      color: '#FFFFFF'
    };
    if (options.title_font_size) {
      title_style['font-size'] = options.title_font_size + 'px';
    }
    var xPlotLines = [];
    var yPlotLines = [];

    if (options.range) {
      yPlotLines.push({
        value: options.range.min,
        width: 1,
        color: '#FFFFFF'
      });
    }

    var defaultWidth  = Sk.availableWidth || 400;
    var defaultHeight = Math.min(defaultWidth, Sk.availableHeight || 300);

    var chart = {
      chart: {
        width : options.width  || defaultWidth,
        height: options.height || defaultHeight,
        backgroundColor: '#000'
      },
      credits: {
        enabled: false
      },
      title: {
          text: options.title,
          style : title_style
      },
      xAxis: {
          title: {
              text: options.x_title || null,
              style : title_style,
              margin: 20
          },
          categories: options.x_labels,
          labels : {
            enabled: options.x_labels ? true : false
          },
          tickLength: 0
      },
      yAxis: {
          startOnTick: false,
          title: {
              text: options.y_title || null,
              style : title_style,
              margin: 20
          },
          plotLines: yPlotLines,
          min : options.include_x_axis
            ? 0
            : options.range
              ? options.range.min
              : null,
          max : options.range ? options.range.max : null,
          gridLineDashStyle : 'ShortDash',
          gridLineColor: '#DDD',
          tickLength: 0
      },
      legend: {
          itemStyle : {
            color : '#FFFFFF'
          },
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          y: 50,
          borderWidth: 0
      },
      labels : {
        style : {
          color: '#FFFFFF'
        }
      },
      series: this._data
    };

    for(var i = 0; i < chart.series.length; i++) {
      chart.series[i].legendIndex = chart.series.length - i;
      chart.series[i].index = chart.series.length - i;
    }

    if (renderer) {
      chart = renderer(options, chart);
    }

    $elem.highcharts(chart);

    return '';
  }

  function some(val) {
    return val && val !== Sk.builtin.none.none$;
  }

  function kwfunc(impl, kwargs) {
    if (kwargs && kwargs.length) {
      impl.co_varnames = ['__self__'].concat(kwargs);
      impl.$defaults = fill(new Array(kwargs.length), Sk.builtin.none.none$);
    }
    return new Sk.builtin.func(impl);
  }

  function createChartType(type, renderer) {
    mod[type] = Sk.misceval.buildClass(mod, function($gbl, $loc) {
      $loc.__init__ = kwfunc(
        function(self, title, width, height, range, include_x_axis, x_title, y_title, title_font_size, fill, stroke, x_labels) {
          var options = {};
          if (some(title)) options.title = title.v;
          if (some(width)) options.width = width.v;
          if (some(height)) options.height = height.v;
          if (some(range)) options.range = {
            min: range.v[0].v,
            max: range.v[1].v
          };
          if (some(include_x_axis)) options.include_x_axis = include_x_axis.v;
          if (some(x_title)) options.x_title = x_title.v;
          if (some(y_title)) options.y_title = y_title.v;
          if (some(title_font_size)) options.title_font_size = title_font_size.v;
          if (some(fill)) options.fill = fill.v;
          if (some(stroke)) options.stroke = stroke.v;
          if (some(x_labels)) options.x_labels = x_labels.v;

          self.instance = new Chart(options);
        }, KWARGS
      );

      $loc.add = new Sk.builtin.func(function(self, label, values) {
        values = (values instanceof Sk.builtin.list)
          ? Sk.ffi.remapToJs(values)
          : [values.v];

        return self.instance.add(label.v, values);
      });

      $loc.render = new Sk.builtin.func(function(self) {
        var i, key, val;

        for (i = 0; i < KWARGS.length; i++) {
          key = KWARGS[i];
          val = self.tp$getattr(key);

          if (typeof val !== "undefined") {
            self.instance._options[key] = Sk.ffi.remapToJs(val);
          }
        }

        return self.instance.render(renderer);
      });
    }, type, []);
  }

  createChartType('Line', function(options, chart) {
    chart.chart.type = options.fill ? 'area' : 'line';
    return chart;
  });
  createChartType('StackedLine', function(options, chart) {
    chart.chart.type = options.fill ? 'area' : 'line';
    chart.plotOptions = {
      area : {
        stacking : 'percent'
      },
      series : {
        stacking : 'percent'
      }
    };
    return chart;
  });
  createChartType('Bar', function(options, chart) {
    chart.chart.type = 'column';
    return chart;
  });
  createChartType('StackedBar', function(options, chart) {
    chart.chart.type = 'column';
    chart.plotOptions = {
      column : {
        stacking: 'percent'
      }
    };
    return chart;
  });
  createChartType('HorizontalBar', function(options, chart) {
    chart.chart.type = 'bar';
    return chart;
  });
  createChartType('StackedHorizontalBar', function(options, chart) {
    chart.chart.type = 'bar';
    chart.plotOptions = {
      bar : {
        stacking: 'percent'
      }
    };
    return chart;
  });
  createChartType('XY', function(options, chart) {
    if (options.stroke === false) {
      chart.chart.type = 'scatter'
    }
    else {
      chart.chart.type = options.fill ? 'area' : 'line';
    }
    chart.xAxis.labels.enabled = true;

    return chart;
  });
  createChartType('Radar', function(options, chart) {
    chart.chart.polar = true;
    chart.chart.type  = 'line';
    chart.xAxis = {
      categories: options.x_labels,
      tickmarkPlacement: 'on',
      lineWidth: 0
    }
    chart.yAxis = {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      gridLineDashStyle : 'ShortDash',
      gridLineColor: '#DDD'
    }
    for(var i = 0; i < chart.series.length; i++) {
      chart.series[i].pointPlacement = 'on';
    }

    return chart;
  });
  createChartType('Pie', function(options, chart) {
    chart.chart.type = 'pie';
    var slices       = [];
    var breakdown    = [];
    var useBreakdown = false;
    for(var i = 0; i < chart.series.length; i++) {
      var slice = chart.series[i];
      if (slice.data.length === 1) {
        slices.unshift({
          name        : slice.name,
          color       : slice.color,
          borderColor : slice.color,
          legendIndex : slice.legendIndex,
          y           : slice.data[0]
        });
        breakdown.unshift({
          name  : slice.name,
          color : slice.color,
          borderColor : slice.color,
          y     : slice.data[0]
        });
      }
      else {
        useBreakdown = true;
        var sum = 0;
        var maxDecimal = 0;
        for(var j = 0; j < slice.data.length; j++) {
          var parts = slice.data[j].toString().split('.');
          maxDecimal = Math.max(maxDecimal, parts[1] ? parts[1].length : 0);
          sum += slice.data[j];
          breakdown.unshift({
            name: slice.name,
            color: 'rgba(0,0,0,0)',
            borderColor : slice.color,
            y: slice.data[j]
          });
        }
        slices.unshift({
          name        : slice.name,
          color       : slice.color,
          borderColor : slice.color,
          legendIndex : slice.legendIndex,
          y           : parseFloat(sum.toFixed(maxDecimal))
        });
      }
    }
    chart.tooltip = {
      formatter: function() {
          return this.key + ': ' + this.y;
        }
    };
    chart.plotOptions = {
      pie: {
        allowPointSelect: !useBreakdown,
        cursor: useBreakdown ? null : 'pointer',
        shadow: false,
        center: ['50%', '50%'],
        dataLabels: {
          enabled: false
        }
      }
    };
    chart.series = [{
      name: ' ',
      data: slices,
      showInLegend: true
    }];
    if (useBreakdown) {
      chart.series.push({
        name: ' ',
        data: breakdown,
        innerSize: '90%',
        showInLegend: false
      });
    }
    return chart;
  });

  return mod;
}
