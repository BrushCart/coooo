<template>
    <div>
        
     <div class="newFlow">
         <div class="flow-current">订单提交</div>
         <div class="flow-no">填写收货地址</div>
         <div class="flow-no">正在办理</div>
         <div class="flow-no">办理完成</div>
    </div>
    <div class="banner">
        <div class="swiper-container">
            <div id="banner" class="swiper-wrapper">
                <div class="swiper-slide">
                    <a href="javascript:void(0);"><img src="../comme/img/banner@3x.png"></a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
    <Upload />
    <div class="newBanner">
        <p>已有<span></span>个用户在车轮补换驾照成功</p>
    </div>
    <div id="upload"></div>
    <div class="info">
        <div class="rSelect">
            服务类型 
            <select name="" id="type">
                <option value="1">换驾照</option>
                <option value="2">补驾照</option>
            </select>
        </div>
        <div>
            <p>当前驾照签发城市<span class="help"></span></p>
            <input placeholder="请选择签发地" ref="value" id="city-picker" @click="clickCity">
        </div>
        <div id="ele">
            <p>可补换的签发城市<span class="help"></span></p>
            <input placeholder="请选择补换地" id="change"></div>
            <div>
                <span>服务费</span>
                <div>
                    <p class="tag">江苏限时放血价<span>￥999</span></p>
                    <span class="price">￥399</span>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="toMember">
                <div class="left">
                    <span class="top">成为会员，本单减5元</span> 
                    <span class="btm">涵盖所有车主服务，每年省300元是的方式发送的的幅度幅度</span>
                </div>
                <div class="right">
                    <span class="l">¥<i id="li">199</i></span> 
                    <span class="c">¥ <i id="ci">0.01</i></span><div class="r">
                </div>
            </div>
        </div>
        <div class="rSelect">
            优惠
            <div style="display: flex; align-items: center;">
                <img id="couponKindImg" style="display: none;" src="" alt=""> 
                <span id="disValue"></span> 
                <select name="" id="discount"></select>
            </div></div></div><p class="faq">
                <a href="faq.html">常见问题?</a>
                </p><div id="popup">
        </div>
        <div class="pay">
            <span>
                实付: 
            </span>
            <span>￥</span>
            <span id="deposit">399</span> 
            <button id="payBtn">立即支付</button>
        </div>
        <div id="licence" class="licence">
        </div>
        <div class="masks">
        </div>
        <van-popup v-model="showCity" position="bottom" :overlay="true">
        <van-picker show-toolbar
            title="请选择签发城市"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm" 
            @change="cityChange" 
            position="bottom"
            :overlay="true"
            ref="cityPicker"
        />
        </van-popup>
    </div>
</template>

<script>
import Upload from '../components/Upload'
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
    data() {
        return {
            showCity: false,
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            info: {
                type: '',
                city: []
            }
        }
    },
    components: {
        Upload
    },
    computed: {
        ...mapState({
        cityList: state=>state.cityPicker.cityList,
        costList: state=>state.cityPicker.costList,
        city: state=>state.cityPicker.city,
        cost: state=>state.cityPicker.cost
        })
    },
    methods: {
        ...mapActions({
            getCityList: 'cityPicker/getCityList',
            getCostList: 'cityPicker/getCostList'
        }),
        ...mapMutations({
            updateState: 'cityPicker/updateState'
        }),
        cityChange() {
            // 获取当前省份的下标
            let index = this.cityList.findIndex(item=>item.name == values[0]);
            // 调用api更新城市数据
            this.$refs.cityPicker.setColumnValues(1, this.cityList[index].list.map(item=>item.name));
        },
        onCancel(){
            this.showCity = false
        },
        onConfirm(values){
            console.log('values...', values);
            // 触发mutation更新城市数据
            this.updateState({city: values})
            this.cityCancel()
        },
        clickCity(){
            this.showCity = true;
        }
    }
};
</script>

<style>
@import url('../css/detail.css');
</style>
