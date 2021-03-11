import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import LoginForm from "../../components/forms/LoginForm";

//functions
import { mailLogin, googleLogin } from "../../functions/login";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //ログイン中動いていることを示す

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user, history]);

  const handleSubmit = (e) => {
    mailLogin(e, email, password, history, dispatch, setLoading);
  };

  const handleGoogleLogin = () => {
    googleLogin(history, dispatch);
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">処理中</h4>
          ) : (
            <h4>ログイン</h4>
          )}
          <LoginForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            MailOutlined={MailOutlined}
            Button={Button}
          />
          <Button
            onClick={handleGoogleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Googleでログイン/新規登録
          </Button>

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
