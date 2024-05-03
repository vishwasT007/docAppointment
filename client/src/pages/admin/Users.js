import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table, Button, Space, Modal, Input, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`/api/v1/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  const handleUpdate = (user) => {
    setCurrentUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsDoctor(user.isDoctor);
    setVisible(true);
  };

  const handleEditUser = async () => {
    try {
      const res = await axios.put(`/api/v1/admin/users/${currentUser._id}`, {
        name,
        email,
        isDoctor,
      });
  
      console.log('Update response:', res);
  
      if (res.status === 200) {
        console.log('User updated successfully:', res.data);
  
        // Hide the modal after successful update
        setVisible(false);
  
        // Refresh user list
        getUsers();
      } else {
        console.log('Update request failed:', res.statusText);
      }
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };
  
  

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => <span>{record.isDoctor ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (userId, record) => (
        <Space>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button type="danger" onClick={() => handleDelete(userId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} loading={loading} rowKey="_id" />

      {/* Modal for editing user */}
      <Modal
        title="Edit User"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleEditUser}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Checkbox
          checked={isDoctor}
          onChange={(e) => setIsDoctor(e.target.checked)}
        >
          Is Doctor
        </Checkbox>
      </Modal>
    </Layout>
  );
};

export default Users;
