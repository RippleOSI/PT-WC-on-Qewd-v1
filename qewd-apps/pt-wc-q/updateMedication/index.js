module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let doc = this.db.use('demoMedications');


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
  doc.$(['by_id', id]).setDocument(messageObj.params);

  finished({ok: true});


};