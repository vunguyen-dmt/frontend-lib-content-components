"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.SwitchToAdvancedEditorCard = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _messages = _interopRequireDefault(require("../messages"));
var _redux = require("../../../../../../data/redux");
var _BaseModal = _interopRequireDefault(require("../../../../../../sharedComponents/BaseModal"));
var _Button = _interopRequireDefault(require("../../../../../../sharedComponents/Button"));
var _hooks = require("../hooks");
var _problem = require("../../../../../../data/constants/problem");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const SwitchToAdvancedEditorCard = _ref => {
  let {
    problemType,
    switchToAdvancedEditor
  } = _ref;
  const [isConfirmOpen, setConfirmOpen] = _react.default.useState(false);
  if (problemType === _problem.ProblemTypeKeys.ADVANCED) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
    className: "border border-light-700 shadow-none",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BaseModal.default, {
      isOpen: isConfirmOpen,
      close: () => {
        setConfirmOpen(false);
      },
      title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.ConfirmSwitchMessageTitle)),
      confirmAction: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
        onClick: () => (0, _hooks.confirmSwitchToAdvancedEditor)({
          switchToAdvancedEditor,
          setConfirmOpen
        }),
        variant: "primary",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.ConfirmSwitchButtonLabel))
      }),
      size: "md",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.ConfirmSwitchMessage))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: "my-3 ml-2 py-0",
      variant: "link",
      size: "sm",
      onClick: () => {
        setConfirmOpen(true);
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.SwitchButtonLabel))
    })]
  });
};
exports.SwitchToAdvancedEditorCard = SwitchToAdvancedEditorCard;
SwitchToAdvancedEditorCard.propTypes = {
  switchToAdvancedEditor: _propTypes.default.func.isRequired,
  problemType: _propTypes.default.string.isRequired
};
const mapStateToProps = () => ({});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = exports.mapDispatchToProps = {
  switchToAdvancedEditor: _redux.thunkActions.problem.switchToAdvancedEditor
};
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SwitchToAdvancedEditorCard));
//# sourceMappingURL=SwitchToAdvancedEditorCard.js.map