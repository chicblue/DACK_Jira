import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Space } from 'antd';
import Login from '../Pages/Login/Login';
import { url } from 'inspector';
type Props = {}

const { Header, Footer, Sider, Content } = Layout;




export default function SignUpInTemplate({}: Props) {
  return (
    <>
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <Layout>
      <Sider width={window.innerWidth/1.7} style={{height:window.innerHeight,backgroundImage:`url(${require('../assets/img/img/phuca.webp')})`,backgroundSize:'auto'}}>

        </Sider>

        
        <Content >
            <Outlet></Outlet>
        </Content>
    </Layout>




    </Space>
  
    
    </>
  )
}