import React from "react";
import { Button, Form, Input, message } from "antd";
import TextArea from 'antd/es/input/TextArea';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import

function PostForm() {

  const [form] = Form.useForm();
  const navigate = useNavigate(); 

  const onFinish = (values) => {
    axios.post("http://localhost:45943/api/Product", values)
      .then((res) => {
        message.success("Product added successfully");
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        message.error("Failed to add product");
        console.log(err);
      });
  }

  return (
    <Form form={form} onFinish={onFinish}>

      <h1>Product Form</h1>

      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea />
      </Form.Item>
      <Form.Item label="Barcode" name="barcode">
        <Input />
      </Form.Item>
      <Form.Item label="Rate" name="rate">
        <Input type="number"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Kaydet</Button>
      </Form.Item>
    </Form>
  );
}

export default PostForm;
