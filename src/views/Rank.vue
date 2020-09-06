<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in topList"
        :key="index"
        @click="toDetailPage(item.id)"
      >
        <cover
          class="cover"
          :count='item.playCount'
          :url='item.coverImgUrl'
          :name='""'
        />
        <div class="info">
          <span>{{item.name}}</span>
          <div>
            <span>{{item.updateFrequency}}</span>
          </div>
          <p>{{item.description}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Cover from '@/components/common/Cover';
export default {
  components:{
    Cover
  },
  mounted(){
    this._getTopList();
  },
  data() { 
    return {
      topList:[]
    };
  },
  methods:{
    async _getTopList(){
      const res = await this.$api.getTopList();
      console.log(res);
      if(res.code === 200){
        const list = res.list,
          artistObj = res.artistToplist;
        artistObj.isAtrist = true;
        artistObj.coverImgUrl = artistObj.coverUrl;
        artistObj.description = '云音乐按照歌手的热度按照地区统计歌手排行';
        list.unshift(artistObj);
        this.topList = list;
      }
    },
    toDetailPage(id){
      this.$router.push(id ?`/songList/${id}` :'/artist');
    }
  }
};
</script>

<style lang='scss' scoped>
ul{
  margin: 5.333vw;
  li{
    display: flex;
    overflow: hidden;
    margin: 4vw 0;
    .cover{
      min-width: 26.667vw;
      max-width: 26.667vw;
      margin-right: 2.667vw;
    }
    .info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span{
        color: #4a4a4a;
        font-size: 5.333vw;
      }
      div{
        &>span{
          color: #999999;
          font-size: 3.733vw;
          // border-radius: 2.667vw;
          // padding: 0.267vw 1.333vw;
          // border: 0.027vw solid #fa2800;
          // background-color: #fa2800;

        }
      }
      p{
        height: 10.667vw;
        color: #999999;
        font-size: 3.733vw;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

  }
}
</style>
