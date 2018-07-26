<template>
	<label class="switch">
		<input class="switch-input" type="checkbox" v-model="checked">
		<span class="switch-core"></span>
		<div class="switch-label">
			<label><slot></slot></label>
		</div>
	</label>
</template>

<script>
	export default {
	  name:'cp-switch',
	  data(){
	  	return {
	  		checked:false
	  	}
	  },
	  props:{
	  	val:{
	  		type:Boolean,
	  		default:false
	  	}
	  },
	  created(){
	  	this.checked = this.val
	  },
	  watch:{
	  	checked(n, o){
	  		this.$emit('callback',this.checked)
	  	}
	  },
	  methods:{

	  }
	}
</script>
<style lang="less" scoped="">
.switch {
	display: flex;
	align-items: center;
	position: relative;
	.switch-input {
	    display: none;
	}
	.switch-core {
		display: inline-block;
		position: relative;
		width: 1.2rem;
	    height: 0.4rem;
		background: #f1f1f1;
		&:after, &:before {
			content: " ";
			top: 0;
			left: 0;
			position: absolute;
			transition: transform .3s;
		}
		&:before {
			width: 1.2rem;
			height: 0.4rem;
			background-color: #f1f1f1;
		}
		&:after {
			width: 0.6rem;
			height: 0.4rem;
			background-color: #4d7bf3;
			box-shadow: 0 1px 3px rgba(0,0,0,.4);
		}

	}
	.switch-input:checked + .switch-core {
	    background-color: #f1f1f1;
	}
	.switch-input:checked + .switch-core::before {
	    transform: scale(0);
	}
	.switch-input:checked + .switch-core::after {
	    transform: translateX(0.6rem);
	    background-color: #4d7bf3;
	}
	.switch-label {
	    margin-left: 0.26rem;
	    display: inline-block;
	    font-size: 0.26rem;
	}
}

</style>
