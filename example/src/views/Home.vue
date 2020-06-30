<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  middleware:[(routing,next)=>{
    console.log("中间件一");
    next()
  },(routing,next)=>{
    console.log("中间件二");
    next()
  },(routing,next)=>{
    console.log("中间件三");
    next()
  }]
}
</script>
