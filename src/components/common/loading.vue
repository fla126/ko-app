<template></template>
<script>
import Vue from 'vue'
import { Indicator } from 'mint-ui';

export default {
  name:'loading',
  props:{
    show:{
      type: Boolean,
      default:false
    }
  },
  mounted(){
    if(this.show){
      Indicator.open({
          text:'Loading...',
          spinnerType: 'snake'
        })
    }
  },
  watch:{
    show(newVal, oldVal){
      if(newVal){
        Indicator.open({
            text:'Loading...',
            spinnerType: 'snake'
          })
      } else {
        Indicator.close();
      }
    }
  }
}

</script>
<style type="text/css" lang="less">
.mint-indicator-wrapper {z-index: 10000; }
.mint-indicator-mask {background: #fff; opacity: 1;}
.mint-indicator-text {font-size: 14px;}
</style>