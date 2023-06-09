"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genStepsCustomIconStyle = token => {
  const {
    componentCls,
    stepsIconCustomTop,
    stepsIconCustomSize,
    stepsIconCustomFontSize
  } = token;
  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: stepsIconCustomTop,
          width: stepsIconCustomSize,
          height: stepsIconCustomSize,
          fontSize: stepsIconCustomFontSize,
          lineHeight: `${stepsIconCustomSize}px`
        }
      }
    },
    // Only adjust horizontal customize icon width
    [`&:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          width: 'auto',
          background: 'none'
        }
      }
    }
  };
};
var _default = genStepsCustomIconStyle;
exports.default = _default;