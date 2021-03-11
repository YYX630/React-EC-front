import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//functions
import { getCategories } from "../../../functions/category";

import { updateSub, getSub, removeSub } from "../../../functions/sub";

//components
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  const loadSub = () =>
    getSub(match.params.slug)
      .then((s) => {
        setName(s.data.name);
        setParent(s.data.parent);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug, { name: name, parent: parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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
            <h4 color="text-danger">処理中</h4>
          ) : (
            <h4>サブカテゴリ―管理</h4>
          )}
          <hr />
          <br />
          <div className="form-group">
            <h5>編集</h5>
            <br />

            <label>親カテゴリー</label>
            <select
              name="親カテゴリー"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              {categories.length > 0 &&
                categories.map((c) => {
                  return (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {c.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            <CategoryForm
              handleSubmit={handleUpdate}
              name={name}
              setName={setName}
              title="サブカテゴリ―名"
              placeholder="入力"
              btn="更新"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
