module.exports = function(messageObj, session, send, finished) {

  if (!session.authenticated) {
    return finished({error: 'unauthenticated'});
  }

  let doc = this.db.use('demoAllergies');
  if (!doc.exists) {

    console.log("No Allergy in JSBD yet");
  
  }


// moving the reference to where the patient allergies are found

  //  let AllergyDoc = doc.$('by_id');
  let AllergyDoc = doc.$('by_ptID');
  console.log("\n Allergy pick \n");
  console.log(doc.$(['by_ptID', '2']).getDocument());
  console.log("\n")

  let ptID = session.data.$(['selectedPatient','id']).value;
  console.log("\n >>>> ptID is " + ptID + "\n");
  if (!ptID || ptID === '') {
    return finished({error: 'No patient selected'});
  }


  let results = [];
  let properties = messageObj.params.properties;
  //AllLoop.forEachChild(function(ix,node) {
  console.log("AllDoc has kids:" + AllergyDoc.hasChildren);
  AllergyDoc.forEachChild(function(ix, node) { // we move throug the patient IDs first
    console.log("node has kids: " + node.hasChildren);
    console.log("hit inside allergy: " + ix + " NV " + node.value);
    console.log("hit inside allergy: " + ix + " N " + node);
    console.log("hit inside allergy: " + ix + " N " + JSON.stringify(node.getDocument()));
    console.log("trying to match this pid " + ptID + " & this Ix : " + ix);
    console.log("types of ptID" + typeof ptID);
    console.log("typeOf  ix " + typeof ix);
    if (ptID === parseInt(ix)){ // if match the patient ID then we return those results
    console.log("matched the patient ID with allergies for this ptID : " + ptID);
     
          node.forEachChild(function(ind, childer) {
          
            console.log("now inside " + ind + " & insideN + " + JSON.stringify(childer.getDocument()) ) ;
            console.log("now inside " + ind + " & idV + " + childer.$('id').value) ;
            let result = childer.getDocument();//result.id = childer.$('id').value ;
            results.push(result);
          });
       };
   // let result = {};
   // result.id = node.$('id').value;
  //  properties.forEach(function(property) {
  //    if (property !== 'id') {
  //      result[property] = node.$(property).value;
  //    }
      }
    );
   // results.push(result);
  //}
//}
  //);
  //);

  finished({summary: results});
};



