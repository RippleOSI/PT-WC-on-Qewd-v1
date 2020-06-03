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

  let idCounter = messageObj.params.idCounter;
  if (!idCounter || idCounter === '') {
    return finished({error: 'Invalid request'});
  }

  let parentId = messageObj.params.parentId;
  if (!parentId || parentId === '') {
    return finished({error: 'Invalid request'});
  }

  let doc = this.db.use(documentName, ...path);

  let nodes = [];

  doc.forEachChild(function(index, child) {
    idCounter++;
    let node = {
      documentName: documentName,
      path: child.path,
      subscript: index,
      leafNode: !child.hasChildren,
      parent: parentId,
      value: child.value,
      id: idCounter
    };
    nodes.push(node);
  });

  finished({
    nodes: nodes,
    idCounter: idCounter
  });

};
