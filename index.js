import { getComponent } from './match-middleware';

export const routerMiddle=(router)=>{

  let middle=(to, from, next) => {
    getComponent(to, from, next,router);
  }
  router.beforeEach(middle);
}
