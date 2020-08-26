function build_summary_card(state) {

    if(typeof state.patientIdDepends === 'undefined'){
        state.patientIdDepends = true;
    }
    if(state.patientIdDepends){
        state.summary.headers.push('Patient ID');
        state.summary.data_properties.push('patient_id');
    }


    return {
        componentName: 'ptwq-summary-element',
        state: {
            name: state.name + '-summary-assembly-card',
            title: state.title,
            summaryLoader: state.summary.qewd.getSummary,
            data_properties: state.summary.data_properties,
            icon: state.icon ? state.icon : 'notes-medical',
            page: state.name,
        },
        hooks: ['summaryAssemblyHook'],
    };
}

/***
 *
 * @param QEWD
 * @param state_array array of default CRUD state (adminui_crud) what need to be shown at crud
 * @returns {{component: {assemblyName: *, children: [{componentName: string, state: {title: *}}, {children: [], componentName: string}], componentName: string, state: {name: *}, hooks: [string]}, hooks: {}}}
 */

export function summary_assembly(QEWD, state_array) {

    let componentBlocks = [];

    state_array.forEach((value,key)=>{
       componentBlocks.push(build_summary_card(value));
    });

    let component = {
        componentName: 'ptwq-content-page',
        assemblyName: 'psummary',
        state: {
            name: 'psummary'
        },
        children: [
            {
                componentName: 'adminui-content-page-header',
                state: {
                    title: 'Summary'
                }
            },
            {
                componentName: 'adminui-row',
                children: componentBlocks,
            }
        ]

    };

    let hooks = {
        'ptwq-summary-element':{
           'summaryAssemblyHook':  async function () {
               let sE = this;
               let responseObj = await QEWD.reply({
                   type: sE.options.summaryLoader,
                   params: {
                       properties: sE.options.data_properties
                   }
               });
               if (!responseObj.message.error) {
                   let result = {};
                   let arrayOrRecords = [];
                   console.log( responseObj.message.summary);
                   responseObj.message.summary.forEach((record)=>{
                       let line = [];

                       if (sE.context.selectedPatient && record.patient_id) {
                           if (sE.context.selectedPatient.id !== record.patient_id) {
                               return true; // SKIP BY FILTER
                           }
                       }

                       sE.options.data_properties.forEach(function(property) {
                           line.push(record[property]);
                       });
                       arrayOrRecords.push(line[0]);

                   })
                   console.log(arrayOrRecords);
                   if(arrayOrRecords.length) {
                       sE.setState({
                           items: arrayOrRecords,
                       })
                   }
               }
            }
        }
    };


    return {component, hooks};
}
