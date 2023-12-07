import "@antv/s2-react/dist/style.min.css"
import { CustomSheet } from "./components/sheet-component/index"
import { useRef, useLayoutEffect, useState } from "react"
import { ConfigPanel } from "./components/config-panel"
import { AttributeComponentProps } from "./components/config-panel/types"
import { map,filter } from "lodash"

declare global {
  interface Window {
    iFrameResizer: any
    parentIFrame: {
      sendMessage: (message: string) => void
    }
  }
}

const config: AttributeComponentProps = {
  type: "query-filter",
  children: [
    {
      type: "tab-pane",
      displayName: "数据",
      children: [
        {
          type: "select",
          displayName: "行头",
          attributeId: "rows",
          placeholder: "请选择行头数据",
          options: [
          ],
        },
        {
          type: "select",
          displayName: "列头",
          attributeId: "columns",
          placeholder: "请选择列头数据",
          options: [
          ],
        },
        {
          type: "select",
          displayName: "数值",
          attributeId: "values",
          placeholder: "请选择数值数据",
          options: [
          ],
        },
        {
          type: "radio",
          displayName: "数值置于",
          attributeId: "valueLocation",
          defaultValue: "row",
          options: [
            {
              label: "行头",
              value: "row",
            },
            {
              label: "列头",
              value: "column",
            },
          ],
        },
        {
          type: "radio",
          displayName: "视图",
          attributeId: "sheetType",
          defaultValue: "pivot",
          options: [
            {
              label: "透视",
              value: "pivot",
            },
            {
              label: "明细",
              value: "table",
            },
          ],
        },

        {
          type: "collapse-panel",
          displayName: "列小计/总计",
          children: [
            {
              type: "switcher",
              displayName: "列小计",
              attributeId: "columnSubTotals",
            },
            {
              type: "switcher",
              displayName: "列总计",
              attributeId: "columnGrandTotals",
            },
          ],
        },

        {
          type: "collapse-panel",
          displayName: "行小计/总计",
          children: [
            {
              type: "switcher",
              displayName: "行小计",
              attributeId: "rowSubTotals",
            },
            {
              type: "switcher",
              displayName: "行总计",
              attributeId: "rowGrandTotals",
            },
          ],
        },
      ],
    },
  ],
}

const App = () => {
  const [showTools, setShowTools] = useState(false)
  const customSheetRef = useRef<any>()
  const [toolsConfig, setToolsConfig] =
    useState<AttributeComponentProps>()
  const [customConfig, setCustomConfig] = useState({
    // ...sheetDataCfg.fields,
    ...{ adaptive: true },
  })

  useLayoutEffect(() => {
    window.iFrameResizer = {
      onMessage: (e) => {
        // const data = JSON.parse(e)
        console.log("setShowTools=>", e)
        if (e.type === "data") {
          const result = e.data?.queryOption;
          const rows = filter(result.rows,option=>option.selected).map(e=>e.value)
          const columns = filter(result.columns,option=>option.selected).map(e=>e.value)
          const values = filter(result.values,option=>option.selected).map(e=>e.value)
          setToolsConfig(() => {
            const oldVal = config
             oldVal.children?.[0].children.splice(
              0,
              3,
              {
                type: "select",
                displayName: "行头",
                attributeId: "rows",
                placeholder: "请选择行头数据",
                options:e.data?.queryOption.rows
              },
              {
                type: "select",
                displayName: "列头",
                attributeId: "columns",
                placeholder: "请选择列头数据",
                options:e.data?.queryOption.columns
              },
              {
                type: "select",
                displayName: "数值",
                attributeId: "values",
                placeholder: "请选择数值数据",
                options:e.data?.queryOption.values
              },
            )
            return oldVal
          })
          setCustomConfig(() => {
            return { ...e.data,rows,columns, values, adaptive: true }
          })
        } else if (e.type === "showTools") {
          setShowTools(e.data)
        } else if (e.type === "export") {
          customSheetRef.current?.exportFunc()
        }

      },
      onReady(e){
        // if ('parentIFrame' in window) window.parentIFrame.sendMessage('Hello from the iFrame');
        console.log('===========子页面的=onReady加载了========================');
        console.log(e);
        console.log('====================================');
      }
    }
  }, [])

  const onConfigChange = (value) => {
    console.log('==============onConfigChange======================');
    console.log(value);
    console.log('====================================');
    setCustomConfig({ ...customConfig, ...value, adaptive: true })
  }

  return (
    <div className="h-full w-full mx-auto mx-r-1 overflow-hidden">
      <div
        className={` transition-all  overflow-hidden ${
          showTools ? "min-h-[118px]" : "h-0 "
        }`}
      >
      {toolsConfig&&  <ConfigPanel
          attributes={customConfig}
          onConfigChange={onConfigChange}
          configToken={toolsConfig}
        />}
       
      </div>
      <CustomSheet sheetConfig={customConfig} ref={customSheetRef} />
    </div>
  )
}

export default App
