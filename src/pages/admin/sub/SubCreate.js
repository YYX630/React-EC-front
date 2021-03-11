import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//functions
import { getCategories } from "../../../functions/category";

import { createSub, getSubs, removeSub } from "../../../functions/sub";

//components
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

  const loadSubs = () =>
    getSubs()
      .then((c) => setSubs(c.data))
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name: name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} is deleted`);
          loadSubs();
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
            <h4>サブカテゴリ―管理</h4>
          )}
          <hr />
          <br />
          <div className="form-group">
            <h5>新規作成</h5>
            <br />

            <label>親カテゴリー</label>
            <select
              name="親カテゴリー"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>選択</option>
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            <CategoryForm
              handleSubmit={handleCreate}
              name={name}
              setName={setName}
              title="サブカテゴリ―名"
              placeholder="入力"
              btn="作成"
            />
          </div>

          <br />
          {/* step3 検索フォーム ->moved*/}
          <h5>検索</h5>
          <br />
          <LocalSearch
            title="サブカテゴリー検索"
            keyword={keyword}
            setKeyword={setKeyword}
          />
          {/* step5を挿入 　  filter(検索関数). 検索関数＝searched(keyword)の返り値*/}
          {subs.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${c.slug}`}>
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

export default SubCreate;
