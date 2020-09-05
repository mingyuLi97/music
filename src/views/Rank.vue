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
  margin: 20px;
  li{
    display: flex;
    overflow: hidden;
    margin: 15px 0;
    .cover{
      min-width: 100px;
      max-width: 100px;
      margin-right: 10px;
    }
    .info{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span{
        color: #4a4a4a;
        font-size: 20px;
      }
      div{
        &>span{
          color: #999999;
          font-size: 14px;
          // border-radius: 10px;
          // padding: 1px 5px;
          // border: .1px solid #fa2800;
          // background-color: #fa2800;

        }
      }
      p{
        height: 40px;
        color: #999999;
        font-size: 14px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

  }
}
</style>
