module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'Not logged in'});
  }

  session.delete();
  finished({ok: true});

};
