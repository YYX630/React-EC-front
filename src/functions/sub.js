import axios from "axios";

export const getSubs = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/subs`); //第二引数は送信内容のbody。第3引数はheader。
};

export const getSub = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/sub/${slug}`); //第二引数は送信内容のbody。第3引数はheader。
};

export const getSubWithProducts = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/sub-with-products/${slug}`
  ); //第二引数は送信内容のbody。第3引数はheader。
};

export const removeSub = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API_URL}/sub/${slug}`, {
    headers: {
      authtoken: authtoken,
    },
  }); //axiosのdeleteメソッドはbodyを付けない
};

export const updateSub = async (slug, sub, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/sub/${slug}`,
    sub, //subにはjsonオブジェクトが代入されるので、直でoK. sub = {name: name}すね。
    {
      headers: {
        authtoken: authtoken,
      },
    }
  ); //第二引数は送信内容のbody。第3引数はheader。
};

export const createSub = async (sub, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/sub`, sub, {
    headers: {
      authtoken: authtoken,
    },
  }); //第二引数は送信内容のbody。第3引数はheader。
};
