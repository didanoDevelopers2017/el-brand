<template>
  <div class="VhealthtableClass">
    <el-row class="bigtitle">
      <el-col :span="6">班 级</el-col>
      <el-col :span="6">总人数(人)</el-col>
      <el-col :span="6">已晨检(人)</el-col>
      <el-col :span="6">未晨检(人)</el-col>
    </el-row>
    <div id="scrollTop">
      <ul id="scroll-content">
        <li id="push-content">
          <el-row id="helthClass">
              <el-row  v-for="(item,index) in items" :key="index" :class="ClassName(index)">
                <el-col :span="6">{{ item.className }}</el-col>
                <el-col :span="6">{{ item.studentNumber }}</span></el-col>
                <el-col :span="6">{{ item.schoolNumber }}</span></el-col>
                <el-col :span="6">{{ item.beforeNumber }}</span></el-col>
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
    ClassName(index) {
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
        var het = document.getElementById('helthClass').scrollHeight;
        var newhet = parseInt(het)
        var aaa = parseInt(newhet / 500)
        if (newhet > 500) {
          $("#scroll-content").animate({
            "top": -(newhet - 500),
          }, aaa * 10000) //aaa*20000
        }
        $("#scroll-content").animate({
          "top": 0,
        }, 3 * 1000)
      };
    }
}
</script>

<style lang="scss">
.VhealthtableClass {
  line-height:32px;
  margin: auto;
  .bigtitle{
    padding-left:6%;
    width:94%;
    font-weight: bold;
  }
  #scrollTop {
    overflow-y: hidden;
    height: 500px;
    position: relative;
  }
  #scroll-content {
    position: absolute;
    left: -22px;
    top: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 20px;
    #push-content {
      line-height: 30px;
      list-style: none;
      padding-bottom: 20px;
      .cell {
        padding: 0
      }
      #helthClass {
        width: 91.1%;
        padding-left: 2%;
        font-size: 16px;
        overflow: auto;
        position: absolute;
        .info-row {
          background: #fff;
          padding:0 2%
        };
        .positive-row {
          background: #FDF5E6;
          padding:0 2%
        };
      }
    }
  }
}
</style>
