<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <el-table :data="checksData">
        <el-table-column prop="studentName" label="姓 名" align="left" style="background-color:#fff"></el-table-column>
        <el-table-column prop="created" label="到校时间" align="center">
          <template scope="scope">
              <span>{{getState(scope)}}</span>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <h4 id="tongji">
      当前 {{cldata.className}} 总人数 {{cldata.studentNumber}} 人 已到 {{cldata.schoolNumber}} 人 未到 {{cldata.beforeNumber}} 人
    </h4>
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
    getState(scope) {
      return scope.row.created ? scope.row.created : '未到校'
    }
  }
}
</script>

<style>
.bothData {
/*  margin-top: 1%*/
}

.tb_left {
  float: left;
  width: 100%;
  margin-bottom: 20px;
}

#tongji {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 2%;
  padding: 2%
}
.tb_left .el-table{
  height: 350px;
  text-align: justify;
}

.tb_left .el-table__header-wrapper {
  background-color: #fff;
  border-bottom: 1px solid #222;
  padding-left: 4%
}

.el-table__header {
  background: #fff
}

.tb_left .el-table__body-wrapper {
  padding: 1% 4%;
}

.el-table__row {
  height: 40px;
  border-bottom: none;
}

.el-table th {
  background-color: #fff;
}

.el-table td {
  border: none;
}

.el-table tr {
  border: none;
}

.el-table {
  border: none;
  position: none;
  box-sizing: none;
}

.tb_left .el-table::before {
  background-color: #fff;
  border-bottom: 1px solid #222;
}

.el-table::after {
  background: no-repeat;
}

thead {
  background-color: #fff;
}

.tb_right .el-table__body {
  border: none;
  border-left: 1px solid #222;
}

.el-table th.is-leaf {
  border: none;
}

.el-table__header-wrapper thead div {
  background-color: #fff;
}
</style>
