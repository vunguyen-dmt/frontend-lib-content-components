"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProblemTypeSelect = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _SelectableBox = _interopRequireDefault(require("../../../../../sharedComponents/SelectableBox"));
var _problem = require("../../../../../data/constants/problem");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // SelectableBox in paragon has a bug where you can't change selection. So we override it
const ProblemTypeSelect = _ref => {
  let {
    selected,
    setSelected
  } = _ref;
  const handleChange = e => setSelected(e.target.value);
  const handleClick = () => setSelected(_problem.AdvanceProblemKeys.BLANK);
  const settings = {
    'aria-label': 'checkbox',
    type: 'radio'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
    style: {
      width: '494px',
      height: '400px'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectableBox.default.Set, {
      columns: 1,
      onChange: handleChange,
      type: settings.type,
      value: selected,
      children: Object.values(_problem.ProblemTypeKeys).map(key => key !== 'advanced' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectableBox.default, _objectSpread(_objectSpread({
        className: "border border-light-400 text-primary-500 shadow-none",
        id: key,
        value: key
      }, settings), {}, {
        children: _problem.ProblemTypes[key].title
      })) : null)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      variant: "link",
      className: "pl-0 mt-2",
      onClick: handleClick,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.advanceProblemButtonLabel))
    })]
  });
};
exports.ProblemTypeSelect = ProblemTypeSelect;
ProblemTypeSelect.propTypes = {
  selected: _propTypes.default.string.isRequired,
  setSelected: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(ProblemTypeSelect);
//# sourceMappingURL=ProblemTypeSelect.js.map