<template >
  <div class="question_section">
    <div class="question_form">
      <div class="cross">
        <v-btn @click="$emit('close')" fab small dark color="purple">
          <v-icon dark>close</v-icon>
        </v-btn>
      </div>
      <div class="question__image-preview">
        <div
          class="image_preview"
          :v-style="`opacity: ${showImage ? '1' : '0'};`"
          :style="{backgroundImage: 'url(' + currentImage + ')'}"
        ></div>
      </div>
      <div class="question_form_top">
        <v-text-field
          v-model="currentImage"
          v-validate="'required'"
          :error-messages="errors.collect('image')"
          label="CDN image"
          data-vv-name="questionImage"
          required
          box
        ></v-text-field>
        <v-text-field
          v-model="question.name"
          v-validate="'required'"
          :error-messages="errors.collect('name')"
          label="Name"
          data-vv-name="questionTitle"
          required
          box
        ></v-text-field>
        <v-text-field
          v-model="question.hierarchy"
          v-validate="'required'"
          :error-messages="errors.collect('hierarchy')"
          label="Hierarchy"
          data-vv-name="questionHierarchy"
          required
          box
        ></v-text-field>
        <v-text-field
          v-model="question.organization"
          v-validate="'required'"
          :error-messages="errors.collect('organization')"
          label="Organization"
          data-vv-name="questionOrganization"
          required
          box
        ></v-text-field>
      </div>
      <v-textarea
        class="question__form__description"
        box
        name="questionDescription"
        label="Decision"
        v-model="question.decision"
        counter
      ></v-textarea>
      <div class="row question__form__description">
        <v-select v-model="question.level" :items="level" box label="Level"></v-select>
        <v-select v-model="question.range" :items="range" box label="Range"></v-select>
      </div>
      <div class="question__new-answers" v-if="question.answers.length === 0">
        <answer-form @toCreate="toCreate" :questionId="question.id"></answer-form>
        <answer-form @toCreate="toCreate" :questionId="question.id"></answer-form>
      </div>
      <div class="question__new-answers" v-if="question.answers.length > 0">
        <answer-form
          @toCreate="toCreate"
          :currentAnswer="question.answers[0]"
          :questionId="question.id"
        ></answer-form>
        <answer-form
          @toCreate="toCreate"
          :currentAnswer="question.answers[1]"
          v-if="question.answers.length > 1"
          :questionId="question.id"
        ></answer-form>
        <answer-form
          @toCreate="toCreate"
          v-show="question.answers.length === 1"
          :questionId="question.id"
        ></answer-form>
      </div>
      <div class="row error">{{errorText}}</div>
      <div class="row question__form__submit">
        <v-btn @click="createOrUpdateQuestion" dark color="green">{{submit}}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import { question as APIquestion } from 'api'
import fetch from 'api/fetch'
import Question from 'models/Question'
import Icon from 'common/icon/Icon'
import AnswerForm from './AnswerForm'

export default {
  name: 'question-form',
  props: ['currentQuestion'],
  data() {
    return {
      errorText: '',
      currentImage: '',
      showImage: false,
      showSection: false,
      showRange: false,
      showLevel: false,
      question: new Question(),
      answers: [],
      submit: this.currentQuestion ? 'Update' : 'Create',
      level: [{ text: 'Easy', value: 1 }, { text: 'Medium', value: 2 }, { text: 'Hard', value: 3 }],
      range: [
        { text: 'Beggining', value: 1 },
        { text: 'Half', value: 2 },
        { text: 'Ending', value: 3 },
        { text: 'New State', value: 4 },
        { text: 'Grave', value: 5 },
        { text: 'Related', value: 6 }
      ],
      callInProgress: false,
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
          name: {
            required: () => 'Name can not be empty',
            max: 'The name field may not be greater than 10 characters'
            // custom messages
          },
          select: {
            required: 'Select field is required'
          }
        }
      }
    }
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
    _.debounce(function(ctx) {
      ctx.showImage = true
    }, 600)(this)
    if (this.currentQuestion && this.currentQuestion.id) {
      this.question.parse(this.currentQuestion)
      this.currentImage = this.question.image
    }
  },
  watch: {
    currentImage() {
      _.debounce(function(ctx) {
        if (ctx.question.image !== ctx.currentImage) {
          ctx.showImage = false
          ctx.question.image = ctx.currentImage
          setTimeout(() => {
            console.log('Im right here')
            ctx.showImage = true
          }, 1000)
        }
      }, 600)(this)
    }
  },
  methods: {
    ...mapActions(['retrieveQuestions']),
    toCreate(answer) {
      debugger
      this.answers.push(answer)
    },
    createOrUpdateQuestion() {
      if (this.$validator.validateAll())
        if (this.submit === 'Create') {
          APIquestion.create({ question: this.question, answers: this.answers })
            .then(() => {
              this.retrieveQuestions()
              this.$emit('close')
            })
            .catch(err => {
              console.log(err)
              this.errorText =
                'The operation ' +
                this.submit +
                ' obtain a bad request. please fill all the request data. or call Mr Developer'
            })
        } else {
          APIquestion.update(this.question).then(() => {
            this.retrieveQuestions()
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
  components: {
    Icon,
    AnswerForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/deep/ .v-menu {
  position: absolute;
  &__content {
    top: 0 !important;
    left: 0 !important;
  }
}

.question {
  &__image-preview {
    display: flex;
    justify-content: center;
    width: 100%;

    & .image_preview {
      background-size: cover;
      background-position: center;
      margin: 10px;
      border: 1px solid #f5f5f5;
      border-radius: 8px;
      width: 200px;
      height: 200px;
    }
  }
  &__form {
    &__description {
      padding: 0 30px;
    }

    &__submit {
      margin: 30px;
    }
  }

  &__new-answers {
    display: flex;
    width: 100%;
  }
  &_form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    justify-content: flex-start;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &_top {
      padding: 30px;
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
  &_section {
    margin-top: 20px;
  }
}

.glovoInput {
  margin-left: 5px !important;
  margin-right: 5px !important;
  &.image {
    align-self: center;
    max-width: 50%;
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
</style>
