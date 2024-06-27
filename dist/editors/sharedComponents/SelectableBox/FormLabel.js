"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _FormGroupContext = require("./FormGroupContext");
var _constants = require("./constants");
const _excluded = ["children", "isInline"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const FormLabel = _ref => {
  let {
      children,
      isInline
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    size,
    isControlGroup,
    getLabelProps
  } = (0, _FormGroupContext.useFormGroupContext)();
  const className = (0, _classnames.default)('pgn__form-label', {
    'pgn__form-label-inline': isInline,
    'pgn__form-label-lg': size === _constants.FORM_CONTROL_SIZES.LARGE,
    'pgn__form-label-sm': size === _constants.FORM_CONTROL_SIZES.SMALL
  }, props.className);
  const labelProps = getLabelProps(_objectSpread(_objectSpread({}, props), {}, {
    className
  }));
  const componentType = isControlGroup ? 'p' : 'label';
  return /*#__PURE__*/_react.default.createElement(componentType, labelProps, children);
};
const SIZE_CHOICES = ['sm', 'lg'];
FormLabel.propTypes = {
  /** Specifies class name to append to the base element. */
  className: _propTypes.default.string,
  /** Specifies contents of the component. */
  children: _propTypes.default.node.isRequired,
  /** Specifies whether the component should be displayed with inline styling. */
  isInline: _propTypes.default.bool,
  /** Specifies size of the component. */
  size: _propTypes.default.oneOf(SIZE_CHOICES)
};
FormLabel.defaultProps = {
  isInline: false,
  size: undefined,
  className: undefined
};
var _default = exports.default = FormLabel;
//# sourceMappingURL=FormLabel.js.map