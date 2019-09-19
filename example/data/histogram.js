export default {
  name: '柱状图',
  type: 'histogram',
  html: `<h4>histogram (柱状图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys中除第0位外其他项的数组</td><td style='text-align:center;' >[&quot;aaa&quot;, &quot;bbb&quot;]</td></tr><tr><td style='text-align:center;' >axisVisible</td><td style='text-align:center;' >坐标轴显示状态</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >[true, true] (0:x轴、1:y轴)</td><td style='text-align:center;' >[true, false]</td></tr><tr><td style='text-align:center;' >xAxisName</td><td style='text-align:center;' >x轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含x轴名称的数组</td><td style='text-align:center;' >[&quot;我是x轴名称&quot;]</td></tr><tr><td style='text-align:center;' >yAxisName</td><td style='text-align:center;' >y轴名称</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含y轴名称的数组</td><td style='text-align:center;' >[&quot;我是y轴名称&quot;]</td></tr><tr><td style='text-align:center;' >xAxisType</td><td style='text-align:center;' >x轴类型 官方类型</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;category&quot;</td><td style='text-align:center;' >&quot;value&quot;</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >stack</td><td style='text-align:center;' >堆叠选项</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ count: [&#39;访客人数&#39;, &#39;VIP人数&#39;] }</td></tr><tr><td style='text-align:center;' >showLine</td><td style='text-align:center;' >显示成线</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >--</td><td style='text-align:center;' >[&quot;访问用户&quot;] (则该类数据显示成线)</td></tr><tr><td style='text-align:center;' >legendMap</td><td style='text-align:center;' >图例别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期图例别名&#39; }</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础柱状图',
      data: {
        keys: ['类型', '访问用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393 },
          { 类型: '餐饮美区', 访问用户: 530 },
          { 类型: '亲子项区', 访问用户: 923 },
          { 类型: '母婴产区', 访问用户: 723 },
          { 类型: '数码家电', 访问用户: 792 },
          { 类型: '休闲区', 访问用户: 593 },
        ],
      },
      settings: {
        yAxisName: ['人数'],
      },
    },
    {
      name: '设置别名及legend别名',
      data: {
        keys: ['type', 'visitor'],
        values: [
          { type: '服饰鞋区', visitor: 393 },
          { type: '餐饮美区', visitor: 530 },
          { type: '亲子项区', visitor: 923 },
          { type: '母婴产区', visitor: 723 },
          { type: '数码家电', visitor: 792 },
          { type: '休闲区', visitor: 593 },
        ],
      },
      settings: {
        labelMap: {
          visitor: '访问用户',
        },
        // labelMap 封装了一层 所以 legendMap 需要注意
        legendMap: {
          访问用户: '我是访问用户',
        },
      },
    },
    {
      name: '默认单位、自定义单位及坐标名称显示',
      data: {
        keys: ['类型', '访问用户', ['VIP用户', 'people']],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 102 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 173 },
          { 类型: '亲子项区', 访问用户: 923, VIP用户: 29 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 9 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 79 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        yAxisName: ['人数'],
        defaultUnit: 'people',
      },
    },
    {
      name: '堆叠柱状图',
      data: {
        keys: ['类型', '访问用户', 'VIP用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 192 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 373 },
          { 类型: '亲子项区', 访问用户: 923, VIP用户: 629 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 359 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 579 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        stack: {
          用户: ['访问用户', 'VIP用户'],
        },
      },
    },
    {
      name: '线+柱状图',
      data: {
        keys: ['类型', '访问用户', 'VIP用户'],
        values: [
          { 类型: '服饰鞋区', 访问用户: 393, VIP用户: 192 },
          { 类型: '餐饮美区', 访问用户: 530, VIP用户: 373 },
          { 类型: '亲子项区', 访问用户: 923, VIP用户: 629 },
          { 类型: '母婴产区', 访问用户: 723, VIP用户: 359 },
          { 类型: '数码家电', 访问用户: 792, VIP用户: 579 },
          { 类型: '休闲区', 访问用户: 593, VIP用户: 237 },
        ],
      },
      settings: {
        showLine: ['VIP用户'],
      },
    },
  ],
}
