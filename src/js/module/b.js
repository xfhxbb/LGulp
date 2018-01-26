'use strict';

/**
 * 
 */
const version="/* @echo version */";
const b=function() {}
b.prototype = {
    init: function() {
       let str='hello world';
       return str;
    }
};
var bb=new b();
export default bb;