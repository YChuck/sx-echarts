export default {
  name: '折线图',
  type: 'line',
  html: `<h4>Line (折线图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys中除第0位外其他项的数组</td><td style='text-align:center;' >[&quot;aaa&quot;, &quot;bbb&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >xAxisType</td><td style='text-align:center;' >x轴类型 官方类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;category&quot;</td><td style='text-align:center;' >&quot;value&quot;</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >area</td><td style='text-align:center;' >是否展示为面积图</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >stack</td><td style='text-align:center;' >堆叠选项</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ count: [&#39;访客人数&#39;, &#39;VIP人数&#39;] }</td></tr><tr><td style='text-align:center;' >legendMap</td><td style='text-align:center;' >图例别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期图例别名&#39; }</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >lineStyle</td><td style='text-align:center;' >series.lineStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >areaStyle</td><td style='text-align:center;' >series.areaStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础折线图',
      data: {
        keys: ['日期', '访问用户', '下单用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
        ],
      },
      settings: {},
    },
    {
      name: '自定义显示纬度项',
      data: {
        keys: ['日期', '访问用户', '下单用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      settings: {
        dimension: ['日期'],
        metrics: ['访问用户', '下单用户'],
      },
    },
    {
      name: '设置别名及legend别名',
      data: {
        keys: ['date', 'visitor', 'order', 'rate'],
        values: [
          { date: '1/1', visitor: 1393, order: 1093, rate: 0.32 },
          { date: '1/2', visitor: 3530, order: 3230, rate: 0.26 },
          { date: '1/3', visitor: 2923, order: 2623, rate: 0.76 },
          { date: '1/4', visitor: 1723, order: 1423, rate: 0.49 },
          { date: '1/5', visitor: 3792, order: 3492, rate: 0.323 },
          { date: '1/6', visitor: 4593, order: 4293, rate: 0.78 },
        ],
      },
      settings: {
        labelMap: {
          visitor: '访问用户',
          order: '下单用户',
          rate: '下单率',
        },
        // labelMap 封装了一层 所以 legendMap 需要注意
        legendMap: {
          访问用户: '我是访问用户',
        },
      },
    },
    {
      name: 'stack & area',
      data: {
        keys: ['日期', '访问用户', '下单用户'],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
        ],
      },
      settings: {
        area: true,
        stack: {
          用户: ['访问用户', '下单用户'],
        },
      },
    },
    {
      name: '默认单位及自定义数据单位',
      data: {
        keys: ['日期', '访问用户', '下单用户', ['下单率', 'percent']],
        values: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      settings: {
        defaultUnit: 'people',
      },
    },
  ],
}
