<template>
    <div class="pos">
        <div>
            <el-row>
                <el-col :span='7' class="pos-order" id="order-list">
                    <el-tabs>
                        <el-tab-pane label='点餐' class="goods-tab">
                            <el-table :data="tabelData" style="width:100%;text-align:center;">
                                <el-table-column prop='goodsName' label='商品名称'></el-table-column>
                                <el-table-column prop='count' label='数量' width="50"></el-table-column>
                                <el-table-column prop='price' label='价格' width="70"></el-table-column>
                                <el-table-column label='操作' width='100' fixed='right'>
                                    <template slot-scope="scope">
                                        <el-button type='text' size='small' @click="delSingleGoods(scope.row)">删除</el-button>
                                        <el-button type='text' size='small' @click="addOrderList(scope.row)">增加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="totalDiv">
                                <small>数量：</small>{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small>{{totalMoney}}元
                            </div>
                            <div class="pos-divbtn">
                                <el-button type="warning" @click="delAllGoods">挂单</el-button>
                                <el-button type="danger" @click="delAllGoods">删除</el-button>
                                <el-button type="success" @click="cheackOut">结账</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label='挂单' class="goods-tab">
                            <el-table :data="tabelData" style="width:100%;text-align:center;">
                                <el-table-column prop='goodsName' label='商品名称'></el-table-column>
                                <el-table-column prop='count' label='数量' width="50"></el-table-column>
                                <el-table-column prop='price' label='价格' width="70"></el-table-column>
                                <el-table-column label='操作' width='100' fixed='right'>
                                    <template slot-scope="scope">
                                        <el-button type='text' size='small' @click="delSingleGoods(scope.row)">删除</el-button>
                                        <el-button type='text' size='small' @click="addOrderList(scope.row)">增加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="totalDiv">
                                <small>数量：</small>{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small>{{totalMoney}}元
                            </div>
                            <div class="pos-divbtn">
                                <el-button type="warning" @click="delAllGoods">挂单</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label='外卖' class="goods-tab">
                            外卖
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span='17'>
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul>
                            <li v-for="(goods,index) in oftenGoods" :key="index" @click="addOrderList(goods)">
                                <span>{{goods.goodsName}}</span>
                                <span class="o-price">￥{{goods.price}}元</span>
                            </li>
                        </ul>
                    </div>
                    <div class="goods-type">
                        <el-tabs class="type-tabs">
                            <el-tab-pane label='汉堡' class="goods-tab">
                                <div>
                                    <ul class="cookList">
                                        <li v-for="(goods,index) in type0Goods" :key="index" @click="addOrderList(goods)">
                                            <span class="foodImg"><img :src="GoodsImg"  width="100%" height="100%"/></span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label='小食' class="goods-tab">
                                <div>
                                    <ul class="cookList">
                                        <li v-for="(goods,index) in type1Goods" :key="index" @click="addOrderList(goods)">
                                            <span class="foodImg"><img :src="GoodsImg"  width="100%" height="100%"/></span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label='饮料' class="goods-tab">
                                <div>
                                    <ul class="cookList" >
                                        <li v-for="(goods,index) in type2Goods" :key="index" @click="addOrderList(goods)">
                                            <span class="foodImg"><img  :src="GoodsImg" width="100%" height="100%"/></span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label='套餐' class="goods-tab">
                                <div>
                                    <ul class="cookList">
                                        <li v-for="(goods,index) in type3Goods" :key="index" @click="addOrderList(goods)">
                                            <span class="foodImg"><img :src="GoodsImg" width="100%" height="100%"/></span>
                                            <span class="foodName">{{goods.goodsName}}</span>
                                            <span class="foodPrice">￥{{goods.price}}元</span>
                                        </li>
                                    </ul>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import GoodsImg from '../../assets/goodsimg.jpg'
    import Axios from 'axios'
    export default {
        name:'Pos',
        data(){
            return{
                tabelData:[],
                totalCount:'',
                totalMoney:'',
                oftenGoods:[],
                type0Goods:[],
                type1Goods:[],
                type2Goods:[],
                type3Goods:[],
                GoodsImg:GoodsImg
                
            }
        },
        created:function(){
        //请求常用商品
          Axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
          .then(response=>{
            //   console.log(response);
              this.oftenGoods =response.data;
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误');
          })  
        //请求常用商品 分类
          Axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
          .then(response=>{
            //   console.log(response);
              this.type0Goods =response.data[0];
              this.type1Goods =response.data[1];
              this.type2Goods =response.data[2];
              this.type3Goods =response.data[3];
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误');
          })  
          
        },
        mounted:function(){
            let orderHeight = document.body.clientHeight;
            document.getElementById('order-list').style.height = orderHeight +'px';
        },
        methods:{
            addOrderList(goods){
                this.totalCount=0; //汇总数量清0
                this.totalMoney=0;
                let isHava =false;
                for(let i=0; i<this.tabelData.length; i++){
                    //判断商品是否已存在订单列表里
                    if(this.tabelData[i].goodsId == goods.goodsId){
                        isHava =true;
                    }
                }
                if(isHava){
                    let arr =this.tabelData.filter(o =>o.goodsId == goods.goodsId);
                    console.log(arr[0].count);
                    arr[0].count++;
                }else{
                    //不存在就推入新的数组
                    let newGoods ={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
                    this.tabelData.push(newGoods);
                }
                this.getAllTotalMoney();
            },
            //删除单个商品
            delSingleGoods(goods){
                this.tabelData = this.tabelData.filter(o => o.goodsId != goods.goodsId);
                //重新计算价格
                this.getAllTotalMoney();
            },
            //计算中金额
            getAllTotalMoney(){
                //总金额，总得数量清0
                this.totalCount =0;
                this.totalMoney =0;
                //如果t
                if(this.tabelData){
                    //进行数量和价格的汇总计算
                    this.tabelData.forEach((element) =>{
                        this.totalCount +=element.count;
                        this.totalMoney =this.totalMoney + (element.price*element.count);
                    })
                }
            },
            delAllGoods(){
                this.tabelData =[];
                this.totalCount=0;
                this.totalMoney =0;
            },
            cheackOut(){
                if(this.totalCount !=0){
                    this.tabelData =[];
                    this.totalCount=0;
                    this.totalMoney =0;
                    this.$message({
                        message:'结账成功,你又为店里出了一份力!',
                        type:'success'
                    })
                }else{
                    this.$message.error('不能空结,老板了解你急切的心情！');

                }
            }
        }
    }
</script>
<style>
    .el-tabs__item.is-top{
        color: #FFF;
    }
    .el-tabs__item.is-top.is-active{
        color: #409EFF;
    }
    .pos-order{
        color: #fff;
        border-right: 1px solid #fff;
        padding: 10px;
    }
    .totalDiv{
       background-color: #fff;
       padding: 10px;
       border-bottom: 1px solid #fff;
       color: #2c3e50;
    }
    .pos-divbtn{
        margin-top: 20px;
    }
    .title{
        padding: 13px;
        border-bottom: 1px solid #fff;
        color: #fff;
        text-align: left;
        margin-left: 10px;
    }
    .often-goods-list{
        padding: 10px;
    }
    .often-goods-list ul li{
        padding: 10px;
        list-style: none;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #2c3e50;
        text-align: center;
        cursor: pointer;
        float: left;
        margin: 5px;
    }
    .often-goods-list ul li:hove{
         background-color: #2c3e50;
         color: #fff;
    }
     .goods-type{
         width: 100%;
         float: left;
         color: #fff;
         padding: 10px;
         clear: both;
     }
    .cookList li{
        border-radius: 4px;
        list-style: none;
        width:23%;
        border:1px solid #2c3e50;
        height: auto;
        overflow: hidden;
        background-color:#fff;
        padding: 4px;
        float:left;
        margin: 2px;
        cursor: pointer;
    }
    .cookList li span{
        display: block;
        float:left;
    }
    .foodImg{
        width: 40%;
    }
    .foodName{
        font-size: 18px;
        color:#2c3e50;
        width: 60%;
        padding-top: 10px
    }
    .foodPrice{
        width: 60%;
        font-size: 16px;
        padding-top:10px;
        color: #2c3e50
    }
</style>

