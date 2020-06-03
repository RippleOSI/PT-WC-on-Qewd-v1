module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Unauthenticated'});
  }

  let dir = this.db.global_directory();
  let results = [];
  dir.forEach(function(docName) {
    let name = docName.split('^')[1];
    results.push(name);
  });
  finished({documentNames: results});
};
