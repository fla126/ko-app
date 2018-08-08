<template>
	<div class="price-adjust">
	  <div><i class="deduct" v-tap="{methods:deduct}"></i></div>
	  <div><input type="number" v-model="data" @blur="blur"></div>
	  <div><i class="add" v-tap="{methods:add}"></i></div>
	</div>
</template>

<script>
	export default {
	  name:'cp-adjust',
	  data(){
	  	return {
	  		data:0,
	  		precision:0,
	  	}
	  },
	  props:{
	  	val:{
	  		type:Number,
	  		default:0
	  	}
	  },
	  created(){
	  	this.data = this.val
	  	var _array = this.data.toString().split('.')
	  	this.precision = _array[1]?_array[1].length:0
	  },
	  methods:{
	  	blur(){
	  		this.$emit('callback',this.data)
	  	},
	  	deduct(args){
	  		var $_tar = $(args.event.currentTarget)
	  		$_tar.addClass('active')
	  		setTimeout(()=>{
	  			$_tar.removeClass('active')
	  		},150)
	  		this.adjust(false)
	  	},
	  	add(args){
	  		var $_tar = $(args.event.currentTarget)
	  		$_tar.addClass('active')
	  		setTimeout(()=>{
	  			$_tar.removeClass('active')
	  		},150)
	  		this.adjust(true)
	  	},
	  	adjust(key){
	  		var _data = this.data*10**this.precision + (key?1:-1)
	  		if(_data<0){
	  			_data = 0
	  		}
	  		this.data = (_data/(10**this.precision)).toFixed(this.precision)
	  		this.$emit('callback',this.data)
	  	}
	  }
	}
</script>
<style lang="less" scoped="">
.price-adjust {
  margin-top: 0.4rem;
  display: flex;
  > div:nth-of-type(1) {
    width: 0.8rem;
    min-width: 0;
  }
  > div:nth-of-type(2) {
    flex: 1;
    min-width: 0;
  }
  > div:nth-of-type(3) {
    width: 0.8rem;
    min-width: 0;
  }
  .deduct, .add {
    display: block;
    height: 0.88rem;
    background: #d5d5d5 url('../assets/img/deduct-icon.png')  no-repeat center ;
    background-size: contain;
    &.active {
      background-color: #3a3f5e;
    }
  }
  .add {
    background-image: url('../assets/img/add-icon.png');
  }
  input {
  	width: 100%;
  	line-height: 0.88rem;
  	text-align: center;
  	font-size: 0.3rem;
  	color: #333333;
  	background-color: #f1f1f1;
  	border: none;
  }
}
</style>
