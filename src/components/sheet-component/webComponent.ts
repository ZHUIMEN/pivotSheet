import { createComponent } from '@lit/react';
import React from 'react';
import {CustomSheet} from './index';

const MyWebComponent = createComponent(
    
    {
        react: React,
        tagName: 'my-react-component',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        elementClass: CustomSheet,
        displayName: 'MyWebComponent',
    
    }
    
);

export default MyWebComponent;