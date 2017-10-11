<template>
<div class="index">
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
      <router-link to="/class">
        <el-button :plain="true">班级</el-button>
      </router-link>
    </el-col>
    <el-col :span="6">
      <router-link to="/Health-room">
        <el-button :plain="true">保健室</el-button>
      </router-link>
    </el-col>
    <el-col :span="6">
      <router-link to="/kitchen">
        <el-button :plain="true">厨房</el-button>
      </router-link>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss"></style>
