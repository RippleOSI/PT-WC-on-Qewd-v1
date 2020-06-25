module.exports = function(messageObj, session, send, finished) {

    if (!messageObj.params) {
      return finished({error: 'Invalid login attempt'});
    }

    let username = messageObj.params.username;

    if (!username || username === '') {
      return finished({error: 'Invalid login attempt'});
    }

    let password = messageObj.params.password;

    if (!password || password === '') {
      return finished({error: 'Invalid login attempt'});
    }

    // hard-coded example validation check

    if (username !== 'rob' || password !== 'secret') {
      return finished({error: 'Invalid login attempt'});
    }

    // successfully validated

    session.authenticated = true;
    session.timeout = 3600;
    session.data.$('greetingName').value = 'Rob';

    finished({ok: true});

  };