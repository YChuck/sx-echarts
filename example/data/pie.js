export default {
  name: '饼图',
  type: 'pie',
  html: `<h4>Pie (饼、环图) 配置参数</h4>
  <figure><table>
  <thead>
  <tr><th style='text-align:center;' >参数</th><th style='text-align:center;' >简介</th><th style='text-align:center;' >类型</th><th style='text-align:center;' >默认配置</th><th style='text-align:center;' >例子</th></tr></thead>
  <tbody><tr><td style='text-align:center;' >dimension</td><td style='text-align:center;' >纬度</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[0]的数组</td><td style='text-align:center;' >[&quot;XXX&quot;]</td></tr><tr><td style='text-align:center;' >metrics</td><td style='text-align:center;' >指标</td><td style='text-align:center;' >Array</td><td style='text-align:center;' >包含keys[1]的数组</td><td style='text-align:center;' >[&quot;aaa&quot;]</td></tr><tr><td style='text-align:center;' >defaultUnit</td><td style='text-align:center;' >图表数据默认单位</td><td style='text-align:center;' >String</td><td style='text-align:center;' >&quot;normal&quot;</td><td style='text-align:center;' >&quot;percent&quot;/&quot;people&quot;/&quot;rmb&quot;/&quot;normal&quot;</td></tr><tr><td style='text-align:center;' >isRing</td><td style='text-align:center;' >是否为环</td><td style='text-align:center;' >Boolean</td><td style='text-align:center;' >False</td><td style='text-align:center;' >true</td></tr><tr><td style='text-align:center;' >radius</td><td style='text-align:center;' >半径 (范围)</td><td style='text-align:center;' >String Array Number</td><td style='text-align:center;' >isRing ? [&#39;50%&#39;, &#39;70%&#39;] : &#39;70%&#39;</td><td style='text-align:center;' >30</td></tr><tr><td style='text-align:center;' >selectedMode</td><td style='text-align:center;' >选中模式</td><td style='text-align:center;' >String Boolean</td><td style='text-align:center;' >false</td><td style='text-align:center;' >&quot;single&quot;/&quot;multiple&quot;/false</td></tr><tr><td style='text-align:center;' >legendMap</td><td style='text-align:center;' >图例别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期图例别名&#39; }</td></tr><tr><td style='text-align:center;' >labelMap</td><td style='text-align:center;' >标签别名字典</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >{ date: &#39;我是日期标签别名&#39; }</td></tr><tr><td style='text-align:center;' >label</td><td style='text-align:center;' >series.label</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >itemStyle</td><td style='text-align:center;' >series.itemStyle</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr><tr><td style='text-align:center;' >labelLine</td><td style='text-align:center;' >series.labelLine</td><td style='text-align:center;' >Object</td><td style='text-align:center;' >--</td><td style='text-align:center;' >--</td></tr></tbody>
  </table></figure>
  `,
  data: [
    {
      name: '基础饼图',
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
      settings: {},
    },
    {
      name: '自定义label & 自定义legend',
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
        /**
         * pie 的 labelMap 可设置 数据项名称的别名、对应数据项的label别名、对应数据项的tooltip别名、legend别名
         */
        labelMap: {
          visitor: '访问用户',
          亲子项区: '我是亲子项区',
        },
        legendMap: {
          服饰鞋区: '我是服饰鞋区',
        },
      },
    },
    {
      name: '基础环图',
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
        isRing: true,
      },
    },
    {
      name: '默认单位&自定义项单位',
      data: {
        keys: ['类型', ['访问用户', 'people']],
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
        defaultUnit: 'people',
      },
    },
    {
      name: '自定义 radius & 选中模式',
      data: {
        keys: ['类型', ['访问用户', 'people']],
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
        radius: 70,
        selectedMode: 'single',
      },
    },
  ],
}
