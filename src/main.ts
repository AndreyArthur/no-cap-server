import path from 'path';
import { addAlias } from 'module-alias';

addAlias('@', path.resolve(__dirname));

// eslint-disable-next-line
import { server } from '@/infra/http';

server.start();
