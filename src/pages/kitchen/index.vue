<template>
	<div class="outBox_3">
	    <div v-show="offlineShow" id="offlineShow_1">
	      <img src="static/img/offline.jpg" style="margin:auto">
	    </div>
		<div class="kitchen">
			<h3 class="roomtitle">{{classs}}</h3>
			<div class="dAta">
				<statistical :statisticaData="statisticaData"></statistical>
				<kitchen :list="getCurentPageList"></kitchen>
			</div>
			<classfooter :statisticaData="statisticaData"></classfooter>
		</div>
	</div>
</template>
<script>
import { getPageInfo, getEveryPageList } from '@/utils'
import {findKitchenBrand, findStudentNumber} from '@/api'
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
				statisticaData:[],
				classs:'厨房',
				currentPage: 1,
				offlineShow:false,
      			pageInfo: {
        			pageSize: 20,
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
		      setTimeout(() => {
		        self.getAutoCurentPage()
		      }, 60*1000)
			},
			//获取列表数据
		    fetchData() {
				let self = this
				findKitchenBrand(this.authorization,this.code, res => {
					self.getAutoCurentPage()
					self.list = res.data.data.list
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
	.outBox_3{
		height: 1080px
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
		margin: -15px 30px;
		border-radius:10px;
		border:1px solid #eee8aa;
	}
	.Tongji{
		text-align: left;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
		padding-left: 8%;
	}
</style>
