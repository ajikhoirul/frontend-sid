"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function extendsObject() {
  const result = Object.assign({}, arguments.length <= 0 ? undefined : arguments[0]);
  for (let i = 1; i < arguments.length; i++) {
    const obj = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (val !== undefined) {
          result[key] = val;
        }
      });
    }
  }
  return result;
}
var _default = extendsObject;
exports.default = _default;