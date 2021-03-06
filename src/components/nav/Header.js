import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  GithubOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  UnlockOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//components
import Search from "../forms/Search";

const { SubMenu, Item } = Menu; //destruction、分解

const Header = () => {
  const [current, setCurrent] = useState("home");
  const [device, setDevice] = useState("pc");

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

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (
      ua.indexOf("iphone") > 0 ||
      ua.indexOf("ipod") > 0 ||
      (ua.indexOf("android") > 0 && ua.indexOf("mobile") > 0)
    ) {
      setDevice("sp");
    } else if (ua.indexOf("ipad") > 0 || ua.indexOf("android") > 0) {
      // iOS12 まで
      setDevice("tab");
    } else if (
      ua.indexOf("ipad") > -1 ||
      (ua.indexOf("macintosh") > -1 && "ontouchend" in document)
    ) {
      // iOS13 以降
      setDevice("tab");
    } else {
      setDevice("pc");
    }
  }, []);

  const mobileNav = (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu key="Home" icon={<AppstoreOutlined />} title="メニュー">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">ホーム</Link>
        </Item>
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop">商品</Link>
        </Item>
        {user && user.role === "admin" && (
          <Item icon={<UserOutlined />}>
            <Link to="/admin/dashboard">管理画面</Link>
          </Item>
        )}
        {user && user.role === "subscriber" && (
          <Item icon={<UserOutlined />}>
            <Link to="/user/history">購入履歴</Link>
          </Item>
        )}
        <Item icon={<UnlockOutlined />}>
          <Link to="/user/password">パスワード設定</Link>
        </Item>

        {!user && (
          <Item key="login" icon={<UserOutlined />}>
            <Link to="/login">ログイン</Link>
          </Item>
        )}
        {!user && (
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">新規登録</Link>
          </Item>
        )}
        {user && (
          <Item icon={<LogoutOutlined />} onClick={logout}>
            ログアウト
          </Item>
        )}
      </SubMenu>

      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );

  const pcNav = (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">ホーム</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">商品</Link>
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

      <span className="float-right p-1">
        <Search device={device} />
      </span>
    </Menu>
  );

  return <>{device === "pc" ? <>{pcNav}</> : <>{mobileNav}</>}</>;
};

export default Header;
