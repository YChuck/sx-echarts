import { getTooltip, valueMap, formatData } from '../../utils'
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_FONT_COLOR,
  DEFAULT_GRID,
} from '../../constants'

function getXAxis({ axisVisible, xAxisName }) {
  return [
    {
      type: 'value',
      name: xAxisName[0] || '',
      show: axisVisible[0],
      nameGap: 20,
      // max: 100,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ]
}

function getYAxis({ dimension, values, axisVisible, yAxisType, yAxisName }) {
  return dimension.map((item, index) => ({
    type: yAxisType,
    name: yAxisName[index] || '',
    show: axisVisible[1],
    data: values.map(row => row[item]),
    nameLocation: 'middle',
    position: 'left',
    inverse: true,
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    splitNumber: values.length,
    axisLabel: {
      show: true,
      margin: 30,
      fontFamily: DEFAULT_FONT_FAMILY,
      fontWeight: DEFAULT_FONT_WEIGHT,
      fontSize: DEFAULT_FONT_SIZE,
      lineHeight: DEFAULT_LINE_HEIGHT,
      color: DEFAULT_FONT_COLOR,
      interval: 0,
      formatter: params => {
        return `{alignLeft|${params}}`
      },
      rich: {
        alignLeft: {
          width: 62,
          height: 14,
          align: 'left',
        },
      },
    },
  }))
}

function getSeries({
  barStyleType,
  dimension,
  values,
  metrics,
  showMainBar,
  showBackground,
  showDiffColor,
  labelMap,
  label,
  labelPosition,
  itemStyle,
  units,
  chartColors,
}) {
  let series = []
  let labelPositionMap = {
    inside: ['insideRight', [-5, 0]],
    outside: ['right', [15, 0]],
  }
  let barTypeMap = { normal: 15, circle: 4 }
  const dataTemp = valueMap(values, metrics, dimension)

  metrics.forEach((item, index) => {
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'bar',
      barWidth: barTypeMap[barStyleType],
      data: dataTemp[item],
    }

    let circleLabel = {
      normal: {
        show: true,
        position: 'insideRight',
        formatter: params => {
          return params.value ? '{circle|}' : ''
        },
        distance: 0,
        rich: {
          circle: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'auto',
          },
        },
      },
    }

    if (barStyleType === 'circle') seriesItem.label = circleLabel
    if (showMainBar) {
      seriesItem.label = {
        show: true,
        position: 'right',
        formatter(params) {
          return formatData(
            params.value,
            units[params.seriesName] || units['default'],
          )
        },
      }
    }
    if (label) seriesItem.label = label
    if (showDiffColor) {
      seriesItem.itemStyle = {
        normal: {
          color: params => {
            return chartColors[params.dataIndex]
          },
        },
      }
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    series.push(seriesItem)
    if (showBackground) {
      series.push({
        type: 'bar',
        // 取最大数据值的 1.5 倍
        data: Array(dataTemp[item].length).fill(
          Math.max.apply(
            null,
            values.map(v => v[item]),
          ) * 1.5,
        ),
        barWidth: barTypeMap[barStyleType],
        barGap: '-100%',
        emphasis: {
          itemStyle: {
            color: '#C8D9FD',
          },
        },
        z: 1,
        itemStyle: {
          normal: {
            color: '#C8D9FD',
          },
        },
        label: {
          normal: {
            show: true,
            position: labelPositionMap[labelPosition][0],
            offset: labelPositionMap[labelPosition][1],
            formatter: params => {
              return `{alignRight|${formatData(
                dataTemp[item][params.dataIndex]['value'],
                units[item] || units['default'],
              )}}`
            },
            rich: {
              alignRight: {
                width: 50,
                height: 14,
                align: labelPosition === 'inside' ? 'right' : 'left',
                fontFamily: DEFAULT_FONT_FAMILY,
                fontWeight: DEFAULT_FONT_WEIGHT,
                fontSize: DEFAULT_FONT_SIZE,
                lineHeight: DEFAULT_LINE_HEIGHT,
                color: DEFAULT_FONT_COLOR,
              },
            },
          },
        },
        tooltip: {
          show: false,
        },
      })
    }
  })

  return series
}

export const bar = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项 仅取一项数据
  let tempMetrics = keys.slice(1, 2).map((v, i) => {
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
    yAxisType = 'category',
    // default unit
    defaultUnit = 'normal',
    // bar style type： normal circle
    barStyleType = 'normal',
    // 显示 main bar label
    showMainBar = false,
    // 显示背景
    showBackground = false,
    // bar 显示不同颜色
    showDiffColor = false,
    // label 显示位置: inside / outside
    labelPosition = 'outside',
    // legend 名称字典
    // legendMap = {},
    // label 名称字典
    labelMap = {},
    /**
     * echarts opts
     */
    grid,
    label,
    itemStyle,
  } = settings

  const { tooltipVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'axis',
      tooltipFormatter,
      units,
    })
  const xAxis = getXAxis({
    axisVisible,
    xAxisName,
  })
  const yAxis = getYAxis({
    dimension,
    values,
    axisVisible,
    yAxisType,
    yAxisName,
  })
  const series = getSeries({
    barStyleType,
    dimension,
    values,
    metrics,
    showMainBar,
    showBackground,
    showDiffColor,
    labelMap,
    label,
    labelPosition,
    itemStyle,
    units,
    chartColors,
  })
  const options = {
    grid: grid || DEFAULT_GRID,
    // legend,
    tooltip,
    xAxis,
    yAxis,
    series,
    color: chartColors,
  }

  return options
}
