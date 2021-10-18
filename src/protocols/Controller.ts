import { HttpResponse, HttpRequest } from "@/protocols";

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>;
}
