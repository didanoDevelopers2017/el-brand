<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <ul class="header">
        <li>姓名</li>
        <li>晨检时间</li>
        <li style="width:40%">家长刷卡</li>
      </ul>
      <div id="scroll-wrap_1">
            <ul id="scroll-content_1">
              <li id="push-content_1">
                <el-table
                  :data="checksData"
                  id="studetlist"
                  type="expand"
                  :row-class-name="tableRowClassName"
                  :show-header="false">
                  <el-table-column
                    prop="studentName"
                    width="195"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="detectionCreated"
                    sortable='custom'
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="list"
                    align="center"
                    :default-expand-all="true">
                    <template slot-scope="scope">
                      <el-form inline class="demo-table-expand">
                        <el-form-item v-for="(item, index) in scope.row.list" :key="index">
                          <span>{{ getparent(item) }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </div>
      <ul class="footer">
        <li>当前 {{cldata.className}} 总人数：{{cldata.studentNumber}} 人 已晨检：{{cldata.schoolNumber}} 人 未晨检：{{cldata.beforeNumber}} 人</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '晨检数据',
    }
  },
  props: ['checksData', 'cldata'],
  methods: {
    tableRowClassName(row, index) {
        if (index%2 === 0) {
          return 'info-row';
        } else if (index%2 !== 0) {
          return 'positive-row';
        }
        return '';
    },
    getparent(scope){
      return `${scope.parentName}(${scope.awayCreated})`
    }
  },
  created(){
    let self = this
      //表格内容大于外框时，向上滚动
    $(document).ready(function (){
      ddd()
      setInterval(ddd,10000);
    });
    function ddd(){
        var het = document.getElementById('studetlist').scrollHeight;
        var newhet = parseInt(het)
        var aaa = parseInt( newhet / 325 )
        if( newhet>325 ){
          $("#scroll-content_1").animate({
            "top": -(newhet-325),
          },aaa*20000) //aaa*20000
        }
        $("#scroll-content_1").animate({
          "top": 0,
        },3*1000)
    };
  }
}
</script>

<style lang="scss">
.tb_left{ 
  .header{
    li{
      list-style: none;
      float: left;
      width: 29.5%;
      font-weight: bold;
      padding-bottom:5px
    }
  }
  .footer{
    margin-top: 10px;
    li{
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
      height:320px;
      width:100%;
      word-wrap:break-word;
      word-break:normal;
      padding: 20px;
      position:relative;
      margin-top:30px;
  }
  #scroll-content_1 {
      position:absolute;
      left:0;
      top:0;
      width:94.5%;
      height:100%;
      margin-right:45px;
      padding-bottom: 20px;
      #push-content_1{
          line-height: 30px;
          text-align:justify;
          list-style: none;
          padding-bottom:20px;
          .cell{
            padding:0
          }
          #studetlist{
            width: 100%;
            font-size: 16px;
            overflow: auto;
            left:100;
            position:absolute;
            td{
              height: 30px;
              padding-left:30px
            }
            .info-row {
              background: #fff;
            };
            .positive-row {
              background: #e9eff5;
            };
            .el-form--inline .el-form-item{
              display: table-row-group
            };
            .el-form-item__label{
              height: 24px
            };
            .el-table__expanded-cell{
              padding:0;
            };
            .el-form{
              width: 120px;
              // border:1px solid #f00;
              float: right;
              margin-right: 55px
            }
          };
          #studetlist::after{
              background:#fff
          }
      }
  }
}
</style>
