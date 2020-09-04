<template>
  <div class="user-wrap">
    <div class="userInfo">
      <div class="bg"></div>
      <!-- 头像 - 昵称 - 签到 -->
      <div class="part1">
        <img :src="userInfo.avatarUrl" alt="头像">
        <span>{{ userInfo.nickname }}</span>
      </div>

      <ul class="part2">
        <li>等级:
          <svg class="icon menu" aria-hidden="true">
            <use xlink:href="#icon-dengji"></use>
          </svg>
          <span>
            {{userInfo.level}}
          </span></li>
        <li>年龄: {{age}}
          <svg class="icon menu" aria-hidden="true">
            <use :xlink:href="genderIcon"></use>
          </svg>
        </li>
        <li>活跃天数: {{userInfo.createDays}}</li>
      </ul>

      <ul class="part3">
        <li>
          <span>动态</span>
          <span>20</span>
        </li>
        <li>
          <span>关注</span>
          <span>{{userInfo.follows}}</span>
        </li>
        <li>
          <span>粉丝</span>
          <span>{{userInfo.followeds}}</span>
        </li>
      </ul>
    </div>

    <!-- 听歌排行 -->
    <div class="music-rank">
      <div class="head">
        <span class="title">听歌排行</span>
        <div @click="_getNewData">
          <span :class="{active: recordType === 1}">最近一周</span>
          <span> | </span>
          <span :class="{active: recordType === 0}">所有时间</span>
        </div>
      </div>

      <ul class="list">
        <van-loading color="#1989fa" v-if="!recordList"/>
        <li
          v-for="(music,index) in recordList"
          :key="index"
          @click="_playMusic(index)"
        >
          <span
            :style="{marginLeft: index >= 99 ?'-7px': '0'}"
          >{{ index | addZero }}</span>
          <svg class="icon menu" aria-hidden="true">
            <use :xlink:href="music.like ? '#icon-xin2' : '#icon-xin'"></use>
          </svg>
          <svg class="icon menu" aria-hidden="true">
            <use xlink:href="#icon-xinbaniconshangchuan-"></use>
          </svg>
          <span>{{music.song.name}}</span>
          <span>{{music.playCount + "次"}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Song from '@/model/song';
import utils from '@/utils';
import { playMode } from '@/model/playMode';
const GENDER_ICON = ['#icon-xingbie-weizhi', '#icon-xingbie-nan', '#icon-xingbie-nv'];
export default {
  data() { 
    return {
      cacheObj: {
        allData: null,
        weekData: null
      },
      recordList: [],
      recordType: 1 // 0 - allData  1 - weekData
    };
  },
  mounted(){
    this._getUserRecord();
  },
  filters:{
    addZero(val){
      val += 1;
      return val > 9 ? val : ('0' + val);
    }
  },
  computed:{
    ...mapGetters([
      'userInfo'
    ]),
    age(){
      const date = new Date(this.userInfo.birthday);
      return date.getFullYear().toString().substr(2, 2) + '后'; 
    },
    genderIcon(){
      return GENDER_ICON[this.userInfo.gender];
    }
  },
  methods:{
    ...mapMutations([
      'setPlayMode',
      'setPlayList',
      'setPlayIndex',
      'setPlayState'
    ]),
    async _getUserRecord(){
      const key = this.recordType === 1 ? 'weekData' : 'allData';
      if(this.cacheObj[key]){
        this.recordList = this.cacheObj[key];
        console.log('使用缓存的数据');
        return;
      }
      const res = await this.$api.getUserRecord(this.userInfo.userId, this.recordType);
      console.log(res);
      if(res.code === 200){
        const data = res[key];
        this.recordList = res[key].map(item => {
          // 接口数据不能解析，此处做假数据
          const num =  parseInt(Math.random()*(10 + 1),10);
          return {
            like: num < 8,
            song: new Song(item.song),
            playCount: num
          };
        });
        this.cacheObj[key] = utils.deepCopy(this.recordList);
      }else{
        console.log('!!!Error _getUserRecord', res.code);
      }
    },
    _getNewData(){
      this.recordType = this.recordType === 1 ? 0 : 1;
      this._getUserRecord();
    },
    _playMusic(index){
      console.log('playMusic');
      this.setPlayMode(playMode.sequence);
      this.setPlayList(this.recordList.map(item => item.song));
      this.setPlayIndex(index);
      this.setPlayState(true);
    }
  }
};
</script>

<style lang='scss' scoped>
.user-wrap{
  margin-bottom: 2.667vw;
}

.userInfo{
  box-sizing: border-box;
  border-radius: 1.333vw;
  overflow: hidden;
  .bg{
    background-image: url('../assets/images/userInfoBg.jpeg');
    height: 48vw;
  }
  .part1{
    display: flex;
    align-items: center;
    margin-top: -15.467vw;
    img{
      width: 21.333vw;
      border-radius: 1.333vw;
      border: 0.133vw solid #cccccc;
      margin: 0 2.667vw 0 5.333vw;
    }
    span{
      color: #ffffff;
    }
  }

  .part2{
    padding: 2.667vw 5.333vw 0 5.333vw;
    display: flex;
    justify-content: space-between;
    li{
      margin: 1.333vw 0;
      &:first-of-type{
        span{
          color: #fa2800;
          margin-left: -1.6vw;
          font-size: 3.2vw;
        }
      }
    }
  }

  .part3{
    display: flex;
    justify-content: space-around;
    margin: 5.333vw 0;
    span{
      display: block;
      text-align: center;
      color: #999999;

    }
  }
}

.music-rank{
  margin: 0 2.667vw;
  border-radius: 1.333vw;
  .head{
    display: flex;
    justify-content: space-between;
    padding: 0 5.333vw;
    .active{
      font-weight: bold;
    }
    span{
      font-size: 3.733vw;
    }
    &>span{
      border-left: 1.333vw solid #fa2800;
      padding-left: 2.667vw;
      font-size: 4.267vw;
    }
  }

  .list{
    margin-top: 4vw;
    li{
      padding: 1.333vw 5.333vw;
      display: flex;
      align-items: center;
      font-size: 3.733vw;
      &:nth-child(odd){
        background-color: #f7f7f7;
      }
      &:hover{
        background-color: #f7f7f7;
      }
      svg{
        padding: 0 1.067vw;
      }
      span:nth-of-type(2){
        flex: 1;
        padding-left: 2.667vw;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      span:nth-of-type(3){
        padding-right: 5.333vw;
      }
    }
  }
}
</style>