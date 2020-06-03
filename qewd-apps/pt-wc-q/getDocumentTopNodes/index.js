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
  let nodes = [];
  let idCounter = 1;
  let node = {
    nodeId: idCounter,
    documentName: documentName,
    path: [],
    parentNodeId: '',
    subscript: '',
    leafNode: !doc.hasChildren,
    value: doc.value,
  };

  if (doc.hasChildren) node.childrenFetched = true;

  nodes.push(node);

  doc.forEachChild(function(index, child) {
    idCounter++;
    let node = {
      nodeId: idCounter,
      documentName: documentName,
      path: child.path,
      parentNodeId: 1,
      subscript: index,
      leafNode: !child.hasChildren,
      value: child.value,
      childrenFetched: false
    };
    nodes.push(node);
  });

  finished({
    nodes: nodes,
    idCounter: idCounter
  });

};
