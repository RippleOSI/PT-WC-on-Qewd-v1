
export function context_manager(context_obj){

    let LOCALSTORAGE_CONST = 'LOCALSTORAGE_LOGIN_STATE';

    let context = new Proxy(context_obj,
        {

            storageVals: ['user','selectedPatient', 'latestPage'],

            set(target, prop, val) {
                if (this.storageVals.includes(prop)) {
                    localStorage.setItem(LOCALSTORAGE_CONST + '_' + prop, JSON.stringify(val))
                }
                target[prop] = val;
                return true;

            },

            get(target, prop, receiver) {
                if(this.storageVals.includes(prop)){
                    if(!target[prop]){
                        target[prop] = JSON.parse( localStorage.getItem(LOCALSTORAGE_CONST+'_'+prop));
                    }
                }
                return target[prop];
            }
        });
    return context;
}
