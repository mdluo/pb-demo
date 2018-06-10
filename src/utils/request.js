import axios from 'axios';
import { notification } from 'antd';

export default async function request() {
  try {
    const res = await axios.request({
      url: process.env.REACT_APP_API,
      headers: {
        Accept: 'application/json',
      },
    });
    return { data: res.data };
  } catch (e) {
    if (!e.response) {
      notification.error({
        message: e.message,
        description: 'Please check your network connection',
        duration: null,
      });
      return { err: e };
    }
    if (e.response.status >= 500) {
      notification.error({
        message: e.message,
        description: 'Server error, plsase try again later',
        duration: null,
      });
    }
    return {
      err: e.response.data,
      status: e.response.status,
    };
  }
}
