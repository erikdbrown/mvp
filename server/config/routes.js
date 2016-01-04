///////////////////////////
// place any requirements for helpers or server-side controllers
///////////////////////////

module.exports = function(app, express) {
  app.post('/create', studentController.addStudent)
}
