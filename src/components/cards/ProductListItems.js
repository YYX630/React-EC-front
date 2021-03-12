import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const { description, slug, category, subs, price, color } = product;
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
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
      <li className="list-group-item">
        price
        <span className="label label-default labe-pill pull-xs-right">
          ￥ {price}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
