

class QuestionModel {
    constructor() {
        this._questions = [{
          id: 1,
          createdOn: new Date() ,
          createdBy: 1 , // represents the user asking the question
          meetup: 1, // represents the meetup the question is for
          title : 'Express',
          body: 'Why so many libaries in Javascript',
          votes: 1
        }];
        this._votes = [{
          meetup: 1, // meetup record primary key
          title: 'Express', // title of the question
          body: 'Why so many libaries in Javascript', // body of the question
          votes: 1
        }]
      }
      
      _vote(questionId, incr) {
        const index = this._questions.findIndex(q => q.id === questionId)
        this._questions[index].votes+=incr;
      }
      
      upVote(questionId) {
        this._vote(questionId, 1)
      }
      downVote(questionId) {
        this._vote(questionId, -1)
      }
}

module.exports = new QuestionModel();