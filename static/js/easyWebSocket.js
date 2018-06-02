/**
 * Created by weiky on 2017/8/12.
 * 配合 stomp 使用
 */
easyWebSocket=(function(){
    function Subscrib(){
        this.id=-1;
        this.destination=null;
        this.fakeIdArr=[];
        this.funArr=[];
        this.unSubscribeById=function(id){
            var index = this.fakeIdArr.indexOf(id);
            if(index==-1){
                return -1;
            }
            this.funArr.splice(index,1);
            this.fakeIdArr.splice(index,1);
            if(this.funArr.length==0){
                //返回真实 订阅id
                var realId = this.id;
                this.id=-1;
                return realId;
            }
            return -1;
        };
        this.subscribe = function (destination,callback,fakeid,_easy) {
            this.destination = destination;
            this.fakeIdArr.push(fakeid);
            this.funArr.push(callback);
            if(_easy){
                _easy.fakeIdObj[fakeid+""]=destination;
            }
        };
        this.pushBack = function(message){
            var callback;
            for(var i=0;i<this.funArr.length;i++){
                callback = this.funArr[i];
                if(callback && typeof callback == 'function'){
                    callback(message)
                }
            }
        };
        this.clear=function(){
            this.funArr=[];
            this.fakeIdArr=[];
            this.id=-1;
        };
    }
    var easy ={
        counter:0,
        rootSocket:null,
        connectState:0,//0未连接 1 连接中 2已链接
        isConnect:false,
        topics:{},
        __uniqid:0,
        fakeIdObj:{},//fakeId:destination id 和主题对应
        map:{},//存储id
        //初始化 要立即调用 connect方法
        init:function(websocketUrl){
            if(!easy.rootSocket){
                easy.rootSocket = Stomp.client(websocketUrl);
            }
        },
        // 链接
        connect:function(){
            if(!easy.rootSocket){
                return;
            }
            if(easy.isConnect){
                return;
            }
            if(easy.connectState!==0){
                return;
            }
            easy.connectState=1;
            easy.rootSocket.connect("", "", easy.connectOk,easy.errfun);
        },
        errfun:function (err) {
            if(err && err.headers && err.headers.message && console && console.log){
                console.log(err.headers.message);
            }
        },
        //取消订阅主题
        unSubscribe:function(destination){
            var sub = easy.topics[destination];
            if(sub && sub.id!=-1){
                easy.rootSocket.unsubscribe(sub.id);
                sub.clear();
                delete easy.topics[destination];
            }
        },
        // 取消订阅主题 by id
        unSubscribeById:function(id) {
            var sub;
            var destination;
            destination = easy.fakeIdObj[id];
            if(!destination){
                return;
            }
            sub = easy.topics[destination];
            if(!sub){
                return;
            }
            var realId = sub.unSubscribeById(id);
            if(realId!=-1){
                easy.rootSocket.unsubscribe(realId);
                sub.clear();
                delete easy.topics[destination];
            }
        },
        // 数据返回
        pushBack:function(message){
            var destination;
            var sub;
            if(message && message.headers){
                destination = message.headers.destination;
                sub = easy.topics[destination];
                if(sub){
                    sub.pushBack(message);
                }
            }
        },
        // 订阅主题
        subscribe:function(destination,callback){
            if(!easy.rootSocket){
                return;
            }
            var fakeId=-1;
            var sub;
            // 未连接
            if(easy.connectState<2){
                fakeId = easy.counter++;
                if(easy.topics[destination]){
                    sub = easy.topics[destination];
                    sub.subscribe(destination,callback,fakeId,easy);
                }else{
                    sub = new Subscrib();
                    sub.subscribe(destination,callback,fakeId,easy);
                    easy.topics[destination] = sub;
                }
                return fakeId;
            }
            // 已链接
            fakeId = easy.counter++;
            // 已订阅
            if(easy.topics[destination]){
                sub = easy.topics[destination];
                sub.subscribe(destination,callback,fakeId,easy);
                return fakeId;
            }
            // 未订阅
            var id = easy.rootSocket.subscribe(destination,easy.pushBack);
            sub = new Subscrib();
            sub.id =id;
            sub.subscribe(destination,callback,fakeId,easy);
            easy.topics[destination] = sub;
            return fakeId;
        },
        connectOk:function(){
            easy.isConnect=true;
            easy.connectState=2;
            var sub;
            for( item in easy.topics){
                sub = easy.topics[item];
                if(sub && sub.id==-1){
                    sub.id = easy.rootSocket.subscribe(sub.destination,easy.pushBack);
                }
            }
        },

    };
    return easy;
})();
