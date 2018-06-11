<template>
  <mask-layer :isgray="true" :show="show" @hide="hideFunction">
    <div class="mconfirm-layer" >
      <i class="close" v-tap="{methods:hideFunction}">×</i>
      <h3>修改名称</h3>
      <input type="text" id="cname" v-model="commandName" @keydown="checkInput($event)" @focus="focusAc($event)">
      <div class="step-next">
        <mt-button type="primary" size="large" v-tap="{methods:mconfirm}">确认</mt-button>
      </div>
    </div>
  </mask-layer>
</template>
<script>
import maskLayer from '@/components/common/mask';

export default {
  name:'comp-command-editor',
  props:{
    show:{
      type: Boolean,
      default:false
    },
    hideFunction:{
      type: Function
    },
    cname:{
      type:String
    }
  },
  data(){
    return {
      commandName:''
    }
  },
  created(){
    this.commandName = this.cname
  },
  methods:{
    mconfirm(){
      this.hideFunction(this.commandName)
    },
    checkInput(event){
      if(event.keyCode == 13){
        this.mconfirm()
      }
    },
    focusAc(event){
      event.currentTarget.select()
    }
  },
  components:{  
    maskLayer,
  }
}

</script>
<style type="text/css" lang="less" scoped="">
.mconfirm-layer {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5.4rem;
  height: 2.9rem;
  margin: auto;
  padding-top: 0.25rem;
  background-color: #fff;
  border-radius: 0.1rem;
  text-align: center;
  box-shadow: 0 0.05rem 0.1rem 0.01rem #6c6c6c;
  input {
    margin: 0.35rem auto;
    width: 4.8rem;
    border:none;
    text-align: center;
    background-color: transparent;
    border-bottom: 1px solid #EAEBEC;
    line-height: 0.5rem;
    font-size: 0.32rem;
    &:focus {
      
    }
  }
  h3 {
    font-size: 0.32rem;
  }
  .close {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    right: -0.2rem;
    top: -0.2rem;
    background-color: rgba(0,0,0,.5);
    border-radius: 50%;
    font-size: 0.5rem;
    color: rgba(255,255,255,.5);
    line-height: 0.5rem;
    text-align: center;
    font-style: normal;
  }
}
.step-next {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  .mint-button {
    border-radius: 0;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }
}
</style>