function checkUserOnList(userlist, request){
  let result = null;
  userlist.forEach((value, key)=>{
    if(
        value.username === request.username
        &&
        value.password === request.password
    ){
      if(!result) {
        result = value;
      }
    }
  });
  return result;
}

module.exports = function(messageObj, session, send, finished) {


  let result = null;
  let request = messageObj.params;
    do {
        if(request.simpleLogin){
          result = {
              success: true,
          };
          break;
        }
        let users = [
            {
                username: 'patient',
                password: '1234',
                name: 'Custom Patient',
                role: 'patient',
                patient_id: '10',
            },
            {
                username: 'staff',
                password: '1234',
                name: 'Staff Obj',
                role: 'staff',
            },
            {
                username: 'rob',
                password: 'secret',
                name: 'Rob Admin',
                role: 'admin'
            }
        ];

        result = checkUserOnList(users, request);
    } while (false);


  if(!result){
    return finished({error: 'Invalid login attempt'});
  }

  session.authenticated = true;
  session.timeout = 3600;
  finished({ok: true, response: result});

};


