const itemTitleType = {
  line: 'seriesName',
  bar: 'seriesName',
  pie: 'name',
  radar: 'name',
  scatter: 'seriesName',
}
export const getTooltip = ({
  triggerType = 'axis',
  tooltipFormatter,
  units,
  values,
}) => ({
  show: true,
  confine: true,
  transitionDuration: 0.1,
  backgroundColor: '#FFFFFF',
  padding: [4, 10, 10],
  axisPointer: {
    type: 'none',
  },
  extraCssText:
    'box-shadow: 1px 1px 8px 0 rgba(29,49,82,0.28);border-radius: 2px;',
  trigger: triggerType,
  formatter(params) {
    if (tooltipFormatter) return tooltipFormatter.apply(null, arguments)
    if (!Array.isArray(params)) params = [params]

    let itemOne = _.head(params)
    let chartsTilte =
      itemOne.componentSubType === 'pie' ? itemOne.seriesName : itemOne.name
    let data = []

    if (itemOne.componentSubType === 'radar') {
      let v = values[itemOne.name]
      Object.keys(v).forEach(key => {
        data.push({
          color: itemOne.color,
          itemTitle: key,
          itemData: formatData(
            v[key],
            units[values['orign'][key] || key] || units['default'],
          ),
        })
      })
    } else {
      data = params.map((v, i) => {
        let color = v.color
        return {
          color:
            typeof color === 'string'
              ? color
              : color.colorStops[0].color.slice(0, -2),
          itemTitle: v[itemTitleType[v.componentSubType]],
          itemData: formatData(
            v.data['value'],
            units[v.seriesName] || units['default'],
          ),
        }
      })
    }
    return tooltipTemplate(chartsTilte, data)
  },
})

function tooltipTemplate(chartsTilte, data) {
  let tpl = data.map(({ color, itemTitle, itemData }, index) => {
    return `
    <li class="charts-item">
      <div class="charts-item__icon" style="background-color: ${color};"></div>
      <span class="charts-item__title">${itemTitle}</span>
      <span class="charts-item__data">${itemData}</span>
    </li>
  `
  })
  return `
  <div class="charts-tooltip">
    <h3 class="charts-title">${chartsTilte}</h3>
    <ul class="charts-content">
      ${tpl.join('')}
    </ul>
  </div>
  `
}

export const formatData = (val, type) => {
  switch (type) {
    case 'rmb':
      return `${val}元`
    case 'percent':
      return `${(val * 100).toFixed(2)}%`
    case 'people':
      return `${val}人`
    case 'normal':
      return val
  }
}

export const stack2Map = stack => {
  let stackMap = {}
  Object.keys(stack).forEach(key => {
    let item = stack[key]
    if (item && Array.isArray(item)) {
      item.forEach(v => {
        stackMap[v] = key
      })
    }
  })
  return stackMap
}

export const valueMap = (values, metrics, dimension) => {
  const dataTemp = {}
  values.forEach(row => {
    metrics.forEach(item => {
      if (!dataTemp[item]) dataTemp[item] = []
      dataTemp[item].push({ name: row[dimension[0]], value: row[item] })
    })
  })
  return dataTemp
}

export const trunkText = (str, len) => {
  return str.length > len + 1 ? str.slice(0, len) + '...' : str
}

// if has labelMap need to set orign object for unit
export const getTooltipData = (values, dimension, labelMap) => {
  let tooltipData = { orign: {} }
  let dim = dimension[0]
  values.forEach(v => {
    if (!tooltipData[v[dim]]) tooltipData[v[dim]] = {}
    Object.keys(v).forEach(key => {
      if (key !== dim) tooltipData[v[dim]][labelMap[key] || key] = v[key]
    })
  })
  Object.keys(labelMap).forEach(key => {
    tooltipData['orign'][labelMap[key]] = key
  })
  return tooltipData
}
