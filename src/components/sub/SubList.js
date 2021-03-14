import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((sub) => {
      setSubs(sub.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((sub) => (
      <Link
        key={sub._id}
        to={`/sub/${sub.slug}`}
        className="col btn btn-outline-primary btn-lg btn-block btn-raised m-3"
      >
        {sub.name}
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="col text-center">読み込み中</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
