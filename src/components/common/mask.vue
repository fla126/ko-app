<template>
  <div class="mask" :class="{gray:isgray}" v-if="show" @click.self="$emit('hide')">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name:'maskLayer',
  props:{
    show:{
      type: Boolean,
      default:false
    },
    isgray:{
      type: Boolean,
      default:false
    }
  },
  methods:{
    
  }
}

</script>
<style type="text/css" lang="less" scoped="">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    &.gray {
      background: rgba(0,0,0,.5);
    }
}
</style>