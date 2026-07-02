import * as migration_20260629_213914 from './20260629_213914';
import * as migration_20260702_174641 from './20260702_174641';

export const migrations = [
  {
    up: migration_20260629_213914.up,
    down: migration_20260629_213914.down,
    name: '20260629_213914',
  },
  {
    up: migration_20260702_174641.up,
    down: migration_20260702_174641.down,
    name: '20260702_174641'
  },
];
