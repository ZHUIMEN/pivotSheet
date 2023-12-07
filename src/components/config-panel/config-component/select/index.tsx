// 多选 Select 组件
import { Select as AntdSelect } from 'antd';
import {filter,map } from 'lodash';
import { BaseComponent } from '../base';
import './index.less';

const { Option } = AntdSelect;

export class Select extends BaseComponent {
  state = {
    value:  filter(this.props.config.options,(option) => {
      return option.selected;
    }).map((option) => {
      return option.value;
    })
  };

  handleChange = (value) => {
    const { config:{attributeId},onChange } = this.props;
    this.setState({ value });
    onChange({ [attributeId]: value });
  };

  renderContent() {
    const { config, disable } = this.props;
    const { options, placeholder } = config;
  
    // const defaultValue = map(options, (option) => {
    //   return option.value;
    // });
  //  const a = cloneDeep(options)
  //   const defaultValue  = filter(a,(option) => {
  //       return option.selected;
  //     }).map((option) => {
  //       return option.value;
  //     });
   
  //  this.setState({value:defaultValue})
  //  console.log(defaultValue)
    return (
      <AntdSelect
        value={this.state.value}
        mode="multiple"
        className="playground-select"
        placeholder={placeholder}
        size="middle"
        allowClear
        suffixIcon={true}
        // defaultValue={defaultValue}
        disabled={disable}
        onChange={this.handleChange}
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
