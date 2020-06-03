module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let id = messageObj.params.id;
  if (!id || id === '') {
    return finished({error: 'Missing or empty user id'});
  }

  this.db.use('demoEvents', 'by_id', id).delete();

  finished({ok: true});

};