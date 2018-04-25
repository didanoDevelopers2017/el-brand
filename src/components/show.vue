<template>
	<div class="show_left">
	  <div class="title">老师风采</div>
	  <div class="content">
	    <div class="block">
	      <el-carousel height="420px" arrow="never" indicator-position="none">
	        <el-carousel-item v-for="(item, index) in showdata" :key="index">
	          <div>
	            <div id="image" :class="getSstyle(item)"><img :src="getImgurl(item.imgUrl)"></div>
	            <h4 style="font-weight: bold;">{{item.name}}老师</h4>
	            <div class="describe">　　{{item.instructions}}</div>
	          </div>
	        </el-carousel-item>
	      </el-carousel>
	    </div>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'show_left',
  data() {
    return {}
  },
  props: ['showdata'],
  methods:{
    //当头像地址为空时，不显示圆边框
    getSstyle(item){
      let self = this
      if(item.imgUrl !== ''){
        return 'style1'
      }
      return ''
    },
    //图片进行裁剪
    getImgurl(url){
      return `${url}?x-oss-process=image/resize,m_mfit,w_100/circle,r_100/format,png`
    }
  },
  created(){
  }
}
</script>

<style>
img{
  width: 100%
}
.el-carousel {
  indicator-position: none;
  width: 94%;
  height: 100%;
  margin-left: 15px;
  margin-right: 15px;                                                                                                                                   
}
h4{
  text-align: center;
/*  margin-top: 10px;
  margin-bottom: 20px;*/
}
#image img{
  border-radius:80PX;
  width: 80px;
  height: 80px !important;
  /*border: 2px solid #ccc;*/
}
.style1 img{
  border-radius:80PX;
  width: 80px;
  height: 80px !important;
  border: 2px solid #ccc;
}
.title {
  text-align: center;
  background-color: #F08080;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #eee;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.content {
  width: 100%;
  margin-top: 10px;
  text-align: center;
  height: 405px
}

.describe {
  text-align:justify;
  margin-right: 10px;
  margin-bottom: 8px
}
</style>
