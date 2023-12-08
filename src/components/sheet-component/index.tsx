import React, { useEffect, forwardRef, useImperativeHandle } from "react"
import { SheetComponent, SheetComponentOptions } from "@antv/s2-react"
import {
  type S2DataConfig,
  type ThemeCfg,
  getPalette,
  generatePalette,
  download,
  copyData as getSheetData,
  EXTRA_FIELD,
} from "@antv/s2"

import "@antv/s2-react/dist/style.min.css"
import { concat, isEmpty, merge } from "lodash"
import "./index.css"
export type Adaptive =
  | boolean
  | {
      width?: boolean
      height?: boolean
      getContainer?: () => HTMLElement
    }
export type SheetType =
  | "pivot"
  | "table"
  | "gridAnalysis"
  | "strategy"
  | "editable"
type Props = {
  sheetConfig: any
}
const getExampleDataCfg = (sheetConfig, sheetType) => {
  const { rows, columns, values, valueLocation } = sheetConfig
  const pivotFields = {
    rows,
    columns,
    values,
    valueInCols: valueLocation && valueLocation === "column",
  }
  const tableFields = {
    columns: concat([], rows || [], columns || [], values || []),
  }
  if (sheetType === "pivot") {
    return { ...sheetConfig, fields: pivotFields }
  }
  return { ...sheetConfig, fields: tableFields }
}

const getImportDataCfg = (sheetConfig, sheetType) => {
  const { importData, valueLocation } = sheetConfig
  const { fields } = importData
  const pivotFields = {
    ...fields,
    valueInCols: valueLocation && valueLocation === "column",
  }
  const { rows, columns, values } = fields
  const tableFields = {
    columns: concat([], rows || [], columns || [], values || []),
  }
  if (sheetType === "pivot") {
    return { ...importData, fields: pivotFields }
  }
  return { ...importData, fields: tableFields }
}
const calcFunc = (query, data) => {
  //   {
  //     "produceQty": 100,
  //     "input": 5,
  //     "quantity": 4,
  //     "reworkQty": 4,
  //     "reworkRate": 100.00,
  //     "processDate": "2023-12-06",
  //     "section": "吊挂",
  //     "lineNo": 7,
  //     "styleNo": "透视屏数据A款",
  //     "name": "透视屏数据A款",
  //     "moNo": "透视屏数据A款_1",
  //     "scheduleNo": "10",
  //     "color": "透视屏数据A款",
  //     "size": "透视屏数据A款",
  //     "poNo": "透视屏数据A款",
  //     "lot": "透视屏数据A款",
  //     "cutNo": "透视屏数据A款"
  // },
  // console.log('=======query, data=============================');
  // console.log(query, data);
  // console.log('====================================');
  //  如果是返工率，就是返工数总/生产数总
  if (query[EXTRA_FIELD] === "reworkRate") {
    console.log(query, data,'=====================')
    const reworkQtySum = data.reduce((pre, next) => {
      return pre + next["reworkQty"]
    }, 0)
    console.log("返工总数=>", reworkQtySum)
    const produceQtySum = data.reduce((pre, next) => {
      return pre + next["quantity"]
    }, 0)
    console.log("生产数总=>", produceQtySum)
    return (reworkQtySum / produceQtySum) * 100
  } else {
    const sum = data.reduce((pre, next) => {
      return pre + next[next[EXTRA_FIELD]]
    }, 0)
    return sum
  }
}

export const CustomSheet = forwardRef(
  (props: Props, ref: React.MutableRefObject<any>) => {
    const [sheetType, setSheetType] = React.useState<SheetType>("pivot")
    // const [loading, setLoading] = React.useState<boolean>(true);
    const [dataCfg, setDataCfg] = React.useState<S2DataConfig>()
    const [options, setOptions] = React.useState<SheetComponentOptions>()
    const [themeCfg, setThemeCfg] = React.useState<ThemeCfg>({
      name: "default",
    })
    const [adaptive, setAdaptive] = React.useState<Adaptive>(true)
    const [showPagination, setShowPagination] = React.useState<boolean>(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const sheetRef = React.useRef(null)
    const { sheetConfig } = props

    const exportFunc = () => {
      const data = getSheetData(sheetRef.current, ",", false)
      download(data, "sheetData")
    }
    useImperativeHandle(
      ref,
      () => {
        return {
          exportFunc: exportFunc,
        }
      },
      []
    )

    useEffect(() => {
      if (!sheetConfig?.sheetType) {
        return
      }
      setSheetType(sheetConfig?.sheetType)
    }, [sheetConfig?.sheetType])

    useEffect(() => {
      const dataCfg = getExampleDataCfg(sheetConfig, sheetType)
      setDataCfg(dataCfg)
      // setLoading(false);
    }, [
      sheetConfig?.rows,
      sheetConfig?.columns,
      sheetConfig?.values,
      sheetConfig.data,
    ])

    useEffect(() => {
      if (
        isEmpty(sheetConfig?.dataSource) ||
        sheetConfig?.dataSource === "exampleData" ||
        isEmpty(sheetConfig?.importData)
      ) {
        const dataCfg = getExampleDataCfg(sheetConfig, sheetType)
        setDataCfg(dataCfg)
      } else if (!isEmpty(sheetConfig?.importData)) {
        const dataCfg = getImportDataCfg(sheetConfig, sheetType)
        setDataCfg(dataCfg)
      }
    }, [
      sheetConfig?.importData,
      sheetConfig?.dataSource,
      sheetConfig?.valueLocation,
      sheetType,
    ])

    useEffect(() => {
      const {
        hierarchyType,
        widthChange,
        sheetWidth,
        sheetHeight,
        frozenRowHeader,
        rowSubTotals,
        rowGrandTotals,
        columnSubTotals,
        columnGrandTotals,
      } = sheetConfig
      const mergedOptions = merge(options, {
        hierarchyType,
        style: { layoutWidthType: widthChange },
        width: sheetWidth,
        height: sheetHeight,
        frozenRowHeader,
        pagination: showPagination && {
          pageSize: 10,
          current: 1,
        },
        totals: {
          row: {
            showGrandTotals: rowGrandTotals,
            showSubTotals: rowSubTotals,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: sheetConfig.rowSubTotalsDimensions,
            calcTotals: {
              calcFunc
            },
            calcSubTotals: {
              calcFunc
            },
            //自定义
          },
          col: {
            showGrandTotals: columnGrandTotals,
            showSubTotals: columnSubTotals,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: sheetConfig.colSubTotalsDimensions,
            calcTotals: {
              calcFunc
            },
            calcSubTotals: {
              calcFunc,
            },
          },
        },
      })
      setOptions({ ...mergedOptions })
    }, [
      sheetConfig?.hierarchyType,
      sheetConfig?.subTotalsDimensions,
      sheetConfig?.colSubTotalsDimensions,
      sheetConfig?.widthChange,
      sheetConfig?.sheetWidth,
      sheetConfig?.sheetHeight,
      sheetConfig?.frozenRowHeader,
      showPagination,
      sheetConfig?.rowSubTotals,
      sheetConfig?.rowGrandTotals,
      sheetConfig?.columnSubTotals,
      sheetConfig?.columnGrandTotals,
    ])

    useEffect(() => {
      const { theme } = sheetConfig
      setThemeCfg({ name: theme })
    }, [sheetConfig?.theme])

    useEffect(() => {
      if (!sheetConfig?.themeColor) {
        return
      }
      const { theme, themeColor } = sheetConfig
      const palette = getPalette(theme || "default")
      const newPalette = generatePalette({
        ...palette,
        brandColor: themeColor?.hex || "#E0E9FD",
      })
      setThemeCfg({ name: theme, palette: newPalette })
    }, [sheetConfig?.themeColor])

    useEffect(() => {
      const { adaptive } = sheetConfig
      if (adaptive) {
        setAdaptive({
          width: true,
          height: true,
          getContainer: () => containerRef.current,
        })
      } else {
        setAdaptive(false)
        setOptions({
          width: sheetConfig?.sheetWidth ?? 600,
          height: sheetConfig?.sheetHeight ?? 480,
        })
      }
    }, [sheetConfig?.adaptive])

    useEffect(() => {
      const { showPagination } = sheetConfig
      setShowPagination(showPagination)
    }, [sheetConfig?.showPagination])

    useEffect(() => {
      const { showSeriesNumber, showPagination } = sheetConfig
      setOptions({
        showSeriesNumber,
        pagination: showPagination && {
          pageSize: 10,
          current: 1,
        },
      })
    }, [sheetConfig?.showSeriesNumber])

    return (
      <div className="sheet-container" ref={containerRef}>
        <SheetComponent
          //  onAfterRender={()=>setLoading(false)}
          ref={sheetRef}
          // header={{ exportCfg: { open: true } }}
          dataCfg={dataCfg}
          options={{ ...options, interaction: { overscrollBehavior: "none" } }}
          themeCfg={themeCfg}
          sheetType={sheetType}
          // loading={loading}
          adaptive={adaptive}
          showPagination={showPagination}
        />
      </div>
    )
  }
)
