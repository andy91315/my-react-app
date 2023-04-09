import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import Cookies from 'js-cookie';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    return (<Form
        name="basic"
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        style={{maxWidth: 600}}
        initialValues={{remember: true}}
        onFinish={async (values: any) => {
            console.log('Success:', values);

            try {
                const response = await fetch('http://127.0.0.1:8080/user/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: values.username,
                        password: values.password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }
                console.log('response is: ', response);
                const result = await response.json();

                if (result) {
                    Cookies.set('username', values.username, { expires:7 });
                    console.log('result is: ', result);

                    navigate('/');
                } else {
                    alert("username or password not correct")
                }
            } catch (err) {
            } finally {
            }
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: 'Please input your username!'}]}
        >
            <Input/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
        >
            <Input.Password/>
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>)
};

export default Login;
