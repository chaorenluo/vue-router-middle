<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  middleware: [
    (routing, next) => {
      const bool=true;
      if (bool) {
        console.log("没有权限无法进入", routing, next);
        routing.router.replace("/")
      } else {
        next();
      }
    },
    (routing, next) => {
      console.log("进入第二个中间件", routing, next);
      next();
    }
  ]
};
</script>