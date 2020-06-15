
const isFun = (obj) => {
  return typeof obj === 'function';
};

const isMiddleware = (cmp) => {
  return !!cmp;
};

const isPromise = (cmp) => {
  return cmp instanceof Promise
};

const globalMiddle = [];

// 匹配路由组件及加载懒组件
const matchPath = async (array_cmp, to) => {
  const path = to.path;
  let data = matchAddress(array_cmp, path);

  if (data.lazy_cmp.length > 0 && !data.cmp) {
    let arry_cmp = await Promise.all(data.lazy_cmp);
    arry_cmp = arry_cmp.map(item => {
      return item.default;
    });
    data = matchAddress(arry_cmp, path);
  }
  return data.cmp;
};

const matchAddress = (array_cmp, path) => {
  let cmp;
  const lazy_cmp = [];
  array_cmp.map(item => {
    if (isFun(item)) {
      lazy_cmp.push(item().component);
      return;
    }
    if (item.__file.indexOf(path) > 0) {
      cmp = item;
    }
  });
  return { cmp, lazy_cmp };
};

const mergeMiddleware = (arrMiddleware, routing, next) => {

  arrMiddleware = arrMiddleware.map(item => {
    return (routing) => (new_next) => () => {
      if (!new_next) {
        new_next = next;
      }
      item(routing, new_next);
    };
  });
  arrMiddleware = arrMiddleware.map(item => {
    
    return item(routing);
  });
  console.log(arrMiddleware.reduce((a, b) => (...args) => a(b(...args))))
  return arrMiddleware.length > 1 ? arrMiddleware.reduce((a, b) => (...args) => a(b(...args)))() : arrMiddleware[0](next);
};

const Currie = (arr, route, next) => {
  if (!Array.isArray(arr)) return;
  const new_next = mergeMiddleware(arr, route, next);
  return new_next;
};

export const getComponent = async (to, from, next, router) => {
  const array_cmp = router.getMatchedComponents(to);
  const component = array_cmp.length > 1 ? await matchPath(array_cmp, to) : array_cmp[0];
  const routing = {
    to,
    from,
    router
  };

  if (isFun(component)) {
    const new_component = component();
    const promiseComp = isPromise(new_component) ? new_component : new_component.component;
    promiseComp.then(res => {
      let middleware = res.default.middleware;
      if (isMiddleware(middleware)) {
        middleware = globalMiddle.concat(middleware);
        const new_next = Currie(middleware, routing, next);
        new_next();
      } else {
        next();
      }
    });
  } else {

    let middleware = component.middleware;
    if (isMiddleware(middleware)) {
      middleware = globalMiddle.concat(middleware);
      const new_next = Currie(middleware, routing, next);
      new_next()

    } else {
      next();
    }
  }
};

export const addGlobalMiddle = (data) => {
  if (isFun(data)) {

    globalMiddle.push(data);
  } else {
    throw new Error('参数必须是function')
  }
}

