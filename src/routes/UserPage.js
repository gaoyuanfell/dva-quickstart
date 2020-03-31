import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { connect } from "dva";

import styles from "./UserPage.css";

import UserPageModel from "./UserPageModel";

function UserPage({ dispatch, userPage }) {
  let { list, pageNum, pageSize, total, loading } = userPage;

  let [current, setCurrent] = useState(pageNum);
  useEffect(() => {
    dispatch({
      type: "user/getList",
      payload: { pageSize: pageSize, pageNum: current }
    });
  }, [current]);

  function cancelChange(pageNum, pageSize) {
    setCurrent(pageNum);
  }

  function confirmDelete(record) {
    dispatch({
      type: "user/remove",
      payload: record.id
    });
    message.info("删除成功！");
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button.Group>
          <Button
            size={"small"}
            onClick={() =>
              dispatch({ type: "user/showUserModelByInfo", payload: record.id })
            }
          >
            修改
          </Button>

          <Popconfirm
            placement="top"
            title={"Are you sure to delete this task?"}
            onConfirm={() => confirmDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button size={"small"}>删除</Button>
          </Popconfirm>
        </Button.Group>
      )
    }
  ];

  function addUser() {
    dispatch({
      type: "user/setUserModel",
      payload: {
        modelData: {},
        visible: true
      }
    });
  }

  return (
    <div style={{ margin: "10px" }}>
      <div className={styles["table-operations"]}>
        <Button
          className={styles["table-operations > button"]}
          onClick={addUser}
        >
          添加
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        bordered
        loading={loading}
        pagination={{
          current: pageNum,
          pageSize: pageSize,
          total: total,
          onChange: cancelChange
        }}
      />
      <UserPageModel></UserPageModel>
    </div>
  );
}

UserPage.propTypes = {};

function mapStateToProps(state) {
  const { userPage } = state.user;
  return {
    userPage
  };
}

export default connect(mapStateToProps)(UserPage);
