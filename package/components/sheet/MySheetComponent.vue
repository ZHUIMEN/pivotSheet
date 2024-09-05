<!--  -->
<template>
  <SheetComponent
    ref="s2"
    :sheetType="props.sheetType"
    :dataCfg="dataCfg"
    :options="defaultOption"
    :themeCfg="themeCfg"
    :adaptive="adaptive"
  />
</template>
<script setup>
import "@antv/s2-vue/dist/style.min.css"
import {
  ref,
  shallowRef,
  watch,
  reactive,
  computed,
  defineExpose,
  onMounted,
} from "vue"
import { SheetComponent  } from "@antv/s2-vue"
import {
  download,
  copyData,
  EXTRA_FIELD,
} from "@antv/s2"
import { concat } from "lodash"
const adaptive = {
  width: true,
  height: "100%",
  getContainer: () => document.getElementById('containerId'),
};
const themeCfg = ref({
  theme: {
    cell:{
      subtotal: {
        backgroundColor: "#f0f0f0",
        color: "#000",
      },
      total: {
        backgroundColor: "#d9d9d9",
        color: "#000",
      },
    },
    background: {
      color: "#fff",
    },
    colCell: {
      cell: {
        crossBackgroundColor: "#F6F6F7",
        backgroundColor: "#F6F6F7",
      },
      subtotal: {
        backgroundColor: "#f0f0f0",
        color: "#000",
      },
      total: {
        backgroundColor: "#d9d9d9",
        color: "#000",
      },
    },
    cornerCell: {
      cell: {
        crossBackgroundColor: "#F6F6F7",
        backgroundColor: "#F6F6F7",
      },
    },
    dataCell: {
      cell: {
        crossBackgroundColor: "#fff",
        backgroundColor: "#fff",
      },
    },
    rowCell: {
      //行头
      cell: {
        crossBackgroundColor: "#fff",
        backgroundColor: "#fff",
      },
    },
  },
  name: "gray",
})
const calcFunc = (query, data) => {
  // 
  //  如果是返工率，就是返工数总/生产数总
  if (query[EXTRA_FIELD] === "reworkRate") {
    const reworkQtySum = data.reduce((pre, next) => {
      return pre + next["reworkQty"]
    }, 0)

    const produceQtySum = data.reduce((pre, next) => {
      return pre + next["quantity"]
    }, 0)

    return (reworkQtySum / produceQtySum) * 100
  } else {
    const sum = data.reduce((pre, next) => {
      return pre + next[next[EXTRA_FIELD]]
    }, 0)
    return sum
  }
}

const props = defineProps({
  sheetType: {
    type: String,
    default: "pivot",
  },
  data: {
    type: Object,
    default: () => {
      return {
        fields: {
          rows: [],
          columns: [],
          values: [],
          valueInCols: true,
        },
        data: [],
        rowSubTotalsDimensions: [],
        colSubTotalsDimensions: [],
      }
    },
  },

  toolsOptions: {
    type: Object,
    default: () => {
      return {
        rowGrandTotals: true,
        rowSubTotals: true,
        columnGrandTotals: true,
        columnSubTotals: true,
      }
    },
  },
})

const defaultOption = reactive({
  style: {
    hierarchyCollapse: false,
    layoutWidthType:'compact',
  },
  tooltip: {
    operation: {
      trend: true,
      hiddenColumns: true,
      sort: true,
      onClick: (...args) => {},
    },
  },
  totals: {
    row: {
      showGrandTotals: props.toolsOptions.rowGrandTotals,
      showSubTotals: props.toolsOptions.rowSubTotals,
      reverseLayout: true,
      reverseSubLayout: true,
      totalsGroupDimensions:props.data.rowTotalsGroupDimensions,
      subTotalsDimensions: props.data.rowSubTotalsDimensions,
      calcTotals: {
        calcFunc,
      },
      calcSubTotals: {
        calcFunc,
      },
      //自定义
    },
    col: {
      showGrandTotals: props.toolsOptions.columnGrandTotals,
      showSubTotals: props.toolsOptions.columnSubTotals,
      reverseLayout: true,
      reverseSubLayout: true,
      totalsGroupDimensions:props.data.colTotalsGroupDimensions,
      subTotalsDimensions: props.data.colSubTotalsDimensions,
      calcTotals: {
        calcFunc,
      },
      calcSubTotals: {
        calcFunc,
      },
    },
  },
})
const s2 = shallowRef()

const dataCfg = computed(() => {
  //
  if (props.sheetType === "pivot") {
    return props.data
  } else {
    const tableFields = {
      columns: concat(
        [],
        props.data.fields.rows || [],
        props.data.fields.columns || [],
        props.data.fields.values || []
      ),
    }

    return {
      ...props.data,
      fields: tableFields,
    }
  }
})

const exportFunc = (nameFile) => {
  const data = copyData(s2.value.instance, ",", true)
  download(data, nameFile ?? "jack")
}

watch(
  () => props.toolsOptions,
  (newVal) => {
    if (newVal) {
      s2.value.instance.setOptions({
        totals: {
          row: {
            showGrandTotals: props.toolsOptions.rowGrandTotals,
            showSubTotals: props.toolsOptions.rowSubTotals,
            subTotalsDimensions: props.data.rowSubTotalsDimensions,
            //自定义
          },
          col: {
            showGrandTotals: props.toolsOptions.columnGrandTotals,
            showSubTotals: props.toolsOptions.columnSubTotals,
            subTotalsDimensions: props.data.colSubTotalsDimensions,
          },
        },
      })
      s2.value.instance.render()
    }
  },
  { deep: true }
)



defineExpose({ exportFunc,s2 })
</script>
