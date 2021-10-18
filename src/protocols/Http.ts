export type HttpRequest = {
  body: unknown;
};

export type HttpResponse<T = unknown> = {
  status: number;
  body: T;
};
