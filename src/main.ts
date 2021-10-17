import path from 'path';
import { addAlias } from 'module-alias';

addAlias('@', path.resolve(__dirname));

const main = (): string => 'Hello, World!';

console.log(main());
