<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <input type="text" v-model="phone">
    <input type="text" v-model="password">
    <button @click="login">submit</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data(){
    return {
      phone: '',
      password: ''
    };
  },
  methods:{

    async login(){
      try {
        const res = await this.$api.login(this.phone, this.password);
        console.log(res);
      
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home{
  img{
    display: none;
    // width: 0;
  }
}
</style>
