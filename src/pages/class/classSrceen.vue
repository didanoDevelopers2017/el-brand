<template>
        <div id="outBoxNew" style="position:relative">
          <div v-show="offlineShow" id="offlineShow">
            <img src="http://cdn-didano.oss-cn-shenzhen.aliyuncs.com/el-brand/offline.jpg" style="margin:auto">
          </div>
          <div class="index">
            <component v-bind:is="change" :checksData="checksData_1" :moroing="cldata" id="tops"></component><!-- header -->
            <div class="conTent">
              <div id="teahershow">
                <transition name="fade" mode="out-in"><!-- 教师风采 -->
                  <show :showdata="techershow"></show>
                </transition>
                <transition name="fade" mode="out-in"><!-- 晨检/接送数据 -->
                  <studentList :authorization="authorization" :code="code"></studentList>
                </transition>
                <div style="clear:both"></div>
              </div>
              <div id="push">
              <!-- 老师推送 -->
                <div class="title_1">老师推送</div>
                <div id="scroll-wrap">
                  <div id="scroll-content">
                    <div class="pushtitle" v-html="pushnews.title"></div>
                    <div v-html="pushnews.body"></div>
                    <div v-html="html"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer" ><!-- footer -->
              <classfooter :statisticaData="cldata" id="footS"></classfooter>
            </div>
          </div>
        </div>
      </template>
      <script>
      import { format, getPageInfo, getEveryPageList } from '@/utils'
      import { findStudentNumber, teacherCharm, findPickUpNumber, ElectronicBrand, findAwayRecord, findStudentDetectionInfo, staffPush, findStudentDetectionByAwayRecordInfo, findStudentFood  } from '@/api'
      import classtop from '@/components/classtop'//header
      import classtop_1 from '@/components/classtop_1'//header
      import show from '@/components/show'//老师风采
      import chenjiandata from '@/components/chenjiandata'//晨检数据
      import leavedata from '@/components/leavedata'//接送数据
      import studentList from '@/components/studentList'//晨检和刷卡数据
      import classfooter from '@/components/classfooter'//footer
      
      const currentview = ['chenjiandata', 'leavedata']
      const change = ['classtop','classtop_1']
      export default {
        name: 'index',
        data() {
          return {
            statisticaData: [],
            checksData: [],
            checksData_1:[],
            checksData_2:[],
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
              pageSize: 30,
              pageTotal: 1
            },
            flag: 0,
            code: this.$route.query.code,//获取当前页code码
            authorization: this.$route.query.authorization,//获取当前页授权码
            ws: '',
            setIntervalObg:{
              checkDataObg:'',
            },
            isConnect: false,
            isFirst: false,
          }
        },
        components: {
          show,
          classtop,
          classtop_1,
          chenjiandata,
          studentList,
          leavedata,
          classfooter,
        },
        methods: {
          //当前页自增
          getAutoCurentPage: function() {
            let self = this
            this.currentPage++
            if(this.currentPage > this.pageInfo.pageTotal) {
              this.currentPage = 1
            }
          },
          getNowTime: function() {
            let self = this
            setTimeout(() => {
              self.nowtime = new Date()
              self.getNowTime()
            }, 60*1000)
          },
          // 教师风采
          showData() {
            let self = this
            teacherCharm(this.authorization,this.code, res => {
              self.techershow = res.data.data.list
            }, error => {
              // self.showData()
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
                // self.staffPush()
                window.console.log(error)
              })
          },
          getCurrentStudentAway() {
            this.$http.post(`${IPCode}/base/electronicbrand/post/findNewAwayRecord/${this.code}`).then((response) => {
              response = response.data;
              if(response.success){
                // console.log(response.data.num);
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
            },20*1000)
          },
          getStudentFood(){
            let self = this
            findStudentFood(this.authorization,this.code, res => {
              this.checksData_1 = res.data.data.list
            }, error => {
              window.console.log(error)
            })
          },
          //获取班级晨检情况
          classData() {
            let self = this
            findStudentNumber(this.authorization,this.code, res => {
              self.cldata = res.data.data
            }, error => {
              window.console.log(error)
            })
          },
        },
        watch: {
          nowtime: function(newVal, oldVal) {
            if (format(newVal, 'HH:mm:ss') < '12:00:00') {
              this.getStudentFood()
              this.currentPage = 1
              this.flag = 1
              // this.currentview = currentview[0]
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
              this.currentPage = 1
              this.flag = 2
              this.currentview = currentview[1]
              this.change = change[1]
              let self = this;
              // this.getStudentAway();
              // setInterval(function(){
              //   self.getStudentAway();
              // },setTimeoutsort)
            }
          },
          checksData:function(val) {
            this.pageInfo = getPageInfo(val.length, this.pageInfo.pageSize)
          },
        },
        computed: {
          
        },
        created() {
            let self = this
            // this.getStudentFood()
            this.classData()
            this.getNowTime()
            this.showData()
            this.staffPush()
            setInterval(function(){
              self.showData()
              self.staffPush()
            },setTimeoutLong);
            this.setIntervalObg.checkDataObg = setInterval(function(){
            },setTimeoutsort)
      
            //文章内容大于外框时，向上滚动
            $(document).ready(function (){
              ddd()
              setInterval(ddd,60*1000);
            });
            function ddd(){
                var het = document.getElementById('scroll-content').scrollHeight;
                var pushheight = document.getElementById('push').scrollHeight;
                var newhet = parseInt(het)
                var aaa = parseInt( newhet / pushheight )
                if( newhet > pushheight ){
                  $("#scroll-content").animate({
                    "top": -(newhet - pushheight),
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
          padding: 0 2%;
      }
      #teahershow{
        margin-bottom: 30px;
        margin-top: 30px;
      }
      .show_left {
        float: left;
        width: 29%;
        height: 470px;
        background-color: #fff;
        padding: 10px 0px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .show_right {
        float: right;
        width: 68%;
        height: 470px;
        background-color: #fff;
        padding: 10px 0px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      
      #push {
        background-color: #fff;
        height: calc(100% - 870px);
        position: fixed;
        overflow: hidden;
        top: 500;
        left:0;
        width: 96%;
        margin: 0 2%;
        margin-bottom: 30px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .pushtitle{
        text-align:center;
        font-size: 26px;
        margin-bottom:20px;
        font-weight: bold;
      }
      #scroll-wrap {
          overflow-y: hidden;
          border-top: 1px solid #3d3d3d;
          height:100%;
          word-wrap:break-word;
          word-break:normal;
          padding: 20px;
          position:relative;
          margin-top:30px;
      }
      #scroll-content {
          position:absolute;
          width:96.5%;
          height:100%;
          padding-bottom: 20px;
          li {
              line-height: 36px;
              text-align:left;
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
          margin-top:10px
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
      .footer{
        height: 130px;
      }
      </style>
      