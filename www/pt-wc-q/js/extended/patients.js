import {patientsPageState} from '../patients_page_state.js'
import {crud_assembly} from '../../../components/adminui/components/adminui-crud.js';

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

    let extendedHooks = {

    };



    let adminui_row = component.children[1]
    adminui_row.children.unshift();

    //Merge whole data block
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
