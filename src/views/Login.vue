<template>
  <div class="auth">
    <div class="forms">
      <login-form @finish="finish"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from 'components/LoginForm'

export default {
  name: 'auth',
  props: ['next', 'signupFirst'],
  data() {
    return {
      loginDisplayed: !this.signupFirst,
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      changeModalDisplay: 'changeModalDisplay',
      retrieveCategories: 'retrieveCategories'
    }),
    finish() {
      console.log('Hi there')
      if (this.user.token) {
        this.$router.replace({ name: 'manage' })
      }
    }
  },
  components: {
    LoginForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.auth {
  margin-top: 60px;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
