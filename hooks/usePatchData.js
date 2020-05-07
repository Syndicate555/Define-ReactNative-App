import axios from 'axios';
import to from 'await-to-js';

export default function usePatchData(route) {
  return async function patchData(body) {
    const url = `https://define-json-server.herokuapp.com/${route}`;
    const [error, { data }] = await to(axios.patch(url, body));
    if (error) return alert(error);
    return data;
  }
}
