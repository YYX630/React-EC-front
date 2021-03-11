import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//functions
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";

//components
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); //全カテゴリー全部取得したいから、配列

  // 検索機能
  //step 1 :
  const [keyword, setKeyword] = useState("");

  // step2 :
  // handelSearchChange関数 ->moved to form file

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      }); //getなので、エラー処理しなくても問題なし。何も出てこなくておかしいなと気づけるので。

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("本当に削除しますか？")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} is deleted`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err.message);
        });
    }
  };

  // step4: mapで検索する無名関数、を返す関数searched
  const searched = (keyword) => {
    return (c) => c.name.toLowerCase().includes(keyword);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 color="text-danger">処理中</h4>
          ) : (
            <h4>カテゴリー管理</h4>
          )}
          <hr />
          <br />
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title="カテゴリー追加"
            placeholder="カテゴリー名"
            btn="作成"
          />
          <br />
          {/* step3 検索フォーム ->moved*/}
          <LocalSearch
            title="カテゴリー検索"
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {/* step5を挿入 　  filter(検索関数). 検索関数＝searched(keyword)の返り値*/}
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
