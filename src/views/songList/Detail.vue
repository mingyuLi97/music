<template>
  <div v-if="data" class="detail-wrap">
    <div>
      <back-bar>歌单</back-bar>

      <div class="top">
        <cover
          class="cover"
          :count='data.playCount'
          :url='data.coverImgUrl'
          :name='""'
        />
        <div class="info">
          <span>{{data.name}}</span>
          <div class="creator">
            <img :src="data.creator.avatarUrl" alt="avatar">
            <span>{{data.creator.nickname}}</span>
          </div>
          <!-- <ul class="tags">
            <li v-for="(tag, index) in data.tags" :key="index">{{tag}}</li>
          </ul> -->
          <p>{{data.description}}</p>
        </div>
      </div>
      <songlist-tool-bar
        :commentCount='data.commentCount'
        :shareCount='data.shareCount'
      />
    </div>
  </div>
</template>

<script>
import BackBar from '@/components/common/BackBar';
import Cover from '@/components/common/Cover';
import SonglistToolBar from '@/components/common/SongListToolBar';
export default {
  components:{
    BackBar,
    Cover,
    SonglistToolBar
  },
  mounted(){
    console.log(this.$route.params.id);
    this._getPlaylistDetail(this.$route.params.id);
  },
  data() { 
    return {
      data: null
    };
  },
  methods:{
    async _getPlaylistDetail(id){
      const res = await this.$api.getPlaylistDetail(id);
      console.log(res);
      this.data = res.playlist;
    }
  }
};
</script>

<style lang='scss' scoped>
.detail-wrap{
    box-sizing: border-box;
}
.top{
    display: flex;
    padding: 0 4vw;
    .cover{
        min-width: 34.667vw;
        max-width: 34.667vw;
        margin-right: 4vw;
    }
    .info{
        & > span{
            font-size: 4.8vw;
        }
        .creator{
            padding: 2.133vw 0;
            display: flex;
            img{
                border-radius: 50%;
                width: 6.667vw;
                margin-right: 1.333vw;
            }
            span{
                font-size: 4.267vw;
                line-height: 6.667vw;
            }
        }
    }
    p{
        position: relative;
        font-size: 3.733vw;
        color: #999999;
        overflow: hidden;
        padding-right: 2.667vw;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        &::after{
            position: absolute;
            top: 4vw;
            right: 1.067vw;
            display: block;
            width: 2.133vw;
            height: 2.133vw;
            border-right: 0.267vw solid #999999;
            border-top: 0.267vw solid #999999;
            transform: rotate(45deg);
            content: '';
        }
    }
}
</style>
