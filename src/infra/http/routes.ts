import { HttpHandler, HttpHandlerControllerAdapter } from '@/adapters';
import {
  CreateMessageControllerFactory,
  GetRandomMessageControllerFactory,
} from '@/factories';

type Route = {
  url: RegExp;
  method: string;
  handler: HttpHandler;
};

export const routes: Route[] = [
  {
    url: /^\/messages\/?/,
    method: 'POST',
    handler: async (req, res): Promise<void> => {
      const handle = HttpHandlerControllerAdapter.convert(
        CreateMessageControllerFactory.create(),
      );

      return handle(req, res);
    },
  },
  {
    url: /^\/messages\/?/,
    method: 'GET',
    handler: async (req, res): Promise<void> => {
      const handle = HttpHandlerControllerAdapter.convert(
        GetRandomMessageControllerFactory.create(),
      );

      return handle(req, res);
    },
  },
];
