<template>
  <div class="page-top">
  	<span class="btn-back" v-tap="{methods:goBack}" v-if="back"></span>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name:'comp-top-back',
  props:{
    back:{
      type: Boolean,
      default:true
    },
  },
  methods:{
  	goBack(){
      this.$router.back()
    }
  }
}

</script>
<style type="text/css" lang="less" scoped>
.page-top {
  text-align: center;
  line-height: 0.5rem;
  font-size: .36rem;
  &.line {
    border-bottom: 1px solid #E4E5E7;
  }
  .btn-back {
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    left: 0.3rem;
    background: url('../../assets/img/fanhui-icon@3x.png') no-repeat center;
    background-size: contain;
  }
}
</style>
