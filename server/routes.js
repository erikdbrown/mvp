///////////////////////////
// place any requirements for helpers or server-side controllers
///////////////////////////
var studentController = require('../students/studentController.js')

module.exports = function(app, express) {
  app.post('/api/create', studentController.addStudent)
}
