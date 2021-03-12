import React, { useState, useEffect } from "react";

// components
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

// functions
import { getProducts, getProductsCount } from "../../functions/product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  // loaders
  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts("sold", "desc", perPage, page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    }, []);
  };

  return (
    <>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center p-3">
          <Pagination
            simple
            current={page}
            total={productsCount}
            pageSize={perPage}
            hideOnSinglePage
            responsive
            // showQuickJumper
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
      <br />
      <div className="container">
        {loading ? (
          <LoadingCard count={perPage} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                {/* keyを充てることで、ひとつひとつのCardがmeaningfulになる */}
                <ProductCard
                  product={product}
                  // handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <br />
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            // simple
            current={page}
            total={productsCount}
            pageSize={perPage}
            hideOnSinglePage
            responsive
            // showQuickJumper
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
export default BestSellers;
