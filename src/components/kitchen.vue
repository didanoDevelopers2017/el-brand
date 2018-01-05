<template>
  <div class="healthtable">
    <el-table :data="list" :fit ="false" id="kitchenList" :row-class-name="tableRowClassName">
      <el-table-column prop="studentName" label="姓 名" align="center" width="180px"></el-table-column>
      <el-table-column prop="className" label="班 级" align="center" width="180px"></el-table-column>
      <el-table-column label="晨检时间" align="center" width="180px">
        <template slot-scope="scope">
          <span>{{ getState(scope) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="specialReasons" label="特殊情况" align="center" width="410px"></el-table-column>
      <el-table-column prop="specialCare" label="提供餐食" align="center" width="410px"></el-table-column>
      <el-table-column label="班级晨检情况" align="center" width="410px"></el-table-column>
    </el-table>
    <el-table :data="List_1" :fit ="false" id="classList" :show-header="false">
      <el-table-column prop="specialCare" align="left" width="448px">
        <template slot-scope="scope">
          <span>{{ getclass(scope) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['list', 'List_1'],
  methods: {
    getState(scope) {
      return scope.row.created ? scope.row.created : '未晨检'
    },
    getclass(scope){
      return `${scope.row.className}(总人数:${scope.row.studentNumber}人,已晨检:${scope.row.schoolNumber}人,未晨检:${scope.row.beforeNumber}人)`
    },
    tableRowClassName(row, index) {
        if (index%2 === 0) {
          return 'info-row';
        } else if (index%2 !== 0) {
          return 'positive-row';
        }
        return '';
    },
  },
}
</script>
<style lang="scss">

.healthtable {
  width: 100%;
  padding-bottom: 10px;
  height:100%;
  position: relative;
}
#classList{
  width: 448px;
  margin-top: 40px;
  position: absolute;
  left: 1375px;
  height: 645px;
  font-size: 16px;
  // border: 0;
  top: 0;
  // margin-right: 60px;
  td{
    height: 35px
  };
}
#classList::after{
  background-color:#FDF5E6
}
.healthtable .el-table {
  border: 0;
  margin-right: 0;
  background-color:#FDF5E6;
  height: 685px;
  font-size: 16px;
  overflow: hidden;
  .info-row {
  background: #fff;
  };
  .positive-row {
    background: #FDF5E6;
  };
}
.healthtable .el-table td{
  height: 30px;
  border-bottom:1px solid #eee
}
.healthtable .el-table__row{
  border-bottom: 1px solid #eee
}
.healthtable .el-table .el-table__row #long{
  width: 100px
}
.healthtable .el-table::before {
  background-color: #FDF5E6;
}

.healthtable .el-table__header-wrapper thead div {
  background-color: #FDF5E6
}

.healthtable .el-table th {
  background-color: #FDF5E6
}

.healthtable .el-table td,
.el-table th.is-leaf {
  border: 0;
}

.healthtable .el-table tr {
  background-color: #FDF5E6
}
</style>
