import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// components
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/product/AdminProductCard";

// functions
import { getProductsByCount, removeProduct } from "../../../functions/product";

const AllProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []); //第二引数に空配列を渡すと、最初のマウント時にのみ実行されるようになる->無限ループ回避

  const handleRemove = (slug, images) => {
    // removeProductはAdminProductCardではなくここで使う。子コンポーネントで削除操作しても、親（ここ）が削除されたことを知らないので、リレンダリングができないのは良くないから。
    let answer = window.confirm("削除しますか？");

    if (answer) {
      setLoading(true);
      // console.log(answer);
      removeProduct(slug, images, user.token) //removeProduct関数ないには、画像を消去する操作も含まれてる。
        .then((res) => {
          loadAllProducts();
          setLoading(false);
          toast.success(`${res.data.title}を削除しました`);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  };

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
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
            <h4 className="text-danger">読み込み中</h4>
          ) : (
            <h4>製品一覧</h4>
          )}
          <hr />
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 pb-3" key={product._id}>
                <AdminProductCard
                  product={product}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
