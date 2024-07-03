"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.default = exports.ExplanationWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _redux = require("../../../../../data/redux");
var _messages = _interopRequireDefault(require("./messages"));
var _TinyMceWidget = _interopRequireDefault(require("../../../../../sharedComponents/TinyMceWidget"));
var _hooks = require("../../../../../sharedComponents/TinyMceWidget/hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ExplanationWidget = _ref => {
  let {
    // redux
    settings,
    // injected
    intl
  } = _ref;
  const {
    editorRef,
    refReady,
    setEditorRef
  } = (0, _hooks.prepareEditorRef)();
  if (!refReady) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "tinyMceWidget mt-4 text-primary-500",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "h4 mb-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.solutionWidgetTitle))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "small mb-3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.solutionDescriptionText))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TinyMceWidget.default, {
      id: "solution",
      editorType: "solution",
      editorRef: editorRef,
      editorContentHtml: settings?.solutionExplanation,
      setEditorRef: setEditorRef,
      minHeight: 150,
      placeholder: intl.formatMessage(_messages.default.placeholder)
    })]
  });
};
exports.ExplanationWidget = ExplanationWidget;
ExplanationWidget.propTypes = {
  // redux
  // eslint-disable-next-line
  settings: _propTypes.default.any.isRequired,
  // injected
  intl: _i18n.intlShape.isRequired
};
const mapStateToProps = state => ({
  settings: _redux.selectors.problem.settings(state)
});
exports.mapStateToProps = mapStateToProps;
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps)(ExplanationWidget));
//# sourceMappingURL=index.js.map