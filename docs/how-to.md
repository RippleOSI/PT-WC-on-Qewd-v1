# How To Create New Entity Page inside PT-WC-Q in few steps 

This guide demonstrates how CRUD assembly functions is working and how new entity store can be implemented using store 
of "medications" that user must use  as sample. 

Our task of this guide is make "Medications" page that is supports dividing by patient_id by using `ptwc-datatable` component and `crud_assembly` function. 

## Our steps are   

- [Create store in DB](#create-store-in-database)
- [Define schema of page settings](#definition-schema-of-page-settings)
- [Register page in entity point](#register-page-in-main-entity-point-appjs)

See also... 

## Global Table of Contents 

- [Quick Readme](/README.md)
- [Installation Guide](/docs/installation.md)
- [PT-WC-Q Components](/docs/components.md)
- [How To / Recipe](/docs/how-to.md)
- [QEWD Main Documentation](/QEWD.md) 
- [REST scope](/REST.md)


## Create Store in Database 

First part of any CRUD development processes is populate CRUD methods on API side. 

All methods of QEWD framework API are placed in qewd-apps/[app name]. Until our app named PT-WC-Q all methods must be defined in All methods of QEWD framework API are placed in qewd-apps/[app name]. 
Until our app named PT-WC-Q all methods must be defined in `qewd-apps/pt-wc-q`

What crud methods are we needed? 

- (C)reate 
- (R)ead 
- (U)pdate 
- (D)elete 

Let's see each of them. 

#### Create / Update Method  

> **IMPORTANT NOTE!** Difference between update and create only in one thing: when we create new one entity we are leave 'id' field are empty.  

For create method API for populate our data just make folder named update%EntityName% and place index.js file inside of them with contents: 

    module.exports = function(messageObj, session, send, finished) {
    
      if (!session.authenticated) {
        return finished({error: 'Unauthenticated'});
      }
    
      let error = '';
      let delim = '';
      for (let name in messageObj.params) {
        if (messageObj.params[name] === '') {
          error = error + delim + name + ': Missing value';
          delim = '; ';
        }
      }
      if (error !== '') {
        return finished({error: error});
      }
    
      let id = messageObj.params.id;
      if (!id || id === '') {
        return finished({error: 'Missing or empty user id'});
      }
    
      let doc = this.db.use('demoMedication');
    
      if (id === 'new-record') {
        id = doc.$('id_counter').increment();
        messageObj.params.id = id;
      }
      doc.$(['by_id', id]).setDocument(messageObj.params);
    
      finished({ok: true});
    
    
    };

You can compare results in `qewd-apps/pt-wc-q/updateMedication`

___ 

#### Read Method 

To create method that is load data from the database you need to pass two parameters: id and that field is needed from frontend to backend. 
Or do not pass anything. Main idea that we have meaning using NoSQL database as data storage. That is allow us to make pretty simple read route. 

For make method of API for read our data just make folder named get%EntityName% and place index.js file inside of them. 

Example of code for reading data of medications:  

    module.exports = function(messageObj, session, send, finished) {
    
      if (!session.authenticated) {
        return finished({error: 'unauthenticated'});
      }
    
      let doc = this.db.use('demoMedications');
        
        
      let userDoc = doc.$('by_id');
      let results = [];
      let properties = messageObj.params.properties;
      userDoc.forEachChild(function(ix, node) {
        let result = {};
        result.id = node.$('id').value;
        properties.forEach(function(property) {
          if (property !== 'id') {
            result[property] = node.$(property).value;
          }
        });
        results.push(result);
      });
    
      finished({summary: results});
    };
    
    
You can compare results in `qewd-apps/pt-wc-q/getMedications`

____ 

#### Delete action

For create method API for populate our data just make folder named delete%EntityName% and place index.js file inside of them with contents: 

    module.exports = function(messageObj, session, send, finished) {
    
      if (!session.authenticated) {
        return finished({error: 'Unauthenticated'});
      }
    
      let id = messageObj.params.id;
      if (!id || id === '') {
        return finished({error: 'Missing or empty user id'});
      }
    
      this.db.use('demoMedications', 'by_id', id).delete();
    
      finished({ok: true});
    
    };
    
    
... and that all! Our API Is ready for integration!      

## Definition schema of page settings 

For the purpose of placing simplicity logic of CRUD pages definition has been developed JSON schema of the CRUD page populations. 

And this how it looks like: 

    let medicationsPageState = {
        // System name
        assemblyName: 'medications',
        // Name of route in route system 
        name: 'medications',
        // Title that will be used in HTML heading 
        title: 'Medications',
        // Icon for Summary View, Menu and page 
        icon: 'prescription-bottle-alt',
        summary: {
          title: 'Current Meds',
          titleColour: 'info',
          btnIcon: 'user-plus',
          btnColour: 'success',
          btnTooltip: 'Add a New Med',
          headers: ['Name', 'Dose'],
          data_properties: ['name', 'dose'],
          qewd: {
            // Name of folder for C(R)UD all data in short list 
            getSummary: 'getMedications',
            // Name of folder for C(R)UD all data in long list 
            getDetail: 'getMedicationInfo',
            // Name of folder for CRU(D) all data in any places 
            delete: 'deleteMedication'
          },
          rowBtnIcon: 'user-edit',
          rowBtnColour: 'info',
          enableDelete: true,
          deleteConfirmDisplayColumn: 0
        },
        detail: {
          cardWidth: '500px',
          newRecordTitle: 'Enter New User',
          titleColour: 'info',
          btnIcon: 'user-cog',
          btnColour: 'success',
          btnTooltip: 'Edit User Details',
          title_data_property: 'name',
          fields: [
            {
              name: 'name',
              data_property: 'name',
              label: 'Name',
              type: 'text',
              labelWidth: 4
            },
             {
              name: 'route',
              data_property: 'route',
              label: 'Route',
              type: 'text',
              labelWidth: 4
            },
            {
                name: 'dose',
                data_property: 'dose',
                label: 'Dose',
                type: 'text',
                labelWidth: 4
            },
            {
              name: 'timing',
              data_property: 'timing',
              label: 'Timing',
              type: 'text',
              labelWidth: 4
          },
    
            {
              name: 'description',
              data_property: 'description',
              label: 'Description',
              type: 'textarea',
              labelWidth: 4,
              height: 2
            },
            {
              name: 'date_start',
              data_property: 'date_start',
              label: 'Start Date',
              type: 'date',
              labelWidth: 4
          },
          {
            name: 'author',
            data_property: 'author',
            label: 'Author',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'date_of_entry',
          data_property: 'date_of_entry',
          label: 'Date of Entry',
          type: 'date',
          labelWidth: 4
      },
    
          ]
        },
        update: {
          btnText: 'Save',
          btnColour: 'warning',
          qewd: {
            // Name of folder for CR(U)D medication 
            save: 'updateMedication'
          }
        }
      };

     export {medicationsPageState};

This schema has define columns that will be used for output in heading list and in detail view for the `ptwq-datatable` component and also defines form for edit contents. 

Whole files with schema in PT-WC-Q app must be placed in `www/pt-wc-q/js/medications_page_state.js` 

After all files are placed only register this page with components are left.

## Register page in main entity point (app.js)

Let's see how co include our medications schema file (`www/pt-wc-q/js/medications_page_state.js`)

#### Include schema file 

At start of entity point file (app.js) place this one lines for load JSON schema as object 

    import {medicationsPageState} from './medications_page_state.js';

#### Register path of the contents 

Next thing is register path of the schema. 

Inside of DOMContentLoaded event place this line 

    webComponents.addComponent('medications', crud_assembly(QEWD, medicationsPageState));
 
Where crud_assembly is assembly that convert our CRUD schema to JSON global page schema 


Congratulations! Now you can store patient  medications inside PT-WC-Q website 
