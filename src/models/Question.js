export default class Question {
  constructor() {
    this.id = null
    this.name = null
    this.hierarchy = null
    this.organization = null
    this.decision = null
    this.range = 1
    this.level = 1
    this.image = null
    this.answers = []
    
  }

  parse(question) {
    this.id = question.id
    this.name = question.name
    this.hierarchy = question.hierarchy
    this.organization = question.organization
    this.decision = question.decision
    this.image = question.image
    this.level = question.level || 'easy'
    this.range = question.range
    this.answers = question.answers || []
    return
  }
}
