import http from 'http';

import { routes } from '@/infra/http';

export const app = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Max-Age', 2592000);

  const route = routes.find(({ url, method }) => (
    req.url?.match(url) && req.method === method
  ));

  if (route) {
    return route.handler(req, res);
  }

  return res.end(`Cannot ${req.method} ${req.url}`)
});
