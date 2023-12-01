import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import App from './App.tsx'
import './index.css'
import zhCN from 'antd/locale/zh_CN';
dayjs.locale('zh-cn');
import 'dayjs/locale/zh-cn';
// import 'antd/dist/antd.min.css';
import 'iframe-resizer/js/iframeResizer.contentWindow';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
