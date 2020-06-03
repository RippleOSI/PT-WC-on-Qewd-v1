module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  if (!messageObj.params) {
    return finished({error: 'Invalid request'});
  }

  let documentName = messageObj.params.documentName;
  if (!documentName || documentName === '') {
    return finished({error: 'Invalid request'});
  }

  let path = messageObj.params.path;
  if (!path || !Array.isArray(path)) {
    return finished({error: 'Invalid request'});
  }

  let subscript = messageObj.params.subscript;
  if (!subscript || subscript === '') {
    return finished({error: 'Invalid request'});
  }

  path.push(subscript);
  let doc = this.db.use(documentName, path);
  if (doc.exists) {
    return finished({ok: true});
  }
  finished({error: 'The specified sibling (' + subscript + ') does not exist'});

};