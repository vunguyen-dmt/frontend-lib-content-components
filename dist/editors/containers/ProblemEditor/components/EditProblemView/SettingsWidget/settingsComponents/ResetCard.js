"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ResetCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _SettingsOption = _interopRequireDefault(require("../SettingsOption"));
var _messages = _interopRequireDefault(require("../messages"));
var _hooks = require("../hooks");
var _redux = require("../../../../../../data/redux");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ResetCard = _ref => {
  let {
    showResetButton,
    defaultValue,
    updateSettings,
    // inject
    intl
  } = _ref;
  const isLibrary = (0, _reactRedux.useSelector)(_redux.selectors.app.isLibrary);
  const {
    setResetTrue,
    setResetFalse
  } = (0, _hooks.resetCardHooks)(updateSettings);
  const advancedSettingsLink = `${(0, _reactRedux.useSelector)(_redux.selectors.app.studioEndpointUrl)}/settings/advanced/${(0, _reactRedux.useSelector)(_redux.selectors.app.learningContextId)}#show_reset_button`;
  const currentResetButton = showResetButton !== null ? showResetButton : defaultValue;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SettingsOption.default, {
    title: intl.formatMessage(_messages.default.resetSettingsTitle),
    summary: currentResetButton ? intl.formatMessage(_messages.default.resetSettingsTrue) : intl.formatMessage(_messages.default.resetSettingsFalse),
    className: "resetCard",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "halfSpacedMessage",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.resetSettingText))
      })
    }), !isLibrary && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "spacedMessage",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Hyperlink, {
        destination: advancedSettingsLink,
        target: "_blank",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.advancedSettingsLinkText))
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ButtonGroup, {
      size: "sm",
      className: "resetSettingsButtons mb-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: currentResetButton ? 'outline-primary' : 'primary',
        size: "sm",
        onClick: setResetFalse,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.resetSettingsFalse))
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: currentResetButton ? 'primary' : 'outline-primary',
        size: "sm",
        onClick: setResetTrue,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.resetSettingsTrue))
      })]
    })]
  });
};
exports.ResetCard = ResetCard;
ResetCard.propTypes = {
  showResetButton: _propTypes.default.bool.isRequired,
  defaultValue: _propTypes.default.bool.isRequired,
  updateSettings: _propTypes.default.func.isRequired,
  // injected
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(ResetCard);
//# sourceMappingURL=ResetCard.js.map