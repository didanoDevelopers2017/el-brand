<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <el-table :data="checksData">
        <el-table-column prop="studentName" label="姓 名" align="left"></el-table-column>
        <el-table-column prop="created" label="离校时间" align="center">
          <template scope="scope">
            <span>{{getState(scope)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parentName" label="接送人" align="center"></el-table-column>
      </el-table>
    </div>
    <h4 class="tongji">
      当前 {{cldata.className}} 总人数 {{cldata.studentNumber}} 人 离校 {{cldata.schoolNumber}} 人 未离校 {{cldata.beforeNumber}} 人
    </h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:'接送数据',
    }
  },
  props:['checksData','cldata'],
  methods: {
    getState(scope) {
      return scope.row.created?scope.row.created:'未离校'
    }
  }
}
</script>

