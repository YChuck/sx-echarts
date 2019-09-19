import { getTooltip, stack2Map, valueMap } from '../../utils'
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
      color: DEFAULT_FONT_COLOR,
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      lineHeight: DEFAULT_LINE_HEIGHT,
    },
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: DEFAULT_AXIS_COLOR,
      },
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
      inside: true,
      length: 6,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
    },
    splitLine: {
      show: false,
    },
    axisPointer: {
      show: true,
      type: 'line',
      label: { show: false },
      lineStyle: {
        width: 1,
        type: 'dashed',
        color: DEFAULT_FONT_COLOR,
        opacity: 0.6,
      },
    },
  }))
}

function getYAxis({ axisVisible, yAxisName }) {
  return [
    {
      type: 'value',
      name: yAxisName[0] || '',
      show: axisVisible[1],
      boundaryGap: [0, 0.1],
      axisLabel: { show: false },
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
      splitNumber: 5,
    },
  ]
}

function getSeries({
  dimension,
  values,
  metrics,
  area,
  stack,
  labelMap,
  label,
  itemStyle,
  lineStyle,
  areaStyle,
  chartColors,
}) {
  const series = []
  const stackMap = stack && stack2Map(stack)
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'line',
      data: dataTemp[item],
      smooth: true,
      showSymbol: false,
      symbol: 'emptyCircle',
      symbolSize: 4,
    }

    if (stack && stackMap[item]) seriesItem.stack = stackMap[item]
    if (area) {
      seriesItem.areaStyle = {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: chartColors[index],
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
            global: false,
          },
        },
      }
    }
    if (label) seriesItem.label = label
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (lineStyle) seriesItem.lineStyle = lineStyle
    if (areaStyle) seriesItem.areaStyle = areaStyle
    series.push(seriesItem)
  })
  return series
}

export const line = (keys, values, settings, extra) => {
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
    // area flag
    area = false,
    // customize stack obj
    stack,
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    /**
     * echarts opts
     */
    label,
    itemStyle,
    lineStyle,
    areaStyle,
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
    yAxisName,
  })
  const series = getSeries({
    dimension,
    values,
    metrics,
    area,
    stack,
    labelMap,
    label,
    itemStyle,
    lineStyle,
    areaStyle,
    chartColors,
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
