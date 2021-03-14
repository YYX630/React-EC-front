import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// components
import SingleProduct from "../components/product/SingleProduct";
import ProductCard from "../components/cards/product/ProductCard";

//functions
import { getProduct, productStar, getRelated } from "../functions/product";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = match.params;

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(newRating, name, user.token)
      .then((res) => {
        console.log("rating clicked", res.data);
        loadSingleProduct(); //if you want to show updated rating in real time
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  // userEffectの使われる順番は必ず上から。
  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find((element) => {
        return element.postedBy.toString() === user._id.toString(); //toSting()使わずに、==で比較でもいいけど。  //return忘れてた製でバグってた
      });
      existingRatingObject && setStar(existingRatingObject.star);
    }
  }); //第二引数付けないので,every timeなにか変化があったとき。;

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      //get & load related products
      getRelated(res.data._id).then((res2) => setRelated(res2.data));
    });
  };

  return (
    <>
      <div className="container-fluid">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />

        <div className="row">
          <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>関連商品</h4>
            <hr />
          </div>
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((product) => {
            return (
              <div key="product._id" className="col-md-4">
                <ProductCard product={product} />
              </div>
            );
          })
        ) : (
          <div className="col text-center">関連商品はありません</div>
        )}
      </div>
    </>
  );
};

export default Product;
