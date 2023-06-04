import CheckOutlined from "@ant-design/icons/es/icons/CheckOutlined";
import CloseCircleFilled from "@ant-design/icons/es/icons/CloseCircleFilled";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import * as React from 'react';
export default function getIcons(_ref) {
  let {
    suffixIcon,
    clearIcon,
    menuItemSelectedIcon,
    removeIcon,
    loading,
    multiple,
    hasFeedback,
    prefixCls,
    showArrow,
    feedbackIcon
  } = _ref;
  // Clear Icon
  const mergedClearIcon = clearIcon !== null && clearIcon !== void 0 ? clearIcon : /*#__PURE__*/React.createElement(CloseCircleFilled, null);
  // Validation Feedback Icon
  const getSuffixIconNode = arrowIcon => /*#__PURE__*/React.createElement(React.Fragment, null, showArrow !== false && arrowIcon, hasFeedback && feedbackIcon);
  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = getSuffixIconNode(suffixIcon);
  } else if (loading) {
    mergedSuffixIcon = getSuffixIconNode( /*#__PURE__*/React.createElement(LoadingOutlined, {
      spin: true
    }));
  } else {
    const iconCls = `${prefixCls}-suffix`;
    mergedSuffixIcon = _ref2 => {
      let {
        open,
        showSearch
      } = _ref2;
      if (open && showSearch) {
        return getSuffixIconNode( /*#__PURE__*/React.createElement(SearchOutlined, {
          className: iconCls
        }));
      }
      return getSuffixIconNode( /*#__PURE__*/React.createElement(DownOutlined, {
        className: iconCls
      }));
    };
  }
  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = /*#__PURE__*/React.createElement(CheckOutlined, null);
  } else {
    mergedItemIcon = null;
  }
  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = /*#__PURE__*/React.createElement(CloseOutlined, null);
  }
  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon
  };
}