"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripNonTextTags = exports.responseKeys = exports.nonQuestionKeys = exports.indexToLetterMap = exports.OLXParser = void 0;
var _fastXmlParser = require("fast-xml-parser");
var _lodashEs = _interopRequireDefault(require("lodash-es"));
var _problem = require("../../../data/constants/problem");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Parse OLX to JavaScript objects.
/* eslint no-eval: 0 */
const indexToLetterMap = exports.indexToLetterMap = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
const nonQuestionKeys = exports.nonQuestionKeys = ['@_answer', '@_type', 'additional_answer', 'checkboxgroup', 'choicegroup', 'choiceresponse', 'correcthint', 'demandhint', 'formulaequationinput', 'multiplechoiceresponse', 'numericalresponse', 'optioninput', 'optionresponse', 'responseparam', 'solution', 'stringequalhint', 'stringresponse', 'textline'];
const responseKeys = exports.responseKeys = ['multiplechoiceresponse', 'numericalresponse', 'optionresponse', 'stringresponse', 'choiceresponse', 'multiplechoiceresponse', 'truefalseresponse', 'optionresponse', 'numericalresponse', 'stringresponse', 'customresponse', 'symbolicresponse', 'coderesponse', 'externalresponse', 'formularesponse', 'schematicresponse', 'imageresponse', 'annotationresponse', 'choicetextresponse'];
const stripNonTextTags = _ref => {
  let {
    input,
    tag
  } = _ref;
  const stripedTags = {};
  Object.entries(input).forEach(_ref2 => {
    let [key, value] = _ref2;
    if (key !== tag) {
      stripedTags[key] = value;
    }
  });
  return stripedTags;
};
exports.stripNonTextTags = stripNonTextTags;
class OLXParser {
  constructor(olxString) {
    // There are two versions of the parsed XLM because the fields using tinymce require the order
    // of the parsed data and spacing values to be preserved. However, all the other widgets need
    // the data grouped by the wrapping tag. Examples of the parsed format can be found here:
    // https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
    const baseParserOptions = {
      ignoreAttributes: false,
      numberParseOptions: {
        leadingZeros: false,
        hex: false
      },
      processEntities: false
    };

    // Base Parser
    this.problem = {};
    const parserOptions = _objectSpread(_objectSpread({}, baseParserOptions), {}, {
      alwaysCreateTextNode: true
    });
    const builderOptions = _objectSpread({}, baseParserOptions);
    const parser = new _fastXmlParser.XMLParser(parserOptions);
    this.builder = new _fastXmlParser.XMLBuilder(builderOptions);
    this.parsedOLX = parser.parse(olxString);
    if (_lodashEs.default.has(this.parsedOLX, 'problem')) {
      this.problem = this.parsedOLX.problem;
    }

    // Parser with `preservedOrder: true` and `trimValues: false`
    this.richTextProblem = [];
    const richTextOptions = _objectSpread(_objectSpread({}, baseParserOptions), {}, {
      alwaysCreateTextNode: true,
      preserveOrder: true,
      trimValues: false
    });
    const richTextBuilderOptions = _objectSpread(_objectSpread({}, baseParserOptions), {}, {
      preserveOrder: true,
      trimValues: false
    });
    const richTextParser = new _fastXmlParser.XMLParser(richTextOptions);
    this.richTextBuilder = new _fastXmlParser.XMLBuilder(richTextBuilderOptions);
    this.richTextOLX = richTextParser.parse(olxString);
    if (_lodashEs.default.has(this.parsedOLX, 'problem')) {
      this.richTextProblem = this.richTextOLX[0].problem;
    }
  }

  /** getPreservedAnswersAndFeedback(problemType, widgetName, option)
   * getPreservedAnswersAndFeedback takes a problemType, widgetName, and a valid option. The
   * olx for the given problem type and widget is parsed. Do to the structure of xml that is
   * parsed with the prsereved attribute, the function has to loop through arrays of objects.
   * The first for-loop checks for feedback tags and answer choices and appended to the
   * preservedAnswers. The nested for loop checks for feedback and answer values inside the
   * option (answer) tags.
   * @param {string} problemType - string of the olx problem type
   * @param {string} widgetName - string of the wrapping tag name
   *                              (optioninput, choicegroup, checkboxgroup, additional_answer)
   * @param {string} option - string of the type of answers (choice, option, correcthint, stringequalhint)
   * @return {array} array containing answer objects and possibly an array of grouped feedback
   */
  getPreservedAnswersAndFeedback(problemType, widgetName, option) {
    const [problemBody] = this.richTextProblem.filter(section => Object.keys(section).includes(problemType));
    const isChoiceProblem = ![_problem.ProblemTypeKeys.NUMERIC, _problem.ProblemTypeKeys.TEXTINPUT].includes(problemType);
    const preservedAnswers = [];
    let correctAnswerFeedbackTag = option;
    let incorrectAnswerFeedbackTag;
    if (problemType === _problem.ProblemTypeKeys.TEXTINPUT) {
      [correctAnswerFeedbackTag, incorrectAnswerFeedbackTag] = option;
    }
    const problemBodyArr = problemBody[problemType];
    problemBodyArr.forEach(subtag => {
      const tagNames = Object.keys(subtag);
      if (!isChoiceProblem && tagNames.includes(correctAnswerFeedbackTag)) {
        preservedAnswers.unshift(subtag[correctAnswerFeedbackTag]);
      }
      if (problemType === _problem.ProblemTypeKeys.TEXTINPUT && tagNames.includes(incorrectAnswerFeedbackTag)) {
        preservedAnswers.push(subtag);
      }
      if (tagNames.includes(widgetName)) {
        const currentAnswerArr = subtag[widgetName];
        currentAnswerArr.forEach(answer => {
          if (Object.keys(answer).includes(correctAnswerFeedbackTag)) {
            preservedAnswers.push(answer[correctAnswerFeedbackTag]);
          }
        });
      }
    });
    return preservedAnswers;
  }

  /** parseMultipleChoiceAnswers(problemType, widgetName, option)
   * parseMultipleChoiceAnswers takes a problemType, widgetName, and a valid option. The
   * olx for the given problem type and widget is parsed. Depending on the problem
   * type, the title for an answer will be parsed differently because of single select and multiselect
   * problems are rich text while dropdown answers are plain text. The rich text is parsed into an object
   * and is converted back into a string before being added to the answer object. The parsing returns a
   * data object with an array of answer objects. If the olx has grouped feedback, this will also be
   * included in the data object.
   * @param {string} problemType - string of the olx problem type
   * @param {string} widgetName - string of the wrapping tag name (optioninput, choicegroup, checkboxgroup)
   * @param {string} option - string of the type of answers (choice or option)
   * @return {object} object containing an array of answer objects and possibly an array of grouped feedback
   */
  parseMultipleChoiceAnswers(problemType, widgetName, option) {
    const preservedAnswers = this.getPreservedAnswersAndFeedback(problemType, widgetName, option);
    const answers = [];
    let data = {};
    const widget = _lodashEs.default.get(this.problem, `${problemType}.${widgetName}`);
    const permissableTags = ['choice', '@_type', 'compoundhint', 'option', '#text'];
    if (_lodashEs.default.keys(widget).some(tag => !permissableTags.includes(tag))) {
      throw new Error('Misc Tags, reverting to Advanced Editor');
    }
    if (_lodashEs.default.get(this.problem, `${problemType}.@_partial_credit`)) {
      throw new Error('Partial credit not supported by GUI, reverting to Advanced Editor');
    }
    const choice = _lodashEs.default.get(widget, option);
    const isComplexAnswer = _problem.RichTextProblems.includes(problemType);
    if (_lodashEs.default.isEmpty(choice)) {
      answers.push({
        id: indexToLetterMap[answers.length],
        title: '',
        correct: true
      });
    } else if (_lodashEs.default.isArray(choice)) {
      choice.forEach((element, index) => {
        const preservedAnswer = preservedAnswers[index].filter(answer => !Object.keys(answer).includes(`${option}hint`));
        const preservedFeedback = preservedAnswers[index].filter(answer => Object.keys(answer).includes(`${option}hint`));
        let title = element['#text'];
        if (isComplexAnswer && preservedAnswer) {
          title = this.richTextBuilder.build(preservedAnswer);
        }
        const correct = eval(element['@_correct'].toLowerCase());
        const id = indexToLetterMap[index];
        const feedback = this.getAnswerFeedback(preservedFeedback, `${option}hint`);
        answers.push(_objectSpread({
          id,
          correct,
          title
        }, feedback));
      });
    } else {
      const preservedAnswer = preservedAnswers[0].filter(answer => !Object.keys(answer).includes(`${option}hint`));
      const preservedFeedback = preservedAnswers[0].filter(answer => Object.keys(answer).includes(`${option}hint`));
      let title = choice['#text'];
      if (isComplexAnswer && preservedAnswer) {
        title = this.richTextBuilder.build(preservedAnswer);
      }
      const feedback = this.getAnswerFeedback(preservedFeedback, `${option}hint`);
      answers.push(_objectSpread({
        correct: eval(choice['@_correct'].toLowerCase()),
        id: indexToLetterMap[answers.length],
        title
      }, feedback));
    }
    data = {
      answers
    };
    const groupFeedbackList = this.getGroupedFeedback(widget);
    if (groupFeedbackList.length) {
      data = _objectSpread(_objectSpread({}, data), {}, {
        groupFeedbackList
      });
    }
    return data;
  }

  /** getAnswerFeedback(preservedFeedback, hintKey)
   * getAnswerFeedback takes preservedFeedback and a valid option. The preservedFeedback object
   * is checked for selected and unselected feedback. The respective values are added to the
   * feedback object. The feedback object is returned.
   * @param {array} preservedFeedback - array of feedback objects
   * @param {string} hintKey - string of the wrapping tag name (optionhint or choicehint)
   * @return {object} object containing selected and unselected feedback
   */
  getAnswerFeedback(preservedFeedback, hintKey) {
    const feedback = {};
    let feedbackKeys = 'selectedFeedback';
    if (_lodashEs.default.isEmpty(preservedFeedback)) {
      return feedback;
    }
    preservedFeedback.forEach(feedbackArr => {
      if (_lodashEs.default.has(feedbackArr, hintKey)) {
        if (_lodashEs.default.has(feedbackArr, ':@') && _lodashEs.default.has(feedbackArr[':@'], '@_selected')) {
          const isSelectedFeedback = feedbackArr[':@']['@_selected'] === 'true';
          feedbackKeys = isSelectedFeedback ? 'selectedFeedback' : 'unselectedFeedback';
        }
        feedback[feedbackKeys] = this.richTextBuilder.build(feedbackArr[hintKey]);
      }
    });
    return feedback;
  }

  /** getGroupedFeedback(choices)
   * getGroupedFeedback takes choices. The choices with the attribute compoundhint are parsed for
   * the text value and the answers associated with the feedback. The groupFeedback array is returned.
   * @param {object} choices - object of problem's subtags
   * @return {array} array containing objects of feedback and associated answer ids
   */
  getGroupedFeedback(choices) {
    const groupFeedback = [];
    if (_lodashEs.default.has(choices, 'compoundhint')) {
      const groupFeedbackArray = choices.compoundhint;
      if (_lodashEs.default.isArray(groupFeedbackArray)) {
        groupFeedbackArray.forEach(element => {
          const parsedFeedback = stripNonTextTags({
            input: element,
            tag: '@_value'
          });
          groupFeedback.push({
            id: groupFeedback.length,
            answers: element['@_value'].split(' '),
            feedback: this.builder.build(parsedFeedback)
          });
        });
      } else {
        const parsedFeedback = stripNonTextTags({
          input: groupFeedbackArray,
          tag: '@_value'
        });
        groupFeedback.push({
          id: groupFeedback.length,
          answers: groupFeedbackArray['@_value'].split(' '),
          feedback: this.builder.build(parsedFeedback)
        });
      }
    }
    return groupFeedback;
  }

  /** parseStringResponse()
   * The OLX saved to the class constuctor is parsed for text input answers. There are two
   * types of tags with the answer attribute, stringresponse (the problem wrapper) and
   * additional_answer. Looping through each tag, the associated title and feedback are added
   * to the answers object and appended to the answers array. The array returned in an object
   * with the key "answers". The object also conatins additional attributes that belong to the
   * string response tag.
   * @return {object} object containing an array of answer objects and object of additionalStringAttributes
   */
  parseStringResponse() {
    const [firstCorrectFeedback, ...preservedFeedback] = this.getPreservedAnswersAndFeedback(_problem.ProblemTypeKeys.TEXTINPUT, 'additional_answer', ['correcthint', 'stringequalhint']);
    const {
      stringresponse
    } = this.problem;
    const answers = [];
    let answerFeedback = '';
    let additionalStringAttributes = {};
    let data = {};
    const firstFeedback = this.getFeedback(firstCorrectFeedback);
    answers.push({
      id: indexToLetterMap[answers.length],
      title: stringresponse['@_answer'],
      correct: true,
      selectedFeedback: firstFeedback
    });
    const additionalAnswerFeedback = preservedFeedback.filter(feedback => _lodashEs.default.isArray(feedback));
    const stringEqualHintFeedback = preservedFeedback.filter(feedback => !_lodashEs.default.isArray(feedback));

    // Parsing additional_answer for string response.
    const additionalAnswer = _lodashEs.default.get(stringresponse, 'additional_answer', []);
    if (_lodashEs.default.isArray(additionalAnswer)) {
      additionalAnswer.forEach((newAnswer, indx) => {
        answerFeedback = this.getFeedback(additionalAnswerFeedback[indx]);
        answers.push({
          id: indexToLetterMap[answers.length],
          title: newAnswer['@_answer'],
          correct: true,
          selectedFeedback: answerFeedback
        });
      });
    } else {
      answerFeedback = this.getFeedback(additionalAnswerFeedback[0]);
      answers.push({
        id: indexToLetterMap[answers.length],
        title: additionalAnswer['@_answer'],
        correct: true,
        selectedFeedback: answerFeedback
      });
    }

    // Parsing stringequalhint for string response.
    const stringEqualHint = _lodashEs.default.get(stringresponse, 'stringequalhint', []);
    if (_lodashEs.default.isArray(stringEqualHint)) {
      stringEqualHint.forEach((newAnswer, indx) => {
        answerFeedback = this.richTextBuilder.build(stringEqualHintFeedback[indx].stringequalhint);
        answers.push({
          id: indexToLetterMap[answers.length],
          title: newAnswer['@_answer'],
          correct: false,
          selectedFeedback: answerFeedback
        });
      });
    } else {
      answerFeedback = this.richTextBuilder.build(stringEqualHintFeedback[0].stringequalhint);
      answers.push({
        id: indexToLetterMap[answers.length],
        title: stringEqualHint['@_answer'],
        correct: false,
        selectedFeedback: answerFeedback
      });
    }

    // TODO: Support multiple types.
    additionalStringAttributes = {
      type: _lodashEs.default.get(stringresponse, '@_type'),
      textline: {
        size: _lodashEs.default.get(stringresponse, 'textline.@_size')
      }
    };
    data = {
      answers,
      additionalStringAttributes
    };
    return data;
  }

  /** parseNumericResponse()
   * The OLX saved to the class constuctor is parsed for numeric answers. There are two
   * types of tags for numeric answers, responseparam and additional_answer. Looping through
   * each tag, the associated title and feedback and if the answer is an answer range are
   * added to the answers object and appended to the answers array. The array returned in
   * an object with the key "answers".
   * @return {object} object containing an array of answer objects
   */
  parseNumericResponse() {
    const [firstCorrectFeedback, ...preservedFeedback] = this.getPreservedAnswersAndFeedback(_problem.ProblemTypeKeys.NUMERIC, 'additional_answer', 'correcthint');
    const {
      numericalresponse
    } = this.problem;
    if (_lodashEs.default.get(numericalresponse, '@_partial_credit')) {
      throw new Error('Partial credit not supported by GUI, reverting to Advanced Editor');
    }
    let answerFeedback = '';
    const answers = [];
    let responseParam = {};
    const feedback = this.getFeedback(firstCorrectFeedback);
    if (_lodashEs.default.has(numericalresponse, 'responseparam')) {
      const type = _lodashEs.default.get(numericalresponse, 'responseparam.@_type');
      const defaultValue = _lodashEs.default.get(numericalresponse, 'responseparam.@_default');
      responseParam = {
        [type]: defaultValue
      };
    }
    const isAnswerRange = /[([]\d*,\d*[)\]]/gm.test(numericalresponse['@_answer']);
    answers.push(_objectSpread({
      id: indexToLetterMap[answers.length],
      title: numericalresponse['@_answer'],
      correct: true,
      selectedFeedback: feedback,
      isAnswerRange
    }, responseParam));

    // Parsing additional_answer for numerical response.
    const additionalAnswer = _lodashEs.default.get(numericalresponse, 'additional_answer', []);
    if (_lodashEs.default.isArray(additionalAnswer)) {
      additionalAnswer.forEach((newAnswer, indx) => {
        answerFeedback = this.getFeedback(preservedFeedback[indx]);
        answers.push({
          id: indexToLetterMap[answers.length],
          title: newAnswer['@_answer'],
          correct: true,
          selectedFeedback: answerFeedback
        });
      });
    } else {
      answerFeedback = this.getFeedback(preservedFeedback[0]);
      answers.push({
        id: indexToLetterMap[answers.length],
        title: additionalAnswer['@_answer'],
        correct: true,
        selectedFeedback: answerFeedback,
        isAnswerRange: false
      });
    }
    return {
      answers
    };
  }

  /** parseQuestions(problemType)
   * parseQuestions takes a problemType. The problem type is used to determine where the
   * text for the question lies (sibling or child to warpping problem type tags).
   * Using the XMLBuilder, the question is built with its proper children (including label
   * and description). The string version of the OLX is return, replacing the description
   * tags with italicized tags for styling purposes.
   * @param {string} problemType - string of the olx problem type
   * @return {string} string of OLX
   */
  parseQuestions(problemType) {
    const problemArray = _lodashEs.default.get(this.richTextProblem[0], problemType) || this.richTextProblem;
    const questionArray = [];
    problemArray.forEach(tag => {
      const tagName = Object.keys(tag)[0];
      if (!nonQuestionKeys.includes(tagName)) {
        if (tagName === 'script') {
          throw new Error('Script Tag, reverting to Advanced Editor');
        }
        questionArray.push(tag);
      } else if (responseKeys.includes(tagName)) {
        /* Tags that are not used for other parts of the question such as <solution> or <choicegroup>
         should be included in the question. These include but are not limited to tags like <label>,
         <description> and <table> as they often are both valid olx as siblings or children of response
         type tags. */
        tag[tagName].forEach(subTag => {
          const subTagName = Object.keys(subTag)[0];
          if (!nonQuestionKeys.includes(subTagName)) {
            questionArray.push(subTag);
          }
        });
      }
    });
    const questionString = this.richTextBuilder.build(questionArray);
    const res = this.replaceOlxDescriptionTag(questionString);
    return res;
  }

  /** hasOLXAfterProblemTypeTag(problemType)
   * checkTextAfterProblemTypeTag takes a problemType. The problem type is used to determine
   * if there is olx after the answer choices the problem. Simple problems are not expected
   * to have olx after the answer choices and returns false. In the event that a problem has
   * olx after the answer choices it returns true and will raise an error.
   * @param {string} problemType - string of the olx problem type
   * @return {bool}
   */
  hasOLXAfterProblemTypeTag(problemType) {
    let problemTagIndex = this.richTextProblem.length - 1;
    let hasExtraOLX = false;
    Object.entries(this.richTextProblem).forEach(_ref3 => {
      let [i, value] = _ref3;
      if (Object.keys(value).includes(problemType)) {
        problemTagIndex = i;
      }
    });
    if (problemTagIndex < this.richTextProblem.length - 1) {
      const olxAfterProblemType = this.richTextProblem.slice(problemTagIndex + 1);
      Object.values(olxAfterProblemType).forEach(value => {
        const currentKey = Object.keys(value)[0];
        const invalidText = currentKey === '#text' && value[currentKey] !== '\n';
        const invalidKey = !nonQuestionKeys.includes(currentKey) && currentKey !== '#text';
        if (invalidText) {
          hasExtraOLX = true;
        } else if (invalidKey) {
          hasExtraOLX = true;
        }
      });
    }
    return hasExtraOLX;
  }
  replaceOlxDescriptionTag(questionString) {
    return questionString.replace(/<description>/gm, '<em class="olx_description">').replace(/<\/description>/gm, '</em>');
  }

  /** getHints()
   * The OLX saved to the class constuctor is parsed for demand hint tags with hint subtags. An empty array is returned
   * if there are no hints in the OLX. Otherwise the hint tag is parsed and appended to the hintsObject arrary. After
   * going through all the hints the hintsObject array is returned.
   * @return {array} array of hint objects
   */
  getHints() {
    const hintsObject = [];
    if (_lodashEs.default.has(this.problem, 'demandhint.hint')) {
      const preservedProblem = this.richTextProblem;
      preservedProblem.forEach(obj => {
        const objKeys = Object.keys(obj);
        if (objKeys.includes('demandhint')) {
          const currentDemandHint = obj.demandhint;
          currentDemandHint.forEach(hint => {
            if (Object.keys(hint).includes('hint')) {
              const hintValue = this.richTextBuilder.build(hint.hint);
              hintsObject.push({
                id: hintsObject.length,
                value: hintValue
              });
            }
          });
        }
      });
    }
    return hintsObject;
  }

  /** getSolutionExplanation(problemType)
   * getSolutionExplanation takes a problemType. The problem type is used to determine where the
   * text for the solution lies (sibling or child to warpping problem type tags).
   * Using the XMLBuilder, the solution is built removing the redundant "explanation" that is
   * appended for Studio styling purposes. The string version of the OLX is return.
   * @param {string} problemType - string of the olx problem type
   * @return {string} string of OLX
   */
  getSolutionExplanation(problemType) {
    if (!_lodashEs.default.has(this.problem, `${problemType}.solution`) && !_lodashEs.default.has(this.problem, 'solution')) {
      return null;
    }
    const [problemBody] = this.richTextProblem.filter(section => Object.keys(section).includes(problemType));
    const [solutionBody] = problemBody[problemType].filter(section => Object.keys(section).includes('solution'));
    const [divBody] = solutionBody.solution.filter(section => Object.keys(section).includes('div'));
    const solutionArray = [];
    if (divBody && divBody.div) {
      divBody.div.forEach(tag => {
        const tagText = _lodashEs.default.get(Object.values(tag)[0][0], '#text', '');
        if (tagText.toString().trim() !== 'Explanation') {
          solutionArray.push(tag);
        }
      });
    } else {
      solutionBody.solution.forEach(tag => {
        const tagText = _lodashEs.default.get(Object.values(tag)[0][0], '#text', '');
        if (tagText.toString().trim() !== 'Explanation') {
          solutionArray.push(tag);
        }
      });
    }
    const solutionString = this.richTextBuilder.build(solutionArray);
    return solutionString;
  }

  /** getFeedback(xmlElement)
   * getFeedback takes xmlElement. The xmlElement is searched for the attribute correcthint.
   * An empty string is returned if the parameter is not present. Otherwise a string of the feedback
   * is returned.
   * @param {object} xmlElement - object of answer attributes
   * @return {string} string of feedback
   */
  getFeedback(xmlElement) {
    if (_lodashEs.default.isEmpty(xmlElement)) {
      return '';
    }
    const feedbackString = this.richTextBuilder.build(xmlElement);
    return feedbackString;
  }

  /** getProblemType()
   * The OLX saved to the class constuctor is parsed for a valid problem type (referencing problemKeys).
   * For blank problems, it returns null. For OLX problems tags not defined in problemKeys or OLX with
   * multiple problem tags, it returns advanced. For defined, single problem tag, it returns the
   * associated problem type.
   * @return {string} problem type
   */
  getProblemType() {
    const problemKeys = Object.keys(this.problem);
    const problemTypeKeys = problemKeys.filter(key => Object.values(_problem.ProblemTypeKeys).indexOf(key) !== -1);
    if (problemTypeKeys.length === 0) {
      // a blank problem is a problem which contains only `<problem></problem>` as it's olx.
      // blank problems are not given types, so that a type may be selected.
      if (problemKeys.length === 1 && problemKeys[0] === '#text' && this.problem[problemKeys[0]] === '') {
        return null;
      }
      // if we have no matching problem type, the problem is advanced.
      return _problem.ProblemTypeKeys.ADVANCED;
    }
    // make sure compound problems are treated as advanced
    if (problemTypeKeys.length > 1 || _lodashEs.default.isArray(this.problem[problemTypeKeys[0]]) && this.problem[problemTypeKeys[0]].length > 1) {
      return _problem.ProblemTypeKeys.ADVANCED;
    }
    const problemType = problemTypeKeys[0];
    return problemType;
  }

  /** getGeneralFeedback({ answers, problemType })
   * getGeneralFeedback takes answers and problemType. The problem type determines if the problem should be checked
   * for general feedback. The incorrect answers are checked to seee if all of their feedback is the same and
   * returns the first incorrect answer's feedback if true. When conditions are unmet, it returns and empty string.
   * @param {array} answers - array of answer objects
   * @param {string} problemType - string of string of the olx problem type
   * @return {string} text for incorrect feedback
   */
  getGeneralFeedback(_ref4) {
    let {
      answers,
      problemType
    } = _ref4;
    /* Feedback is Generalized for a Problem IFF:
    1. The problem is of Types: Single Select or Dropdown.
    2. All the problem's incorrect, if Selected answers are equivalent strings, and there is no other feedback.
    */
    if (problemType === _problem.ProblemTypeKeys.SINGLESELECT || problemType === _problem.ProblemTypeKeys.DROPDOWN) {
      const firstIncorrectAnswerText = answers.find(answer => answer.correct === false)?.selectedFeedback;
      const isAllIncorrectSelectedFeedbackTheSame = answers.every(answer => answer.correct ? true : answer?.selectedFeedback === firstIncorrectAnswerText);
      if (isAllIncorrectSelectedFeedbackTheSame) {
        return firstIncorrectAnswerText;
      }
    }
    return '';
  }
  getParsedOLXData() {
    if (_lodashEs.default.isEmpty(this.problem)) {
      return {};
    }
    if (Object.keys(this.problem).some(key => key.indexOf('@_') !== -1 && !_problem.settingsOlxAttributes.includes(key))) {
      throw new Error('Misc Attributes asscoiated with problem, opening in advanced editor');
    }
    const problemType = this.getProblemType();
    if (this.hasOLXAfterProblemTypeTag(problemType)) {
      throw new Error(`OLX was found after the ${problemType} tags, opening in advanced editor`);
    }
    let answersObject = {};
    let additionalAttributes = {};
    let groupFeedbackList = [];
    const hints = this.getHints();
    const question = this.parseQuestions(problemType);
    const solutionExplanation = this.getSolutionExplanation(problemType);
    switch (problemType) {
      case _problem.ProblemTypeKeys.DROPDOWN:
        answersObject = this.parseMultipleChoiceAnswers(_problem.ProblemTypeKeys.DROPDOWN, 'optioninput', 'option');
        break;
      case _problem.ProblemTypeKeys.TEXTINPUT:
        answersObject = this.parseStringResponse();
        break;
      case _problem.ProblemTypeKeys.NUMERIC:
        answersObject = this.parseNumericResponse();
        break;
      case _problem.ProblemTypeKeys.MULTISELECT:
        answersObject = this.parseMultipleChoiceAnswers(_problem.ProblemTypeKeys.MULTISELECT, 'checkboxgroup', 'choice');
        break;
      case _problem.ProblemTypeKeys.SINGLESELECT:
        answersObject = this.parseMultipleChoiceAnswers(_problem.ProblemTypeKeys.SINGLESELECT, 'choicegroup', 'choice');
        break;
      case _problem.ProblemTypeKeys.ADVANCED:
        return {
          problemType,
          settings: {}
        };
      default:
        // if problem is unset, return null
        return {};
    }
    const generalFeedback = this.getGeneralFeedback({
      answers: answersObject.answers,
      problemType
    });
    if (_lodashEs.default.has(answersObject, 'additionalStringAttributes')) {
      additionalAttributes = _objectSpread({}, answersObject.additionalStringAttributes);
    }
    if (_lodashEs.default.has(answersObject, 'groupFeedbackList')) {
      groupFeedbackList = answersObject.groupFeedbackList;
    }
    const {
      answers
    } = answersObject;
    const settings = {
      hints
    };
    if (_problem.ProblemTypeKeys.NUMERIC === problemType && _lodashEs.default.has(answers[0], 'tolerance')) {
      const toleranceValue = answers[0].tolerance;
      if (!toleranceValue || toleranceValue.length === 0) {
        settings.tolerance = {
          value: null,
          type: 'None'
        };
      } else if (toleranceValue.includes('%')) {
        settings.tolerance = {
          value: parseInt(toleranceValue.slice(0, -1)),
          type: 'Percent'
        };
      } else {
        settings.tolerance = {
          value: parseInt(toleranceValue),
          type: 'Number'
        };
      }
    } else {
      settings.tolerance = {
        value: null,
        type: 'None'
      };
    }
    if (solutionExplanation) {
      settings.solutionExplanation = solutionExplanation;
    }
    return {
      question,
      settings,
      answers,
      problemType,
      additionalAttributes,
      generalFeedback,
      groupFeedbackList
    };
  }
}
exports.OLXParser = OLXParser;
//# sourceMappingURL=OLXParser.js.map