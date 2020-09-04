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
    padding: 10px;
    height: 100%;
    width: 100%;
    overflow: scroll;
    &>div{
        height: 32px;
        svg{
            color: #4a4a4a;
            font-size: 8vw;
            float: right;
        }
    }

    img{
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    span{
        margin-top: 10px;
        display: block;
        text-align: center;
    }
    ul{
        margin-top: 10px;
        li{
            display: inline-block;
            background-color: #fa2800;
            border-radius: 10px;
            height: 20px;
            line-height: 20px;
            padding: 0 8px;
            margin: 0 5px;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            &:first-of-type{
                background-color: #ffffff;
                color: #4a4a4a;
                font-size: 16px;
                margin-left: 12px;
            }
        }
    }
    p{
        display: block;
        padding: 20px;
        font-size: 14px;
        word-wrap: break-word;
        white-space: pre-wrap;
        color: #999999;
    }
}
</style>