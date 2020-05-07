import axios from 'axios';
import to from 'await-to-js';

export default function usePostData(route) {
  return async function postData(body) {
    const url = `https://define-json-server.herokuapp.com/${route}`;
    const [error, { data }] = await to(axios.post(url, body));
    if (error) return alert(error);
    return data;
  }
}
