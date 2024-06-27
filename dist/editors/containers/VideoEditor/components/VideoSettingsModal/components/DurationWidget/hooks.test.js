"use strict";

var _react = _interopRequireDefault(require("react"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("../messages"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
jest.mock('react', () => {
  const updateState = jest.fn();
  return _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
    updateState,
    useState: jest.fn(val => [{
      state: val
    }, newVal => updateState({
      val,
      newVal
    })]),
    useCallback: (cb, prereqs) => ({
      useCallback: {
        cb,
        prereqs
      }
    }),
    useEffect: jest.fn()
  });
});
let testMethod;
const intl = {
  formatMessage: jest.fn(val => val)
};
const [h, m, s] = [3600000, 60000, 1000];
const durationPairs = [[0, '00:00:00'], [5000, '00:00:05'], [60000, '00:01:00'], [3600000, '01:00:00'], [3665000, '01:01:05']];
const trickyDurations = [['10:00', 600000], ['23', 23000], ['99:99:99', 99 * (m + s + h)], ['23:42:81', 23 * h + 42 * m + 81 * s]];
let props;
const e = {
  target: {
    value: 'vAlUE'
  }
};
describe('Video Settings DurationWidget hooks', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('durationWidget', () => {
    const duration = {
      startTime: '00:00:00',
      stopTime: '00:00:10'
    };
    const updateField = jest.fn();
    beforeEach(() => {
      testMethod = hooks.durationWidget({
        duration,
        updateField
      });
    });
    describe('behavior', () => {
      describe('initialization', () => {
        test('useEffect memoized on duration', () => {
          hooks.durationWidget({
            duration,
            updateField
          });
          expect(_react.default.useEffect).toHaveBeenCalled();
          expect(_react.default.useEffect.mock.calls[0][1]).toEqual([duration]);
        });
        test('calls setUnsavedDuration with durationString(duration)', () => {
          hooks.durationWidget({
            duration,
            updateField
          });
          _react.default.useEffect.mock.calls[0][0]();
          expect(_react.default.updateState).toHaveBeenCalled();
        });
      });
    });
    describe('returns', () => {
      testMethod = hooks.durationWidget({
        duration,
        updateField
      });
      afterEach(() => {
        jest.restoreAllMocks();
      });
      describe('unsavedDuration, defaulted to duration', () => {
        expect(testMethod.unsavedDuration).toEqual({
          state: hooks.durationString(duration)
        });
      });
      describe('onBlur, calls updateDuration', () => {
        jest.spyOn(hooks, 'updateDuration').mockImplementation(jest.fn());
        testMethod.onBlur('IndEX')(e);
        expect(hooks.updateDuration).toHaveBeenCalled();
      });
      describe('onChange', () => {
        testMethod.onChange('IndEX')(e);
        expect(_react.default.updateState).toHaveBeenCalled();
      });
      describe('onKeyDown', () => {
        testMethod.onKeyDown('iNDex')(e);
        expect(_react.default.updateState).toHaveBeenCalled();
      });
      describe('getTotalLabel', () => {
        describe('returns fullVideoLength message when no startTime and no stop Time are set', () => {
          expect(testMethod.getTotalLabel({
            durationString: {},
            subtitle: true,
            intl
          })).toEqual(_messages.default.fullVideoLength);
        });
        describe('returns startAt message for subtitle when only startTime is set', () => {
          expect(testMethod.getTotalLabel({
            durationString: {
              startTime: '00:00:00'
            },
            subtitle: true,
            intl
          })).toEqual(_messages.default.startsAt);
        });
        describe('returns null for widget (not subtitle) when there only startTime is set', () => {
          expect(testMethod.getTotalLabel({
            durationString: {
              startTime: '00:00:00'
            },
            subtitle: false,
            intl
          })).toEqual(null);
        });
        describe('returns total message when at least stopTime is set', () => {
          expect(testMethod.getTotalLabel({
            durationString: {
              startTime: '00:00:00',
              stopTime: '00:00:10'
            },
            subtitle: false,
            intl
          })).toEqual(_messages.default.total);
        });
        describe('returns custom message when at least stopTime is set and subtitle is true', () => {
          expect(testMethod.getTotalLabel({
            durationString: {
              startTime: '00:00:00',
              stopTime: '00:00:10'
            },
            subtitle: true,
            intl
          })).toEqual(_messages.default.custom);
        });
      });
    });
  });
  describe('durationString', () => {
    beforeEach(() => {
      testMethod = hooks.durationString;
    });
    it('returns an object that maps durationStringFromValue to the passed duration keys', () => {
      const testDuration = {
        startTime: 1000,
        stopTime: 2000,
        other: 'values'
      };
      expect(testMethod(testDuration)).toEqual({
        startTime: '00:00:01',
        stopTime: '00:00:02'
      });
    });
  });
  describe('durationStringFromValue', () => {
    beforeEach(() => {
      testMethod = hooks.durationStringFromValue;
    });
    it('returns 00:00:00 if given a bad value', () => {
      const badChecks = ['a', '', null, -1];
      badChecks.forEach(val => expect(testMethod(val)).toEqual('00:00:00'));
    });
    it('translates milliseconds into hh:mm:ss format', () => {
      durationPairs.forEach(_ref => {
        let [val, dur] = _ref;
        return expect(testMethod(val)).toEqual(dur);
      });
    });
  });
  describe('updateDuration', () => {
    const testValidIndex = 'startTime';
    const testStopIndex = 'stopTime';
    const testValidDuration = '00:00:00';
    const testValidValue = 0;
    const testInvalidDuration = 'abc';
    beforeEach(() => {
      testMethod = hooks.updateDuration;
      props = {
        duration: {
          startTime: 23000,
          stopTime: 600000
        },
        unsavedDuration: {
          startTime: '00:00:23',
          stopTime: '00:10:00'
        },
        setDuration: jest.fn(),
        setUnsavedDuration: jest.fn(),
        index: 'startTime',
        inputString: '01:23:45'
      };
    });
    describe('if the passed durationString is valid', () => {
      it('sets the unsavedDuration to updated strings and duration to new timestamp value', () => {
        testMethod(_objectSpread(_objectSpread({}, props), {}, {
          index: testValidIndex,
          inputString: testValidDuration
        }));
        expect(props.setUnsavedDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.unsavedDuration), {}, {
          [testValidIndex]: testValidDuration
        }));
        expect(props.setDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.duration), {}, {
          [testValidIndex]: testValidValue
        }));
      });
    });
    describe('if the passed durationString is not valid', () => {
      it('updates unsavedDuration values to 0 (the default)', () => {
        testMethod(_objectSpread(_objectSpread({}, props), {}, {
          index: testValidIndex,
          inputString: testInvalidDuration
        }));
        expect(props.setUnsavedDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.unsavedDuration), {}, {
          [testValidIndex]: testValidDuration
        }));
        expect(props.setDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.duration), {}, {
          [testValidIndex]: testValidValue
        }));
      });
    });
    describe('if the passed startTime is after (or equal to) the stored non-zero stopTime', () => {
      it('updates unsavedDuration startTime values to 1 second before stopTime', () => {
        testMethod(_objectSpread(_objectSpread({}, props), {}, {
          index: testValidIndex,
          inputString: '00:10:00'
        }));
        expect(props.setUnsavedDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.unsavedDuration), {}, {
          [testValidIndex]: '00:09:59'
        }));
        expect(props.setDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.duration), {}, {
          [testValidIndex]: 599000
        }));
      });
    });
    describe('if the passed stopTime is before (or equal to) the stored startTime', () => {
      it('updates unsavedDuration stopTime values to 1 second after startTime', () => {
        testMethod(_objectSpread(_objectSpread({}, props), {}, {
          index: testStopIndex,
          inputString: '00:00:22'
        }));
        expect(props.setUnsavedDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.unsavedDuration), {}, {
          [testStopIndex]: '00:00:24'
        }));
        expect(props.setDuration).toHaveBeenCalledWith(_objectSpread(_objectSpread({}, props.duration), {}, {
          [testStopIndex]: 24000
        }));
      });
    });
  });
  describe('onDurationChange', () => {
    beforeEach(() => {
      props = {
        duration: {
          startTime: '00:00:00'
        },
        index: 'startTime',
        val: 'vAl'
      };
      testMethod = hooks.onDurationChange;
    });
    it('returns duration with no change if duration[index] does not match HH:MM:SS format', () => {
      const badChecks = ['ab:cd:ef',
      // non-digit characters
      '12:34:567' // characters past max length
      ];
      badChecks.forEach(val => expect(testMethod(props.duration, props.index, val)).toEqual(props.duration));
    });
    it('returns duration with an added \':\' after 2 characters when caret is at end', () => {
      props.duration = {
        startTime: '0'
      };
      props.val = '00';
      document.activeElement.selectionStart = props.duration[props.index].length + 1;
      expect(testMethod(props.duration, props.index, props.val)).toEqual({
        startTime: '00:'
      });
    });
    it('returns duration with an added \':\' after 5 characters when caret is at end', () => {
      props.duration = {
        startTime: '00:0'
      };
      props.val = '00:00';
      document.activeElement.selectionStart = props.duration[props.index].length + 1;
      expect(testMethod(props.duration, props.index, props.val)).toEqual({
        startTime: '00:00:'
      });
    });
  });
  describe('onDurationKeyDown', () => {
    beforeEach(() => {
      props = {
        duration: {
          startTime: '00:00:00'
        },
        index: 'startTime',
        event: 'eVeNt'
      };
      testMethod = hooks.onDurationKeyDown;
    });
    it('enter event: calls blur()', () => {
      props.event = {
        key: 'Enter'
      };
      const blurSpy = jest.spyOn(document.activeElement, 'blur');
      testMethod(props.duration, props.index, props.event);
      expect(blurSpy).toHaveBeenCalled();
    });
    it('backspace event: returns duration with deleted end character when that character is \':\' and caret is at end', () => {
      props.duration = {
        startTime: '00:'
      };
      props.event = {
        key: 'Backspace'
      };
      document.activeElement.selectionStart = props.duration[props.index].length;
      expect(testMethod(props.duration, props.index, props.event)).toEqual({
        startTime: '00'
      });
    });
  });
  describe('valueFromDuration', () => {
    beforeEach(() => {
      testMethod = hooks.valueFromDuration;
    });
    it('returns 0 if given a bad duration string', () => {
      const badChecks = ['a', '00:00:1f', '0adg:00:04'];
      badChecks.forEach(dur => expect(testMethod(dur)).toEqual(0));
    });
    it('returns simple durations', () => {
      durationPairs.forEach(_ref2 => {
        let [val, dur] = _ref2;
        return expect(testMethod(dur)).toEqual(val);
      });
    });
    it('returns tricky durations, prepending zeros and expanding out sections', () => {
      trickyDurations.forEach(_ref3 => {
        let [dur, val] = _ref3;
        return expect(testMethod(dur)).toEqual(val);
      });
    });
  });
});
//# sourceMappingURL=hooks.test.js.map