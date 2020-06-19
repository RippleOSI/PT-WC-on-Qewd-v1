28th May

working on patient ID and Allergies, matching allergies returned to the ptID passed
got it working ok , then noted that need to find way to refresh browswer allergy page , as is cached , so need way to send trigger to get latest allergies for selected patient

also worked on getting patient identity to the top bar panel for now



27th May 2020
remember not to use send() in qewd backend handlers unless sending an object 
eg { "info to send" : value }

also the admin ui crud assembly is not expecting interim send message so use console.log to spot qewd side issues eg
console.log("\n >>>> ptID is " + ptID + "\n");

have made changes to be able to get patientID and keep in session.data
also using that to store allergy data against a patientID
then using that to get allergy data back by ptIDs
for now needing to get all allergies back
need to get back based on matched patient ID next


TShannon  26th May 2020

now moving to set up a development branch after tidying up branches on my fork of qwd baseline

Checked set up & branch on DO machine
NB note that as recent dev done on rasp Pi that some of the setup scripts have been copied across... start, start_p, stop etc and dont work on regular linux VMs without modification
So remember to clear those and run the install script if needs be


26th May pm
Session Data storage
added Session functionality inc storing of data with session value and getting it back
see www/qewd-ws-demo  qewd-apps/qewd-ws-demo/qewd-session-t2


remember that we set single value with 
session.data.$('sessionStarWarsHero').value = "R2D2";  
and get that data with
session.data.$('sessionStarWarsHero').value 

but we set object to session data with
session.data.$('sessionStarWarsWarrior').setDocument(data2session);  
and get with
session.data.$('sessionStarWarsWarrior').getDocument()



