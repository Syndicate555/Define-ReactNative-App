import axios from 'axios';
import to from 'await-to-js';

export default function useLazyGetData(route) {
  return async function getData(routeExt = '') {
    const url = `https://define-json-server.herokuapp.com/${route}${routeExt}`;
    const [error, result] = await to(axios.get(url));
    if (error) return alert(`${route}${routeExt}: ${error}`);
    return result.data;
  }
}
