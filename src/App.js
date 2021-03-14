// frameworks
import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 特別なroute処理関数
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

// 関数
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";

//icons
import { LoadingOutlined } from "@ant-design/icons";

// //components
import Header from "./components/nav/Header";

// // pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";

//using lazy
//components
// const Header = lazy(() => import("./components/nav/Header"));

// pages
// const Login = lazy(() => import("./pages/auth/Login"));
// const Register = lazy(() => import("./pages/auth/Register"));
// const Home = lazy(() => import("./pages/Home"));
// const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
// const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
// const History = lazy(() => import("./pages/user/History"));
// const Password = lazy(() => import("./pages/user/Password"));
// const Wishlist = lazy(() => import("./pages/user/Wishlist"));
// const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
// const CategoryCreate = lazy(() =>
//   import("./pages/admin/category/CategoryCreate")
// );
// const CategoryUpdate = lazy(() =>
//   import("./pages/admin/category/CategoryUpdate")
// );
// const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
// const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
// const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
// const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
// const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
// const Product = lazy(() => import("./pages/Product"));
// const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
// const SubHome = lazy(() => import("./pages/sub/SubHome"));

const App = () => {
  const dispatch = useDispatch();
  // to check firebase auth state. ち
  // usEffectはリフレッシュのたびに動く
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);

        // importしたcurrentUser　functionでaxios.postリクエストを送信。
        currentUser(idTokenResult.token)
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
      }
    });

    // clean up
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          ___React Redux EC
          <LoadingOutlined />
          MMERCE___
        </div>
      }
    >
      {/* lazyを使ったから、suspenseでラップする */}
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        />
        <AdminRoute exact path="/admin/allproducts" component={AllProducts} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />

        {/* Switchで、一つだけ表示することにできる。パスを指定しないものを最後に置くことで、Switchでどれも見つからなかったときにそれを表示する（404ページ） */}
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    </Suspense>
  );
};

export default App;
