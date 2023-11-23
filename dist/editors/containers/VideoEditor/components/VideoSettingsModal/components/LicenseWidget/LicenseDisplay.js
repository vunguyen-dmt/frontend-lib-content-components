"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LicenseDisplay = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _licenses = require("../../../../../../data/constants/licenses");
var _LicenseBlurb = _interopRequireDefault(require("./LicenseBlurb"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const LicenseDisplay = _ref => {
  let {
    license,
    details,
    licenseDescription
  } = _ref;
  if (license !== _licenses.LicenseTypes.select) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Stack, {
      gap: 3,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "x-small",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.displaySubsectionTitle))
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "small border border-gray-300 rounded p-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LicenseBlurb.default, {
          license: license,
          details: details
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "x-small mt-3",
          children: licenseDescription
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        className: "text-primary-500 x-small",
        destination: "https://creativecommons.org/about",
        target: "_blank",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.viewLicenseDetailsLabel))
      })]
    });
  }
  return null;
};
exports.LicenseDisplay = LicenseDisplay;
LicenseDisplay.propTypes = {
  license: _propTypes.default.string.isRequired,
  details: _propTypes.default.shape({
    attribution: _propTypes.default.bool.isRequired,
    noncommercial: _propTypes.default.bool.isRequired,
    noDerivatives: _propTypes.default.bool.isRequired,
    shareAlike: _propTypes.default.bool.isRequired
  }).isRequired,
  level: _propTypes.default.string.isRequired,
  licenseDescription: _propTypes.default.string.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(LicenseDisplay);
//# sourceMappingURL=LicenseDisplay.js.map