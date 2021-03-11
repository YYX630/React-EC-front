import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          履歴
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          パスワード設定
        </Link>
      </li> */}
      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">
          ほしいものリスト
        </Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;
