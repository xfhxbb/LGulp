'use strict';

/**
 * 
 */
const b=function() {}
b.prototype = {
    init: function() {
       let str='hello world';
       throw new Error("aaaaaa");
    }
}; 
var bb=new b();
export default bb;