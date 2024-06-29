import React from 'react';
import { Space, Table, Tag } from 'antd';
const data = [
  {
    id: '1',
    article: 'React',
    author: 'Facebook',
    content: 'React is a JavaScript library for building user interfaces.',
    updateDay: '2021-09-01',
    active: ['Hoạt động'],
  },
  {
    id: '2',
    article: 'Vue',
    author: 'Evan You',
    content: 'Vue.js is a progressive JavaScript framework.',
    updateDay: '2021-09-02',
    active: ['Hoạt động'],
  },
  {
    id: '3',
    article: 'Angular',
    author: 'Google',
    content: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
    updateDay: '2021-09-03',
    active: ['Nghỉ'],
  },
  {
    id: '4',
    article: 'Node.js',
    author : 'Ryan Dahl',
    content: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
    updateDay: '2021-09-04',
    active: ['Hoạt động'],
  },
  {
    id: '5',
    article: 'Express.js',
    author: 'TJ Holowaychuk',
    content: 'Express.js, or simply Express, is a back end web application framework for Node.js.',
    updateDay: '2021-09-05',
    active: ['Nghỉ'],
  },
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Article',
    dataIndex: 'article',
    key: 'article',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
    width: '40%',
  },
  {
    title: 'Update Day',
    dataIndex: 'updateDay',
    key: 'updateDay',
  },
  {
    title: 'Active',
    key: 'active',
    dataIndex: 'active',
    render: (_, { active }) => (
      <>
        {active.map((tag) => {
          let color = tag.length > 5 ? 'green' : 'blue';
          if (tag === 'Nghỉ') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const TableCustom = () => <Table columns={columns} dataSource={data} />;
export default TableCustom;