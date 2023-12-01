import React, { useMemo } from 'react';
// import ConfigToken from './config-token';
import { AttributeTree } from './attribute-tree';
import { AttributeComponentProps } from './types';

type Props = {
  attributes: object;
  // 配置端变化
  onConfigChange: (customConfig: object) => void;
  configToken: AttributeComponentProps;
};

export const ConfigPanel: React.FC<Props> = (props) => {
  const { attributes, onConfigChange,configToken } = props;
  const relations = useMemo(() => {
    return   [{
      fromAttributeId: 'values',
      toAttributeId: 'valueLocation',
      action: 'disable',
      value: [],
      operator: 'EMPTY',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'valueLocation',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'hierarchyType',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'frozenRowHeader',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'rowSubTotals',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'rowGrandTotals',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'columnSubTotals',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'sheetType',
      toAttributeId: 'columnGrandTotals',
      action: 'disable',
      value: 'table',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'widthChange',
      toAttributeId: 'adaptive',
      action: 'disable',
      value: 'compact',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'widthChange',
      toAttributeId: 'sheetWidth',
      action: 'disable',
      value: 'compact',
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'adaptive',
      toAttributeId: 'sheetWidth',
      action: 'disable',
      value: true,
      operator: 'EQUAL',
    },
    {
      fromAttributeId: 'adaptive',
      toAttributeId: 'sheetHeight',
      action: 'disable',
      value: true,
      operator: 'EQUAL',
    }];
  }, []);

  return (
    <AttributeTree
      attributes={attributes}
      config={configToken}
      relations={relations}
      onChange={(attrs) => {
        onConfigChange(attrs);
      }}
    />
  );
};
