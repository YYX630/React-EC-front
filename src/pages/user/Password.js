import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ボタン押したときの関数
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password Updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  //formのrenderingの取り出し
  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>新しいパスワード</label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="6文字以上"
            disabled={loading} //loading=trueの時、disabled される。
            value={password}
          />
          <br />
          <button
            className="btn btn-primary"
            disabled={!password || password.length < 6 || loading}
          >
            更新
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">処理中</h4>
          ) : (
            <h4>パスワード設定</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
