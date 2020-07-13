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
                        componentName: 'ptwq-datatables',
                        state: {
                            name: state.name,
                            options: {
                                qewdRequest: state.summary.qewd.getSummary,
                                headers: state.summary.headers,
                                data_properties: state.summary.data_properties
                            },

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

    state_array.forEach((value,key)=>{
       componentBlocks.push(build_summary_card(value));
    });

    let component = {
        componentName: 'adminui-content-page',
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
        'ptwq-datatables': {

            retrieveRecordSummary: async function() {
                let table = this;
                console.log('load hooks');
                console.log(this.options);

                let responseObj = await QEWD.reply({
                    type: this.options.qewdRequest,
                    params: {
                        properties: this.options.data_properties
                    }
                });
                if (!responseObj.message.error) {
                    table.data = {};
                    let data = [];
                    responseObj.message.summary.forEach(function(record) {
                        table.data[record.id] = record;
                        let row = [];
                        table.options.data_properties.forEach(function(property) {
                            row.push(record[property]);
                        });
                        row.push(record.id);

                        data.push(row);
                    });
                    let columns = [];
                    let noOfCols = table.options.headers.length;

                    table.options.headers.forEach(function(header) {
                        columns.push({title: header});
                    });

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
                        td.id = table.name + '-record-' + id;
                        td.textContent = '';

                    });

                    table.datatable.rows({page: 'current'}).every(function(index, element) {
                        let row = $(this.node());
                        let td = row.find('td').eq(noOfCols - 1)[0];
                    });

                }
                //});
            }
        },

    };


    return {component, hooks};
}
