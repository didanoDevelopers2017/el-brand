<template>
      <div class="classfooter">
        <div class="sekuai"></div>
        <div class="center">
          <div class="logo">
              <img src="http://cdn-didano.oss-cn-shenzhen.aliyuncs.com/el-brand/school_logo.png">
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
      nowtime: format(new Date, 'hh:mm'),
      noweek: format(new Date, 'EEEE'),
      newdate: format(new Date, 'YYYY- MM - DD')
    }
  },
  props: ['statisticaData'],
  methods: {
    getNowTime: function() {
      let self = this
      setTimeout(() => {
        self.nowtime = format(new Date, 'hh:mm')
        self.noweek = format(new Date, 'EEEE')
        self.newdate = format(new Date, 'YYYY - MM - DD')
        self.getNowTime()
      }, 1000 * 60)
    }
  },
  created() {
    this.getNowTime()
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
