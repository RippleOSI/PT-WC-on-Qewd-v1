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

  let doc = this.db.use(documentName);
  let node = {
    documentName: documentName,
    path: [],
    parent: false,
    subscript: documentName,
    leafNode: !doc.hasChildren,
    value: doc.value,
    id: 1
  };

  finished({
    node: node,
    idCounter: 1
  });

};
