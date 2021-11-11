'use strict';

import Global from './module/global';
import Param from './module/param';
import * as ejs from 'ejs/ejs';
console.log("env", Global.env);
console.log(`${Param.getAll(window.location.href)}`);
var template = document.querySelector('#comments').innerHTML;
var html = ejs.render(template, { comments: [{ user: "123", postdate: "2019", detail: "xxxxxxxxxx" }] })
document.querySelector('#list').innerHTML = html;
