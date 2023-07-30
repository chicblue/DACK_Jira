import React from 'react'

import { Button, Drawer,  Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/configStore';
import { drawerComponentContent, drawerOpenClose } from '../../Redux/Reducers/drawerReducers';
type Props = {}

export default function ModalDrawer({}: Props) {
    const {visible,componentCotent,callBackSubmit,title} = useSelector((state: RootState) => state.drawerReducers);
    
    const dispatch:DispatchType = useDispatch();

  
    const onClose = () => {
      const actionDrawer = drawerOpenClose(false);
      dispatch(actionDrawer);
    };
  
   
    return (
      <>
      
        <Drawer
          title={title}
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