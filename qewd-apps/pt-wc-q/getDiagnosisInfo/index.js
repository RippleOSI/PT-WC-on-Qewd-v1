module.exports = function(messageObj, session, send, finished) {

  let userDoc = this.db.use('demoDiagnosis', 'by_id', messageObj.params.id);
  let record = userDoc.getDocument(true);
  if (!record.gender) record.gender = 'x';
  if (!record.userType) record.userType = 'x';
  if (!record.roles) record.roles = ['doctor'];
  if (!record.prevEmp) record.prevEmp = ['gp', 'private'];
  if (!record.age) record.age = 0;
  finished({record: record});

};