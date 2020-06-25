module.exports = function(messageObj, session, send, finished) {

    if (!session.authenticated) {
      return finished({error: 'Not authenticated'});
    }

    session.delete();
    finished({ok: true});

  };