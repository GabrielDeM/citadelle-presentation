import { siteMiddlewares } from './site';
import { gameMiddlewares } from './game';
import { globalMiddlewares } from './global';

console.log(siteMiddlewares)
const allMiddlewares = {
  ...siteMiddlewares,
  ...gameMiddlewares,
  ...globalMiddlewares,
}

export default allMiddlewares;
