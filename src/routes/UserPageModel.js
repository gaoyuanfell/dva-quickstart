import React, { useEffect, useState } from "react";
import { connect } from "dva";
import { Modal, Form, Input, InputNumber, DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

function UserPageModel({ userModel, dispatch }) {
  let { visible, modelData } = userModel;

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  async function handleOk(values) {
    console.info(values);
    console.info(modelData.id);
    console.info(values.date.format(dateFormat));

    setConfirmLoading(true);

    let id = modelData.id;

    if (id) {
      await dispatch({
        type: "user/editUser",
        payload: {
          id: id,
          age: values.age,
          name: values.name,
          date: values.date.format(dateFormat)
        }
      });
    } else {
      await dispatch({
        type: "user/addUser",
        payload: {
          age: values.age,
          name: values.name,
          date: values.date.format(dateFormat)
        }
      });
    }

    setConfirmLoading(false);

    await dispatch({
      type: "user/setUserModel",
      payload: {
        modelData: values,
        visible: false
      }
    });
  }

  function handleCancel() {
    dispatch({
      type: "user/setUserModel",
      payload: {
        modelData,
        visible: false
      }
    });
  }

  useEffect(() => {
    visible &&
      form.setFieldsValue({
        age: modelData.age,
        name: modelData.name,
        date: modelData.date ? moment(modelData.date, dateFormat) : ""
      });
  }, [visible]);

  return (
    <Modal
      title="操作用户"
      getContainer={false}
      visible={visible}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      cancelText={"取消"}
      okText={"确定"}
    >
      <Form
        form={form}
        layout={"horizontal"}
        onFinish={handleOk}
        name="form_in_modal"
      >
        <Form.Item label="名称" name="name">
          <Input></Input>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber></InputNumber>
        </Form.Item>
        <Form.Item label="生日" name="date">
          <DatePicker format={dateFormat}></DatePicker>
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserPageModel.propTypes = {};

function mapStateToProps(state) {
  const { userModel } = state.user;
  return {
    userModel
  };
}

export default connect(mapStateToProps)(UserPageModel);
