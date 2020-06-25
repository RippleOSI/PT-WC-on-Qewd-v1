export function define_step2TS() {

  let component = {
    componentName: 'tutorial-div-simple',
    children: [
      {
        componentName: 'tutorial-tsta',
        state: {
          name: "Tonys Calendar #1",
          text: 'First Calendar'               
        },
        hooks: ['getCal']
      }
    ]
  };

  let hooks = {
    'tutorial-tsta': {
      getCal: async function() {
        console.log("in getCal hook");
        let _this = this;

        let options = {
          monthFormat: "month YYYY",
          dayFormat: "DDD"
          }
          

        await this.renderCal("12/6/1970", options);
      }

    }

  };

  return {component, hooks};
};
