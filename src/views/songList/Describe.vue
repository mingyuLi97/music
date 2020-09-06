<template>
  <div>
    <div class="describe">
      <div>
        <svg class="icon" aria-hidden="true" @click="$emit('close')">
          <use xlink:href="#icon-Group-"></use>
        </svg>
      </div>

      <img :src="url" alt="">
      <span>{{name}}</span>
      <ul>
        <li>标签:</li>
        <li v-for="(tag, index) in tags" :key="index">{{tag}}</li>
      </ul>
      <p>{{desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['url','name','tags','desc']
};
</script>

<style lang='scss' scoped>
.describe{
    box-sizing: border-box;
    padding: 2.667vw;
    height: 100%;
    width: 100%;
    overflow: scroll;
    &>div{
        height: 8.533vw;
        svg{
            color: #4a4a4a;
            font-size: 8vw;
            float: right;
        }
    }

    img{
        display: block;
        width: 53.333vw;
        margin: 0 auto;
    }
    span{
        margin-top: 2.667vw;
        display: block;
        text-align: center;
    }
    ul{
        margin-top: 2.667vw;
        li{
            display: inline-block;
            background-color: #fa2800;
            border-radius: 2.667vw;
            height: 5.333vw;
            line-height: 5.333vw;
            padding: 0 2.133vw;
            margin: 0 1.333vw;
            font-size: 3.2vw;
            color: #ffffff;
            text-align: center;
            &:first-of-type{
                background-color: #ffffff;
                color: #4a4a4a;
                font-size: 4.267vw;
                margin-left: 3.2vw;
            }
        }
    }
    p{
        display: block;
        padding: 5.333vw;
        font-size: 3.733vw;
        word-wrap: break-word;
        white-space: pre-wrap;
        color: #999999;
    }
}
</style>