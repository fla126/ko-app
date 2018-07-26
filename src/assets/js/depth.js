//数组过滤处理
function filterData(rawData,type) {
	var priceArray = [], amountArray= [], avaliableAmount = {}, lastTotal = 0
	for(let item of rawData){
		if(priceArray.indexOf(item.price)==-1){
			priceArray.push(parseFloat(item.price))
			avaliableAmount[item.price] = parseFloat(item.avaliableAmount)
		} else {
			avaliableAmount[item.price] += parseFloat(item.avaliableAmount)
		}
	}
	//价格从高到低排序
	if(type=='bids'){
		var _keys = Object.keys(avaliableAmount).reverse(), _values = Object.values(avaliableAmount).reverse()
		avaliableAmount = {}
		for(let i=0; i<_keys.length; i++){
			avaliableAmount[_keys[i]] = _values[i]
		}
	}
	//计算成交量
	for(let key in avaliableAmount){
		avaliableAmount[key] += lastTotal
		lastTotal = avaliableAmount[key]
		amountArray.push(avaliableAmount[key].toFixed(2))
	}
	var priceArry = Object.keys(avaliableAmount)
	for(let i in priceArry){
		priceArry[i] = parseFloat(priceArry[i]).toFixed(8)
	}
	return {price:priceArry, amount:amountArray}
}

// 创建指定长度的数组
function setBlankArray(len){
	var arry = []
	for(let i=0; i<len; i++){
		arry.push('-')
	}
	return arry
}
//数据组装
function splitData(rawData) {
	var asks = filterData(rawData.asks,'asks'), bids = filterData(rawData.bids,'bids'), price = (bids.price).concat(asks.price), price_set = Array.from(new Set(price)), bidsAmount, asksAmount
	bids.amount.reverse()
	bidsAmount = bids.amount.concat(setBlankArray(asks.amount.length))
	asksAmount = setBlankArray(bids.amount.length-(price.length-price_set.length)).concat(asks.amount)
	return {price:price_set, bids:bidsAmount, asks:asksAmount}
}

//接收数据并分析数据返回opation

function getOption(res){
	var data = splitData(res)
	var option = {
	    animation: true,
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            type: 'cross',
	            label:{
	            	color:'#d6dff9',
	            	backgroundColor:'#181b2a',
	            	shadowBlur:0,
	            	borderWidth:1,
	            	borderColor:'#888',
	            }
	        },
	        backgroundColor:'rgba(88,88,88,.8)',
	        transitionDuration:0,
	        position: [0, 0],
	        padding:[0,0,0,0],
	        formatter(params){
	        	var _html = '', orignal = params[0].data !='-'? params[0].data : params[1].data
	        	console.log(params)
	        	
	        	_html = `
	        	<div class="tips" data-v-9527 style='font:0.24rem/0.3rem "Microsoft YaHei";'>
	        		<span>价格：${params[0].name}</span>
	        		<span>总量：${orignal}</span>
	        	</div>`
	        	var _style = `
	        	<style>
	        		.tips[data-v-9527] {
	        			position:fixed;
	        			left:0.3rem;
	        			right:0.3rem;
	        			padding:5px;
	        			background-color:rgba(88,88,88,.8);
	        			word-wrap:break-word;
	        			white-space:normal;
	        		}
	        		.tips[data-v-9527] span{
	        			color:#d6dff9;
	        			margin-right:0.2rem;
	        		}
	        	</style>`
	        	return _html+_style
	        }
	    },
	    grid: [{
	        left: '0',
	        top: '5%',
	        right: '0',
	        height: '85%'
	    }],
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: data.price,
	        axisLine: {
	            onZero: false,
	            lineStyle: {
	                color: '#313c5a',
	            }
	        },
	        axisLabel:{
	        	color:'#d6dff9',
	        	align:'left'
	        }
	    },
	    yAxis: {
	        type: 'value',
	        splitLine:{
	        	lineStyle:{
	        		color:['#313c5a']
	        	}
	        },
	        axisLine: {
	        	onZero: false,
	            lineStyle: {
	                color: '#313c5a',
	            }
	        },
	        axisTick:{
	        	inside:true,
	        },
	        axisLabel:{
	        	inside:true,
	        	color:'#d6dff9',
	        }
	    },
	    dataZoom: [{
		  type: 'inside',
		  xAxisIndex: [0, 0],
		  start: 0,
		  end: 100
		}],
	    series: [{
	        name: 'bids',
	        type: 'line',
	        smooth: false,
	        showSymbol: false,
	        data: data.bids,
			itemStyle: {
		      color:'#0ee7a5'
			},
	        areaStyle: {
	            color: {
	                type: 'linear',
	                x: 0,
	                y: 0,
	                x2: 0,
	                y2: 1,
	                colorStops: [{
	                    offset: 0, color: 'rgba(14,231,165,1)' // 0% 处的颜色
	                }, {
	                    offset: 1, color: 'rgba(14,231,165,.1)' // 100% 处的颜色
	                }],
	                globalCoord: false // 缺省为 false
	            }
	        },
	    },
	    {
	        name: 'asks',
	        type: 'line',
	        smooth: false,
	        showSymbol: false,
	        data: data.asks,
			itemStyle: {
		      color:'#e76d42'
			},
	        areaStyle: {
	            color: {
	                type: 'linear',
	                x: 0,
	                y: 0,
	                x2: 0,
	                y2: 1,
	                colorStops: [{
	                    offset: 0, color: 'rgba(231,109,66,1)' // 0% 处的颜色
	                }, {
	                    offset: 1, color: 'rgba(231,109,66,.1)' // 100% 处的颜色
	                }],
	                globalCoord: false // 缺省为 false
	            }
	        },
	    }
	    ]
	}
	return option
}

export default getOption