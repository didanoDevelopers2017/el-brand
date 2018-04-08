<template>
    <div class="Vkitchen">
        <div class="top">厨房</div>
        <div class="title">
            校园总人数： <span>{{ statisticaData.studentNumber }}</span>人，
            已晨检：<span>{{ statisticaData.schoolNumber }}</span>人，
            未晨检：<span>{{ statisticaData.beforeNumber }}</span>人
        </div>
        <div class="topTable">
            <kitchen :items="TableList"></kitchen>
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
    import VClassNUmber from '@/components/VClassNUmber'
    import classfooter from '@/components/classfooter'
    import {findKitchenBrand, findStudentNumber, findKitchenBrandByClassNumber} from '@/api'
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
            setInterval(function() {
				self.fetchData()
				self.getData()
				self.classData()
			},setTimeoutsort)
        },
        components:{
            kitchen,
            VClassNUmber,
            classfooter
 		},
    }
</script>

<style lang="scss">
    .Vkitchen{
        /* border:1px solid #f00; */
    }
</style>