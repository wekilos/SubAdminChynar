import React,{useState} from 'react';

import {Input,Button,Tabs,Checkbox,Upload} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';


import './hasabat.css';

    const Hasabat = props=>{
        const [fileList, setFileList] = useState([
            {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
        ]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };

      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };


    const Checked = (e)=>{
        console.log(`checked = ${e.target.checked}`);
    }

    return(
        <div className='hasabat'>
            
            <div >
                <form className='hasabat-form'>
                <div className="filter">
                     <label className="hasabat-label">
                         Sürüji No :
                     </label>
                     <Input placeholder="Sürüji No" className='hasabat-input' addonAfter={<SearchOutlined/>} />
                     </div>
                <div className='mehanik-form'>
                <div className='labels'>
                    <label className="hasabat-label">
                        Garazdan berilen zat: 
                    </label>
                    {/* <ImgCrop rotate> */}
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 5 && '+ Upload'}
                        </Upload>
                    {/* </ImgCrop> */}
                </div>
                <div className='labels'>
                    <label className="hasabat-label">
                        Ýola çykan wagty: 
                    </label>
                    <Input type='date' className='hasabat-input' />
                </div>
                <div className='labels'>
                    <label className="hasabat-label">
                    Spidometriň görkezjisi: 
                    </label>
                    <Input type='text' placeholder='km...' className='hasabat-input' />
                </div>
                <div className='labels'>
                    <label className="hasabat-label">
                    Awtobusdaky ýangyjyň möçberi:
                    </label>
                    <Input type='text' placeholder='litr...' className='hasabat-input' />
                </div>
                <div>
                    <Button type='primary' shape='round' className='hasabat-button' >Hasaba al</Button>
                </div>
                
                </div>
                </form>
            </div>
        </div>
    );
};

export default Hasabat;