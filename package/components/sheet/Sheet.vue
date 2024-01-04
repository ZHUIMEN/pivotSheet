<template>
  <div class="card-out-container" style="overflow: hidden">
    <div class="custom-table">
      <slot name="operate" :data="handleExportData"> </slot>
      <div class="sheet">
        <div class="sheet-value" :class="[{'sheet-value-folded':foldList?.[3]}]">
          <div>
            <div>
              <div class="sheet-value-label">
                行头
                <div class="sheet-value-hr"></div>
                <DoubleRightOutlined @click="handleFold(0)" />
              </div>
              <div
                :class="[
                  'sheet-value-draggable',
                  { 'sheet-value-draggable-folded': foldList?.[0] },
                ]"
              >
                <sheet-draggable
                  v-model:columnList="queryOption.rows"
                ></sheet-draggable>
              </div>
            </div>

            <div class="mt-10">
              <div class="sheet-value-label">
                列头
                <div class="sheet-value-hr"></div>
                <DoubleRightOutlined @click="handleFold(1)" />
              </div>
              <div
                :class="[
                  'sheet-value-draggable',
                  { 'sheet-value-draggable-folded': foldList?.[1] },
                ]"
              >
                <sheet-draggable
                  v-model:columnList="queryOption.columns"
                ></sheet-draggable>
              </div>
            </div>
            <div class="mt-10">
              <div class="sheet-value-label">
                数值
                <div class="sheet-value-hr"></div>
                <DoubleRightOutlined @click="handleFold(2)" />
              </div>
              <div
                :class="[
                  'sheet-value-draggable',
                  { 'sheet-value-draggable-folded': foldList?.[2] },
                ]"
              >
                <div style="font-weight: 400; color: #606266">
                  置于
                  <RadioGroup
                    v-model:value="dataCfg.fields.valueInCols"
                    :style="{
                      marginLeft: '8px',
                      marginBottom: '10px',
                      color: '#606266',
                    }"
                  >
                    <Radio :value="true">行头</Radio>
                    <Radio :value="false">列头</Radio>
                  </RadioGroup>
                </div>
                <sheet-draggable
                  v-model:columnList="queryOption.values"
                ></sheet-draggable>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet-box">
          <div class="sheet-box-folded-btn">
              <DoubleLeftOutlined @click="handleFold(3)" v-if="!foldList?.[3]" />
              <DoubleRightOutlined @click="handleFold(3)" v-else />
            </div>
          <div class="sheet-tools-top">
            <RadioGroup
              v-model:value="sheetType"
              :style="{ marginBottom: '8px' }"
            >
              <Radio-button value="pivot">透视图</Radio-button>
              <Radio-button value="table">明细图</Radio-button>
            </RadioGroup>

            <div class="sheet-tools-top-right">
              <div class="sheet-tools-top-item">
                <span>列小记</span>
                <Switch
                  v-model:checked="tooltipOption.columnSubTotals"
                ></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>列总结</span>
                <Switch
                  v-model:checked="tooltipOption.columnGrandTotals"
                ></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>行小记</span>
                <Switch
                  v-model:checked="tooltipOption.rowSubTotals"
                ></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>行总结</span>
                <Switch
                  v-model:checked="tooltipOption.rowGrandTotals"
                ></Switch>
              </div>
            </div>
          </div>
          <mySheetComponent
            :data="dataCfg"
            :sheetType="sheetType"
            :toolsOptions="tooltipOption"
            ref="sheetComp"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MySheetComponent from "./MySheetComponent.vue"
import SheetDraggable from "./SheetDraggable.vue"
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons-vue"
import { filter } from "lodash"
import { toRaw } from "vue"
import { Switch,RadioGroup,Radio,RadioButton} from 'ant-design-vue';
export default {
  name: "pivot-sheet",

  props: {
    baseData: {
      type: Object,
      default: () => ({
        queryOption: {
          rows: [],
          columns: [],
          values: [],
        },
        ...MySheetComponent.defaultProps,
      }),
    },
  },
  data() {
    return {
      foldList: [false, false, false, false],
      queryOption: {
        rows: [],
        columns: [],
        values: [],
      },

      sheetType: "pivot",
      tooltipOption: {
        rowGrandTotals: false,
        rowSubTotals: false,
        columnGrandTotals: false,
        columnSubTotals: false,
      },
      dataCfg: {
        fields: {
          rows: [],
          columns: [],
          values: [],
          valueInCols: true,
        },
        data: [],
      },
    }
  },
  components: {
    SheetDraggable,
    MySheetComponent,
    DoubleRightOutlined,
    DoubleLeftOutlined,
    Switch,RadioGroup,Radio,RadioButton
  },
   watch: {
    baseData: {
      handler(newVal, _oldVal) {
        const { queryOption: result, ...Other } = newVal

        const { rows, columns, values, valueInCols } = this.getFields(result)
        if(this.dataCfg.fields.rows.length<=0||this.dataCfg.fields.columns.length<=0||this.dataCfg.fields.values.length<=0){
          this.queryOption = result
          this.dataCfg = {
            fields: {
              rows,
              columns,
              values,
              valueInCols,
            },
            ...Other,
          }
        }else{
          this.dataCfg.data = Other.data
        }
       
      },
    },
    queryOption: {
      handler(newVal, _oldVal) {
        this.dataCfg.fields = this.getFields(toRaw(newVal))
      },
      deep: true,
    },
  },
  methods: {
    handleExportData(name="透视图") {
      this.$refs.sheetComp.exportFunc(name)
    },
    handleFold(index) {
      console.log("index", index)

      this.foldList[index] = !this.foldList[index]
    },
    getFields(fields) {
      const rows = filter(fields?.rows ?? [], (option) => option.selected).map(
        (e) => e.value
      )
      const columns = filter(
        fields?.columns ?? [],
        (option) => option.selected
      ).map((e) => e.value)
      const values = filter(
        fields?.values ?? [],
        (option) => option.selected
      ).map((e) => e.value)
      return {
        rows,
        columns,
        values,
        valueInCols: fields?.valueInCols ?? this.dataCfg.fields.valueInCols,
      }
    },
  },
}
</script>

<style scoped lang="less">
@import "./index.less";
:deep(.ant-radio-group .ant-radio-group-outline span, span.ant-radio + *) {
  color: #606266;
}
</style>
