import { Menu, Table } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import TableComponents from "../components/tables";
import "./index.css";

function Index() {
    let [items, setItems] = useState([
        {
            label: 'project',
            key: '1',
            icon: <MailOutlined />,
        },
        {
            label: 'project_document',
            key: '2',
            icon: <MailOutlined />,
        },
        {
            label: 'project_manager',
            key: '3',
            icon: <MailOutlined />,
        },
        {
            label: 'project_material_relation',
            key: '4',
            icon: <MailOutlined />,
        },
        {
            label: 'user',
            key: '5',
            icon: <MailOutlined />,
        },
    ]);
    const fetchData = async () => {
        fetch("http://127.0.0.1:3000/tables")
            .then((response) => response.json())
            .then((data) => {
                const initArr = data.data;
                const arrs = [];
                initArr.map((item, key) => {
                    arrs.push({
                        label: item,
                        key: key,
                        icon: <MailOutlined />
                    })
                })
                setItems(arrs)
            })
    }
    useEffect(() => {
        fetchData()
    },[])
    function onClickFun(e) {
        setCurrent(e.key);
    }
    const [current, setCurrent] = useState('0');
    return (
        <div className="indexPage">
            <div>
                <h3 style={{ textAlign: 'center', width: '256px' }} >表</h3>
                <Menu onClick={onClickFun} selectedKeys={[current]} style={{ width: '256px' }} mode="inline" items={items}></Menu>
            </div>
            <TableComponents data={items[Number(current)].label} />
        </div>
    )
}

export default Index;