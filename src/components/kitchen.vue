<template>
  <div class="healthtable">
    <el-table :data="list">
      <el-table-column prop="studentName" label="姓 名" align="center"></el-table-column>
      <el-table-column prop="className" label="班 级" align="center"></el-table-column>
      <el-table-column label="到校时间" align="center">
        <template scope="scope">
          <span>{{ getState(scope) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="specialReasons" label="特殊情况" align="center"></el-table-column>
      <el-table-column prop="specialCare" label="提供餐食" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['list'],
  methods: {
    getState(scope) {
      return scope.row.created ? scope.row.created : '未到校'
    }
  }
}
</script>
<style>
.healthtable {
  width: 100%;
  padding-bottom: 10px;
  height:100%;
}

.healthtable .el-table {
  border: 0;
  margin-right: 100px;
  background-color:#FDF5E6;
  height: 680px;
}
.healthtable .el-table td{
  height: 30px;
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
