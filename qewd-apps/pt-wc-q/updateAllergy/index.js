module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let doc = this.db.use('demoAllergies');


  let error = '';
  let delim = '';
  for (let name in messageObj.params) {
    if (messageObj.params[name] === '') {
      error = error + delim + name + ': Missing value';
      delim = '; ';
    }
  }
  if (error !== '') {
    return finished({error: error});
  }

  let id = messageObj.params.id;
  if (!id || id === '') {
    return finished({error: 'Missing or empty user id'});
  }

 
  if (id === 'new-record') {
    id = doc.$('id_counter').increment();
    messageObj.params.id = id;
  }


  //setting the patient Allergy up based on the patientID
  
//  let pt = session.data.$('selectedPatient').getDocument();
//  let ptID = pt.id;
  //let ptID = session.data.$('selectedPatient').getDocument().id;
  let ptID = session.data.$(['selectedPatient','id']).value;
  //send("selected patient is " + session.data)
  //send({"info on ptID": ptID});
  console.log("\n >>>> ptID is " + ptID + "\n");
  if (!ptID || ptID === '') {
    return finished({error: 'No patient selected'});
  }
  messageObj.params.ptID = ptID;


  doc.$(['by_id', id]).setDocument(messageObj.params);
  doc.$(['by_ptID', ptID, id]).setDocument(messageObj.params);

  let doc4links = this.db.use('linkList');
  doc4links.$(['pt_allergies', id, ptID ]).value = "";

  finished({ok: true});


};