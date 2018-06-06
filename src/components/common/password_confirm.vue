<template>
  <mask-layer :isgray="true" :show="show" @hide="hideFunction">
    <div class="pwconfirm-layer">
      <input type="password" v-model="password" maxlength="6" v-focus>
      <h3>请输入付款密码</h3>
      <ul class="password-display">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  </mask-layer>
</template>
<script>
import maskLayer from '@/components/common/mask';

export default {
  name:'comp-password-confirm',
  props:{
    show:{
      type: Boolean,
      default:false
    },
    hideFunction:{
      type: Function
    }
  },
  data(){
    return {
      password:''
    }
  },
  mounted(){

  },
  components:{  
    maskLayer,
  }
}

</script>
<style type="text/css" lang="less" scoped="">
.pwconfirm-layer {
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
  overflow: hidden;
  text-align: center;
  input {
    position: absolute;
    left: -100000px;
    width: 1px;
  }
  h3 {
    font-size: 0.32rem;
  }
  .password-display {
    margin: 0.4rem auto;
    width: 3.5rem;
    display: flex;
    justify-content:space-between;
    li {
      width: 0.35rem;
      border-bottom: 2px solid #333;
    }
  }
}
</style>