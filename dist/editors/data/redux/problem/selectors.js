"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleSelectors = exports.problemState = exports.default = void 0;
var _reselect = require("reselect");
var _module = _interopRequireWildcard(require("./selectors"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const problemState = state => state.problem;
exports.problemState = problemState;
const mkSimpleSelector = cb => (0, _reselect.createSelector)([_module.problemState], cb);
const simpleSelectors = exports.simpleSelectors = {
  problemType: mkSimpleSelector(problemData => problemData.problemType),
  generalFeedback: mkSimpleSelector(problemData => problemData.generalFeedback),
  groupFeedbackList: mkSimpleSelector(problemData => problemData.groupFeedbackList),
  answers: mkSimpleSelector(problemData => problemData.answers),
  correctAnswerCount: mkSimpleSelector(problemData => problemData.correctAnswerCount),
  settings: mkSimpleSelector(problemData => problemData.settings),
  question: mkSimpleSelector(problemData => problemData.question),
  defaultSettings: mkSimpleSelector(problemData => problemData.defaultSettings),
  completeState: mkSimpleSelector(problemData => problemData)
};
var _default = exports.default = _objectSpread({}, simpleSelectors);
//# sourceMappingURL=selectors.js.map