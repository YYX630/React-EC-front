import React from "react";

// components
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="jumbotron h1 text-danger font-wight-bold text-center">
        <Jumbotron text={["やめられない", "とまらない", "かっぱえびせん"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">新着</h4>
      <NewArrivals />
      <br />

      <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron">売れ筋</h4>
      <BestSellers />
      <br />
    </>
  );
};
export default Home;
