const DEFAULT_FONT_FAMILY = 'PingFangSC-Regular'
const DEFAULT_FONT_WEIGHT = 'normal'
const DEFAULT_FONT_SIZE = '12'
const DEFAULT_LINE_HEIGHT = '14'
const DEFAULT_FONT_COLOR = '#4A4A4A'
const DEFAULT_LABEL_COLOR = '#7D7D7D'
const DEFAULT_AXIS_COLOR = '#C9D4E9'
const DEFAULT_AXIS_COLOR2 = '#D1D1D1'

export {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_SIZE,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_FONT_COLOR,
  DEFAULT_LABEL_COLOR,
  DEFAULT_AXIS_COLOR,
  DEFAULT_AXIS_COLOR2,
}

export const DEFAULT_COLORS = [
  '#5ab1ef',
  '#19d4ae',
  '#fa6e86',
  '#ffb980',
  '#0067a6',
  '#c4b4e4',
  '#d87a80',
  '#9cbbff',
  '#d9d0c7',
  '#87a997',
  '#d49ea2',
  '#5b4947',
  '#7ba3a8',
]

export const DEFAULT_LEGEND = {
  show: true,
  icon: 'circle',
  right: '10%',
  itemGap: 25,
  itemWidth: 10,
  itemHeight: 10,
  inactiveColor: '#ccc',
  selectedMode: 'multiple',
  textStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
    color: DEFAULT_LABEL_COLOR,
  },
}

export const DEFAULT_PIR_LEGEND = {
  show: true,
  icon: 'rect',
  top: 'middle',
  right: '25%',
  orient: 'vertical',
  height: '80%',
  itemGap: 10,
  itemWidth: 14,
  itemHeight: 14,
  inactiveColor: '#ccc',
  selectedMode: 'multiple',
  textStyle: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: DEFAULT_LINE_HEIGHT,
    color: DEFAULT_FONT_COLOR,
  },
}

export const DEFAULT_GRID = {
  top: '8.26%', // 30/363
  right: '6.06%', // 50/825
  bottom: '8.26%', // 30/363
  left: '6.06%', // 50/825
  containLabel: true,
}
