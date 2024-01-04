<!--  -->
<template>
  <SheetComponent
    ref="s2"
    :sheetType="props.sheetType"
    :dataCfg="dataCfg"
    :options="defaultOption"
    :adaptive="true"
  />
</template>
<script setup>
import "@antv/s2-vue/dist/style.min.css"
import {
  shallowRef,
  watch,
  reactive,
  computed,
  defineExpose,
} from "vue"
import { SheetComponent } from "@antv/s2-vue"
import {
  download,
  copyData,
  EXTRA_FIELD,
} from "@antv/s2"
import { concat } from "lodash"
const calcFunc = (query, data) => {
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
        rowGrandTotals: false,
        rowSubTotals: false,
        columnGrandTotals: false,
        columnSubTotals: false,
      }
    },
  },
})

const defaultOption = reactive({
  style: {
    hierarchyCollapse: false,
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
  const data = copyData(s2.value.instance, ",", false)
  download(data, nameFile ?? "jack透视图")
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

defineExpose({ exportFunc })
</script>
