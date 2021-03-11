import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; //historyにアクセスするため。

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5); //カウントダウン表示用
  let history = useHistory(); //historyの実態はreact-router-domのuseHistoryメソッドの返り値
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount); //第二引数の時間前に、第一引数の関数を実行する。また、setCountに関数を渡すやり方に留意。
    }, 1000);
    //   redirect once count is equal to 0
    count === 0 && history.push("/");

    //   cleanup
    return () => clearInterval(interval); //時計を解除
  }, [count, history]); //第二引数が変化するたびに第一引数が稼働する

  return (
    <div className="container p^5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
