import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let params = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      //これはAppでrouteされてるわけじゃないので、historyはpropsに渡されていない。
      history.push({
        pathname: "/login",
        state: { from: `/product/${params.slug}` }, //react-router-domのstateです。
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "評価" : "ログインして評価"}
      </div>
      <Modal
        title="星を付けてください"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("評価を受け付けました");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
