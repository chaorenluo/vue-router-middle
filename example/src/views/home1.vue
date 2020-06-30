<template>
  <div class="about">
    <h1>home1</h1>
  </div>
</template>
<script>
export default {
  middleware: [
    (routing, next) => {
      console.log(routing)
      
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