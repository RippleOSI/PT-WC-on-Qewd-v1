import {vitalsPageState} from '../vitals_page_state.js'
import {crud_assembly} from '../../../components/adminui/components/adminui-crud.js';

let vitals_exteneded = {
    ...vitalsPageState,

}

export function vitals_extended_crud(QEWD) {
    let {component, hooks} = crud_assembly(QEWD, vitals_exteneded);
    let state = vitals_exteneded;
    component.hooks.push('addButton');

    let extendedHooks = {
        'adminui-content-page': {
            addButton: function () {
              //  let body = this.getParentComponent('adminui-content-card-body');

                let assembly = {
                    componentName: 'adminui-chart',
                    hooks: ['getChartData']
                };

                this.loadGroup(assembly, this, this.context, function () {

                });
            }
        },
        'adminui-chart': {
            getChartData: async function () {

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
                                    label+="Systolic BP"+ data.y+"\r\n";
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
    hooks = Object.assign(hooks, extendedHooks);

    return {component, hooks};
}
