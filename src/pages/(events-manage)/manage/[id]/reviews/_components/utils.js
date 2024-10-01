export function constructQuestion(question) {
  return {
    questionType: question.type,
    question: question.question,
    options: question.options,
    moreThanOneAnswerAllowed: question.more_than_one_answer_allowed,
    maxValue: question.max_value,
  }
}
