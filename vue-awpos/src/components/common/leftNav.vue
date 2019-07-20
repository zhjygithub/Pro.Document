<template>
    <div class="leftnav">
        <ul>
            <li>
                <i class="icon iconfont icon-wodezichan"></i>
                <div>收银</div>
            </li>
            <li>
                <i class="icon iconfont icon-dianpu"></i>
                <div>店铺</div>
            </li>
            <li>
                <i class="icon iconfont icon-hanbao"></i>
                <div>商品</div>
            </li>
            <li>
                <i class="icon iconfont icon-huiyuanqia"></i>
                <div>会员</div>
            </li>
            <li>
                <i class="icon iconfont icon-zuanshi"></i>
                <div>统计</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'leftNav',
    data(){
        return{

        }
    }    
}
</script>
<style>
    .leftnav{
        width: 5%;
        float: left;
        color: #fff;
        font-size: 10px;
        background-color: #1D8ce0;
        height: 100%;
    }
    .iconfont{
        font-size: 24px;
    }
    .leftnav ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .leftnav li{
        padding: 10px;
        border-bottom: 1px solid #20a0ff;
        list-style: none;
        text-align: center;
    }
</style>

