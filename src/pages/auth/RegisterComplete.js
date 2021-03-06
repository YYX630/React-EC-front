import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.localStorage.getItem("emailForRegistration"));
    //  たまにlocal storageから消えるバグがあるが、それは、register画面のurlで登録したlocal　storageとregister complete でのlocal storageが違うから。
  }, [history]); //第二引数が変化すると第一引数の関数が稼働する。

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      ); //フルのURL
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        //1. remove email from local storage
        window.localStorage.removeItem("emailForRegistration");
        //2. get user ID token
        let user = auth.currentUser;
        //2.5 パスワード更新
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //3. redux store
        // console.log("user", user, "idTokenResult", idTokenResult);
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            //自分のサーバーからのレスポンス内容（＝firebaseから取得した詳細情報)でreduxのstatusに送る。
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        //4. redirect: history を使う
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control" value={email} disabled />

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />

        <button type="submit" className="btn btn-raised">
          Complete Registration
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
