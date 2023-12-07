

// 示例用法
const data = [
    {
      "number": 7789,
      "price": 300,
      "province": "浙江省",
      "city": "杭州市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 2367,
      "price": 270,
      "province": "浙江省",
      "city": "绍兴市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 3877,
      "price": 260,
      "province": "浙江省",
      "city": "宁波市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 4342,
      "price": 310,
      "province": "浙江省",
      "city": "舟山市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 5343,
      "price": 2100,
      "province": "浙江省",
      "city": "杭州市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 632,
      "price": 1950,
      "province": "浙江省",
      "city": "绍兴市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 7234,
      "price": 1800,
      "province": "浙江省",
      "city": "宁波市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 834,
      "price": 2000,
      "province": "浙江省",
      "city": "舟山市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 945,
      "price": 5,
      "province": "浙江省",
      "city": "杭州市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 1304,
      "price": 6,
      "province": "浙江省",
      "city": "绍兴市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 1145,
      "price": 7,
      "province": "浙江省",
      "city": "宁波市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 1432,
      "price": 4,
      "province": "浙江省",
      "city": "舟山市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 1343,
      "price": 1,
      "province": "浙江省",
      "city": "杭州市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 1354,
      "price": 0.5,
      "province": "浙江省",
      "city": "绍兴市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 1523,
      "price": 0.8,
      "province": "浙江省",
      "city": "宁波市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 1634,
      "price": 0.7,
      "province": "浙江省",
      "city": "舟山市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 1723,
      "price": 240,
      "province": "四川省",
      "city": "成都市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 1822,
      "price": 230,
      "province": "四川省",
      "city": "绵阳市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 1943,
      "price": 200,
      "province": "四川省",
      "city": "南充市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 2330,
      "price": 210,
      "province": "四川省",
      "city": "乐山市",
      "type": "家具",
      "sub_type": "桌子"
    },
    {
      "number": 2451,
      "price": 2100,
      "province": "四川省",
      "city": "成都市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 2244,
      "price": 2000,
      "province": "四川省",
      "city": "绵阳市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 2333,
      "price": 2050,
      "province": "四川省",
      "city": "南充市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 2445,
      "price": 1900,
      "province": "四川省",
      "city": "乐山市",
      "type": "家具",
      "sub_type": "沙发"
    },
    {
      "number": 2335,
      "price": 8,
      "province": "四川省",
      "city": "成都市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 245,
      "price": 5,
      "province": "四川省",
      "city": "绵阳市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 2457,
      "price": 3,
      "province": "四川省",
      "city": "南充市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 2458,
      "price": 5,
      "province": "四川省",
      "city": "乐山市",
      "type": "办公用品",
      "sub_type": "笔"
    },
    {
      "number": 4004,
      "price": 0.8,
      "province": "四川省",
      "city": "成都市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 3077,
      "price": 0.5,
      "province": "四川省",
      "city": "绵阳市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 3551,
      "price": 0.5,
      "province": "四川省",
      "city": "南充市",
      "type": "办公用品",
      "sub_type": "纸张"
    },
    {
      "number": 352,
      "price": 0.6,
      "province": "四川省",
      "city": "乐山市",
      "type": "办公用品",
      "sub_type": "纸张"
    }
  ]
  function calculateTotalData(data, rowSubTotalsDimensions, colSubTotalsDimensions) {
    let totals = {};

    // 遍历原始数据
    data.forEach(item => {
        rowSubTotalsDimensions.forEach(rowDim => {
            colSubTotalsDimensions.forEach(colDim => {
                // 构建键，用于标识唯一的小计项
                let key = `${item[rowDim] || 'all'}-${item[colDim] || 'all'}`;

                // 初始化统计对象
                if (!totals[key]) {
                    totals[key] = {
                        number: 0,
                        price: 0,
                        ...rowDim && { [rowDim]: item[rowDim] },
                        ...colDim && { [colDim]: item[colDim] }
                    };
                }

                // 累加数量和价格
                totals[key].number += item.number;
                totals[key].price += item.price;
            });
        });
    });

    // 转换结果为数组
    return Object.values(totals);
}

// 使用函数
const totalData = calculateTotalData(data, ["province"], ["type", "sub_type"]);
console.log(totalData);