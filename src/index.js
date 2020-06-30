import { getComponent,addGlobalMiddle} from './match-middleware';

 const routerMiddle=(router)=>{
  let middle=(to, from, next) => {
    getComponent(to, from, next,router);
  }
  router.beforeEach(middle);
}

export{
  routerMiddle,
  addGlobalMiddle
}