import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

function InputsComponent(props) {
    const url = props.type === "updata" ? `http://localhost:3000/updata/${props.tableName}` : `http://localhost:3000/addData/${props.tableName}`;
    const onFinish = (values) => {
        console.log('Success:', values);
        // const formdata = new FormData();
        // for (const key in values) {
        //     if (values.hasOwnProperty(key)) {
        //         formdata.append(key,values[key]);
        //     }
        // }
        fetch(url,{
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            console.log(data);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    
    console.log(props)
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {
                    props.data.map((item, index) => {
                        if (item.key != null) {
                            return (
                                <Form.Item label={item.key} name={item.key} key={index}>
                                    <Input />
                                </Form.Item>
                            )
                        }
                    })
                }
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default InputsComponent;