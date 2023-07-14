"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _fastXmlParser = require("fast-xml-parser");
var _problem = require("../../../data/constants/problem");
var _constants = require("../components/EditProblemView/SettingsWidget/settingsComponents/Tolerance/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ReactStateOLXParser {
  constructor(problemState) {
    const parserOptions = {
      ignoreAttributes: false,
      alwaysCreateTextNode: true,
      numberParseOptions: {
        leadingZeros: false,
        hex: false
      }
    };
    const questionParserOptions = {
      ignoreAttributes: false,
      alwaysCreateTextNode: true,
      numberParseOptions: {
        leadingZeros: false,
        hex: false
      },
      preserveOrder: true
    };
    const questionBuilderOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      suppressBooleanAttributes: false,
      format: true,
      numberParseOptions: {
        leadingZeros: false,
        hex: false
      },
      preserveOrder: true
    };
    const builderOptions = {
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      suppressBooleanAttributes: false,
      format: true,
      numberParseOptions: {
        leadingZeros: false,
        hex: false
      }
    };
    this.questionParser = new _fastXmlParser.XMLParser(questionParserOptions);
    this.parser = new _fastXmlParser.XMLParser(parserOptions);
    this.builder = new _fastXmlParser.XMLBuilder(builderOptions);
    this.questionBuilder = new _fastXmlParser.XMLBuilder(questionBuilderOptions);
    this.editorObject = problemState.editorObject;
    this.problemState = problemState.problem;
  }

  /** addHints()
   * The editorObject saved to the class constuctor is parsed for the attribute hints. No hints returns an empty object.
   * The hints are parsed and appended to the hintsArray as object representations of the hint. The hints array is saved
   * to the hint key in the demandHint object and returned.
   * @return {object} demandhint object with atrribut hint with array of objects
   */
  addHints() {
    const hintsArray = [];
    const {
      hints
    } = this.editorObject;
    if (hints.length < 1) {
      return {};
    }
    hints.forEach(hint => {
      if (hint.length > 0) {
        const parsedHint = this.parser.parse(hint);
        hintsArray.push(_objectSpread({}, parsedHint));
      }
    });
    const demandhint = {
      demandhint: {
        hint: hintsArray
      }
    };
    return demandhint;
  }

  /** addSolution()
   * The editorObject saved to the class constuctor is parsed for the attribute solution. If the soltuion is empty, it
   * returns an empty object. The solution is parsed and checked if paragraph key's value is a string or array. Studio
   * requires a div wrapper with a heading (Explanation). The heading is prepended to the parsed solution object. The
   * solution object is returned with the updated div wrapper.
   * @return {object} object representation of solution
   */
  addSolution() {
    const {
      solution
    } = this.editorObject;
    if (!solution || solution.length <= 0) {
      return {};
    }
    const solutionTitle = {
      '#text': 'Explanation'
    };
    const parsedSolution = this.parser.parse(solution);
    const paragraphs = parsedSolution.p;
    const withWrapper = _lodashEs.default.isArray(paragraphs) ? [solutionTitle, ...paragraphs] : [solutionTitle, paragraphs];
    const solutionObject = {
      solution: {
        div: {
          '@_class': 'detailed-solution',
          p: withWrapper
        }
      }
    };
    return solutionObject;
  }

  /** addMultiSelectAnswers(option)
   * addMultiSelectAnswers takes option. Option is used to assign an answers to the
   * correct OLX tag. This function is used for multiple choice, checkbox, and
   * dropdown problems. The editorObject saved to the class constuctor is parsed for
   * answers (titles only), selectFeedback, and unselectedFeedback. The problemState
   * saved to the class constructor is parsed for the problemType and answers (full
   * object). The answers are looped through to  pair feedback with its respective
   * OLX tags. While matching feedback tags, answers are also mapped to their
   * respective OLX tags. he object representation of the answers is returned with
   * the correct wrapping tags. For checkbox problems, compound hints are also returned.
   * @param {string} option - string of answer tag name
   * @return {object} object representation of answers
   */
  addMultiSelectAnswers(option) {
    const choice = [];
    let compoundhint = [];
    let widget = {};
    // eslint-disable-next-line prefer-const
    let {
      answers,
      problemType
    } = this.problemState;
    const answerTitles = this.editorObject?.answers;
    const {
      selectedFeedback,
      unselectedFeedback
    } = this.editorObject;
    /* todo */
    /*
      * the logic for general  feedback is ot current being used.
      * when component is updated will need to return to this code.
      * general feedback replaces selected feedback if all incorrect selected feedback is the same.
      * ******************************************
    if (generalFeedback !== ''
    && answers.every(
      answer => (
        answer.correct
          ? true
          : answer?.selectedFeedback === answers.find(a => a.correct === false).selectedFeedback
      ),
    )) {
      answers = answers.map(answer => (!answer?.correct
        ? { ...answer, selectedFeedback: generalFeedback }
        : answer));
    }
    */
    answers.forEach(answer => {
      const feedback = [];
      let singleAnswer = {};
      const title = answerTitles ? this.parser.parse(answerTitles[answer.id]) : {
        '#text': answer.title
      };
      const currentSelectedFeedback = selectedFeedback?.[answer.id] || null;
      const currentUnselectedFeedback = unselectedFeedback?.[answer.id] || null;
      let isEmpty;
      if (answerTitles) {
        isEmpty = Object.keys(title)?.length <= 0;
      } else {
        isEmpty = title['#text']?.length <= 0;
      }
      if (title && !isEmpty) {
        if (currentSelectedFeedback && problemType === _problem.ProblemTypeKeys.MULTISELECT) {
          const parsedSelectedFeedback = this.parser.parse(currentSelectedFeedback);
          feedback.push(_objectSpread(_objectSpread({}, parsedSelectedFeedback), {}, {
            '@_selected': true
          }));
        }
        if (currentSelectedFeedback && problemType !== _problem.ProblemTypeKeys.MULTISELECT) {
          const parsedSelectedFeedback = this.parser.parse(currentSelectedFeedback);
          feedback.push(_objectSpread({}, parsedSelectedFeedback));
        }
        if (currentUnselectedFeedback && problemType === _problem.ProblemTypeKeys.MULTISELECT) {
          const parsedUnselectedFeedback = this.parser.parse(currentUnselectedFeedback);
          feedback.push(_objectSpread(_objectSpread({}, parsedUnselectedFeedback), {}, {
            '@_selected': false
          }));
        }
        if (feedback.length) {
          singleAnswer[`${option}hint`] = feedback;
        }
        singleAnswer = _objectSpread(_objectSpread({
          '@_correct': answer.correct
        }, title), singleAnswer);
        choice.push(singleAnswer);
      }
    });
    widget = {
      [option]: choice
    };
    if (_lodashEs.default.has(this.problemState, 'groupFeedbackList') && problemType === _problem.ProblemTypeKeys.MULTISELECT) {
      compoundhint = this.addGroupFeedbackList();
      widget = _objectSpread(_objectSpread({}, widget), {}, {
        compoundhint
      });
    }
    return widget;
  }

  /** addGroupFeedbackList()
   * The problemState saved to the class constuctor is parsed for the attribute groupFeedbackList.
   * No group feedback returns an empty array. Each groupFeedback in the groupFeedback list is
   * mapped to a new object and appended to the compoundhint array.
   * @return {object} object representation of compoundhints
   */
  addGroupFeedbackList() {
    const compoundhint = [];
    const {
      groupFeedbackList
    } = this.problemState;
    groupFeedbackList.forEach(element => {
      compoundhint.push({
        '#text': element.feedback,
        '@_value': element.answers.join(' ')
      });
    });
    return compoundhint;
  }

  /** addQuestion()
   * The editorObject saved to the class constuctor is parsed for the attribute question. The question is parsed and
   * checked for label tags. After the question is fully updated, the questionObject is returned.
   * @return {object} object representaion of question
   */
  addQuestion() {
    const {
      question
    } = this.editorObject;
    const questionObject = this.questionParser.parse(question);
    /* Removes block tags like <p> or <h1> that surround the <label> format.
      Block tags are required by tinyMCE but have adverse effect on css in studio.
      */
    questionObject.forEach((tag, ind) => {
      const tagName = Object.keys(tag)[0];
      let label = null;
      tag[tagName].forEach(subTag => {
        const subTagName = Object.keys(subTag)[0];
        if (subTagName === 'label') {
          label = subTag;
        }
      });
      if (label) {
        questionObject[ind] = label;
      }
    });
    return questionObject;
  }

  /** buildMultiSelectProblem()
   * OLX builder for multiple choice, checkbox, and dropdown problems. The question
   * builder has a different format than the other parts (demand hint, answers, and
   * solution) of the problem so it has to be inserted into the OLX after the rest
   * of the problem is built.
   * @param {string} problemType - string of problem type tag
   * @param {string} widget - string of answer tag name
   * @param {string} option - string of feedback tag name
   * @return {string} string of OLX
   */
  buildMultiSelectProblem(problemType, widget, option) {
    const question = this.addQuestion();
    const widgetObject = this.addMultiSelectAnswers(option);
    const demandhint = this.addHints();
    const solution = this.addSolution();
    const problemObject = {
      problem: _objectSpread({
        [problemType]: _objectSpread({
          [widget]: widgetObject
        }, solution)
      }, demandhint)
    };
    const problem = this.builder.build(problemObject);
    const questionString = this.questionBuilder.build(question);
    let problemTypeTag;
    switch (problemType) {
      case _problem.ProblemTypeKeys.MULTISELECT:
        [problemTypeTag] = problem.match(/<choiceresponse>|<choiceresponse.[^>]+>/);
        break;
      case _problem.ProblemTypeKeys.DROPDOWN:
        [problemTypeTag] = problem.match(/<optionresponse>|<optionresponse.[^>]+>/);
        break;
      case _problem.ProblemTypeKeys.SINGLESELECT:
        [problemTypeTag] = problem.match(/<multiplechoiceresponse>|<multiplechoiceresponse.[^>]+>/);
        break;
      default:
        break;
    }
    const updatedString = `${problemTypeTag}\n${questionString}`;
    const problemString = problem.replace(problemTypeTag, updatedString);
    return problemString;
  }

  /** buildTextInput()
   * String response OLX builder. The question builder has a different format than the
   * other parts (demand hint, answers, and solution) of the problem so it has to be
   * inserted into the OLX after the rest of the problem is built.
   * @return {string} string of string response OLX
   */
  buildTextInput() {
    const question = this.addQuestion();
    const demandhint = this.addHints();
    const answerObject = this.buildTextInputAnswersFeedback();
    const solution = this.addSolution();
    const problemObject = {
      problem: _objectSpread({
        [_problem.ProblemTypeKeys.TEXTINPUT]: _objectSpread(_objectSpread({}, answerObject), solution)
      }, demandhint)
    };
    const problem = this.builder.build(problemObject);
    const questionString = this.questionBuilder.build(question);
    const [problemTypeTag] = problem.match(/<stringresponse>|<stringresponse.[^>]+>/);
    const updatedString = `${problemTypeTag}\n${questionString}`;
    const problemString = problem.replace(problemTypeTag, updatedString);
    return problemString;
  }

  /** buildTextInputAnswersFeedback()
   * The editorObject saved to the class constuctor is parsed for the attribute
   * selectedFeedback. String response problems have two types of feedback tags,
   * correcthint and stringequalhint. Correcthint is for feedback associated with
   * correct answers and stringequalhint is for feedback associated with wrong
   * answers. The answers are fetched from the problemState and looped through to
   * pair feedback with its respective OLX tags. While matching feedback tags,
   * answers are also mapped to their respective OLX tags. The first correct
   * answer is wrapped in stringreponse tag. All other correct answers are wrapped
   * in additonal_answer tags. Incorrect answers are wrapped in stringequalhint
   * tags. The object representation of the answers is returned with the correct
   * wrapping tags.
   * @return {object} object representation of answers
   */
  buildTextInputAnswersFeedback() {
    const {
      answers
    } = this.problemState;
    const {
      selectedFeedback
    } = this.editorObject;
    let answerObject = {};
    const additionAnswers = [];
    const wrongAnswers = [];
    let firstCorrectAnswerParsed = false;
    answers.forEach(answer => {
      const correcthint = this.getAnswerHints(selectedFeedback?.[answer.id]);
      if (this.hasAttributeWithValue(answer, 'title')) {
        if (answer.correct && firstCorrectAnswerParsed) {
          additionAnswers.push(_objectSpread({
            '@_answer': answer.title
          }, correcthint));
        } else if (answer.correct && !firstCorrectAnswerParsed) {
          firstCorrectAnswerParsed = true;
          answerObject = _objectSpread({
            '@_answer': answer.title
          }, correcthint);
        } else if (!answer.correct) {
          const wronghint = correcthint.correcthint;
          wrongAnswers.push(_objectSpread({
            '@_answer': answer.title
          }, wronghint));
        }
      }
    });
    answerObject = _objectSpread(_objectSpread({}, answerObject), {}, {
      additional_answer: additionAnswers,
      stringequalhint: wrongAnswers,
      '@_type': _lodashEs.default.get(this.problemState, 'additionalAttributes.type', 'ci'),
      textline: {
        '@_size': _lodashEs.default.get(this.problemState, 'additionalAttributes.textline.size', 20)
      }
    });
    return answerObject;
  }

  /** buildNumericInput()
   * Numeric response OLX builder. The question builder has a different format than the
   * other parts (demand hint, answers, and solution) of the problem so it has to be
   * inserted into the OLX after the rest of the problem is built.
   * @return {string} string of numeric response OLX
   */
  buildNumericInput() {
    const question = this.addQuestion();
    const demandhint = this.addHints();
    const answerObject = this.buildNumericalResponse();
    const solution = this.addSolution();
    const problemObject = {
      problem: _objectSpread({
        [_problem.ProblemTypeKeys.NUMERIC]: _objectSpread(_objectSpread({}, answerObject), solution)
      }, demandhint)
    };
    const problem = this.builder.build(problemObject);
    const questionString = this.questionBuilder.build(question);
    const [problemTypeTag] = problem.match(/<numericalresponse>|<numericalresponse.[^>]+>/);
    const updatedString = `${questionString}\n${problemTypeTag}`;
    const problemString = problem.replace(problemTypeTag, updatedString);
    return problemString;
  }

  /** buildNumericalResponse()
   * The editorObject saved to the class constuctor is parsed for the attribute
   * selectedFeedback. The tolerance is fetched from the problemState settings.
   * The answers are fetched from the problemState and looped through to
   * pair feedback with its respective OLX tags. While matching feedback tags,
   * answers are also mapped to their respective OLX tags. For each answer, if
   * it is an answer range, it is santized to be less than to great than. The
   * first answer is wrapped in numericresponse tag. All other answers are
   * wrapped in additonal_answer tags. The object representation of the answers
   * is returned with the correct  wrapping tags.
   * @return {object} object representation of answers
   */
  buildNumericalResponse() {
    const {
      answers
    } = this.problemState;
    const {
      tolerance
    } = this.problemState.settings;
    const {
      selectedFeedback
    } = this.editorObject;
    let answerObject = {};
    const additionalAnswers = [];
    let firstCorrectAnswerParsed = false;
    answers.forEach(answer => {
      const correcthint = this.getAnswerHints(selectedFeedback?.[answer.id]);
      if (this.hasAttributeWithValue(answer, 'title')) {
        let {
          title
        } = answer;
        if (title.startsWith('(') || title.startsWith('[')) {
          const parsedRange = title.split(',');
          const [rawLowerBound, rawUpperBound] = parsedRange;
          let lowerBoundInt;
          let lowerBoundFraction;
          let upperBoundInt;
          let upperBoundFraction;
          if (rawLowerBound.includes('/')) {
            lowerBoundFraction = rawLowerBound.replace(/[^0-9-/]/gm, '');
            const [numerator, denominator] = lowerBoundFraction.split('/');
            const lowerBoundFloat = Number(numerator) / Number(denominator);
            lowerBoundInt = lowerBoundFloat;
          } else {
            // these regex replaces remove everything that is not a decimal or positive/negative numer
            lowerBoundInt = Number(rawLowerBound.replace(/[^0-9-.]/gm, ''));
          }
          if (rawUpperBound.includes('/')) {
            upperBoundFraction = rawUpperBound.replace(/[^0-9-/]/gm, '');
            const [numerator, denominator] = upperBoundFraction.split('/');
            const upperBoundFloat = Number(numerator) / Number(denominator);
            upperBoundInt = upperBoundFloat;
          } else {
            // these regex replaces remove everything that is not a decimal or positive/negative numer
            upperBoundInt = Number(rawUpperBound.replace(/[^0-9-.]/gm, ''));
          }
          if (lowerBoundInt > upperBoundInt) {
            const lowerBoundChar = rawUpperBound[rawUpperBound.length - 1] === ']' ? '[' : '(';
            const upperBoundChar = rawLowerBound[0] === '[' ? ']' : ')';
            if (lowerBoundFraction) {
              lowerBoundInt = lowerBoundFraction;
            }
            if (upperBoundFraction) {
              upperBoundInt = upperBoundFraction;
            }
            title = `${lowerBoundChar}${upperBoundInt},${lowerBoundInt}${upperBoundChar}`;
          }
        }
        if (answer.correct && !firstCorrectAnswerParsed) {
          firstCorrectAnswerParsed = true;
          let responseParam = {};
          if (tolerance?.value) {
            responseParam = {
              responseparam: {
                '@_type': 'tolerance',
                '@_default': `${tolerance.value}${tolerance.type === _constants.ToleranceTypes.number.type ? '' : '%'}`
              }
            };
          }
          answerObject = _objectSpread(_objectSpread({
            '@_answer': title
          }, responseParam), correcthint);
        } else if (answer.correct && firstCorrectAnswerParsed) {
          additionalAnswers.push(_objectSpread({
            '@_answer': title
          }, correcthint));
        }
      }
    });
    answerObject = _objectSpread(_objectSpread({}, answerObject), {}, {
      additional_answer: additionalAnswers,
      formulaequationinput: {
        '#text': ''
      }
    });
    return answerObject;
  }

  /** getAnswerHints(feedback)
   * getAnswerHints takes feedback. The feedback is checked for definition. If feedback is
   * undefined or an empty string, it returns an empty object. The defined feedback is
   * parsed and saved to the key correcthint. Correcthint is the tag name for
   * numeric response and string response feedback.
   * @param {string} feedback - string of feedback
   * @return {object} object representaion of feedback
   */
  getAnswerHints(feedback) {
    let correcthint = {};
    if (feedback !== undefined && feedback !== '') {
      const parsedFeedback = this.parser.parse(feedback);
      correcthint = {
        correcthint: _objectSpread({}, parsedFeedback)
      };
    }
    return correcthint;
  }

  /** hasAttributeWithValue(obj, attr)
   * hasAttributeWithValue takes obj and atrr. The obj is checked for the attribute defined by attr.
   * Returns true if atrribute is present, otherwise false.
   * @param {object} obj - defined object
   * @param {string} attr - string of desired attribute
   * @return {bool}
   */
  hasAttributeWithValue(obj, attr) {
    return _lodashEs.default.has(obj, attr) && _lodashEs.default.get(obj, attr, '').toString().trim() !== '';
  }
  buildOLX() {
    const {
      problemType
    } = this.problemState;
    let problemString = '';
    switch (problemType) {
      case _problem.ProblemTypeKeys.MULTISELECT:
        problemString = this.buildMultiSelectProblem(_problem.ProblemTypeKeys.MULTISELECT, 'checkboxgroup', 'choice');
        break;
      case _problem.ProblemTypeKeys.DROPDOWN:
        problemString = this.buildMultiSelectProblem(_problem.ProblemTypeKeys.DROPDOWN, 'optioninput', 'option');
        break;
      case _problem.ProblemTypeKeys.SINGLESELECT:
        problemString = this.buildMultiSelectProblem(_problem.ProblemTypeKeys.SINGLESELECT, 'choicegroup', 'choice');
        break;
      case _problem.ProblemTypeKeys.TEXTINPUT:
        problemString = this.buildTextInput();
        break;
      case _problem.ProblemTypeKeys.NUMERIC:
        problemString = this.buildNumericInput();
        break;
      default:
        break;
    }
    return problemString;
  }
}
var _default = ReactStateOLXParser;
exports.default = _default;
//# sourceMappingURL=ReactStateOLXParser.js.map