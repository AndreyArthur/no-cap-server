import path from 'path';
import { addAlias } from 'module-alias';

import { server } from '@/infra/http';

addAlias('@', path.resolve(__dirname));

server.start();
