'use strict';

/**
 * 
 */

import b from './module/b';

const str=b.init();
const version="/* @echo version */";
document.querySelector('body').textContent=`${version} ${str}`;