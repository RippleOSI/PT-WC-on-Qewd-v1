export function define_charts_page(QEWD) {

  let component = {
    componentName: 'adminui-content-page',
    state: {
      name: 'charts'
    },
    children: [
      {
        componentName: 'adminui-content-page-header',
        state: {
          title: 'Charts'
        }
      },
      {
        componentName: 'adminui-content-card',
        state: {
          name: 'charts-card'
        },
        children: [
          {
            componentName: 'adminui-content-card-header',
            state: {
              title: 'Charts Card',
              title_colour: 'warning'
            }
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
      }
    ]
  };

  let hooks = {
    'adminui-chart': {
      getChartData: function() {
        let config = {
          type: 'doughnut',
          data: {
            labels: ["Direct", "Referral", "Social"],
            datasets: [{
              data: [55, 30, 15],
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

  return {component, hooks};
};
