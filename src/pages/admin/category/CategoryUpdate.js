import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";

// components
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(match);
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug)
      .then((c) => {
        setName(c.data.name);
        // if (name == "") toast.success("no");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        history.push("/admin/category");
      });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name: name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/category");
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
            <h4>カテゴリー編集</h4>
          )}
          <hr />
          <br />
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            title="新しい名前を入力して下しさい"
            btn="更新"
          />
          <br />
        </div>
        {/* <div className="col"></div> */}
      </div>
    </div>
  );
};

export default CategoryUpdate;
