<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  middleware: [
    (routing, next) => {
     next()
    },
    (routing, next) => {
      console.log("进入第二个中间件", routing, next);
      next();
    },
     (routing, next) => {
      console.log("进入第三个中间件", routing, next);
      next();
    }
  ]
};
</script>