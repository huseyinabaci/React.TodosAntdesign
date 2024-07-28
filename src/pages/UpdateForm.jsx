import React from "react";
import { Button, Form, Input, message } from "antd";
import TextArea from 'antd/es/input/TextArea';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateForm() {
  const {id} = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:45943/api/Product/${id}`)
      .then(response => {
        form.setFieldsValue(response.data);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to fetch data');
        setLoading(false);
      });
  }, [id,form]);

  const onFinish = (values) => {

    const updateValue = {...values, id};
    
    axios.put("http://localhost:45943/api/Product", updateValue)
      .then((res) => {
        message.success("Product update successfully");
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        message.error("Failed to update product");
        console.log(err);
      });
  }

  return (
    <Form form={form} onFinish={onFinish}>

      <h1>Product Update Form</h1>

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
        <Button type="primary" htmlType="submit">Güncelle</Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateForm;
