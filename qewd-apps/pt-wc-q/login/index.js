module.exports = function(messageObj, session, send, finished) {

  if (messageObj.params.username !== 'rob') {
    return finished({error: 'Invalid login attempt'});
  }
  if (messageObj.params.password !== 'secret') {
    return finished({error: 'Invalid login attempt'});
  }
  session.authenticated = true;
  session.timeout = 3600;
  finished({ok: true});

};
