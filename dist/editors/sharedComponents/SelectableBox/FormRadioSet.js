"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FormGroupContext = require("./FormGroupContext");
var _FormRadioSetContext = require("./FormRadioSetContext");
var _FormControlSet = _interopRequireDefault(require("./FormControlSet"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "name", "value", "defaultValue", "isInline", "onChange", "onFocus", "onBlur"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const FormRadioSet = _ref => {
  let {
      children,
      name,
      value,
      defaultValue,
      isInline,
      onChange,
      onFocus,
      onBlur
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    getControlProps,
    useSetIsControlGroupEffect
  } = (0, _FormGroupContext.useFormGroupContext)();
  useSetIsControlGroupEffect(true);
  const controlProps = getControlProps(props);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormRadioSetContext.FormRadioSetContextProvider, {
    name: name,
    value: value,
    defaultValue: defaultValue,
    onFocus: onFocus,
    onBlur: onBlur,
    onChange: onChange,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_FormControlSet.default, _objectSpread(_objectSpread({
      role: "radiogroup",
      isInline: isInline
    }, controlProps), {}, {
      children: children
    }))
  });
};
FormRadioSet.propTypes = {
  /** Specifies contents of the component. */
  children: _propTypes.default.node.isRequired,
  /** A class name to append to the base element. */
  className: _propTypes.default.string,
  /** Specifies name for the component. */
  name: _propTypes.default.string.isRequired,
  /** Specifies values for the FormRadioSet. */
  value: _propTypes.default.string,
  /** Specifies default values. */
  defaultValue: _propTypes.default.string,
  /** Specifies whether the component should be displayed with inline styling. */
  isInline: _propTypes.default.bool,
  /** Specifies onChange event handler. */
  onChange: _propTypes.default.func,
  /** Specifies onFocus event handler. */
  onFocus: _propTypes.default.func,
  /** Specifies onBlur event handler. */
  onBlur: _propTypes.default.func
};
FormRadioSet.defaultProps = {
  className: undefined,
  value: undefined,
  defaultValue: undefined,
  isInline: false,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined
};
var _default = exports.default = FormRadioSet;
//# sourceMappingURL=FormRadioSet.js.map