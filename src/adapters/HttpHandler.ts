import http from 'http';

import { Controller } from '@/protocols';

export type HttpHandler = (
  req: http.IncomingMessage, res: http.ServerResponse
) => Promise<void>;

export class HttpHandlerControllerAdapter {
  public static convert(controller: Controller): HttpHandler {
    return async (
      req: http.IncomingMessage, res: http.ServerResponse,
    ): Promise<void> => {
      try {
        const body = await new Promise((resolve, reject) => {
          const chunks: string[] = [];

          req.on('data', (chunk) => chunks.push(chunk));

          req.on('end', () => {
            try {
              resolve(JSON.parse(chunks.join('')));
            } catch (err) {
              reject(err);
            }
          });
        });
        const response = await controller.handle({
          body,
        });

        res.writeHead(response.status, { 'Content-Type': 'application/json' });

        return res.end(JSON.stringify(response.body));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });

        return res.end(JSON.stringify({
          type: 'unexpected',
          name: 'InternalServerError',
          message: 'An internal server error has occured, try again later.',
        }));
      }
    };
  }
}
