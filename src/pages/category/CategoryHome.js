import React, { useState, useEffect } from "react";

// functions
import { getCategoryWithProducts } from "../../functions/category";

// components
import ProductCard from "../../components/cards/product/ProductCard";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategoryWithProducts(slug)
      .then((res) => {
        if (res.data.category) setCategory(res.data.category);
        if (res.data.products) setProducts(res.data.products);
        // console.log("CATEGORY&PRODUCT", JSON.stringify(res.data, null, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              読み込み中
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              カテゴリー：{category.name}（
              {products.length ? products.length : 0} 個 ）
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
