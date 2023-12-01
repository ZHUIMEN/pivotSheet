import React, { useEffect,forwardRef,useImperativeHandle} from 'react';
import { SheetComponent, SheetComponentOptions } from '@antv/s2-react';
import {
  type S2DataConfig,
  type ThemeCfg,
  getPalette,
  generatePalette,
  download,
  copyData as getSheetData,
} from '@antv/s2';

import '@antv/s2-react/dist/style.min.css';
import { concat, isEmpty, merge } from 'lodash';
import './index.css';
export type Adaptive =
  | boolean
  | {
      width?: boolean;
      height?: boolean;
      getContainer?: () => HTMLElement;
    };
    export type SheetType =
    | 'pivot'
    | 'table'
    | 'gridAnalysis'
    | 'strategy'
    | 'editable';
type Props = {
  sheetConfig: any;
};
const getExampleDataCfg = (sheetConfig,sheetType) => {
  const { rows, columns, values, valueLocation } = sheetConfig;
  const pivotFields = {
    rows,
    columns,
    values,
    valueInCols: valueLocation && valueLocation === 'column',
  };
  const tableFields = {
    columns: concat([], rows || [], columns || [], values || []),
  };
  if (sheetType === 'pivot') {
    return { ...sheetConfig, fields: pivotFields };
  }
  return { ...sheetConfig, fields: tableFields };
};
 


const getImportDataCfg = (sheetConfig,sheetType) => {
  const { importData, valueLocation } = sheetConfig;
  const { fields } = importData;
  const pivotFields = {
    ...fields,
    valueInCols: valueLocation && valueLocation === 'column',
  };
  const { rows, columns, values } = fields;
  const tableFields = {
    columns: concat([], rows || [], columns || [], values || []),
  };
  if (sheetType === 'pivot') {
    return { ...importData, fields: pivotFields };
  }
  return { ...importData, fields: tableFields };
};



export const CustomSheet = forwardRef(
  (props:Props,ref: React.MutableRefObject<any>) => {
    const [sheetType, setSheetType] = React.useState<SheetType>('pivot');
    const [dataCfg, setDataCfg] = React.useState<S2DataConfig>();
    const [options, setOptions] = React.useState<SheetComponentOptions>();
    const [themeCfg, setThemeCfg] = React.useState<ThemeCfg>({
      name: 'default',
    });
    const [adaptive, setAdaptive] = React.useState<Adaptive>(true);
    const [showPagination, setShowPagination] = React.useState<boolean>(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const sheetRef = React.useRef(null);
    const { sheetConfig } = props;
  
    const exportFunc = ()=>{
     const data = getSheetData(sheetRef.current, ',', false)
     download(data, 'sheetData');
    }
    useImperativeHandle(ref, () => {
      return {
        exportFunc:exportFunc
      };
    }, []);
    
    useEffect(() => {
      if (!sheetConfig?.sheetType) {
        return;
      }
      setSheetType(sheetConfig?.sheetType);
    }, [sheetConfig?.sheetType]);
  
    useEffect(() => {
      console.log('更新1',sheetConfig)
      const dataCfg = getExampleDataCfg(sheetConfig,sheetType);
      console.log('更新',dataCfg)
      setDataCfg(dataCfg);
    }, [sheetConfig?.rows, sheetConfig?.columns, sheetConfig?.values]);
  
    useEffect(() => {
      if (
        isEmpty(sheetConfig?.dataSource) ||
        sheetConfig?.dataSource === 'exampleData' ||
        isEmpty(sheetConfig?.importData)
      ) {
        const dataCfg = getExampleDataCfg(sheetConfig,sheetType);
        setDataCfg(dataCfg);
      } else if (!isEmpty(sheetConfig?.importData)) {
        const dataCfg = getImportDataCfg(sheetConfig,sheetType);
        setDataCfg(dataCfg);
      }
    }, [
      sheetConfig?.importData,
      sheetConfig?.dataSource,
      sheetConfig?.valueLocation,
      sheetType,
    ]);
  
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
      } = sheetConfig;
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
          },
          col: {
            showGrandTotals: columnGrandTotals,
            showSubTotals: columnSubTotals,
            reverseLayout: true,
            reverseSubLayout: true,
            subTotalsDimensions: sheetConfig.colSubTotalsDimensions,
          },
        },
      });
      setOptions({ ...mergedOptions });
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
    ]);
  
    useEffect(() => {
      const { theme } = sheetConfig;
      setThemeCfg({ name: theme });
    }, [sheetConfig?.theme]);
  
    useEffect(() => {
      if (!sheetConfig?.themeColor) {
        return;
      }
      const { theme, themeColor } = sheetConfig;
      const palette = getPalette(theme || 'default');
      const newPalette = generatePalette({
        ...palette,
        brandColor: themeColor?.hex || '#E0E9FD',
      });
      setThemeCfg({ name: theme, palette: newPalette });
    }, [sheetConfig?.themeColor]);
  
    useEffect(() => {
      const { adaptive } = sheetConfig;
      if (adaptive) {
        setAdaptive({
          width: true,
          height: true,
          getContainer: () => containerRef.current,
        });
      } else {
        setAdaptive(false);
        setOptions({
          width: sheetConfig?.sheetWidth ?? 600,
          height: sheetConfig?.sheetHeight ?? 480,
        });
      }
    }, [sheetConfig?.adaptive]);
  
    useEffect(() => {
      const { showPagination } = sheetConfig;
      setShowPagination(showPagination);
    }, [sheetConfig?.showPagination]);
  
    useEffect(() => {
      const { showSeriesNumber, showPagination } = sheetConfig;
      setOptions({
        showSeriesNumber,
        pagination: showPagination && {
          pageSize: 10,
          current: 1,
        },
      });
    }, [sheetConfig?.showSeriesNumber]);
  
    return (
      <div className="sheet-container" ref={containerRef}>
        <SheetComponent
        
          ref={sheetRef}
          // header={{ exportCfg: { open: true } }}
          dataCfg={dataCfg}
          options={{...options,interaction:{overscrollBehavior:'none'}}}
          themeCfg={themeCfg}
          sheetType={sheetType}
          adaptive={adaptive}
          showPagination={showPagination}
    
     />
      </div>
    );
  }
)


