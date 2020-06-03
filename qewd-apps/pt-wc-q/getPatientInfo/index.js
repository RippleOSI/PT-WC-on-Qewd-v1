module.exports = function(messageObj, session, send, finished) {

  let userDoc = this.db.use('demoPatients', 'by_id', messageObj.params.id);

  let currentPatient = {
    "status" : "selectedPatient",
    "id": messageObj.params.id,
    "trigger": "click on Patients table select button"
  };

  

  let record = userDoc.getDocument(true);
  if (!record.gender) record.gender = 'x';
  if (!record.userType) record.userType = 'x';
  if (!record.roles) record.roles = ['doctor'];
  if (!record.prevEmp) record.prevEmp = ['gp', 'private'];
  if (!record.age) record.age = 0;

  currentPatient.age = record.age;
  currentPatient.email = record.email;
  session.data.$('selectedPatient').setDocument(currentPatient);

  finished({record: record});

};