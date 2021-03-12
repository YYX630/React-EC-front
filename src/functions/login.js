import { auth, googleAuthProvider } from "../firebase";
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../functions/auth";

// ログイン時redirect先指定関数
const roleBasedRedirect = (res, history) => {
  // どこかに行こうとしていたのなら、それはhistory.location.state.fromにある
  let intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  } else if (res.data.role === "admin") {
    history.push("/admin/dashboard");
  } else {
    history.push("/user/history");
  }
};

// ログイン&リダイレクト
const loginAndRedirect = (token, dispatch, history) => {
  createOrUpdateUser(token)
    .then((res) => {
      //自分のサーバーからのレスポンス内容（＝firebaseから取得した詳細情報)でreduxのstatusに送る。
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: res.data.name,
          email: res.data.email,
          token: token,
          role: res.data.role,
          _id: res.data._id,
        },
      });
      // ホームへの遷移の代わりに、role based redirectを行う
      roleBasedRedirect(res, history);
    })
    .catch((err) => console.log(err));
};

//メールでログインボタンの関数
export const mailLogin = async (
  e,
  email,
  password,
  history,
  dispatch,
  setLoading
) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();
    // backendへtokenを送信し、ログイン処理をしてリダイレクト
    loginAndRedirect(idTokenResult.token, dispatch, history);

    // history.push("/"); //redirectするのでloadingをfalseにわざわざする必要なし
  } catch (error) {
    console.log(error);
    toast.error(error.message);
    setLoading(false);
  }
};

// グーグルログインボタンの関数
export const googleLogin = async (history, dispatch) => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      loginAndRedirect(idTokenResult.token, dispatch, history);
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message);
    });
};
