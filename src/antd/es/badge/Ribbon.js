import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { isPresetColor } from '../_util/colors';
const Ribbon = _ref => {
  let {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = 'end'
  } = _ref;
  const {
    getPrefixCls,
    direction
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = classNames(prefixCls, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-color-${color}`]: colorInPreset
  }, className);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const colorStyle = {};
  const cornerColorStyle = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    className: classNames(`${prefixCls}-wrapper`, hashId)
  }, children, /*#__PURE__*/React.createElement("div", {
    className: classNames(ribbonCls, hashId),
    style: Object.assign(Object.assign({}, colorStyle), style)
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-text`
  }, text), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-corner`,
    style: cornerColorStyle
  }))));
};
if (process.env.NODE_ENV !== 'production') {
  Ribbon.displayName = 'Ribbon';
}
export default Ribbon;