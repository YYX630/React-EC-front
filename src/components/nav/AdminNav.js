import React, { memo } from "react";
import { Link } from "react-router-dom";

const AdminNav = memo(() => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            管理画面
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            製品追加
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/allproducts" className="nav-link">
            製品一覧
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            カテゴリー管理
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link">
            サブカテゴリ―
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link">
            クーポン
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            パスワード設定
          </Link>
        </li> */}
      </ul>
    </nav>
  );
});

export default AdminNav;
