'use strict';

/**
 * 
 */

import Global from './module/global';
import Param from './module/param';
import ejs from 'ejs/ejs';
//import b from './module/b';
console.log("sssssssssssssssaaaaa");
var template = document.querySelector('#comments').innerHTML;  
var html = ejs.render(template, {comments: [{user:"123",postdate:"2019",detail:"xxxxxxxxxx"}]})
document.querySelector('#list').innerHTML = html;
