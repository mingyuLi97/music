import user from './user';
import recommend from './recommend';
import music from './music';
import songList from './songList';
import rank from './rank';

export default {
  ...user,
  ...recommend,
  ...music,
  ...songList,
  ...rank
};