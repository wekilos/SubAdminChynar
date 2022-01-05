import React from 'react';

import {Input,Button,Tabs} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import Hasabat from './hasabat';

import  './garaz.css';
const {TabPane}=Tabs;
const Garaz = props =>{
    return(
        <div className="garaz">
            <Hasabat/>
        </div>
    );
};

export default Garaz; 