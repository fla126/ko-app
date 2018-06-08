export default {
	routeTo(args){ //自定义公共路由函数
     this.$router.push({ name: args.to, query:args.params})
    },
}