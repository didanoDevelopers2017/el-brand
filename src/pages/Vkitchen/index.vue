<template>
    <div class="Vkitchen">
        <div class="top">厨房</div>
        <div class="title">
            校园总人数： <span>{{ statisticaData.studentNumber }}</span>人，
            已晨检：<span>{{ statisticaData.schoolNumber }}</span>人，
            未晨检：<span>{{ statisticaData.beforeNumber }}</span>人
        </div>
        <div class="topTable" id="toptable">
            <el-row class="bigtitle">
                <el-col :span="3">姓 名</el-col>
                <el-col :span="3">班 级</el-col>
                <el-col :span="2">晨检时间</el-col>
                <el-col :span="8">特殊情况</el-col>
                <el-col :span="8">提供餐食</el-col>
            </el-row>
            <div class="scroll-content"><kitchen :items="TableList" id="kitchenTable"></kitchen></div>
        </div>
        <div class="footCenter">今日各班晨检情况</div>
        <div class="footTable">
            <el-row class="NUmbertitle">
                <el-col :span="6">班 级</el-col>
                <el-col :span="6">总人数（人）</el-col>
                <el-col :span="6">已晨检（人）</el-col>
                <el-col :span="6">未晨检（人）</el-col>
            </el-row>
            <div class="scroll-content_1"><VClassNUmber :items="ClassList" id="classTable"></VClassNUmber></div>
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
    import studentList from '@/components/studentList'//晨检和刷卡数据
    import {findKitchenBrand, findStudentNumber, findKitchenBrandByClassNumber} from '@/api'
    export default {
        data(){
            return {
                authorization: this.$route.query.authorization,
      			code: this.$route.query.code,
                statisticaData:{},
                ClassList:[],
                TableList:[],
                checksData_2:[
                    {
                        studentName:'saufhs'
                    }
                ],
                cldata:{}
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
            //表格内容大于外框时，向上滚动
            $(document).ready(function () {
              ddd()
              classNUmber()
              setInterval(function() {
				classNUmber()
				ddd()
                },10000)
              
            });
            //厨房信息表格内容大于外框时，向上滚动
            function ddd() {
              let het = document.getElementById('kitchenTable').scrollHeight;
              let tableHeight = document.getElementById('toptable').offsetHeight;
              let newhet = parseInt(het)
              let aaa = parseInt(newhet / tableHeight)
              if (newhet > tableHeight) {
                $(".scroll-content").animate({
                  "top": -(newhet - tableHeight),
                }, aaa * 20000) //aaa*20000
                $(".scroll-content").animate({
                    "top": 0,
                }, 3 * 1000)
              }
            };
             //厨房信息表格内容大于外框时，向上滚动
            function classNUmber() {
              let het = document.getElementById('classTable').scrollHeight;
              let newhet = parseInt(het)
              let aaa = parseInt(newhet / 500)
              if (newhet > 500) {
                $(".scroll-content_1").animate({
                  "top": -(newhet - 500),
                }, aaa * 20000) //aaa*20000
                $(".scroll-content_1").animate({
                    "top": 0,
                }, 3 * 1000)
              }
            };
        },
        components:{
            kitchen,
            VClassNUmber,
            classfooter,
            studentList
 		},
    }
</script>

<style lang="scss">
    .Vkitchen{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left:0;
        .scroll-content_1{
            position: absolute;
            width:100%
        }
        .scroll-content{
            position: absolute;
            width:100%
        }
        .bigtitle,.NUmbertitle{
            font-weight: bold;
            width: 93.5%;
            line-height:32px;
            margin: 0 3.2%;
            z-index: 10;
            background: #FDF5E6
        }
        .NUmbertitle{
            margin: 0 3.8%;
            width: 92%;
        }
    }
</style>