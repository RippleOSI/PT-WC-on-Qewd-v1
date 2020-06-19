export function define_jscal1() {

  let component = {
    componentName: 'tutorial-div-simple',
    children: [
      {
        componentName: 'tutorial-jcal',
        state: {
          name: "Tonys Calendar #2",
          text: 'Second Calendar'               
        },
        hooks: ['getCal']
      }
    ]
  };

  let hooks = {
    'tutorial-jcal': {
      getCal: async function() {
        console.log("in getCal hook");
        let _this = this;

        let options = {
          monthFormat: "month YYYY",
          dayFormat: "DDD"
          }
          

        await this.renderCal("12/6/1970", options);
        await this.renderCal("1/1/2000", options);
      }

    }

  };

  return {component, hooks};
};
