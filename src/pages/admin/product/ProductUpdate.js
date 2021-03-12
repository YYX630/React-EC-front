import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

//functions
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getProduct, updateProduct } from "../../../functions/product";

//components
import AdminNav from "../../../components/nav/AdminNav";
// import CategoryForm from "../../../components/forms/CategoryForm";
// import LocalSearch from "../../../components/forms/LocalSearch";
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

const ProductUpdate = ({ history, match }) => {
  //react-routerを使っているのでmatchが生成されて渡されている。
  // redux
  const { user } = useSelector((state) => ({ ...state })); //useSelectorに関数を渡している。その関数は、stateを分解する。分解することで、userを取り出せるようになる。

  // router
  const { slug } = match.params;

  //match の代わりにこっちをつかう方法もある。
  // let params = useParams();
  // const slug = params.slug;

  // local state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalCategoryId, setOriginalCategoryId] = useState("");
  const [originalSubsId, setOriginalSubsId] = useState([]);

  // 情報取得
  useEffect(() => {
    loadProduct();
  }, []); //最初の一回しか実行しない

  //最初の一回で使うloaders
  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        loadCategories();
        loadCategorySubs(res.data.category._id); //ここ大事
        setValues({
          ...values,
          ...res.data,
          category: res.data.category._id,
          subs: res.data.subs.map((sub) => {
            return sub._id;
          }), //idしか記録しない
        });
        //あとで戻ってこれるように、オリジナルカテゴリー、サブカテゴリ―を記憶しておこう。
        //setStateは非同期なのに注意.なのでsetOriginal(values.category)はよくない！
        setOriginalCategoryId(res.data.category._id);
        setOriginalSubsId(res.data.subs.map((sub) => sub._id));

        // console.log(res);
      })
      .catch((err) => console.log(err));
  };
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

  const loadCategorySubs = (category_id) => {
    getCategorySubs(category_id)
      .then((res) => {
        console.log(res);
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  // handlers
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value }); //オブジェクトは、同一key複数あったら後者優先
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    // setValues({ ...values, category: e.target.value, subs: [] });
    // loadCategorySubs(e.target.value);

    //代案
    //もしも元のカテゴリーを再び選択したら、元のサブを表示するようにする。
    if (e.target.value === originalCategoryId) {
      console.log("SUCCESS");
      setValues({ ...values, category: e.target.value, subs: originalSubsId });
    } else {
      setValues({ ...values, category: e.target.value, subs: [] });
    }
    loadCategorySubs(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/allproducts");
        // window.alert(`${res.data.title} is updated`);
        // window.location.reload(); //toastは、reloadで消えてしまうので、使えない。その代わりに、window.alertを使えば、reload後も残る
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.err);
      });
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
            <h4>製品編集</h4>
          )}
          <hr />
          {JSON.stringify(values)}
          {/* <hr />
          {JSON.stringify(originalCategoryId)}
          {JSON.stringify(originalSubsId)} */}

          <br />
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
            btn="更新"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
