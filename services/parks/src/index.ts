import { pipe } from 'fp-ts/function';
import { map } from 'fp-ts/Either';

import { db } from './db';
import { Park } from './model';
import { parkRepository } from './repository';

const ops = pipe(db<Park[]>('src/parks.json'), map(parkRepository));

console.log('ops', ops);
