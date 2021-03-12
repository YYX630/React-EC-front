import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

//functions
//functions
import { getCategories, getCategorySubs } from "../../../functions/category";
import { createProduct } from "../../../functions/product";

//components
import AdminNav from "../../../components/nav/AdminNav";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["黒", "白", "灰色", "青", "赤", "オレンジ", "緑", "黄色"], //これはただの選択肢
  brands: ["東大", "京大", "シャネル", "Microsoft", "Apple"], //これもただの選択肢
  color: "",
  brand: "",
  category: "",
  subs: [], //複数選択
};

const ProductCreate = () => {
  // redux
  const { user } = useSelector((state) => ({ ...state })); //useSelectorに関数を渡している。その関数は、stateを分解する。分解することで、userを取り出せるようになる。

  // local state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // 情報取得
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

  const loadCategorySubs = (category_id) =>
    getCategorySubs(category_id)
      .then((res) => {
        console.log(res);
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

  // handlers
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        window.alert(`${res.data.title} is created`);
        window.location.reload(); //toastは、reloadで消えてしまうので、使えない。その代わりに、window.alertを使えば、reload後も残る
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //オブジェクトは、同一key複数あったら後者優先
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, category: e.target.value, subs: [] });
    loadCategorySubs(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>製品追加</h4>
          )}
          <hr />
          <br />
          {/* {JSON.stringify(values)} */}
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <br />
          <ProductCreateForm
            values={values}
            setValues={setValues}
            categories={categories}
            subOptions={subOptions}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            btn="作成"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
