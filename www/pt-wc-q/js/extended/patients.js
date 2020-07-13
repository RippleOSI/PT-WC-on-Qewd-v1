import {patientsPageState} from '../patients_page_state.js'
import {crud_assembly} from '../../../components/adminui-custom/components/adminui-crud-custom.js';
import {cSchemaLookup} from "../utils/cSchemaLookup.js";

let patients_extended = {
    ...patientsPageState,

}

function mergeDeep(...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

export function patients_extended_crud(QEWD) {
    let {component, hooks} = crud_assembly(QEWD, patients_extended);
    let state = patients_extended;
    state.patientIdDepends = false;

    let extendedHooks = {
        'adminui-datatables': {
            patientDatatableExtendHook: function () {
                let table = this.table;
                let context = this.context;
                let _this = this;
                $(table).on('draw.dt', () => {
                   // console.log('sdfsdf');

                    $(document).on('click', 'adminui-button', function () {
                        let id_str = this.parentNode.id;
                        console.log(context);
                        let component = _this.getComponentByName('adminui-topbar-text');
                        console.log(component);
                        if (id_str && id_str.includes('patients-record-')) {
                            let id = this.parentNode.id.split('record-')[1];
                            QEWD.reply({
                                type: state.summary.qewd.getDetail,
                                params: {
                                    id: id
                                }
                            }).then((res) => {
                                let obj = res.message.record;
                                component.setState({
                                    title: 'Patient: ' + obj.firstname +' ' + obj.familyname + ',' + obj.dob,
                                });
                                context.selectedPatient = obj;
                            }).catch((err) => {

                            });
                        }
                    })
                });
            }
        },
    }
    console.log(this);
    let adminui_row = cSchemaLookup(component,'adminui-row');
    let datatable = adminui_row.children[0].children[1].children[0];
    datatable.hooks.push('patientDatatableExtendHook');


//    adminui_row.children.unshift();

    //Merge whole data block
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
