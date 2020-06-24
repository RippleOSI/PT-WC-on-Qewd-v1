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
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
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
                let modal = this.getComponentByName('adminui-modal-root', 'adminui-row');
            }
        },
        'adminui-chart': {
            getChartData: async function () {
                console.log('charts init');
                let responseObj = await QEWD.reply({
                    type: state.summary.qewd.getSummary,
                    params: {
                        properties: state.summary.data_properties
                    }
                });
                console.log(responseObj);

                let data = responseObj.message.summary;
                let result = data.map(el => {
                    return {
                        x: el.id,
                        y: el.systolic_bp,
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
                                label: function(tooltipItem, data) {
                                    var label = "Score: "+ data.score+"\r\n";
                                    label+="Systolic BP: "+ data.y+"\r\n";
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
            }
        }
    };

    let extendedComponent = {
        children: [{
            componentName: 'adminui-row',
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
                                        tooltip: state.summary.btnTooltip,
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
    component = mergeDeep(component, extendedComponent);
    hooks = Object.assign(hooks, extendedHooks);

    return {component, hooks};
}
