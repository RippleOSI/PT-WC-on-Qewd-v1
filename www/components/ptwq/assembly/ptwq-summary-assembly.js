function build_summary_card(state) {
    return {
        componentName: 'adminui-content-card',
        state: {
            name: state.name + '-summary-card'
        },
        children: [
            {
                componentName: 'adminui-content-card-header',
                children: [
                    {
                        componentName: 'adminui-content-card-button-title',
                        state: {
                            title: state.summary.title,
                            title_colour: state.summary.titleColour,
                            icon: state.summary.btnIcon,
                            buttonColour: state.summary.btnColour,
                            tooltip: state.summary.btnTooltip,
                            hideButton: true
                        },
                    }
                ]
            },
            {
                componentName: 'adminui-content-card-body',
                children: [
                    {
                        componentName: 'adminui-datatables',
                        state: {
                            name: state.name,
                            qewdRequest: state.summary.qewd.getSummary,
                            headers: state.summary.headers,
                            data_properties: state.summary.data_properties
                        },
                        hooks: ['retrieveRecordSummary']
                    }
                ]
            }
        ]
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
    state_array.forEach((key,value)=>{
       componentBlocks.push(build_summary_card(value));
    });
    let component = {
        componentName: 'adminui-content-page',
        assemblyName: state.assemblyName,
        state: {
            name: state.name
        },
        hooks: ['loadModal'],
        children: [
            {
                componentName: 'adminui-content-page-header',
                state: {
                    title: state.title
                }
            },
            {
                componentName: 'adminui-row',
                children: state_array,
            }
        ]

    };
    let hooks = {
        'adminui-datatables': {

            retrieveRecordSummary: async function() {
                let table = this;

                let responseObj = await QEWD.reply({
                    type: state.summary.qewd.getSummary,
                    params: {
                        properties: state.summary.data_properties
                    }
                });
                if (!responseObj.message.error) {
                    table.data = {};
                    let data = [];
                    responseObj.message.summary.forEach(function(record) {
                        table.data[record.id] = record;
                        let row = [];
                        state.summary.data_properties.forEach(function(property) {
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

                    state.summary.headers.forEach(function(header) {
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

                    table.datatable.rows().every(function(index, element) {
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
                            }
                            else {
                                let name_td = row.find('td').eq(0)[0];
                                confirmText = name_td.textContent;
                            }
                            td.setAttribute('data-confirm', confirmText);
                        }
                    });

                    table.datatable.rows({page: 'current'}).every(function(index, element) {
                        let row = $(this.node());
                        let td = row.find('td').eq(noOfCols - 1)[0];
                        table.loadGroup(showRecordBtn, td, table.context);
                        if (state.summary.enableDelete) {
                            td = row.find('td').eq(noOfCols)[0];
                            table.loadGroup(deleteBtn, td, table.context);
                        }
                    });

                    table.datatable.on('draw', function() {
                        table.datatable.rows({page: 'current'}).every(function(index, element) {
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
                //});
            }
        },

    };


    return {component, hooks};
}
