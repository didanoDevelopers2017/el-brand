<template>
  <div class="Vhealthtable">
    <el-row id="kitchenTable">
      <el-row  v-for="(item,index) in items" :key="index" :class="tableRowClassName(index)">
        <el-col :span="3">{{ item.studentName }}</el-col>
        <el-col :span="3">{{ item.className }}</el-col>
        <el-col :span="2">{{ item.created }}</span></el-col>
        <el-col :span="8">{{ item.specialReasons }}</span></el-col>
        <el-col :span="8">{{ item.specialCare }}</span></el-col>
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
    }
}
</script>

<style lang="scss">
.Vhealthtable {
  padding:0;
  width: 93.5%;
  line-height:32px;
  margin: 0 3.2%;
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
