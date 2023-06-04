import { ReloadOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useContext, useMemo } from 'react';
import warning from '../_util/warning';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import { useLocale } from '../locale';
import Spin from '../spin';
import theme from '../theme';
import useStyle from './style/index';
const {
  useToken
} = theme;
const QRCode = props => {
  const {
    value,
    icon = '',
    size = 160,
    iconSize = 40,
    color = '#000',
    errorLevel = 'M',
    status = 'active',
    bordered = true,
    onRefresh,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('qrcode', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const {
    token
  } = useToken();
  const qrCodeProps = useMemo(() => {
    const imageSettings = {
      src: icon,
      x: undefined,
      y: undefined,
      height: iconSize,
      width: iconSize,
      excavate: true
    };
    return {
      value,
      size: size - (token.paddingSM + token.lineWidth) * 2,
      level: errorLevel,
      bgColor: 'transparent',
      fgColor: color,
      imageSettings: icon ? imageSettings : undefined
    };
  }, [errorLevel, color, icon, iconSize, size, value]);
  const [locale] = useLocale('QRCode');
  if (!value) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== "production" ? warning(false, 'QRCode', 'need to receive `value` props') : void 0;
    }
    return null;
  }
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!(icon && errorLevel === 'L'), 'QRCode', 'ErrorLevel `L` is not recommended to be used with `icon`, for scanning result would be affected by low level.') : void 0;
  }
  const cls = classNames(prefixCls, className, rootClassName, hashId, {
    [`${prefixCls}-borderless`]: !bordered
  });
  return wrapSSR( /*#__PURE__*/React.createElement("div", {
    style: Object.assign(Object.assign({}, style), {
      width: size,
      height: size
    }),
    className: cls
  }, status !== 'active' && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-mask`
  }, status === 'loading' && /*#__PURE__*/React.createElement(Spin, null), status === 'expired' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: `${prefixCls}-expired`
  }, locale === null || locale === void 0 ? void 0 : locale.expired), onRefresh && /*#__PURE__*/React.createElement(Button, {
    type: "link",
    icon: /*#__PURE__*/React.createElement(ReloadOutlined, null),
    onClick: onRefresh
  }, locale === null || locale === void 0 ? void 0 : locale.refresh))), /*#__PURE__*/React.createElement(QRCodeCanvas, Object.assign({}, qrCodeProps))));
};
if (process.env.NODE_ENV !== 'production') {
  QRCode.displayName = 'QRCode';
}
export default QRCode;