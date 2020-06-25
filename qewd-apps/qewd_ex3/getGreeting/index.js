module.exports = function(messageObj, session, send, finished) {
    if (session.authenticated) {
      finished({greetingName: session.data.$('greetingName').value});
    }
    else {
      finished({error: 'Not authenticated'});
    }
  };