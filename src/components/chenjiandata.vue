<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <!-- 信息尽量在一页显示 -->
      <ul id="datalist">
        <li :class="getArriveClass(item)" v-for="item in checksData">{{ item.studentName }}({{ func(item) }})</li>
      </ul>
      <!-- <el-table :data="checksData[2]" :show-header="false"> -->
<!--         <el-table-column prop="studentName" label="姓 名" align="left" style="background-color:#fff"></el-table-column>
        <el-table-column prop="created" label="到校时间" align="center">
          <template scope="scope">
              <span>{{getState(scope)}}</span>
          </template>
        </el-table-column>
      </el-table> -->
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
    // getState (scope) {
    //   //数据重组
    //   return `${scope.row.studentName}(${scope.row.created ? scope.row.created : '未到校'})`
    // },
    func (item) {
      if(item.created == null){
        return item.created = '未到校'
      }
      return item.created
    },
    getArriveClass (item) {
      if(item.created != '未到校') {
        return ['test']
      } else {
        return []
      }
    }
  },
}
</script>

<style>
.bothData {
/*  margin-top: 1%*/
}
.test{
  color: #3a7ae2 !important;
}
#datalist{
  float: left;
  padding:0 25px 0 30px;
  text-align: justify all;
  height: 358px
}
#datalist li{
  color: #222;
  line-height: 36px;
  list-style: none;
  float: left;
  margin-right: 35px;
  width: 167px;
}

.tb_left {
  float: left;
  width: 100%;
  /*margin-bottom: 20px;*/
  /*border-bottom: 1px solid #222*/
}

/*#tongji {
  text-align: left;
  padding: 0 10px;
  font-weight: bold;
}*/
/*.tb_left .el-table{
  height: 365px;
  padding-top: 5px;
  text-align: justify;
}
.tb_left .cell{
	padding: 0 15px
}

.tb_left .el-table__header-wrapper {
  background-color: #fff;
  border-bottom: 1px solid #222;
  padding-left: 4%
}

.el-table__header {
  background: #fff
}

.el-table__row {
  height: 20px;
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
}*/
</style>
