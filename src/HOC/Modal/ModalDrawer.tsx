import React from 'react'
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/configStore';
import { drawerComponentContent, drawerOpenClose } from '../../Redux/Reducers/drawerReducers';
type Props = {}

export default function ModalDrawer({}: Props) {
    const {visible,componentCotent,callBackSubmit} = useSelector((state: RootState) => state.drawerReducers);
    
    const dispatch:DispatchType = useDispatch();

  
    const onClose = () => {
      const actionDrawer = drawerOpenClose(false);
      dispatch(actionDrawer);
    };
  
   
    return (
      <>
      
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          visible={visible}
          
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={callBackSubmit } type="primary" >
                Submit
              </Button>
            </Space>
          }
        >
         {componentCotent}
        </Drawer>
      </>
    );
}