import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../config/config";
import { Button, Card, Form, Input } from "antd";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const Connect = () => {
    const navigate = useNavigate();
    const [errorHandle, setErrorHandle] = useState(false);
    const [errMsg, setErrMsg] = useState("Something went wrong!");
    const [username, setUsername] = useState("");
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values.username);
        setUsername(values.username);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const getConnect = () => {
        if (username) {
            try {

                axios.post(`${BASE_URL}/api/connect`,
                    {
                        username
                    }
                ).then((result) => {
                    console.log(result)
                    navigate('/chat', {
                        state: { username: username, chatHistory: result?.data?.data?.data || [] },
                    });
                }).catch((error) => {
                    console.log(error?.response?.data)
                    setErrMsg(error?.response?.data?.response_desc)
                    setErrorHandle(true);
                })

            } catch (error) {
                console.log(error)
                setErrorHandle(true);
            }
        }
    };

    return (
        <div className="w-full overflow-auto flex justify-center items-center min-h-[100vh] bg-[#ffd6e7]">
            <Card style={{ boxShadow: "20px", marginBottom: "10px", marginTop: "10px", minHeight: "10vh" }} className="overflow-auto">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="connect"
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                    scrollToFirstError
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div className="w-[100%] flex justify-between items-center">
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    type: 'string',
                                    message: 'The input is not a valid username!',
                                },
                                {
                                    required: true,
                                    message: (
                                        <p style={{ width: '200px', marginLeft: '20px', display: 'flex' }}>
                                            Please fill in your username!
                                        </p>
                                    ),
                                },
                            ]}
                            hasFeedback
                        >
                            <Input style={{ width: '200px', marginLeft: '5px', justifyContent: 'space-between', alignItems: 'center' }} />
                        </Form.Item>
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                marginTop: '-8px',
                            }}
                            onClick={getConnect}
                            htmlType="submit"
                        >
                            Connect
                        </Button>
                    </div>
                    {errorHandle && (
                        <h1 className="flex justify-center items-center text-red-500"> {errMsg} </h1>
                    )}
                </Form>
            </Card>
        </div>
    );
}

export default Connect;
