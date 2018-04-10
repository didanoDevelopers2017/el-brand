<template>
  <div class="VhealthtableClass">
    <!-- <div id="scrollTop">
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
    </div> -->
    <el-row id="helthClass">
        <el-row  v-for="(item,index) in items" :key="index" :class="ClassName(index)">
          <el-col :span="6">{{ item.className }}</el-col>
          <el-col :span="6">{{ item.studentNumber }}</span></el-col>
          <el-col :span="6">{{ item.schoolNumber }}</span></el-col>
          <el-col :span="6">{{ item.beforeNumber }}</span></el-col>
        </el-row>
    </el-row>
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
  padding:0;
  width: 92.5%;
  line-height:32px;
  margin: auto;
}
#kitchenTable {
  font-size: 16px;
  overflow: auto;
}
.info-row {
    background: #fff;
}
.positive-row {
  background: #FDF5E6;
}
</style>
