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
                $(document).on('init.dt', () => {

                    let card = this.getComponentByName('adminui-content-card', state.name + '-chart-card');
                    let card2 = this.getComponentByName('adminui-content-card', state.name + '-summary-card');
                    console.log('there');
                    console.log(card2);
                    card.setState({
                        cls: 'd-none'
                    });

                    let table = this.getComponentByName('adminui-datatables', state.name);
                    console.log('table');
                    console.log(table);


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
                //  let body = this.getParentComponent('adminui-content-card-body');
            }
        },
        'adminui-chart': {
            getChartData: function () {
                console.log('charts init');
                QEWD.reply({
                    type: state.summary.qewd.getSummary,
                    params: {
                        properties: ['heartrate', 'resprate', 'systolic_bp', 'score']
                    }
                })
                    .then((responseObj) => {
                        console.log(responseObj);

                        let data = responseObj.message.summary;
                        let heartrate = [], resprate = [], systolic_rate = [];


                        let result = data.forEach(el => {
                            heartrate.push({
                                x: el.id,
                                y: el.heartrate,
                            })
                            resprate.push({
                                x: el.id,
                                y: el.resprate,
                            })
                            systolic_rate.push({
                                x: el.id,
                                y: el.systolic_bp,
                            })
                        });
                        console.log(heartrate);
                        console.log(resprate);
                        console.log(systolic_rate);
                        let config = {
                            type: 'scatter',
                            data: {
                                datasets: [{
                                    label: 'Heart Rate',
                                    backgroundColor: 'rgba(226,57,57,0.5)',
                                    borderColor: '#e23939',
                                    fill: false,
                                    showLine: true,

                                    data: heartrate,
                                }, {
                                    label: 'Resp Rate',
                                    backgroundColor: 'rgba(57,171,226,0.5)',
                                    borderColor: '#39abe2',
                                    fill: false,
                                    showLine: true,

                                    data: resprate,
                                }, {
                                    label: 'Systolic Rate',
                                    backgroundColor: 'rgba(226,57,220,0.5)',
                                    borderColor: '#e239dc',
                                    fill: false,
                                    showLine: true,

                                    data: systolic_rate,
                                }],
                                options: {
                                    responsive: true,
                                    maintainAspectRatio: false

                                },
                            }
                        };
                        this.canvas.height = '500px';
                        this.draw(config);

                    });

                let card = this.getComponentByName('adminui-content-card', state.name + '-chart-card');
           /*
                card.setState({
                    cls: 'd-none'
                });*/
            }
        },

        'adminui-content-card-button-title': {

            showVitals: function () {
                let _this = this;
                console.log('there4');
                let fn = function () {
                    console.log('there5');

                    let card = _this.getComponentByName('adminui-content-card', state.name + '-chart-card');
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
    let vitalsGraph = {
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
    };
    let adminui_row = component.children[1]
    adminui_row.children.unshift(vitalsGraph);

    console.log('there123');
    console.log(component);
    let extendedComponent = {

    };

    //Merge whole data block
    component = mergeDeep(component, extendedComponent);
    hooks = mergeDeep(hooks, extendedHooks);
    console.log(hooks);
    return {component, hooks};
}
