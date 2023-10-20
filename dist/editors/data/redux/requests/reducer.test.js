"use strict";

var _reducer = require("./reducer");
var _requests = require("../../constants/requests");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
describe('requests reducer', () => {
  test('intial state generated on create', () => {
    expect((0, _reducer.reducer)(undefined, {})).toEqual(_reducer.initialState);
  });
  describe('handling actions', () => {
    const arbitraryKey = 'ArbItrAryKey';
    const requestsList = [_requests.RequestKeys.fetchUnit, _requests.RequestKeys.fetchBlock, _requests.RequestKeys.saveBlock, arbitraryKey];
    requestsList.forEach(requestKey => {
      describe(`${requestKey} lifecycle`, () => {
        const testAction = (action, args, expected) => {
          const testingState = _objectSpread(_objectSpread({}, _reducer.initialState), {}, {
            arbitraryField: 'arbitrary',
            [requestKey]: {
              arbitrary: 'state'
            }
          });
          expect((0, _reducer.reducer)(testingState, _reducer.actions[action](args))).toEqual(_objectSpread(_objectSpread({}, testingState), {}, {
            [requestKey]: expected
          }));
        };
        test('startRequest sets pending status', () => {
          testAction('startRequest', requestKey, {
            status: _requests.RequestStates.pending
          });
        });
        test('completeRequest sets completed status and loads response', () => {
          testAction('completeRequest', {
            requestKey
          }, {
            status: _requests.RequestStates.completed
          });
        });
        test('failRequest sets failed state and loads error', () => {
          testAction('failRequest', {
            requestKey
          }, {
            status: _requests.RequestStates.failed
          });
        });
        test('clearRequest clears request state', () => {
          testAction('clearRequest', {
            requestKey
          }, {});
        });
      });
    });
  });
});
//# sourceMappingURL=reducer.test.js.map