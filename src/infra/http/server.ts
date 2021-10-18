import { app } from '@/infra/http';

export const server = {
  start: (): void => {
    app.listen(process.env.SERVER_PORT || 3333);
  },
};
