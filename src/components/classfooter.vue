<template>
      <div class="classfooter">
        <div class="sekuai"></div>
        <div class="center">
          <div class="logo">
              <img :src="getLogoUrl(statisticaData.logo)">
          </div>
          <div class="logoname" :data="statisticaData">{{statisticaData.schoolName}}</div>
          <div class="daTe">
            <div>{{noweek}}　{{nowtime}}</div>
            <div>{{newdate}}</div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
</template>
<script>
import { format } from '@/utils'

export default {
  name: 'classfooter',
  data() {
    return {
      nowtime: '',
      noweek: '',
      newdate:''
    }
  },
  props: ['statisticaData'],
  methods: {
    getLogoUrl(url){
      return `${url}?x-oss-process=image/resize,m_lfit,h_100,w_100`
    },
    // getNowTime: function() {
    //   let self = this
    //   setInterval(() => {
    //     self.nowtime = format(new Date, 'hh:mm')
    //     self.noweek = format(new Date, 'EEEE')
    //     self.newdate = format(new Date, 'YYYY - MM - DD')
    //   }, 1000 * 60)
    // },
    //获取服务器时间
    getNowTimebyApi(){
      this.$http.post(`http://120.77.237.242:8081/api/service/getSystemTime`).then((response) => {
        response = response.data;
        if(response.success){
          let newTime = response.data.time
          let stringTime = `${newTime.substring(0,4)}-${newTime.substring(4,6)}-${newTime.substring(6,8)} ${newTime.substring(8,10)}:${newTime.substring(10,12)}:${newTime.substring(12,14)}`
          this.nowtime = format(new Date(stringTime), 'hh:mm')
          this.noweek = format(new Date(stringTime), 'EEEE')
          this.newdate = format(new Date(stringTime), 'YYYY - MM - DD')
        }
      })
    }
  },
  created() {
    // this.getNowTime()
    this.getNowTimebyApi()
    //一分钟获取一次时间
    setInterval(() => {
      this.getNowTimebyApi()
    }, 1000 * 60)
  }
}
</script>
<style>
  .classfooter{
    position: fixed;
    width: 100%;
    left:0;
    bottom: 0;
    color: #fff;
  }
  .logo img{
    border-radius: 108px;
    border: 1px solid #eee8aa;
    padding: 1px;
    width: 85px;
    height: 85px;
    float: left;
    margin-left: 60px;
    margin-right: 10px;
    background-color: #fff;
    color: #222;
    font-size: 16px;
  }

  .logoname {
    float: left;
    font-size: 28px;
    margin-left: 30px;
    margin-top: 25px
  }
  .daTe{
    float: right;
    text-align: right;
    margin-right: 60px;
    font-size: 22px;
    line-height: 40px;
    margin-top: 10px
  }
  .center{
    position:absolute;
    top:0;
    color: #fff;
    width: 100%;
    margin-right: 40px;
    margin-top: 30px;
  }
  .sekuai {
    background-color: #000;
    height: 140px;
    opacity: 0.35;
    position: relative;
  }
</style>
