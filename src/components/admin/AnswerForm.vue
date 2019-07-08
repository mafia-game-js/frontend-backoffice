<template >
  <div class="answer__section">
    <div class="question_form">
      <div class="question_form_top">
        <v-text-field
          class="answer__text-field"
          v-model="answer.label"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Label"
          data-vv-name="anwerLabel"
          required
          box
        ></v-text-field>
      </div>
      <div class="row answer__row">
        <v-text-field
          type="number"
          class="answer__text-field"
          v-model="answer.time"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Time"
          data-vv-name="answerTime"
          required
          box
        ></v-text-field>
        <v-text-field
          type="number"
          class="answer__text-field"
          v-model="answer.happiness"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Happiness"
          data-vv-name="answerHappiness"
          required
          box
        ></v-text-field>
      </div>
      <div class="row answer__row">
        <v-text-field
          type="number"
          class="answer__text-field"
          v-model="answer.money"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Money"
          data-vv-name="answerMoney"
          required
          box
        ></v-text-field>
        <v-text-field
          type="number"
          class="answer__text-field"
          @click="showListRelated = true"
          v-model="answer.question_related"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Question Related"
          data-vv-name="answerQuestionRelated"
          required
          box
        ></v-text-field>
      </div>
      <div class="row error">{{errorText}}</div>
      <div class="row" v-if="showButton">
        <v-btn @click="createOrUpdateAnswer" dark color="green">{{submit}}</v-btn>
      </div>
    </div>
    <div class="related_list" v-if="showListRelated">
      <div class="related_list_wrapper">
        <v-btn class="cross" @click="showListRelated = false" fab small dark color="purple">
          <v-icon dark>close</v-icon>
        </v-btn>
        <question-list
          @questionSelected="setRelatedField"
          :questions="questions"
          :selectable="true"
        ></question-list>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import { mapActions, mapGetters } from 'vuex'
import { question as APIquestion } from 'api'
import fetch from 'api/fetch'
import Icon from 'common/icon/Icon'
import QuestionList from './QuestionList'

export default {
  name: 'answer-form',
  props: ['currentAnswer', 'questionId'],
  data() {
    return {
      errorText: '',
      showSection: false,
      showButton: true,
      showListRelated: false,
      answer: {},
      submit: 'Create',
      callInProgress: false
    }
  },
  watch: {
    currentAnswer() {
      if (this.currentAnswer && this.currentAnswer.id) {
        this.answer = {
          id: this.currentAnswer.id,
          label: this.currentAnswer.label,
          happiness: this.currentAnswer.happiness,
          money: this.currentAnswer.money,
          question_related: this.currentAnswer.question_related,
          time: this.currentAnswer.time
        }
        this.submit = 'Update'
      } else {
        this.submit = 'Create'
      }
    }
  },
  methods: {
    ...mapActions(['retrieveQuestions']),
    setRelatedField(id) {
      this.answer.question_related = id
      this.showListRelated = false
    },
    createOrUpdateAnswer() {
      if (this.submit === 'Create') {
        if (this.answer.label && this.answer.time && this.answer.money && this.answer.happiness) {
          if (this.questionId) {
            this.answer.questionId = this.questionId
            APIquestion.createAnswer(this.answer).then(() => {})
          } else {
            this.$emit('toCreate', this.answer)
          }
          this.showButton = false
        }
      } else {
        APIquestion.updateAnswer(this.answer).then(() => {
          this.$emit('close')
        })
      }
    },
    getHeaders() {
      return fetch.headers()
    },
    showSuccess() {
      console.log('File was created successfully')
    }
  },
  computed: {
    ...mapGetters(['questions']),
    color() {
      if (this.bpm < 100) return 'indigo'
      if (this.bpm < 125) return 'teal'
      if (this.bpm < 140) return 'green'
      if (this.bpm < 175) return 'orange'
      return 'red'
    }
  },
  components: {
    Dropzone,
    Icon,
    QuestionList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.answer {
  &__text-field {
    margin: 20px 10px;
  }

  &__row {
    display: flex;
  }

  &__section {
    margin: 20px;
  }
}

.question {
  &_form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 399px;
    margin: 0 auto;
    justify-content: flex-start;
    border: 1px solid #e3e3e3;
    border-radius: 8px;
    &_top {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    & textarea {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      max-width: 470px;
      min-height: 100px;
    }
  }
}

.glovoInput {
  margin-left: 5px !important;
  margin-right: 5px !important;
  &.image {
    align-self: center;
  }
}

.circ_progress {
  max-height: 26px;
  max-width: 26px;
  position: absolute;
  right: 10px;
  top: 4px;
}

.login_title {
  font-size: 25px;
}

.formButton {
  margin-top: 20px;
  border-radius: 6px;
  position: relative;
  margin-bottom: 10px;
}

.row {
  width: 100%;
}

.cross {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.selectInput {
  position: relative;
}

.error {
  color: red;
}

.optionsWrapper {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  & .glovoInput {
    cursor: pointer;
  }
}

.related_list {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  position: absolute;
  width: 100vw;
  max-width: 800px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  &_wrapper {
    overflow-y: scroll;
    z-index: 20;
    width: 90%;
    height: 90%;
    background-color: white;
    position: relative;
  }
}
</style>
