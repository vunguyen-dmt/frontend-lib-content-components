"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.LicenseSelector = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _redux = require("../../../../../../data/redux");
var _hooks = _interopRequireDefault(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _licenses = require("../../../../../../data/constants/licenses");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const LicenseSelector = _ref => {
  let {
    license,
    level,
    // injected
    intl,
    // redux
    courseLicenseType,
    updateField
  } = _ref;
  const {
    levelDescription
  } = _hooks.default.determineText({
    level
  });
  const onLicenseChange = _hooks.default.onSelectLicense({
    dispatch: (0, _reactRedux.useDispatch)()
  });
  const ref = _react.default.useRef();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ActionRow, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Form.Control, {
        as: "select",
        className: "w-100 m-0 p-0",
        ref: ref,
        defaultValue: license,
        disabled: level === _licenses.LicenseLevel.course,
        floatingLabel: intl.formatMessage(_messages.default.licenseTypeLabel),
        onChange: e => onLicenseChange(e.target.value),
        children: Object.entries(_licenses.LicenseNames).map(_ref2 => {
          let [key, text] = _ref2;
          if (license === key) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              value: _licenses.LicenseTypes[key],
              selected: true,
              children: text
            });
          }
          if (key === _licenses.LicenseTypes.select) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
              hidden: true,
              children: text
            });
          }
          return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
            value: _licenses.LicenseTypes[key],
            children: text
          });
        })
      }), level !== _licenses.LicenseLevel.course ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow.Spacer, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButtonWithTooltip, {
          iconAs: _paragon.Icon,
          src: _icons.DeleteOutline,
          onClick: () => {
            ref.current.value = courseLicenseType;
            updateField({
              licenseType: '',
              licenseDetails: {}
            });
          },
          tooltipPlacement: "top",
          tooltipContent: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.deleteLicenseSelection))
        })]
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "x-small mt-3",
      children: levelDescription
    }), license === _licenses.LicenseTypes.select ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "border-primary-100 mt-3 border-bottom"
    })]
  });
};
exports.LicenseSelector = LicenseSelector;
LicenseSelector.propTypes = {
  license: _propTypes.default.string.isRequired,
  level: _propTypes.default.string.isRequired,
  // injected
  intl: _i18n.intlShape.isRequired,
  // redux
  courseLicenseType: _propTypes.default.string.isRequired,
  updateField: _propTypes.default.func.isRequired
};
const mapStateToProps = state => ({
  courseLicenseType: _redux.selectors.video.courseLicenseType(state)
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = dispatch => ({
  updateField: stateUpdate => dispatch(_redux.actions.video.updateField(stateUpdate))
});
exports.mapDispatchToProps = mapDispatchToProps;
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LicenseSelector));
//# sourceMappingURL=LicenseSelector.js.map