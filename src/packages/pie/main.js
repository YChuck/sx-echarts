import { DEFAULT_PIR_LEGEND } from '../../constants'
import { formatData, getTooltip } from '../../utils'

const singleRadius = '70%'
const ringRadius = ['50%', '70%']

function getLegend({ dimension, metrics, values, labelMap, legendMap, units }) {
  let dim = dimension[0]
  let met = metrics[0]
  let temps = {}
  values.forEach(item => {
    temps[labelMap[item[dim]] || item[dim]] = item[met]
  })
  return Object.assign({}, DEFAULT_PIR_LEGEND, {
    // name 被 labelMap 封装了一层 所以 legendMap 需要注意
    formatter(str) {
      return `${legendMap[str] || str}  ${formatData(
        temps[str],
        units[met] || units.default,
      )}`
    },
  })
}

function getSeries({
  dimension,
  metrics,
  values,
  radius,
  selectedMode,
  labelMap,
  label,
  itemStyle,
  labelLine,
  legendVisible,
}) {
  return metrics.map((item, index) => {
    let dim = dimension[0]
    let seriesItem = {
      name: labelMap[item] || item,
      type: 'pie',
      radius,
      selectedMode,
      center: legendVisible ? ['30%', '50%'] : ['50%', '50%'],
      data: values
        .filter(v => v[item])
        .map(v => ({ name: labelMap[v[dim]] || v[dim], value: v[item] })),
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: Object.assign(
        {},
        {
          show: !legendVisible,
          position: 'outside',
          formatter(parmas) {
            return labelMap[parmas.name] || parmas.name
          },
        },
        label,
      ),
      labelLine: {
        length: 5,
        length2: 8,
      },
    }
    if (itemStyle) seriesItem.itemStyle = itemStyle
    if (labelLine) seriesItem.labelLine = labelLine
    return seriesItem
  })
}

export const pie = (keys, values, settings, extra) => {
  keys = Array.isArray(keys) ? keys : []
  values = Array.isArray(values) ? values : []

  // 数据 自定义单位
  let units = {}
  // 默认数据项 最多1个数据项
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
    // default unit
    defaultUnit = 'normal',
    // 是否为环
    isRing = false,
    // 可显示区半径
    radius = isRing ? ringRadius : singleRadius,
    // 选中模式
    selectedMode = false,
    // legend 名称字典
    legendMap = {},
    // label 名称字典
    labelMap = {},
    /**
     * echarts opts
     */
    label,
    itemStyle,
    labelLine,
  } = settings
  const { tooltipVisible, legendVisible, tooltipFormatter, chartColors } = extra

  // if has labelMap need to add new key&val Map to units
  if (Object.keys(labelMap).length !== 0) {
    _.forEach(units, function(v, key) {
      if (labelMap[key]) units[labelMap[key]] = v
    })
  }

  units.default = defaultUnit

  const legend =
    legendVisible &&
    getLegend({ dimension, metrics, values, labelMap, legendMap, units })
  const tooltip =
    tooltipVisible &&
    getTooltip({
      triggerType: 'item',
      tooltipFormatter,
      units,
    })
  const series = getSeries({
    dimension,
    metrics,
    values,
    radius,
    selectedMode,
    labelMap,
    label,
    itemStyle,
    labelLine,
    legendVisible,
  })
  const options = {
    legend,
    tooltip,
    series,
    color: chartColors,
  }
  return options
}
