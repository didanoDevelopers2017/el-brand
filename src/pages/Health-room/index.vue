<template>
	<div class="outBox_2">
	    <div v-show="offlineShow" id="offlineShow_1">
	      <img src="static/img/offline.jpg" style="margin:auto">
	    </div>
		<div class="room">
			<p class="roomtitle">{{classs}}</p>
			<div class="dAta">
				<statistical :statisticaData="statisticaData"></statistical>
				<health :items="getCurentPageList"></health>
			</div>
			<classfooter :statisticaData="statisticaData"></classfooter>
		</div>
	</div>
</template>
<script>
import { getPageInfo, getEveryPageList } from '@/utils'
import {findHealthRoom, findStudentNumber} from '@/api'
import health from '@/components/health'
import classfooter from '@/components/classfooter'
import statistical from '@/components/statistical'
	export default{
		name:'room',
		components:{
    		health,
    		classfooter,
    		statistical,
 		},
		data(){
			return{
				items:[],
				statisticaData:[],
				classs:'保健室',
				currentPage: 1,
				offlineShow:false,
		      	pageInfo: {
			        pageSize: 20,
			        pageTotal: 1
		      	},
		      	authorization: this.$route.query.authorization,
      			code: this.$route.query.code
			}
		},
		methods: {
			getAutoCurentPage: function() {
		      	let self = this
		      	this.currentPage++
		      	if(this.currentPage > this.pageInfo.pageTotal) {
		        	this.currentPage = 1
		      	}
		    },
		    //获取列表数据
			fetchData(){
				let self = this
				findHealthRoom(this.authorization,this.code, res => {
					self.items=res.data.data.list
				}, error => {
					window.console.log(error)
				})
			},
			//获取校园人数数据
			getData(){
				let self = this
				findStudentNumber(this.authorization,this.code, res => {
					self.statisticaData=res.data.data
				}, error => {
					window.console.log(error)
				})
			},
		},
		watch:{
			items:function(val) {
		      this.pageInfo = getPageInfo(val.length, this.pageInfo.pageSize)
		    }
		},
		computed: {
		    getCurentPageList: function() {
		      return getEveryPageList(this.items, this.currentPage, this.pageInfo)
		    }
		},
	    created() {
			let self = this
			this.fetchData()
			this.getData()
			setInterval(function() {
				self.fetchData()
				self.getData()
			},setTimeoutsort)
			setInterval(() => {
		        self.getAutoCurentPage()
		    }, 60*1000)
	    }
	}
	//处理网络异常（断网），查询不到数据
	window.addEventListener('offline', function() {
		console.log('offLine')
		$("#offlineShow_1").show()
	})
	window.addEventListener('online', function() {
		console.log('onLine')
		window.location.reload();
	})
</script>
<style>
	.outBox_2{
		height: 1080px;
	}
	#offlineShow_1 img{
	  position:absolute;
	  width: 40%;
	  z-index:20;
	  top:20%;
	  right:30%
	}
	.dAta{
		background-color: #FDF5E6;
		margin: 0 30px;
		border-radius:10px;
		border:1px solid #eee8aa;
	}
	.Tongji{
		text-align: left;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
		padding-left: 8%;
	}
	.roomtitle{
		line-height: 210px;
		width: 30%;
		margin: auto;
		height: 155px;
		text-align: center;
		color: #fff;
		font-size: 240%;
		margin-bottom: 50px
	}
</style>
