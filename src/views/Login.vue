<template>
  <div>
    <img src="@/assets/images/logo.jpeg" alt="logo">
    <van-form @submit="login">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button :loading='isSubmit' round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() { 
    return {
      phone: '',
      password:'',
      isSubmit: false
    };
  },
  methods:{
    login(){
      this.isSubmit = true;

      this.$api.login(this.phone, this.password)
        .then(res => {
          console.log(res);
          if(res.code === 200){
            const uid = res.profile.userId;
            this.getUserDetail(uid);
            window.localStorage.setItem('cookie', res.cookie);
            window.localStorage.setItem('token', res.token);
            window.localStorage.setItem('loginStatus', true);
          }else{
            this.$toast.fail(res.msg);
          }
          this.isSubmit = false;
        })
        .catch(err => {
          console.log(err);
          this.isSubmit = false;

        });

    },
    // 获取个人信息
    async getUserDetail(uid) {
      try {
        let res = await this.$api.getUserDetail(uid);
        if (res.code === 200) {
          let userInfo = res.profile;
          userInfo.level = res.level;
          userInfo.listenSongs = res.listenSongs;
          userInfo.createTime = res.createTime;
          userInfo.createDays = res.createDays;
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.setUserInfo(userInfo);
          this.setLoginStatus(true);
          this.$toast.success('登录成功');

          setTimeout(() => {
            this.$router.push({ path: '/' });
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapMutations([
      'setLoginStatus',
      'setUserInfo'
    ]),
  }
};
</script>

<style scoped>
img{
    width: 50%;
    display: block;
    margin: 26.667vw auto;
}
</style>