"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTrackSocialSharingChange = exports.default = void 0;
var _reactRedux = require("react-redux");
var _analytics = require("@edx/frontend-platform/analytics");
var _redux = require("../../../../../../data/redux");
var _constants = _interopRequireDefault(require("./constants"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const useTrackSocialSharingChange = _ref => {
  let {
    updateField
  } = _ref;
  const analytics = (0, _reactRedux.useSelector)(_redux.selectors.app.analytics);
  const allowVideoSharing = (0, _reactRedux.useSelector)(_redux.selectors.video.allowVideoSharing);
  return event => {
    (0, _analytics.sendTrackEvent)(_constants.default.socialSharingSettingChanged, _objectSpread(_objectSpread({}, analytics), {}, {
      value: event.target.checked
    }));
    updateField({
      allowVideoSharing: _objectSpread(_objectSpread({}, allowVideoSharing), {}, {
        value: event.target.checked
      })
    });
  };
};
exports.useTrackSocialSharingChange = useTrackSocialSharingChange;
var _default = exports.default = useTrackSocialSharingChange;
//# sourceMappingURL=hooks.js.map