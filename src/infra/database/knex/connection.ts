import knex from 'knex';

import { config } from '@/infra/database/knex';

export const connection = knex(config);
