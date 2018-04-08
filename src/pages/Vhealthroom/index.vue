<template>
    <div class="VhealthRoom">
        <div class="titleTop">保健室</div>
        <div class="title">
            校园总人数： <span>{{ statisticaData.studentNumber }}</span>人，
            已晨检：<span>{{ statisticaData.schoolNumber }}</span>人，
            未晨检：<span>{{ statisticaData.beforeNumber }}</span>人
        </div>
        <div class="topTable">
            <kitchen :items="TableList"></kitchen>
            <!-- <Health :items="TableList"></Health> -->
        </div>
        <div class="footCenter">今日各班晨检情况</div>
        <div class="footTable">
            <VClassNUmber :items="ClassList"></VClassNUmber>
        </div>
        <div class="footer" ><!-- footer -->
            <classfooter :statisticaData="statisticaData"></classfooter>
        </div>
    </div>
</template>

<script>
    import kitchen from '@/components/Vkitchen'
    import Health from '@/components/VHealth'
    import VClassNUmber from '@/components/VClassNUmber'
    import classfooter from '@/components/classfooter'
    import {findKitchenBrand,findHealthRoom, findStudentNumber, findKitchenBrandByClassNumber} from '@/api'
    export default {
        data(){
            return {
                authorization: this.$route.query.authorization,
      			code: this.$route.query.code,
                statisticaData:{},
                ClassList:[],
                TableList:[]
            }
        },
        methods:{
            //获取保健室列表数据
			fetchHealthData(){
				let self = this
				findHealthRoom(this.authorization,this.code, res => {
					self.items=res.data.data.list
				}, error => {
					window.console.log(error)
				})
			},
            //获取特殊学生列表数据
            fetchData() {
                findKitchenBrand(this.authorization,this.code, res => {
                    this.TableList = res.data.data.list
                }, error => {
                    window.console.log(error)
                })
            },
            //获取班级到校情况人数
            classData() {
                findKitchenBrandByClassNumber(this.authorization,this.code, res => {
                    this.ClassList = res.data.data.list
                }, error => {
                    window.console.log(error)
                })
            },
            //获取校园人数数据
            getData(){
                findStudentNumber(this.authorization,this.code, res => {
                    this.statisticaData = res.data.data
                }, error => {
                    window.console.log(error)
                })
            }
        },
        created(){
            let self = this
            this.fetchData()
            this.classData()
            this.getData()
            // this.fetchHealthData()
            setInterval(function() {
				self.fetchData()
				self.getData()
                self.classData()
                // this.fetchHealthData()
			},setTimeoutsort)
        },
        components:{
            kitchen,
            Health,
            VClassNUmber,
            classfooter
 		},
    }
</script>

<style lang="scss">
    .VhealthRoom{
    }
</style>