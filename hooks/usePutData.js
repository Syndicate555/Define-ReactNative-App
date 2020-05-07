import axios from 'axios';
import to from 'await-to-js';

export default function usePutData(route) {
  return async function putData(body) {
    const url = `https://define-json-server.herokuapp.com/${route}`;
    const [error, { data }] = await to(axios.put(url, body));
    if (error) return alert(error);
    return data;
  }
}
