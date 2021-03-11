// all the functions for communication with our own server.

import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  ); //第二引数は送信内容のbody。第3引数はheader。
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  ); //第二引数は送信内容のbody。第3引数はheader。
};

//backend二postリクエストを送る関数。
export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
