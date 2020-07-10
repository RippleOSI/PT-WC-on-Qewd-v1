import {webComponents} from '../../mg-webComponents.js';
import {define_jscal2} from './jscal2.js';

document.addEventListener('DOMContentLoaded', function() {

  webComponents.addComponent('jscal2', define_jscal2());
  let context = {
    path: './components/tutorial/'
  };
  webComponents.setLog(true);
  webComponents.loadGroup(webComponents.components.jscal2, document.getElementsByTagName('body')[0], context);

});
