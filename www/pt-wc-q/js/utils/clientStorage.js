/**
 * Client storage for store login session and context
 * state using local storage & singletone pattern
 *
 * !IMPORTANT! This class is under construction
 * @author Serge Iudin
 */

let instance = null ;
let LOCALSTORAGE_CONST = 'LOCAL_PTQW';
class ClientStorage {
    constructor() {
        if(!instance){

            let dataJSON = localStorage.getItem(LOCALSTORAGE_CONST);
            let data = JSON.parse(dataJSON);
            if(!data){
                data = {};
            }

            this.dataStorage = new Proxy(data, {
                set(target, prop, val) {
                        target[prop] = val;
                        localStorage.setItem(LOCALSTORAGE_CONST, JSON.stringify(target))
                        return true;
                    }
                });


            instance = this;
        }
        return this;
    }

    /**
     * Attach object to localstorage proxy view
     * @param key
     * @param object
     */
    attach(key,object){

    }
}
