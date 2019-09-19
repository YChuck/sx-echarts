import {
  formatData,
  getTooltip,
  stack2Map,
  trunkText,
  valueMap,
} from '../../utils'
import {
  DEFAULT_LEGEND,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_FONT_COLOR,
  DEFAULT_AXIS_COLOR,
} from '../../constants'

function getLegend({ metrics, legendMap, labelMap }) {
  if (!legendMap && !labelMap) return {}
  const data = labelMap ? metrics.map(item => labelMap[item] || item) : metrics
  return Object.assign({}, DEFAULT_LEGEND, {
    icon: 'rect',
    data,
    // name 被 labelMap 封装了一层 所以 legendMap 需要注意
    formatter: name => legendMap[name] || name,
  })
}

function getXAxis({ dimension, values, axisVisible, xAxisType, xAxisName }) {
  return dimension.map((item, index) => ({
    type: xAxisType,
    nameLocation: 'middle',
    nameGap: 22,
    name: xAxisName[index] || '',
    data: values.map(row => row[item]),
    show: axisVisible[0],
    axisLabel: {
      show: true,
      margin: 10,
      // rotate: window.innerWidth < 1440 ? -45 : 0,
      color: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
      formatter: value => trunkText(value, 4),
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: DEFAULT_AXIS_COLOR,
      },
    },
  }))
}

function getYAxis({ axisVisible, defaultUnit, yAxisName }) {
  return [
    {
      type: 'value',
      name: yAxisName[0] || '',
      show: axisVisible[1],
      nameGap: 24,
      nameTextStyle: {
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        align: 'left',
        padding: [0, 20, 0, 0],
      },
      axisLabel: {
        show: true,
        margin: 10,
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: DEFAULT_FONT_WEIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
        formatter(val) {
          return formatData(val, defaultUnit)
        },
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: 'solid',
          color: '#C9D4E9',
        },
      },
    },
  ]
}

function getSeries({
  dimension,
  values,
  metrics,
  stack,
  showLine,
  labelMap,
  label,
  itemStyle,
}) {
  const series = []
  let stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'bar',
      barWidth: 34,
      data: dataTemp[item],
    }

    if (showLine.includes(item)) {
      seriesItem = {
        ...seriesItem,
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 4,
      }
    }

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item]
    if (label) seriesItem.label = label
    if (itemStyle) seriesItem.itemStyle = itemStyle
    series.push(seriesItem)
  })
  return series
}

export const histogram = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项
  let tempMetrics = keys.slice(1).map((v, i) => {
    if (Array.isArray(v)) {
      units[v[0]] = v[1]
      return v[0]
    }
    return v
  })

  const {
    // 纬度 def:keys[0]
    dimension = [keys[0]],
    // 自定义数据项
    metrics = tempMetrics,
    // visible slots:[xAxis, yAxis]
    axisVisible = [true, true],
    // xAxis name list
    xAxisName = [],
    // yAxis name list
    yAxisName = [],
    // echarts axis type
    xAxisType = 'category',
    // default unit
    defaultUnit = 'normal',
    // customize stack obj
    stack,
    // let data be line
    showLine = [],
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    // echarts opts
    label,
    itemStyle,
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  const legend = legendVisible && getLegend({ metrics, legendMap, labelMap })
  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'axis',
      tooltipFormatter,
      units,
    })
  const xAxis = getXAxis({
    dimension,
    values,
    axisVisible,
    xAxisType,
    xAxisName,
  })
  const yAxis = getYAxis({
    axisVisible,
    defaultUnit,
    yAxisName,
  })
  const series = getSeries({
    dimension,
    values,
    showLine,
    metrics,
    stack,
    labelMap,
    label,
    itemStyle,
  })
  const options = {
    legend,
    tooltip,
    xAxis,
    yAxis,
    series,
    color: chartColors,
  }
  return options
}
