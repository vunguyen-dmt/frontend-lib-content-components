"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popuplateItem = exports.parseShowAnswer = exports.parseSettings = exports.parseScoringSettings = void 0;
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _problem = require("../../../data/constants/problem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const popuplateItem = function (parentObject, itemName, statekey, metadata) {
  let allowNull = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  let parent = parentObject;
  const item = _lodashEs.default.get(metadata, itemName, null);
  if (!_lodashEs.default.isNil(item) || allowNull) {
    parent = _objectSpread(_objectSpread({}, parentObject), {}, {
      [statekey]: item
    });
  }
  return parent;
};
exports.popuplateItem = popuplateItem;
const parseScoringSettings = (metadata, defaultSettings) => {
  let scoring = {};
  const attempts = popuplateItem({}, 'max_attempts', 'number', metadata);
  const initialAttempts = _lodashEs.default.get(attempts, 'number', null);
  const defaultAttempts = _lodashEs.default.get(defaultSettings, 'max_attempts', null);
  attempts.unlimited = false;

  // isFinite checks if value is a finite primitive number.
  if (!_lodashEs.default.isFinite(initialAttempts) || initialAttempts === defaultAttempts) {
    // set number to null in any case as lms will pick default value if it exists.
    attempts.number = null;
  }

  // if both block number and default number are null set unlimited to true.
  if (_lodashEs.default.isNil(initialAttempts) && _lodashEs.default.isNil(defaultAttempts)) {
    attempts.unlimited = true;
  }
  if (attempts.number < 0) {
    attempts.number = 0;
  }
  scoring = _objectSpread(_objectSpread({}, scoring), {}, {
    attempts
  });
  scoring = popuplateItem(scoring, 'weight', 'weight', metadata);
  return scoring;
};
exports.parseScoringSettings = parseScoringSettings;
const parseShowAnswer = metadata => {
  let showAnswer = {};
  const showAnswerType = _lodashEs.default.get(metadata, 'showanswer', {});
  if (!_lodashEs.default.isNil(showAnswerType) && showAnswerType in _problem.ShowAnswerTypes) {
    showAnswer = _objectSpread(_objectSpread({}, showAnswer), {}, {
      on: showAnswerType
    });
  }
  showAnswer = popuplateItem(showAnswer, 'attempts_before_showanswer_button', 'afterAttempts', metadata);
  return showAnswer;
};
exports.parseShowAnswer = parseShowAnswer;
const parseSettings = (metadata, defaultSettings) => {
  let settings = {};
  if (_lodashEs.default.isNil(metadata) || _lodashEs.default.isEmpty(metadata)) {
    return settings;
  }
  const scoring = parseScoringSettings(metadata, defaultSettings);
  if (!_lodashEs.default.isEmpty(scoring)) {
    settings = _objectSpread(_objectSpread({}, settings), {}, {
      scoring
    });
  }
  const showAnswer = parseShowAnswer(metadata);
  if (!_lodashEs.default.isEmpty(showAnswer)) {
    settings = _objectSpread(_objectSpread({}, settings), {}, {
      showAnswer
    });
  }
  const randomizationType = _lodashEs.default.get(metadata, 'rerandomize', {});
  if (!_lodashEs.default.isEmpty(randomizationType) && Object.values(_problem.RandomizationTypesKeys).includes(randomizationType)) {
    settings = popuplateItem(settings, 'rerandomize', 'randomization', metadata);
  }
  settings = popuplateItem(settings, 'show_reset_button', 'showResetButton', metadata);
  settings = popuplateItem(settings, 'submission_wait_seconds', 'timeBetween', metadata);
  return settings;
};
exports.parseSettings = parseSettings;
//# sourceMappingURL=SettingsParser.js.map