import {vitalsPageState} from '../vitals_page_state.js'
import {crud_assembly} from '../../../components/adminui/components/adminui-crud.js';

let vitals_exteneded = {
    ...vitalsPageState,

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

export function vitals_extended_crud(QEWD) {
    let {component, hooks} = crud_assembly(QEWD, vitals_exteneded);
    let state = vitals_exteneded;
    component.hooks.push('addButton');


    let extendedHooks = {
        'adminui-content-page': {
            addButton: function () {
                //  let body = this.getParentComponent('adminui-content-card-body');
            }
        },
        'adminui-chart': {
            getChartData: function () {
                console.log('charts init');
                QEWD.reply({
                    type: state.summary.qewd.getSummary,
                    params: {
                        properties: state.summary.data_properties
                    }
                })
                    .then((responseObj) => {
                        console.log(responseObj);

                        let data = responseObj.message.summary;
                        let result = data.map(el => {
                            return {
                                x: parseInt(el.systolic_bp),
                                y: el.id,
                            }
                        });

                        let config = {
                            type: 'line',
                            data: {
                                datasets: [{
                                    data: result,
                                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                                }],
                            },
                            options: {
                                maintainAspectRatio: false,
                                tooltips: {
                                    backgroundColor: "rgb(255,255,255)",
                                    bodyFontColor: "#858796",
                                    borderColor: '#dddfeb',
                                    borderWidth: 1,
                                    xPadding: 15,
                                    yPadding: 15,
                                    displayColors: false,
                                    caretPadding: 10,
                                    callbacks: {
                                        label: function (tooltipItem, data) {
                                            var label = "Score: " + data.score + "\r\n";
                                            label += "Systolic BP: " + data.y + "\r\n";
                                            return label;
                                        }
                                    }
                                },
                                legend: {
                                    display: false
                                },
                                cutoutPercentage: 80,
                            },
                        };

                        this.draw(config);
                    });

                let card = this.getComponentByName('adminui-row', 'adminui-row-chart');
                let card2 = this.getComponentByName('adminui-content-card', state.name + '-summary-card');
                console.log('there');
                console.log(card2);
                card.setState({
                    cls: 'd-none'
                });

                let table = this.getComponentByName('adminui-datatables', state.name);
                console.log('table');
                console.log(table);
                $(table.table).on('init.dt', () => {
                    let button = document.createElement('button');
                    $(button).text('Show Chart');

                    $(button).click(() => {


                        card.rootElement.classList.remove('d-none');
                        card.rootElement.classList.add('d-block');


                        card2.rootElement.classList.remove('d-flex');
                        card2.rootElement.classList.add('d-none');

                    });
                    $(table).append(button);
                });
            }
        },

        'adminui-content-card-button-title': {

            showVitals: function () {
                let _this = this;
                console.log('there4');
                let fn = function () {
                    console.log('there5');

                    let card = _this.getComponentByName('adminui-row', 'adminui-row-chart');
                    let card2 = _this.getComponentByName('adminui-content-card', state.name + '-summary-card');
                    card.setState({
                        cls: 'd-none',
                    });

                    card.rootElement.classList.remove('d-block');
                    card.rootElement.classList.add('d-none');

                    card2.rootElement.classList.remove('d-none');
                    card2.rootElement.classList.add('d-flex');


                }
                this.addHandler(fn);
            },
        }
    };

    let extendedComponent = {
        children: [{
            componentName: 'adminui-row',
            state: {
                name: 'adminui-row-chart',
            },
            children: [
                {
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
                                        title: 'Chart data',
                                        title_colour: state.summary.titleColour,
                                        icon: 'table',
                                        buttonColour: state.summary.btnColour,
                                        tooltip: 'Show CRUD',
                                        hideButton: false
                                    },
                                    hooks: ['showVitals']
                                }
                            ]
                        },
                        {
                            componentName: 'adminui-content-card-body',
                            children: [
                                {
                                    componentName: 'adminui-chart',
                                    hooks: ['getChartData']
                                }
                            ]
                        }
                    ]
                },

            ],
        }]
    };

    //Merge whole data block
    component = mergeDeep(component, extendedComponent);
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
