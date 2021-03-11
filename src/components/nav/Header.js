import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  GithubOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  UnlockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { SubMenu, Item } = Menu; //destruction、分解

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));
  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
    //
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<GithubOutlined />}>
        <Link to="/">ホーム</Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">新規登録</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">ログイン</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {/* <Menu.ItemGroup title="基本設定"> */}
          {user && user.role === "subscriber" && (
            <Item icon={<UserOutlined />}>
              <Link to="/user/history">履歴</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item icon={<UserOutlined />}>
              <Link to="/admin/dashboard">管理画面</Link>
            </Item>
          )}
          <Item icon={<UnlockOutlined />}>
            <Link to="/user/password">パスワード設定</Link>
          </Item>

          <Item icon={<LogoutOutlined />} onClick={logout}>
            ログアウト
          </Item>
          {/* </Menu.ItemGroup> */}
          {/* <Menu.ItemGroup title="その他">
            <Item key="setting:3">Option 3</Item>
            <Item key="setting:4">Option 4</Item>
          </Menu.ItemGroup> */}
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
