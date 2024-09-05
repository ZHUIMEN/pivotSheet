<template>

    <div class="custom-table">
      <slot name="operate" :data="handleExportData"> </slot>
      <div class="sheet">
        <div
          class="sheet-value"
          :class="[{ 'sheet-value-folded': foldList?.[3] }]"
        >
          <div>
            <div>
              <div class="sheet-value-label">
                {{ $t('yourOutfit') }}
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
                {{ $t('columnHead') }}
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
              {{ $t('numericalValue') }}
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
                  {{$t('put')}}
                  <RadioGroup
                    v-model:value="dataCfg.fields.valueInCols"
                    :style="{
                      marginLeft: '8px',
                      marginBottom: '10px',
                      color: '#606266',
                    }"
                  >
                    <Radio :value="true">{{ $t("yourOutfit") }}</Radio>
                    <Radio :value="false">  {{ $t('columnHead') }}</Radio>
                  </RadioGroup>
                </div>
                <sheet-draggable
                  v-model:columnList="queryOption.values"
                ></sheet-draggable>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet-box" >
          <div class="sheet-box-folded-btn">
            <DoubleLeftOutlined @click="handleFold(3)" v-if="!foldList?.[3]" />
            <DoubleRightOutlined @click="handleFold(3)" v-else />
          </div>
          <div class="sheet-tools-top">
            <RadioGroup
              v-model:value="sheetType"
              :style="{ marginBottom: '8px' }"
            >
              <Radio-button value="pivot">{{ $t('perspectiveView') }}</Radio-button>
              <Radio-button value="table">{{ $t('detailedDiagram') }}</Radio-button>
            </RadioGroup>

            <div class="sheet-tools-top-right">
              <div class="sheet-tools-top-item">
                <span>{{ $t('listTheNotes') }}</span>
                <Switch
                  v-model:checked="tooltipOption.columnSubTotals"
                ></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>{{$t('columnSummary')}}</span>
                <Switch
                  v-model:checked="tooltipOption.columnGrandTotals"
                ></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>{{ $t('xingxiaoji') }}</span>
                <Switch v-model:checked="tooltipOption.rowSubTotals"></Switch>
              </div>
              <div class="sheet-tools-top-item">
                <span>{{ $t('summary') }}</span>
                <Switch v-model:checked="tooltipOption.rowGrandTotals"></Switch>
              </div>
            </div>
          </div>
          <div id='containerId' class="sheet-box-h">
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
import MySheetComponent from "./MySheetComponent.vue";
import SheetDraggable from "./SheetDraggable.vue";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons-vue";
import { filter, groupBy, mapValues, sumBy } from "lodash";
import { toRaw } from "vue";
import { Switch, RadioGroup, Radio, RadioButton } from "ant-design-vue";
import { S2Event,setLang } from "@antv/s2";
export default {
  name: "pivot-sheet",

  props: {
    i18n: {
      type: Object,
      default: () => ({}),
    },
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
        totalData:[],
      },
    };
  },
  components: {
    SheetDraggable,
    MySheetComponent,
    DoubleRightOutlined,
    DoubleLeftOutlined,
    Switch,
    RadioGroup,
    Radio,
    RadioButton,
  },
  watch: {
    baseData: {
      handler(newVal, _oldVal) {
        const { queryOption: result, ...Other } = newVal;
        const { rows, columns, values, valueInCols } = this.getFields(result);
        if (
          this.dataCfg.fields.rows.length <= 0 ||
          this.dataCfg.fields.columns.length <= 0 ||
          this.dataCfg.fields.values.length <= 0
        ) {
          this.queryOption = result;
          this.dataCfg = {
            fields: {
              rows,
              columns,
              values,
              valueInCols,
            },
            ...Other,
          };
        } else {
          this.dataCfg.data = Other.data;
          this.dataCfg.totalData = []
        }
      },
    },
    queryOption: {
      handler(newVal, _oldVal) {
        var old = this.getFields(toRaw(newVal));
        const finalResult = this.groupAndSum(
          this.dataCfg.data,
          [...old.rows, ...old.columns],
          old.values
        );
        this.dataCfg.totalData = finalResult
        this.dataCfg.fields = old;
      },
      deep: true,
    },
  },
  methods: {
    groupAndSum(data, groupByDimensions, sumFields) {
      // 使用 groupBy 进行分组
      const groupedData = groupBy(data, (item) =>
        groupByDimensions.map((dim) => item[dim]).join("|")
      );

      // 对分组后的数据进行汇总计算
      const result = mapValues(groupedData, (group) => {
        const firstItem = group[0];
        const resultItem = {};
        groupByDimensions.forEach((dim) => {
          resultItem[dim] = firstItem[dim];
        });
        sumFields.forEach((field) => {
          resultItem[field] = sumBy(group, field);
        });
        return resultItem;
      });

      // 将结果转换为数组
      return Object.values(result);
    },

    handleExportData(name = "透视图") {
      this.$refs.sheetComp.exportFunc(name);
    },
    handleFold(index) {
      

      this.foldList[index] = !this.foldList[index];
    },
    getFields(fields) {
      const rows = filter(fields?.rows ?? [], (option) => option.selected).map(
        (e) => e.value
      );
      const columns = filter(
        fields?.columns ?? [],
        (option) => option.selected
      ).map((e) => e.value);
      const values = filter(
        fields?.values ?? [],
        (option) => option.selected
      ).map((e) => e.value);
      return {
        rows,
        columns,
        values,
        valueInCols: fields?.valueInCols ?? this.dataCfg.fields.valueInCols,
      };
    },
  },
  created() {
    console.log('=============this.i18n=======================');
    console.log(this.i18n.locale);
    console.log('====================================');
    if(this.i18n.locale !=='zh_CN'){

      setLang('en_US')
    }
  }
};
</script>

<style scoped lang="less">
@import "./index.less";
:deep(.ant-radio-group .ant-radio-group-outline span, span.ant-radio + *) {
  color: #606266;
}

.custom-table{
  height: 100%;
  overflow: hidden;
}
</style>
