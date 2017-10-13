<template>
  <div id="outBox_1" style="position:relative">
    <div v-show="offlineShow" id="offlineShow">
      <img src="static/img/offline.jpg" style="margin:auto">
    </div>
    <div class="index">
      <component v-bind:is="change" :checksData="checksData_1" :moroing="cldata" id="tops"></component><!-- header -->
      <div class="conTent">
        <div id="teahershow">
          <transition name="fade"><!-- 教师风采 -->
            <show :showdata="techershow"></show>
          </transition>
          <transition name="fade" mode="out-in"><!-- 晨检/接送数据 -->
            <component v-bind:is="currentview" id="TableS" :checksData="getCurentPageList" :cldata="cldata"></component>
          </transition>
          <div style="clear:both"></div>
        </div>
        <div id="push">
        <!-- 老师推送 -->
        <div class="title_1">老师推送</div>
          <div id="scroll-wrap">
            <ul id="scroll-content">
              <li id="push-content">
                <div class="pushtitle" v-html="pushnews.title"></div>
                <div v-html="pushnews.body"></div>
                <div v-html="html"></div>
              </li>
            </ul>
          </div>
        </div><!-- 老师推送 -->
      </div>
      <div class="footer" ><!-- footer -->
        <classfooter_1 :statisticaData="cldata" id="footS"></classfooter_1>
      </div>
    </div>
  </div>
</template>
<script>
import { format, getPageInfo, getEveryPageList } from '@/utils'
import { findStudentNumber, teacherCharm, findPickUpNumber, ElectronicBrand, findAwayRecord, findStudentDetectionInfo, staffPush   } from '@/api'
import classtop from '@/components/classtop'//header
import classtop_1 from '@/components/classtop_1'//header
import show from '@/components/show'//老师风采
import chenjiandata from '@/components/chenjiandata'//晨检数据
import leavedata from '@/components/leavedata'//接送数据
import classfooter_1 from '@/components/classfooter_1'//footer

const currentview = ['chenjiandata', 'leavedata']
const change = ['classtop','classtop_1']

export default {
  name: 'index',
  data() {
    return {
      statisticaData: [],
      checksData: [],
      checksData_1:[],
      techershow: [],
      cldata: [],
      pushnews:[],
      offlineShow:false,
      html:'',
      currentview: currentview[0],
      change:change[0],
      nowtime: '',
      newdate: format(new Date, 'YYYY- MM - DD'),
      currentPage: 1,
      pageInfo: {
        pageSize: 7,
        pageTotal: 1
      },
      flag: 0,
      code: this.$route.query.code,
      authorization: this.$route.query.authorization,
      ws: '',
      setIntervalObg:{
        checkDataObg:'',
      },
      isConnect: false,
      isFirst: false
    }
  },
  components: {
    show,
    classtop,
    classtop_1,
    chenjiandata,
    leavedata,
    classfooter_1,
  },
  methods: {
    getAutoCurentPage: function() {
      let self = this
      this.currentPage++
      if(this.currentPage > this.pageInfo.pageTotal) {
        this.currentPage = 1
      }
      setTimeout(() => {
        self.getAutoCurentPage()
      }, 4500)
    },
    getNowTime: function() {
      let self = this
      setTimeout(() => {
        self.nowtime = new Date()
        // self.newdate = format(new Date, 'YYYY - MM - DD')
        self.getNowTime()
      }, 60*1000)
    },
    // 教师风采
    showData() {
      let self = this
      teacherCharm(this.authorization,this.code, res => {
        self.techershow = res.data.data.list
      }, error => {
        self.showData()
        window.console.log(error)
      })
    },
    // 晨检人数统计
    // classData() {
    //   let self = this
    //   findStudentNumber(this.authorization,this.code, res => {
    //     self.cldata = res.data.data
    //   }, error => {
    //     window.console.log(error)
    //   })
    // },
    // 晨检列表信息
    checkData() {
      let self = this
      findStudentDetectionInfo(this.authorization,this.code, res => {
        let list = res.data.data.list
        self.checksData = list
        //过滤只显示已经到校的
        // self.checksData_1 = list.filter(val => {
        //   return val.created && val.parentName
        // })
        self.getAutoCurentPage()
      }, error => {
        window.console.log(error)
      })
      findStudentNumber(this.authorization,this.code, res => {
        self.cldata = res.data.data
      }, error => {
        window.console.log(error)
      })
    },
    //文章推送
    staffPush() {
      // 老师推送获取信息
      let self = this;
      staffPush(this.authorization,this.code, res => {
        self.pushnews = res.data.data
        //推送链接图片破解防盗链
        $.ajaxPrefilter(function(options) {
          if (options.crossDomain && jQuery.support.cors) {
            var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
            options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
          }
        });
        var share_link = this.pushnews.link
        $.get(
          share_link,
          function(response) {
            var html = response;
            html = html.replace(/data-src/g, "src");
            self.html = html
            var html_src = 'data:text/html;charset=utf-8,' + html;
            $("iframe").attr("src", html_src);
          });
        }, error => {
          self.staffPush()
          window.console.log(error)
        })
    },
    //接送信息
    getStudentAway() {
      let self = this
      // 接送列表信息
      findAwayRecord(this.authorization,this.code, res => {
        let list = res.data.data.list
        self.checksData = list
      }, error => {
        window.console.log(error)
      })
      // 接送人数统计
      findPickUpNumber(this.authorization,this.code, res => {
        self.cldata = res.data.data
      }, error => {
        window.console.log(error)
      })
    },
    getCurrentStudentAway() {
      this.$http.post(`${IPCode}/base/electronicbrand/post/findNewAwayRecord/${this.code}`).then((response) => {
        response = response.data;
        if(response.success){
          console.log(response.data.num);
          this.isConnect = true;
          // this.checksData_1 = this.checksData_1.concat(response.data.list);
          this.checksData_1 = response.data.list;
        }
      })
    },
    sensms() {
      this.ws.send("is connect");
    },
    //连接websocket
    connect() {
      this.isConnect = true
      let self = this;
      self.ws = new WebSocket(`ws://${WsIp}/electronicbrand/ws/${this.code}`);
      //打开websocket，使用ws协议
      self.ws.onopen = function (event) {
          console.log("已经与服务器建立了连接\r\n当前连接状态：");
      };
      self.ws.onmessage = function(event) {
        console.log(event.data);
        let currentArr = JSON.parse(event.data);
        if(!currentArr.type) {
          self.isShow = false;
          let checksArr = new Array();
          checksArr['classId'] = currentArr['classId'];
          checksArr['studentName'] = currentArr['studentName'];
          checksArr['parentName'] = currentArr['relationTitle'];
          checksArr['created'] = currentArr['time'];
          self.checksData_1.push(checksArr);
        }
      };
      self.ws.onerror = function () {
        self.isConnect = false
        self.connect();
      };
      self.ws.onclose = function(event){
        self.isConnect = false
        console.log("已经与服务器断开了连接");
        self.connect();
      };
    },
    setGetCurrentStudentAway() {
      let self = this
      setInterval(function(){
        self.getCurrentStudentAway();
      },5000)
    }
  },
  watch: {
    nowtime: function(newVal, oldVal) {
      if ('12:00:00' > format(newVal, 'HH:mm:ss')) {
        this.flag = 1
        this.currentview = currentview[0]
        this.change = change[0]
      }
      if (format(newVal, 'HH:mm:ss') >= '12:00:00') {
        clearInterval(this.setIntervalObg.checkDataObg);
        // -------方案一
        // this.connect();
        // this.sensms();
        // ------方案二
        if(!this.isFirst) {
          this.getCurrentStudentAway();
          this.setGetCurrentStudentAway();
        }
        this.isFirst = true;
        this.flag = 2
        this.currentview = currentview[1]
        this.change = change[1]
        let self = this;
        this.getStudentAway();
        setInterval(function(){
          self.getStudentAway();
        },setTimeoutsort)
      }
    },
    checksData:function(val) {
      this.pageInfo = getPageInfo(val.length, this.pageInfo.pageSize)
    },
  },
  computed: {
    getCurentPageList: function() {
      return getEveryPageList(this.checksData, this.currentPage, this.pageInfo)

    }
  },
  created() {
      let self = this
      this.getNowTime()
      this.checkData()
      this.showData()
      this.staffPush()
      setInterval(function(){
        self.showData()
        self.staffPush()
      },setTimeoutLong);
      this.setIntervalObg.checkDataObg = setInterval(function(){
        this.checkData()
      },setTimeoutsort)

    //文章内容大于外框时，向上滚动
    $(document).ready(function (){
      ddd()
      setInterval(ddd,60*1000);
    });
    function ddd(){
        var het = document.getElementById('push-content').scrollHeight;
        var newhet = parseInt(het)
        var aaa = parseInt( newhet / 800 )
        if( newhet>800 ){
          $("#scroll-content").animate({
            "top": -(newhet-800),
          },aaa*30000)
        }
        $("#scroll-content").animate({
          "top": 0,
        },3*1000)

    };
    }
}
//处理网络异常（断网），查询不到数据
window.addEventListener('offline', function() {
  console.log('offLine')
  $("#offlineShow").show()
})
window.addEventListener('online', function() {
  console.log('onLine')
  window.location.reload();
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0；
}
.index{
	height: 100%;
}
img{
  width: 100%
}
#offlineShow{
  img{
    width:50%;
    position:absolute;
    z-index:20;
    top:45%;
    right:24%
  }
}
.conTent{
	padding: 0 30px;
}
#teahershow{
  margin-bottom: 30px;
  margin-top: 30px;
}
.show_left {
  float: left;
  width: 29%;
  height: 440px;
  background-color: #fff;
  padding: 20px 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.show_right {
  float: right;
  width: 66%;
  height: 440px;
  background-color: #fff;
  padding: 20px 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#push {
  background-color: #fff;
  height: 60%;
  height: calc(100% - 970px);
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.pushtitle{
  text-align:center;
  font-size: 26px;
  margin-bottom:20px
}
#scroll-wrap {
    overflow: hidden;
    border-top: 1px solid #3d3d3d;
    height:918px;
    width:100%;
    word-wrap:break-word;
    word-break:normal;
    padding: 20px;
    position:relative;
    margin-top:30px;
}
#scroll-content {
    position:absolute;
    left:0;
    top:0;
    width:99%;
    height:100%;
    margin-right:45px;
    padding-bottom: 20px;
    li {
        line-height: 30px;
        text-align:justify;
        list-style: none;
        padding-bottom:20px;
        padding:40px;
        width:90%
    }
    img {
      border:1px solid #ccc;
    }
}

.title_1 {
    text-align: center;
    background-color: #F08080;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-top:20px
}
.title {
  text-align: center;
  background-color: #f08080;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.tongji {
  text-align: left;
  margin-top: 10px;
  margin-left: 50px;
}

.fade-transition {

}

.fade-enter-active,.fade-leave-active {
  transition: all 2s ease-out;
}

.fade-enter {
  transform: scale(0.5, 0.5);
}

.fade-leave {
  transform: scale(1, 1);
  transform: translateX(100px);
}
</style>
