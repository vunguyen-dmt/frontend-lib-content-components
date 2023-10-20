"use strict";

var _utils = require("../../../utils");
var selectors = _interopRequireWildcard(require("./selectors"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // import * in order to mock in-file references
jest.mock('reselect', () => ({
  createSelector: jest.fn((preSelectors, cb) => ({
    preSelectors,
    cb
  }))
}));
const testState = {
  some: 'arbitraryValue'
};
const testValue = 'my VALUE';
describe('problem selectors unit tests', () => {
  const {
    problemState,
    simpleSelectors
  } = selectors;
  describe('problemState', () => {
    it('returns the problem data', () => {
      expect(problemState(_objectSpread(_objectSpread({}, testState), {}, {
        problem: testValue
      }))).toEqual(testValue);
    });
  });
  describe('simpleSelectors', () => {
    const testSimpleSelector = key => {
      test(`${key} simpleSelector returns its value from the problem store`, () => {
        const {
          preSelectors,
          cb
        } = simpleSelectors[key];
        expect(preSelectors).toEqual([problemState]);
        expect(cb(_objectSpread(_objectSpread({}, testState), {}, {
          [key]: testValue
        }))).toEqual(testValue);
      });
    };
    const simpleKeys = (0, _utils.keyStore)(simpleSelectors);
    describe('simple selectors link their values from problem store', () => {
      [simpleKeys.problemType, simpleKeys.answers, simpleKeys.correctAnswerCount, simpleKeys.settings, simpleKeys.question, simpleKeys.defaultSettings].map(testSimpleSelector);
    });
    test('simple selector completeState equals the entire state', () => {
      const {
        preSelectors,
        cb
      } = simpleSelectors[simpleKeys.completeState];
      expect(preSelectors).toEqual([problemState]);
      expect(cb(_objectSpread(_objectSpread({}, testState), {}, {
        [simpleKeys.completeState]: testValue
      }))).toEqual(_objectSpread(_objectSpread({}, testState), {}, {
        [simpleKeys.completeState]: testValue
      }));
    });
  });
});
//# sourceMappingURL=selectors.test.js.map