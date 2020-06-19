import {webComponents} from '../../mg-webComponents.js';
import {define_jscal1} from './jscal1.js';

document.addEventListener('DOMContentLoaded', function() {

  webComponents.addComponent('jscal1', define_jscal1());
  let context = {
    path: './components/tutorial/'
  };
  webComponents.setLog(true);
  webComponents.loadGroup(webComponents.components.jscal1, document.getElementsByTagName('body')[0], context);

});
