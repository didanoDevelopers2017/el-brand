<template>
	<div class="outBox_2">
	    <div v-show="offlineShow" id="offlineShow_1">
	      <img src="http://cdn-didano.oss-cn-shenzhen.aliyuncs.com/el-brand/offline.jpg" style="margin:auto">
	    </div>
		<div class="room">
			<h3 class="roomtitle">{{classs}}</h3>
			<div class="dAta">
				<statistical :statisticaData="statisticaData"></statistical>
				<kitchen :list="getCurentPageList" :List_1="List_1"></kitchen>
			</div>
			<classfooter :statisticaData="statisticaData"></classfooter>
		</div>
	</div>
</template>
<script>
import { getPageInfo, getEveryPageList } from '@/utils'
import {findKitchenBrand, findStudentNumber, findKitchenBrandByClassNumber} from '@/api'
import kitchen from '@/components/kitchen'
import classfooter from '@/components/classfooter'
import statistical from '@/components/statistical'
	export default{
		name:'kitchenkitchen',
		components:{
    		kitchen,
    		classfooter,
    		statistical,
 		},
		data(){
			return{
				list: [],
				List_1:[],
				statisticaData:[],
				classs:'保健室',
				currentPage: 1,
				offlineShow:false,
      			pageInfo: {
        			pageSize: 19,
        			pageTotal:1
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
			//获取特殊学生列表数据
		    fetchData() {
				let self = this
				findKitchenBrand(this.authorization,this.code, res => {
					// self.getAutoCurentPage()
					self.list = res.data.data.list
					// window.console.log(res)
				}, error => {
					window.console.log(error)
				})
		    },
		    //获取班级到校情况人数
		    classData() {
				let self = this
				findKitchenBrandByClassNumber(this.authorization,this.code, res => {
					// self.getAutoCurentPage()
					self.List_1 = res.data.data.list
					// window.console.log(res)
				}, error => {
					window.console.log(error)
				})
		    },
		    //获取校园人数数据
		    getData(){
				let self = this
				findStudentNumber(this.authorization,this.code, res => {
					self.statisticaData = res.data.data
				}, error => {
					window.console.log(error)
				})
			}
	    },
		watch:{
			list:function(val) {
		      this.pageInfo = getPageInfo(val.length, this.pageInfo.pageSize)
		    }
		},
		computed: {
			getCurentPageList: function() {
		      return getEveryPageList(this.list, this.currentPage, this.pageInfo)
		    },
		},
		created() {
			let self = this
			this.fetchData()
			this.getData()
			this.classData()
			setInterval(function() {
				self.fetchData()
				self.getData()
				self.classData()
			},setTimeoutsort)
			setInterval(() => {
			self.getAutoCurentPage()
			},60*1000)
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
		/*height: 1080px*/
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
		margin: -15px 40px;
		border-radius:10px;
		border:1px solid #eee8aa;
	}
	.Tongji{
		text-align: left;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
		padding-left: 70px;
	}
</style>
