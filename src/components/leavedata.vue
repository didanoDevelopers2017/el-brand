<template>
  <div class="show_right">
    <div class="title">{{title}}</div>
    <div class="tb_left">
      <!-- 信息尽量在一页显示 -->
      <ul id="datalist">
        <li :class="getArriveClass(item)" v-for="item in checksData">{{ item.studentName }}({{ func(item) }}{{ item.parentName }})</li>
      </ul>
      <!-- <el-table :data="checksData" :show-header="false"> -->
<!--         <el-table-column prop="studentName" label="姓 名" align="left"></el-table-column>
        <el-table-column prop="created" label="离校时间" align="center">
          <template scope="scope">
            <span>{{getState(scope)}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="parentName" label="接送人" align="center"></el-table-column> -->
      <!-- </el-table> --> 
    </div>
    <h4 id="tongji_1">
      当前 {{cldata.className}} 总人数 {{cldata.studentNumber}} 人 刷卡记录 {{cldata.schoolNumber}} 人
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
    // getState(scope) {
    //   return `${scope.row.studentName}(${scope.row.created ? scope.row.created : '未离校'}${scope.row.parentName ? scope.row.parentName : ''})`
    // },
    func (item) {
      if(item.created == null){
        return item.created = '未刷卡'
      }
      return item.created
    },
    getArriveClass (item) {
      if(item.created != '未刷卡') {
        return ['test']
      } else {
        return []
      }
    }
  }
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
  padding:10px 25px 0 30px;
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
  margin-bottom: 20px;
  border-bottom: 1px solid #222
}
.test{
  color: #3a7ae2 !important;
}

#tongji_1 {
  text-align: left;
  padding: 10px
}

</style>


