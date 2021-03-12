import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    description,
    slug,
    category,
    subs,
    price,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        価格
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          カテゴリー
          <Link
            to={`/category/${slug}`}
            className="label label-default labe-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && subs[0] && (
        <li className="list-group-item">
          サブカテゴリ―
          {subs.map((sub) => (
            <Link
              className="label label-default labe-pill pull-xs-right"
              to={`/sub/${slug}`}
              key={sub._id}
            >
              {sub.name}
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        配達
        <span className="label label-default labe-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        色
        <span className="label label-default labe-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        ブランド
        <span className="label label-default labe-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item">
        残り
        <span className="label label-default labe-pill pull-xs-right">
          {quantity} 個
        </span>
      </li>
      <li className="list-group-item">
        販売済み
        <span className="label label-default labe-pill pull-xs-right">
          {sold} 個
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
