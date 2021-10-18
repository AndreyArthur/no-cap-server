import { connection } from '@/infra/database/knex';

const query = async <T = unknown>(
  text: string, bindings?: unknown[],
): Promise<T> => {
  if (!bindings) {
    const result = (await connection.raw(text)).rows;

    return result;
  }

  const result = (await connection.raw(text, bindings as any)).rows;

  return result;
};

export const database = {
  query,
  oneOrNone: async <T = unknown>(
    text: string, bindings?: unknown[],
  ): Promise<T | null> => {
    const [object] = await query<T[]>(text, bindings);

    if (!object) return null;

    return object;
  },
  migrate: async (): Promise<void> => {
    await connection.migrate.latest();
  },
  close: (): void => { connection.destroy(); },
};
