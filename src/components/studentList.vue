<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <ul class="header">
        <el-col :span="8">姓名</el-col>
        <el-col :span="8">晨检时间</el-col>
        <el-col :span="8">家长刷卡</el-col>
      </ul>
      <div id="scroll-wrap_1">
        <ul id="scroll-content_1">
          <li id="push-content_1">
            <el-row id="studetlist">
              <el-row  v-for="(item,index) in dataList" :key="index":class="tableRowClassName(index)">
                <el-col :span="8">{{ item.studentName }}</el-col>
                <el-col :span="8">{{ item.detectionCreated }}</el-col>
                <el-col :span="8">
                  <span v-for="(val, index) in item.list" :key="index">{{ getparent(val) }}<br></span>
                </el-col>
              </el-row>
            </el-row>
            <!-- <el-table :data="checksData" id="studetlist" type="expand" :row-class-name="tableRowClassName" :show-header="false">
              <el-table-column prop="studentName" align="center">
              </el-table-column>
              <el-table-column prop="detectionCreated" sortable='custom' align="center">
              </el-table-column>
              <el-table-column prop="list" align="center" :default-expand-all="true">
                <template slot-scope="scope">
                  <el-form inline class="demo-table-expand">
                    <el-form-item v-for="(item, index) in scope.row.list" :key="index">
                      <span>{{ getparent(item) }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table> -->
          </li>
        </ul>
      </div>
      <ul class="footer">
        <li>当前 {{cldata.className}} 总人数：{{cldata.studentNumber}} 人 已晨检：{{cldata.schoolNumber}} 人 未晨检：{{cldata.beforeNumber}}
          人</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { findStudentDetectionByAwayRecordInfo,findStudentNumber } from '@/api'
  export default {
    data() {
      return {
        title: '晨检数据',
        dataList:[],
        timeLong:0,
        cldata:{}
      }
    },
    props: ['checksData','authorization','code'],
    methods: {
      tableRowClassName(index) {
        if (index % 2 === 0) {
          return 'info-row';
        } else if (index % 2 !== 0) {
          return 'positive-row';
        }
        return '';
      },
      getparent(scope) {
        return `${scope.parentName}(${scope.awayCreated})`
      },
      //获取列表数据
      getList(){
        findStudentDetectionByAwayRecordInfo(this.authorization, this.code, res => {
          this.dataList = res.data.data.list.sort(function sortByDetectionCreated(val1, val2) {
            let value1 = (val1.detectionCreated?val1.detectionCreated.replace(":", ""):0) - 0
            let value2 = (val2.detectionCreated?val2.detectionCreated.replace(":", ""):0) - 0
            return value2 - value1
          })
          this.getheight()
        }, error => {
          window.console.log(error)
        })
      },
      //获取数据内容高度
      getheight(){
        var het = document.getElementById('studetlist').scrollHeight;
        var newhet = parseInt(het)
        this.timeLong = parseInt(newhet / 325)
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
    watch:{
      //滚动完后刷新
      timeLong(newVal,oldVal){
        let self = this
        self.classData()
        if(newVal > 0){
          let time = this.timeLong * 22000
          setInterval(function(){
            self.getList()
            self.classData()
            },time);
        }
      }
    },
    created() {
      this.getList()
      setTimeout(this.getList(), 10000);
      //表格内容大于外框时，向上滚动
      $(document).ready(function () {
        ddd()
        setInterval(ddd, 10000);
      });
      function ddd() {
        var het = document.getElementById('studetlist').scrollHeight;
        var newhet = parseInt(het)
        var aaa = parseInt(newhet / 340)
        if (newhet > 340) {
          $("#scroll-content_1").animate({
            "top": -(newhet - 340),
          }, aaa * 20000) //aaa*20000
        }
        $("#scroll-content_1").animate({
          "top": 0,
        }, 3 * 1000)
      };
    }
  }
</script>

<style lang="scss">
  .tb_left {
    .header{
      margin-bottom: 5px;
      font-weight: bold;
    }
    .footer {
      li {
        list-style: none;
        text-align: left;
        margin-left: 30px;
        width: 100%;
        font-weight: bold;
        font-size: 16px
      }
    }
    #scroll-wrap_1 {
      overflow: hidden;
      height: 350px;
      width: 100%;
      word-wrap: break-word;
      word-break: normal;
      position: relative;
      margin-top: 30px;
    }
    #scroll-content_1 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      margin-right: 45px;
      padding-bottom: 20px;
      #push-content_1 {
        line-height: 30px;
        text-align: justify;
        list-style: none;
        padding-bottom: 20px;
        .cell {
          padding: 0
        }
        #studetlist {
          width: 100%;
          font-size: 16px;
          overflow: auto;
          left: 100;
          text-align: center;
          position: absolute;
          td {
            height: 30px;
            padding-left: 30px
          }
          .info-row {
            background: #fff;
          };
          .positive-row {
            background: #e9eff5;
          };
        }
        ;
        #studetlist::after {
          background: #fff
        }
      }
    }
  }
</style>