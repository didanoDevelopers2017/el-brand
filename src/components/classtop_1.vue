<template>
	<div class="classtop">
	  <marquee id="list" scrollamount="15" scrolldelay="200">
	    <font size=+1 color=#fff v-for="(item, index) in checksData" :key="index">{{ item.studentName }}的{{ item.relationTitle }}已刷卡</font>
	  </marquee>
	  <div class="classname">{{moroing.className}}</div>
	</div>
</template>

<script>
export default {
  name: 'classtop',
  data() {
    return {
      nowtime:'',
    }
  },
  props: ['moroing','checksData'],
}
</script>

<style>
.classtop marquee {
  background-color: #6495ED;
  height: 50px;
	color: #fff;
  line-height: 50px;
  white-space: nowrap;
  overflow: -webkit-marquee;
  -webkit-marquee-direction: left;
  -webkit-marquee-speed: normal;
  -webkit-marquee-style: scroll;
}

#list font {
	margin-right: 100px;
}


</style>
