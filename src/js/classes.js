/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable no-multi-assign */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable no-var */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
'use strict';

var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

export default {
  add: addClass,
  rm: rmClass,
};
// module.exports = {
//   add: addClass,
//   rm: rmClass,
// };
