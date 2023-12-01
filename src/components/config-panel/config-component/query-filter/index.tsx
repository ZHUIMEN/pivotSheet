import  { PureComponent } from "react"
import { map } from "lodash"
import "./index.less"
import { AttributeTree } from "../../attribute-tree"
import { AttributeComponentProps, AttributeTreeProps } from "../../types"

export class QueryFilter extends PureComponent<AttributeTreeProps> {
  
  renderTabPane = (childrenConfig: AttributeComponentProps[]) => {
   
    return map(childrenConfig, (configItem, idx) => {
      const { displayName, children } = configItem
      return (
        <div className=" grid grid-cols-4  gap-x-2"  key={`${displayName}-${idx}`}>
          {map(children, (childConfigItem, idx) => {
            return (
              <AttributeTree
                {...this.props}
                key={`${childConfigItem.displayName}-${idx}`}
                config={childConfigItem}
              />
            )
          })}
        </div>
      )
    })
  }

  render() {
    const { config } = this.props
    return (
      <div className="flex-tabs">
      {this.renderTabPane(config.children)}
      
      </div>
    )
  }
}
