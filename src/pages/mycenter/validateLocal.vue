<template>
  <div  class="page wrap">
    <div class="column is-12">
      <label class="label">البريد الاليكتروني (Email)</label>
      <p class="control has-icon has-icon-left">
        <input name="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
        <i v-show="errors.has('email')" class="fa fa-warning"></i>
        <span v-show="errors.has('email')" class="help is-danger has-text-right">{{ errors.first('email') }}</span>
      </p>
    </div>
    <div class="column is-12">
      <label class="label">رقم الهاتف (Phone)</label>
      <p class="control has-icon has-icon-left">
        <input name="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
        <i v-show="errors.has('phone')" class="fa fa-warning"></i>
        <span v-show="errors.has('phone')" class="help is-danger has-text-right">{{ errors.first('phone') }}</span>
      </p>
    </div>
    <div class="column is-12">
      <p class="control">
        <button @click="changeLocale" type="button" class="button is-primary">Change Locale To {{ nextLocale }}</button>
      </p>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
/*  import arabic from 'vee-validate/dist/locale/ar';*/
  import arabic from 'vee-validate/dist/locale/zh_CN';
  export default {
    name: "page-validatelocal",
    data: () => ({
      email: '',
      phone: '',
      locale: 'en',
    }),
    computed: {
      nextLocale() { // 显示返回
        return this.locale === 'en' ? 'Arabic' : 'English';
      }
    },
    methods: {
      changeLocale() {
        this.locale = this.$validator.locale === 'ar' ? 'en' : 'ar';
        this.$validator.localize(this.locale);
      }
    },
    watch: {
      $route () {
        // make sure we revert to english if the user navigated away.
        this.$validator.localize('en');
      }
    },
    created() {
      this.$validator.localize('ar', {
        messages: arabic.messages,
        attributes: {
          email: '夺夺',
          phone: '222'
        }
      });

      // start with english locale.
      this.$validator.localize('en');
    }
  }
</script>

<style type="text/css" lang="less" scoped>

</style>
