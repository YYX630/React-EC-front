import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//components
import ProductCard from "../components/cards/product/ProductCard";

// functions
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // 1. load products by default on page load

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 2. load products on user search input
  useEffect(() => {
    //[text]が変わったら実行されるので、その最新のを渡さないといけない

    //パフォーマンスのため、ミリセコンド遅らせる
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (args) => {
    fetchProductsByFilter(args).then((res) => {
      console.log("FILTER RESULT", res);
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>
        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">読み込み中</h4>
          ) : (
            <h4>製品一覧</h4>
          )}
          <hr />
          {(!products || products.length < 1) && <p>該当商品はありません</p>}
          <div className="row pb-5">
            {products.map((p) => (
              <div className="col-md-4 mt-3" key={p._id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
