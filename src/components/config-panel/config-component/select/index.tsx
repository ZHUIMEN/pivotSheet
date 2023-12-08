// 多选 Select 组件
import { Select as AntdSelect } from 'antd';
import { map,filter } from 'lodash';
import { BaseComponent } from '../base';
import './index.less';

const { Option } = AntdSelect;

export class Select extends BaseComponent {
  renderContent() {
    const { config, onChange, disable } = this.props;
    const { attributeId, options, placeholder } = config;
    // const defaultValue = map(options, (option) => {
    //   return option.value;
    // });
    const defaultValue  = filter(options,(option) => {
        return option.selected;
      }).map((option) => {
        return option.value;
      });
   

    return (
      <AntdSelect
        mode="multiple"
        className="playground-select"
        placeholder={placeholder}
        size="middle"
        allowClear
        suffixIcon={true}
        defaultValue={defaultValue}
        disabled={disable}
        onChange={(value) => {
          onChange({ [attributeId]: value });
        }}
      >
        {map(options, (option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </AntdSelect>
    );
  }
}
