<template>
	<div :data="statisticaData" style="background-color: #FDF5E6;">
	  <h4 class="Tongji">校园总人数：{{statisticaData.studentNumber}} 人，已晨检：{{statisticaData.schoolNumber}} 人，未晨检：{{statisticaData.beforeNumber}} 人</h4>
	</div>
</template>

<script>
export default {
  props: ['statisticaData']
}
</script>
