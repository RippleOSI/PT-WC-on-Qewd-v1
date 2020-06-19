import {webComponents} from '../../mg-webComponents.js';
import {define_step2TS} from './step2TS.js';

document.addEventListener('DOMContentLoaded', function() {

  webComponents.addComponent('step2TS', define_step2TS());
  let context = {
    path: './components/tutorial/'
  };
  webComponents.setLog(true);
  webComponents.loadGroup(webComponents.components.step2TS, document.getElementsByTagName('body')[0], context);

});
