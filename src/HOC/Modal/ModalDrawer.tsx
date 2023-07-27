import React from 'react'
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/configStore';
import { drawerComponentContent, drawerOpenClose } from '../../Redux/Reducers/drawerReducers';
type Props = {}

export default function ModalDrawer({}: Props) {
    const {visible,componentCotent} = useSelector((state: RootState) => state.drawerReducers);
    
    const dispatch:DispatchType = useDispatch();
    const showDrawer = () => {
      const actionDrawer = drawerOpenClose(true);
      const actionContent = drawerComponentContent('456')
      dispatch(actionDrawer);
      dispatch(actionContent);

    };
  
    const onClose = () => {
      const actionDrawer = drawerOpenClose(false);
      dispatch(actionDrawer);
    };
  
   
    return (
      <>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          visible={visible}
          // open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary">
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