"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnswerSettings = exports.typeRowHooks = exports.timerCardHooks = exports.state = exports.showFullCard = exports.showAdvancedSettingsCards = exports.scoringCardHooks = exports.resetCardHooks = exports.hintsRowHooks = exports.hintsCardHooks = exports.confirmSwitchToAdvancedEditor = void 0;
var _react = require("react");
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _module = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("./messages"));
var _problem = require("../../../../../data/constants/problem");
var _hooks2 = require("../hooks");
const _excluded = ["selectedFeedback", "unselectedFeedback"],
  _excluded2 = ["selectedFeedback", "unselectedFeedback"],
  _excluded3 = ["selectedFeedback", "unselectedFeedback"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showAdvanced: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  cardCollapsed: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  summary: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showAttempts: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  attemptDisplayValue: val => (0, _react.useState)(val)
};
const showAdvancedSettingsCards = () => {
  const [isAdvancedCardsVisible, setIsAdvancedCardsVisible] = _module.state.showAdvanced(false);
  return {
    isAdvancedCardsVisible,
    showAdvancedCards: () => setIsAdvancedCardsVisible(true)
  };
};
exports.showAdvancedSettingsCards = showAdvancedSettingsCards;
const showFullCard = hasExpandableTextArea => {
  const [isCardCollapsibleOpen, setIsCardCollapsibleOpen] = _module.state.cardCollapsed(hasExpandableTextArea);
  return {
    isCardCollapsibleOpen,
    toggleCardCollapse: () => {
      if (hasExpandableTextArea) {
        setIsCardCollapsibleOpen(true);
      } else {
        setIsCardCollapsibleOpen(!isCardCollapsibleOpen);
      }
    }
  };
};
exports.showFullCard = showFullCard;
const hintsCardHooks = (hints, updateSettings) => {
  const [summary, setSummary] = _module.state.summary({
    message: _messages.default.noHintSummary,
    values: {}
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => {
    const hintsNumber = hints.length;
    if (hintsNumber === 0) {
      setSummary({
        message: _messages.default.noHintSummary,
        values: {}
      });
    } else {
      setSummary({
        message: _messages.default.hintSummary,
        values: {
          hint: hints[0].value,
          count: hintsNumber - 1
        }
      });
    }
  }, [hints]);
  const handleAdd = () => {
    let newId = 0;
    if (!_lodashEs.default.isEmpty(hints)) {
      newId = Math.max(...hints.map(hint => hint.id)) + 1;
    }
    const hint = {
      id: newId,
      value: ''
    };
    const modifiedHints = [...hints, hint];
    updateSettings({
      hints: modifiedHints
    });
  };
  return {
    summary,
    handleAdd
  };
};
exports.hintsCardHooks = hintsCardHooks;
const hintsRowHooks = (id, hints, updateSettings) => {
  const handleChange = value => {
    const modifiedHints = hints.map(hint => {
      if (hint.id === id) {
        return _objectSpread(_objectSpread({}, hint), {}, {
          value
        });
      }
      return hint;
    });
    updateSettings({
      hints: modifiedHints
    });
  };
  const handleDelete = () => {
    const modifiedHints = hints.filter(hint => hint.id !== id);
    updateSettings({
      hints: modifiedHints
    });
  };
  return {
    handleChange,
    handleDelete
  };
};
exports.hintsRowHooks = hintsRowHooks;
const resetCardHooks = updateSettings => {
  const setReset = value => {
    updateSettings({
      showResetButton: value
    });
  };
  return {
    setResetTrue: () => setReset(true),
    setResetFalse: () => setReset(false)
  };
};
exports.resetCardHooks = resetCardHooks;
const scoringCardHooks = (scoring, updateSettings, defaultValue) => {
  let loadedAttemptsNumber = scoring.attempts.number;
  if ((loadedAttemptsNumber === defaultValue || !_lodashEs.default.isFinite(loadedAttemptsNumber)) && _lodashEs.default.isFinite(defaultValue)) {
    loadedAttemptsNumber = `${defaultValue} (Default)`;
  } else if (loadedAttemptsNumber === defaultValue && _lodashEs.default.isNil(defaultValue)) {
    loadedAttemptsNumber = '';
  }
  const [attemptDisplayValue, setAttemptDisplayValue] = _module.state.attemptDisplayValue(loadedAttemptsNumber);
  const handleUnlimitedChange = event => {
    const isUnlimited = event.target.checked;
    if (isUnlimited) {
      setAttemptDisplayValue('');
      updateSettings({
        scoring: _objectSpread(_objectSpread({}, scoring), {}, {
          attempts: {
            number: null,
            unlimited: true
          }
        })
      });
    } else {
      updateSettings({
        scoring: _objectSpread(_objectSpread({}, scoring), {}, {
          attempts: {
            number: null,
            unlimited: false
          }
        })
      });
    }
  };
  const handleMaxAttemptChange = event => {
    let unlimitedAttempts = false;
    let attemptNumber = parseInt(event.target.value);
    if (!_lodashEs.default.isFinite(attemptNumber) || attemptNumber === defaultValue) {
      attemptNumber = null;
      if (_lodashEs.default.isFinite(defaultValue)) {
        setAttemptDisplayValue(`${defaultValue} (Default)`);
      } else {
        setAttemptDisplayValue('');
        unlimitedAttempts = true;
      }
    } else if (attemptNumber <= 0) {
      attemptNumber = 0;
    }
    updateSettings({
      scoring: _objectSpread(_objectSpread({}, scoring), {}, {
        attempts: {
          number: attemptNumber,
          unlimited: unlimitedAttempts
        }
      })
    });
  };
  const handleOnChange = event => {
    let newMaxAttempt = parseInt(event.target.value);
    if (newMaxAttempt === defaultValue) {
      newMaxAttempt = `${defaultValue} (Default)`;
    } else if (_lodashEs.default.isNaN(newMaxAttempt)) {
      newMaxAttempt = '';
    } else if (newMaxAttempt < 0) {
      newMaxAttempt = 0;
    }
    setAttemptDisplayValue(newMaxAttempt);
  };
  const handleWeightChange = event => {
    let weight = parseFloat(event.target.value);
    if (_lodashEs.default.isNaN(weight)) {
      weight = 0;
    }
    updateSettings({
      scoring: _objectSpread(_objectSpread({}, scoring), {}, {
        weight
      })
    });
  };
  return {
    attemptDisplayValue,
    handleUnlimitedChange,
    handleMaxAttemptChange,
    handleOnChange,
    handleWeightChange
  };
};
exports.scoringCardHooks = scoringCardHooks;
const useAnswerSettings = (showAnswer, updateSettings) => {
  const [showAttempts, setShowAttempts] = _module.state.showAttempts(false);
  const numberOfAttemptsChoice = [_problem.ShowAnswerTypesKeys.AFTER_SOME_NUMBER_OF_ATTEMPTS, _problem.ShowAnswerTypesKeys.AFTER_ALL_ATTEMPTS, _problem.ShowAnswerTypesKeys.AFTER_ALL_ATTEMPTS_OR_CORRECT];
  (0, _react.useEffect)(() => {
    setShowAttempts(_lodashEs.default.includes(numberOfAttemptsChoice, showAnswer.on));
  }, [showAttempts]);
  const handleShowAnswerChange = event => {
    const {
      value
    } = event.target;
    setShowAttempts(_lodashEs.default.includes(numberOfAttemptsChoice, value));
    updateSettings({
      showAnswer: _objectSpread(_objectSpread({}, showAnswer), {}, {
        on: value
      })
    });
  };
  const handleAttemptsChange = event => {
    let attempts = parseInt(event.target.value);
    if (_lodashEs.default.isNaN(attempts)) {
      attempts = 0;
    }
    updateSettings({
      showAnswer: _objectSpread(_objectSpread({}, showAnswer), {}, {
        afterAttempts: attempts
      })
    });
  };
  return {
    handleShowAnswerChange,
    handleAttemptsChange,
    showAttempts
  };
};
exports.useAnswerSettings = useAnswerSettings;
const timerCardHooks = updateSettings => ({
  handleChange: event => {
    let time = parseInt(event.target.value);
    if (_lodashEs.default.isNaN(time)) {
      time = 0;
    }
    updateSettings({
      timeBetween: time
    });
  }
});
exports.timerCardHooks = timerCardHooks;
const typeRowHooks = _ref => {
  let {
    answers,
    blockTitle,
    correctAnswerCount,
    problemType,
    setBlockTitle,
    typeKey,
    updateField,
    updateAnswer
  } = _ref;
  const clearPreviouslySelectedAnswers = () => {
    let currentAnswerTitles;
    const _fetchEditorContent = (0, _hooks2.fetchEditorContent)({
        format: 'text'
      }),
      {
        selectedFeedback,
        unselectedFeedback
      } = _fetchEditorContent,
      editorContent = _objectWithoutProperties(_fetchEditorContent, _excluded);
    if (_problem.RichTextProblems.includes(problemType)) {
      currentAnswerTitles = editorContent.answers;
    }
    answers.forEach(answer => {
      const title = currentAnswerTitles?.[answer.id] || answer.title;
      if (answer.correct) {
        updateAnswer(_objectSpread(_objectSpread({}, answer), {}, {
          title,
          selectedFeedback,
          unselectedFeedback,
          correct: false
        }));
      } else {
        updateAnswer(_objectSpread(_objectSpread({}, answer), {}, {
          selectedFeedback,
          unselectedFeedback,
          title
        }));
      }
    });
  };
  const updateAnswersToCorrect = () => {
    let currentAnswerTitles;
    const _fetchEditorContent2 = (0, _hooks2.fetchEditorContent)({
        format: 'text'
      }),
      {
        selectedFeedback,
        unselectedFeedback
      } = _fetchEditorContent2,
      editorContent = _objectWithoutProperties(_fetchEditorContent2, _excluded2);
    if (_problem.RichTextProblems.includes(problemType)) {
      currentAnswerTitles = editorContent.answers;
    }
    answers.forEach(answer => {
      const title = currentAnswerTitles ? currentAnswerTitles[answer.id] : answer.title;
      updateAnswer(_objectSpread(_objectSpread({}, answer), {}, {
        title,
        selectedFeedback,
        unselectedFeedback,
        correct: true
      }));
    });
  };
  const convertToPlainText = () => {
    const _fetchEditorContent3 = (0, _hooks2.fetchEditorContent)({
        format: 'text'
      }),
      {
        selectedFeedback,
        unselectedFeedback
      } = _fetchEditorContent3,
      editorContent = _objectWithoutProperties(_fetchEditorContent3, _excluded3);
    const currentAnswerTitles = editorContent.answers;
    answers.forEach(answer => {
      updateAnswer(_objectSpread(_objectSpread({}, answer), {}, {
        selectedFeedback,
        unselectedFeedback,
        title: currentAnswerTitles[answer.id]
      }));
    });
  };
  const onClick = () => {
    // Numeric, text, and dropdowns cannot render HTML as answer values, so if switching from a single select
    // or multi-select problem the rich text needs to covert to plain text
    if (typeKey === _problem.ProblemTypeKeys.TEXTINPUT && _problem.RichTextProblems.includes(problemType)) {
      convertToPlainText();
    }
    // Dropdown problems can only have one correct answer. When there is more than one correct answer
    // from a previous problem type, the correct attribute for selected answers need to be set to false.
    if (typeKey === _problem.ProblemTypeKeys.DROPDOWN) {
      if (correctAnswerCount > 1) {
        clearPreviouslySelectedAnswers();
      } else if (_problem.RichTextProblems.includes(problemType)) {
        convertToPlainText();
      }
    }
    // Numeric input problems can only have correct answers. Switch all answers to correct when switching
    // to numeric input.
    if (typeKey === _problem.ProblemTypeKeys.NUMERIC) {
      updateAnswersToCorrect();
    }
    if (blockTitle === _problem.ProblemTypes[problemType].title) {
      setBlockTitle(_problem.ProblemTypes[typeKey].title);
    }
    updateField({
      problemType: typeKey
    });
  };
  return {
    onClick
  };
};
exports.typeRowHooks = typeRowHooks;
const confirmSwitchToAdvancedEditor = _ref2 => {
  let {
    switchToAdvancedEditor,
    setConfirmOpen
  } = _ref2;
  switchToAdvancedEditor();
  setConfirmOpen(false);
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
exports.confirmSwitchToAdvancedEditor = confirmSwitchToAdvancedEditor;
//# sourceMappingURL=hooks.js.map