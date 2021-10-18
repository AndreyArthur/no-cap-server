import { HttpHandler, HttpHandlerControllerAdapter } from "@/adapters"
import { CreateMessageControllerFactory } from "@/factories";

type Route = {
  url: RegExp;
  method: string;
  handler: HttpHandler;
}

export const routes: Route[] = [
  {
    url: /^\/messages\/?/,
    method: 'POST',
    handler: async (req, res) => {
      const handle = HttpHandlerControllerAdapter.convert(
        CreateMessageControllerFactory.create(),
      );

      return handle(req, res);
    },
  }
];
