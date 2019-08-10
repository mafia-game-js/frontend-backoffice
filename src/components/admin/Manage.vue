<template >
  <div class="manage" v-if="showSection">
    <div class="manage_header">
      <div class="manage_settings">
        <div
          v-for="(number, field) in questionSettings"
          :key="field"
          @click="filter = field"
          v-show="showCreate === false"
        >
          <v-btn v-show="field === '0'" dark color= "orange">First Question | {{number}}</v-btn>
          <v-btn v-show="field === '1'" dark color="green darken-2">Beggining | {{number}}</v-btn>
          <v-btn v-show="field === '2'" dark color="yellow darken-4">Half | {{number}}</v-btn>
          <v-btn v-show="field === '3'" dark color="red darken-4">Ending | {{number}}</v-btn>
          <v-btn v-show="field === '4'" dark color="light-blue">New Stage | {{number}}</v-btn>
          <v-btn v-show="field === '5'" dark color="black">Grave | {{number}}</v-btn>
          <v-btn v-show="field === '6'" dark color="lime darken-3">Related | {{number}}</v-btn>
        </div>
        <v-btn  @click="filter = null" dark color="grey">All | {{totalOfQuestions}}</v-btn>
      </div>
      <div class="manage_game_settings">
        <div class="manage_game_settings_input">
          <v-text-field label="Time" suffix="days" v-model="settings.time"></v-text-field>
        </div>
        <div class="manage_game_settings_input">
          <v-text-field label="Money" suffix="$$" v-model="settings.money"></v-text-field>
        </div>
         <div class="manage_game_settings_input">
          <v-text-field label="Influence" suffix="points" v-model="settings.influence"></v-text-field>
        </div>
        <v-btn @click="updateSettings()" dark color="teal">Update</v-btn>
      </div>
      <div class="create">
        <div class="row">
          <v-btn fab @click="showCreate = true" v-show="showCreate === false" dark color="teal">
            <v-icon>add</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <question-form @close="showCreate = false" v-if="showCreate === true"></question-form>
    <question-list :filter="filter" :questions="questions" :selectable="false"></question-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth, settings } from 'api'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

export default {
  name: 'manage',
  props: [],
  data() {
    return {
      filter: null,
      showSection: false,
      showCreate: false,
      settings: {}
    }
  },
  computed: {
    ...mapGetters(['questionSettings', 'totalOfQuestions', 'questions'])
  },
  beforeCreate() {
    this.showSection = true
    auth
      .isAuth()
      .then(res => {
        if (res.status !== 2) {
          this.$router.replace({ name: 'login' })
        } else {
          this.showSection = true
        }
      })
      .catch(res => {
        this.$router.replace({ name: 'login' })
      })
  },
  mounted() {
    settings.get().then(_settings => {
      this.settings = _settings
    })
  },
  methods: {
    ...mapActions(['retrieveQuestions']),
    updateSettings() {
      settings.update(this.settings)
    }
  },
  components: {
    QuestionForm,
    QuestionList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.manage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &_header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    flex-wrap: wrap;
    margin: 2em 0 2em 0;
  }
  &_game_settings {
    display: flex;
    max-width: 800px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    border-radius: 4px;
    &_input {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
  &_settings {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    &_fields {
      margin: 1em;
    }
  }
}
.create {
  margin: 2em 4em;
  position: fixed;
  bottom: 0;
  right: 0;
}
.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.newAnswers,
.updateAnswers {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
