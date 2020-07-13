import {eventsPageState} from '../events_page_state.js'
import {crud_assembly} from '../../../components/adminui-custom/components/adminui-crud-custom.js';
import {cSchemaLookup} from "../utils/cSchemaLookup.js";

let events_exteneded = {
    ...eventsPageState,

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

export function events_extended_crud(QEWD) {
    let {component, hooks} = crud_assembly(QEWD, events_exteneded);
    let state = events_exteneded;
    component.hooks.push('addButton');
    let calendarObj = null;



    let formFields = {};
    let formFieldPropertyNames = {};
    if (state.detail.fields) {
        state.detail.fields.forEach(function(field, index) {
            if (field.name && !field.data_property) field.data_property = field.name;
            if (!field.name && field.data_property) field.name = field.data_property;
            formFields[field.data_property] = state.detail.fields[index];
            formFieldPropertyNames[field.name] = field.data_property;
        });
    }


    let extendedHooks = {
        'adminui-content-page': {
            addButton: function () {
                console.log(this.context);
                let _this = this;
                $(document).on('draw.dt', () => {
                    console.log('table redraw');

                    if (calendarObj) {
                        let result = QEWD.reply({
                            type: 'getEvents',
                            params: {
                                properties: ['name', 'date','patient_id'],
                            },
                        }).then((responseObj) => {
                            let data = [];
                            let context = this.context;
                            console.log(context);
                            responseObj.message.summary.forEach(function(record) {
                                if (context.selectedPatient && state.patientIdDepends) {
                                    if (context.selectedPatient.id !== record.patient_id) {
                                        return true; // SKIP BY FILTER
                                    }
                                }else{
                                    console.log('contextmiss');
                                }
                                data.push(record);
                            });
                            let events = data.map( (el) => { return {
                                title: el.name,
                                start: el.date,
                            }});
                            console.log(events);

                            console.log(events);
                            calendarObj.renderFullcalendar(events);
                        });

                    }
                });
                $(document).on('init.dt', () => {

                        let card = this.getComponentByName('adminui-content-card', state.name + '-chart-card');
                        let card2 = this.getComponentByName('adminui-content-card', state.name + '-summary-card');
                        console.log('there');
                        console.log(card2);
                        card.setState({
                            cls: 'd-none'
                        });
                        let table = this.getComponentByName('adminui-datatables', state.name);
                        if (!$(table).find('.this-show-button').length) {

                            let button = document.createElement('button');
                            $(button).text('Show Chart');
                            $(button).addClass('this-show-button');

                            $(button).click(() => {


                                card.rootElement.classList.remove('d-none');
                                card.rootElement.classList.add('d-flex');


                                card2.rootElement.classList.remove('d-flex');
                                card2.rootElement.classList.add('d-none');
                                window.dispatchEvent(new Event('resize'));

                            });
                            $(table).append(button);
                        }
                    }
                );
                console.log(result);
            }
        },
        'adminui-chart': {
            getChartData: function () {


            }
        },
        'fullcalendar-root': {
            getFullcalendar: function () {
                let _this = this;
                let context = this.context;
                if (!calendarObj) {
                    calendarObj = this;
                }
                let result = QEWD.reply({
                    type: 'getEvents',
                    params: {
                        properties: ['name', 'date','patient_id'],
                    },
                }).then((responseObj) => {


                });

                let card = this.getComponentByName('adminui-row', 'adminui-row-chart');
                card.setState({
                    cls: 'd-none'
                });

                console.log(result);
            }
        },
        'adminui-content-card-button-title': {

            showevents: function () {
                let _this = this;
                let fn = function () {

                    let card = _this.getComponentByName('adminui-content-card', state.name + '-chart-card');
                    let card2 = _this.getComponentByName('adminui-content-card', state.name + '-summary-card');

                    card.setState({
                        cls: 'd-none',
                    });

                    card.rootElement.classList.remove('d-flex');
                    card.rootElement.classList.add('d-none');

                    card2.rootElement.classList.remove('d-none');
                    card2.rootElement.classList.add('d-flex');


                }
                this.addHandler(fn);
            },
        },

    };

    let eventsBlock = {
        componentName: 'adminui-content-card',
        state: {
            name: state.name + '-chart-card'
        },
        children: [
            {
                componentName: 'adminui-content-card-header',
                children: [
                    {
                        componentName: 'adminui-content-card-button-title',
                        state: {
                            title: 'Events Data',
                            title_colour: state.summary.titleColour,
                            icon: 'table',
                            buttonColour: state.summary.btnColour,
                            tooltip: 'Show CRUD',
                            hideButton: false
                        },
                        hooks: ['showevents']
                    }
                ]
            },
            {
                componentName: 'adminui-content-card-body',
                children: [
                    {
                        componentName: 'fullcalendar-root',
                        state: {
                            accessToken: 'pk.eyJ1Ijoicm9idHdlZWQiLCJhIjoiY2s4cjdtMzJ4MDZjYjNldGw0ZDJ6enFlYiJ9._wfDdoSZ2RGPbtJJIlbRfw',
                            height: '300px'
                        },
                        hooks: ['getFullcalendar']
                    }
                ]
            }

        ]
    };
    let adminui_row = cSchemaLookup(component,'adminui-row');
    adminui_row.children.unshift(eventsBlock);

    //Merge whole data block
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
