<template >
  <div class="list_section">
    <div class="list__search">
      <v-text-field v-model="searchQuery" v-validate="'required'" label="Search" required box></v-text-field>
    </div>
    <div class="list__questions">
      <div
        @click="selectQuestion(question.id)"
        v-for="question in filteredQuestions"
        :key="question"
        class="list_question"
        v-show="parseInt(filter) === question.range || !filter"
      >
        <v-card class="question__card">
          <v-card-title class="question__title__top lighten-2" :class="getColor(question.level)">
            <div class="question__title__container">
              <div
                class="question__image"
                :style="{backgroundImage: 'url(' + question.image + ')'}"
              ></div>
              <h2 class="display-1 white--text font-weight-light">{{ question.name }}</h2>
            </div>
            <v-btn class="question__range" fab small dark :color="getRange(question.range).color">
              <v-icon dark>bubble_chart</v-icon>
            </v-btn>
          </v-card-title>
          <v-container>
            <h3 class="question__title">{{ question.department }}</h3>
            <p class="question__description">{{ question.description }}</p>
          </v-container>
          <div class="question__CTA">
            <v-btn @click="deleteQuestion(question)" dark color="red">Delete</v-btn>
            <v-btn
              @click="$router.push({name: 'updateQuestion', params: {question: question}})"
              dark
              color="green"
            >Update</v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import Question from 'models/Question'
import Icon from 'common/icon/Icon'
import { question as APIquestion } from 'api'
import { mapActions } from 'vuex'
export default {
  name: 'question-list',
  props: ['filter', 'questions', 'selectable'],
  data() {
    return {
      idActive: 0,
      relationQuestion: new Question(),
      searchQuery: '',
      showActions: !this.selectable
    }
  },
  mounted() {
    this.retrieveQuestions()
  },
  methods: {
    ...mapActions(['retrieveQuestions']),
    getColor(level) {
      switch (level) {
        case 1:
          return 'blue'
        case 2:
          return 'orange'
        case 3:
          return 'red'
        default:
          return 'grey'
      }
    },
    getRange(range) {
      switch (range) {
        case 1:
          return { text: 'Begin', color: 'green' }
        case 2:
          return { text: 'Half', color: 'orange' }
        case 3:
          return { text: 'End', color: 'indigo' }
        case 4:
          return { text: 'New', color: 'light-blue' }
        case 5:
          return { text: 'Grave', color: 'black' }
        case 6:
          return { text: 'Related', color: 'lime darken-3' }
      }
    },
    selectQuestion(id) {
      if (this.selectable) {
        this.$emit('questionSelected', id)
      }
    },
    makeARelation(id) {
      let ctx = this
      if (this.relationQuestion.id) {
        this.relationQuestion.question_id = id
        APIquestion.update(this.relationQuestion).then(() => {
          ctx.relationQuestion = new Question()
          ctx.retrieveQuestions()
        })
      }
    },
    deleteQuestion(question) {
      APIquestion.delete(question).then(() => {
        this.retrieveQuestions()
      })
    },
    asignRelatedQuestion(question) {
      this.relationQuestion.parse(question)
    }
  },
  computed: {
    filteredQuestions() {
      const self = this
      var myRe = new RegExp('^' + self.searchQuery + '', 'g')
      if (self.questions && self.searchQuery && self.searchQuery !== '') {
        let _filteredQuestions = []
        const keys = Object.keys(self.questions[0])
        self.questions.map(question => {
          let matched = false
          keys.map(key => {
            if (
              typeof question[key] === 'string'
                ? myRe.exec(question[key].toLowerCase())
                : myRe.exec(question[key]) && !matched
            ) {
              _filteredQuestions.push(question)
              matched = true
            }
          })
        })
        return _filteredQuestions
      } else {
        return self.questions
      }
    }
  },
  components: {
    Icon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.list {
  &__questions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
.list_section {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.list_question {
  width: 100%;
  max-width: 400px;
  min-height: 200px;
  display: flex;
  margin: 0 2px;
  justify-content: flex-start;
}
.question {
  &__card {
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  &__CTA {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &__image {
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    margin-right: 20px;
    border-radius: 50%;
  }
  &__title {
    text-align: left;
    font-size: 22px;
    line-height: 40px;

    &__container {
      display: flex;
      align-items: center;
    }

    &__top {
      display: flex;
      justify-content: space-between;
    }
  }
  &__range {
    height: 20px;
    width: 20px;
  }
  &__description {
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  &_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    position: relative;
    width: 100%;
    margin: 20px 0;
    max-width: 400px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &_related {
      transition: all ease 0.5s;
      cursor: pointer;
      &:hover {
        background-color: #f3f3f3;
        transform: scale(1.05);
      }
    }
  }
  &_top {
    &_right {
      align-items: center;
      display: flex;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }
    &_section {
      align-items: center;
      display: flex;
      & .title {
        font-family: Gotham-Medium;
        font-family: 17px;
      }
    }
  }
  &_flag {
    width: 100%;
    display: flex;
    &_range {
      color: white;
      padding: 3px 20px;
      margin-right: 10px;
      border-radius: 4px;
      &.blue {
        background-color: blue;
      }
      &.orange {
        background-color: orange;
      }
      &.black {
        background-color: black;
      }
    }
    &_level {
      color: white;
      padding: 3px 20px;
      border-radius: 4px;
      &.green {
        background-color: green;
      }
      &.yellow {
        background-color: #dac82a !important;
      }
      &.red {
        background-color: red;
      }
    }
  }
  &_actions {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
}
.value {
  font-size: 17px;
  &.image {
    max-width: 50%;
    overflow-x: scroll;
  }
}
.title {
  font-size: 20px;
  margin-right: 15px;
}

.list__search {
  width: 100%;
  max-width: 600px;
  & label {
    font-size: 20px;
    font-family: Gotham-Medium;
  }
}
.question_list_button {
  margin: 5px 5px;
  &.delete {
    background-color: #ff5d5d;
    &:hover {
      background-color: #d44545;
    }
  }
}
</style>
