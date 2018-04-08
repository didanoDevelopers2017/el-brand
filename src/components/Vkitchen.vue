<template>
  <div class="Vhealthtable">
    <el-row class="bigtitle">
      <el-col :span="3">姓 名</el-col>
      <el-col :span="3">班 级</el-col>
      <el-col :span="2">晨检时间</el-col>
      <el-col :span="8">特殊情况</el-col>
      <el-col :span="8">提供餐食</el-col>
    </el-row>
    <div id="scroll-wrap_1">
      <ul id="scroll-content_1">
        <li id="push-content_1">
          <el-row id="kitchenTable">
              <el-row  v-for="(item,index) in items" :key="index" :class="tableRowClassName(index)">
                <el-col :span="3">{{ item.studentName }}</el-col>
                <el-col :span="3">{{ item.className }}</el-col>
                <el-col :span="2">{{ item.created }}</span></el-col>
                <el-col :span="8">{{ item.specialReasons }}</span></el-col>
                <el-col :span="8">{{ item.specialCare }}</span></el-col>
              </el-row>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    items:Array
  },
  methods: {
    getState(scope) {
      return scope.row.created?scope.row.created:'未晨检'
    },
    tableRowClassName(index) {
        if (index%2 === 0) {
          return 'info-row';
        } else if (index%2 !== 0) {
          return 'positive-row';
        }
        return '';
    },
  },
  created() {
      let self = this
      //表格内容大于外框时，向上滚动
      $(document).ready(function () {
        ddd()
        setInterval(ddd, 10000);
      });
      function ddd() {
        var het = document.getElementById('kitchenTable').scrollHeight;
        var newhet = parseInt(het)
        var aaa = parseInt(newhet / 740)
        if (newhet > 740) {
          $("#scroll-content_1").animate({
            "top": -(newhet - 740),
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
.Vhealthtable {
  text-align: center;
  line-height:32px;
  margin: auto;
  .bigtitle{
    padding-left:6%;
    width:94%;
    font-weight: bold;
  }
  #scroll-wrap_1 {
    overflow-y: hidden;
    height: 750px;
    position: relative;
  }
  #scroll-content_1 {
    position: absolute;
    left: -27px;
    top: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    #push-content_1 {
      line-height: 30px;
      list-style: none;
      padding-bottom: 20px;
      .cell {
        padding: 0
      }
      #kitchenTable {
        width: 92.2%;
        padding-left: 2%;
        font-size: 16px;
        overflow: auto;
        position: absolute;
        .info-row {
          background: #fff;
          padding: 0 2.5%
        };
        .positive-row {
          background: #FDF5E6;
          padding: 0 2.5%
        };
      }
    }
  }
}
</style>
