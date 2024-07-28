import { message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";

function TableForm() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`/detail/${record.id}`}>
            <Button type="link">View</Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:45943/api/Product")
      .then((response) => {
        message.success("Data fetched successfully");
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        message.error("Failed to fetch data");
        console.log(error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:45943/api/Product`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        message.success("Data deleted successfully");
        fetchData();
      })
      .catch((error) => {
        message.error("Failed to delete data");
        console.error("Error deleting data: ", error);
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/post">
        <Button style={{ marginBottom: "2rem" }} type="primary">
          Add Product
        </Button>
      </Link>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
}

export default TableForm;
