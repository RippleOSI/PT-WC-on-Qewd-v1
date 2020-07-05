import {eventsPageState} from '../events_page_state.js'
import {crud_assembly} from '../../../components/adminui/components/adminui-crud.js';

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
    let showRecordBtn = {
        componentName: 'adminui-button',
        assemblyName: state.assemblyName,
        state: {
            icon: state.summary.rowBtnIcon,
            colour: state.summary.rowBtnColour
        },
        hooks: ['getDetail']
    };

    let deleteBtn = {
        assemblyName: state.assemblyName,
        componentName: 'adminui-button',
        state: {
            icon: 'trash-alt',
            colour: 'danger'
        },
        hooks: ['confirmDelete']
    };

    let confirmDeleteModal = {
        componentName: 'adminui-modal-root',
        assemblyName: state.assemblyName,
        state: {
            name: 'confirm-delete-' + state.name
        },
        children: [
            {
                componentName: 'adminui-modal-header',
                state: {
                    name: state.name + '-delete',
                    title: 'Delete Record'
                },
                children: [
                    {
                        componentName: 'adminui-modal-close-button',
                    }
                ]
            },
            {
                componentName: 'adminui-modal-body',
                state: {
                    text: 'Are you sure you want to delete this record?'
                }
            },
            {
                componentName: 'adminui-modal-footer',
                children: [
                    {
                        componentName: 'adminui-modal-cancel-button',
                    },
                    {
                        componentName: 'adminui-button',
                        state: {
                            name: 'deleteRecord-' + state.name,
                            text: state.name + ' Yes',
                            colour: 'danger',
                            cls: 'btn-block'
                        },
                        hooks: ['delete']
                    }
                ]
            }
        ]
    };


    let extendedHooks = {
        'adminui-content-page': {
            addButton: function () {
                console.log(this.context);
                $(document).on('draw.dt', () => {
                    console.log('table redraw');
                    if (calendarObj) {
                        let result = QEWD.reply({
                            type: 'getEvents',
                            params: {
                                properties: ['name', 'date'],
                            },
                        }).then((responseObj) => {
                            calendarObj.renderFullcalendar(responseObj).then((context) => {

                            });
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
                if (!calendarObj) {
                    calendarObj = this;
                }
                let result = QEWD.reply({
                    type: 'getEvents',
                    params: {
                        properties: ['name', 'date'],
                    },
                }).then((responseObj) => {
                    this.renderFullcalendar(responseObj).then((context) => {

                    });

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

        // OVERRIDE RETRIVE RECORD SUMMARY
        'adminui-datatables': {

            retrieveRecordSummary: async function () {
                let table = this;
                /*
                QEWD.send({
                  type: state.summary.qewd.getSummary,
                  params: {
                    properties: state.summary.data_properties
                  }
                }, function(responseObj) {
                */
                let responseObj = await QEWD.reply({
                    type: state.summary.qewd.getSummary,
                    params: {
                        properties: state.summary.data_properties
                    }
                });
                if (responseObj.message.error) {
                    console.log(responseObj.message.error);
                    return;
                }

                table.data = {};
                let data = [];
                let context = this.context;


                responseObj.message.summary.forEach(function (record) {
                    if (context.selectedPatient  ) {
                        if (context.selectedPatient.id !== record.patient_id) {
                            return true; // SKIP BY FILTER
                        }
                    } else {
                        console.log('its ok ');
                    }
                    table.data[record.id] = record;
                    let row = [];
                    state.summary.data_properties.forEach(function (property) {
                        row.push(record[property]);
                    });
                    row.push(record.id);
                    if (state.summary.enableDelete) {
                        row.push('');
                    }
                    data.push(row);
                });
                let columns = [];
                let noOfCols = state.summary.headers.length;

                state.summary.headers.forEach(function (header) {
                    columns.push({title: header});
                });
                if (state.summary.enableDelete) {
                    columns.push({title: 'Delete'});
                }
                let obj = {
                    data: data,
                    columns: columns
                };

                table.render(obj);

                table.datatable.rows().every(function (index, element) {
                    let row = $(this.node());
                    let td = row.find('td').eq(noOfCols - 1)[0];
                    let id = td.textContent;
                    table.row = table.data[id];
                    td.id = state.name + '-record-' + id;
                    td.textContent = '';
                    if (state.summary.enableDelete) {
                        td = row.find('td').eq(noOfCols)[0];
                        td.id = state.name + '-delete-' + id;
                        let confirmTextFn = state.summary.deleteConfirmText;
                        let confirmText;
                        if (typeof confirmTextFn === 'function') {
                            confirmText = confirmTextFn.call(table);
                        } else {
                            let name_td = row.find('td').eq(0)[0];
                            confirmText = name_td.textContent;
                        }
                        td.setAttribute('data-confirm', confirmText);
                    }
                });

                table.datatable.rows({page: 'current'}).every(function (index, element) {
                    let row = $(this.node());
                    let td = row.find('td').eq(noOfCols - 1)[0];
                    table.loadGroup(showRecordBtn, td, table.context);
                    if (state.summary.enableDelete) {
                        td = row.find('td').eq(noOfCols)[0];
                        table.loadGroup(deleteBtn, td, table.context);
                    }
                });

                table.datatable.on('draw', function () {
                    table.datatable.rows({page: 'current'}).every(function (index, element) {
                        let row = $(this.node());
                        let td = row.find('td').eq(2)[0];
                        let btn = td.querySelector('adminui-button');
                        if (btn) {
                            td.removeChild(btn);
                        }
                        table.loadGroup(showRecordBtn, td, table.context);
                        if (state.summary.enableDelete) {
                            td = row.find('td').eq(3)[0];
                            btn = td.querySelector('adminui-button');
                            if (btn) {
                                td.removeChild(btn);
                            }
                            table.loadGroup(deleteBtn, td, table.context);
                        }
                    });
                });
            }


        },
        'adminui-button': {
            save: function () {
                let _this = this;
                let fn = async function () {
                    let form = _this.getComponentByName('adminui-form', state.name);
                    let field;
                    let value;

                    let params = {
                        id: form.recordId
                    };
                    if (_this.context.selectedPatient) {
                        params.patient_id = _this.context.selectedPatient.id;
                    }

                    for (let name in form.field) {
                        let value = form.fieldValues[name];
                        if (typeof value === 'object') {
                            let arr = [];
                            for (let xname in value) {
                                if (value[xname]) arr.push(xname);
                            }
                            params[formFieldPropertyNames[name]] = arr;
                        } else {
                            params[formFieldPropertyNames[name]] = value;
                        }
                    }
                    /*
                    QEWD.send({
                      type: state.update.qewd.save,
                      params: params
                    }, function(responseObj) {
                    */
                    let responseObj = await QEWD.reply({
                        type: state.update.qewd.save,
                        params: params
                    });
                    if (responseObj.message.error) {
                        toastr.error(responseObj.message.error);
                    } else {
                        toastr.info('Record updated successfully');
                        let table = _this.getComponentByName('adminui-datatables', state.name);
                        let target = table.getParentComponent('adminui-content-card-body');
                        if (table) {
                            table.datatable.destroy();
                            table.remove();
                        }
                        let assembly = {
                            componentName: 'adminui-datatables',
                            assemblyName: state.assemblyName,
                            state: {
                                name: state.name
                            },
                            hooks: ['retrieveRecordSummary']
                        };
                        _this.loadGroup(assembly, target, _this.context);
                        let card = _this.getComponentByName('adminui-content-card', state.name + '-details-card');
                        card.hide();
                    }
                    //});
                };
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
    let adminui_row = component.children[1]
    adminui_row.children.unshift(eventsBlock);

    //Merge whole data block
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
