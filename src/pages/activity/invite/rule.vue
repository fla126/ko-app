<template>
  <div class="page">
    <comp-top-back :class="'line'"></comp-top-back>
    <div class="page-main">
      <h3 class="title mt50">活动规则</h3>
      <div class="rule">
        <p>一旦您推荐的人成功完成注册，购买Tinkey，您将获得相应的返佣奖励。</p>
        <p>每成功邀请一名用户购买一个Tinkey将活动0.1ETH奖励，无上限。</p>
        <p>成功推荐一个超级节点，将活动50ETH奖励，超级节点 限制99位，前49位超级节点所有人均可推荐，后49位超级节点由前49位超级节点推荐，前49位超级节点每位有 且只有1个推荐名额。</p>
        <p>Tinkey.io保留随时对返佣活动规则进行调整的权利，但是对您推荐的好友数量没有限制。</p>
        <p>除超级节点外，被推荐人必须使用您的推荐链接、二维码或者推荐码注册才可以。</p>
        <p>Tinkey.io会严查重复的或者虚假账户，一经发现，将不会支付返佣。</p>
        <p>特别注意：<br />由于市场环境的改变，欺诈风险的存在等原因，Tinkey.io保留随时对活动邀请规则作出调整的最终解释权。</p> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'activity-invite-rule',
  data(){
    return {
     account:''
    }
  },
  computed:{
    
  },
  methods:{
    
  },
}

</script>
<style lang="less" scoped>
.page-main {
  background-color: #f9f9f9;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
.title {
  font-size: 0.36rem;
}
.rule {
  margin-top: 0.25rem;
  padding: 0.25rem;
  border-radius: 4px;
  background-color: #f1f1f1;
  p {
    line-height: 0.4rem;
    font-size: 0.24rem;
    color:#666;
    padding-left: 0.4rem;
    position: relative;
    padding-bottom: 0.5rem;
    &:before {
      content: '';
      position: absolute;
      width: 0.18rem;
      height: 0.18rem;
      left: 0rem;
      top: 0.11rem;
      border-radius: 50%;
      background-color: #4d7bf3;
    }
  }
}
</style>
