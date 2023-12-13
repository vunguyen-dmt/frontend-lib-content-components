"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../../../data/redux");
var _testUtils = require("../../../../../testUtils");
var hooks = _interopRequireWildcard(require("./hooks"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.mock('react', () => {
  const updateState = jest.fn();
  return {
    updateState,
    useState: jest.fn(val => [{
      state: val
    }, newVal => updateState({
      val,
      newVal
    })]),
    createRef: jest.fn(val => ({
      ref: val
    }))
  };
});
jest.mock('../../hooks', () => ({
  navigateCallback: args => ({
    navigateCallback: args
  })
}));
jest.mock('../../../../data/redux', () => ({
  actions: {
    app: {
      setBlockTitle: args => ({
        setBlockTitle: args
      })
    }
  },
  selectors: {
    app: {
      displayTitle: state => ({
        displayTitle: state
      })
    }
  }
}));
const state = new _testUtils.MockUseState(hooks);
describe('TitleHeader hooks', () => {
  let output;
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
  });
  describe('state hooks', () => {
    state.testGetter(state.keys.localTitle);
  });
  describe('non-state hooks', () => {
    beforeEach(() => {
      state.mock();
    });
    afterEach(() => {
      state.restore();
    });
    describe('isEditing', () => {
      beforeEach(() => {
        output = hooks.hooks.isEditing();
      });
      test('returns isEditing field, defaulted to false', () => {
        expect(output.isEditing).toEqual({
          state: false
        });
      });
      test('startEditing calls the setter function with true', () => {
        output.startEditing();
        expect(_react.default.updateState).toHaveBeenCalledWith({
          val: false,
          newVal: true
        });
      });
      test('stopEditing calls the setter function with false', () => {
        output.stopEditing();
        expect(_react.default.updateState).toHaveBeenCalledWith({
          val: false,
          newVal: false
        });
      });
    });
    describe('localTitle', () => {
      let stopEditing;
      beforeEach(() => {
        stopEditing = jest.fn();
        output = hooks.hooks.localTitle({
          dispatch,
          stopEditing
        });
      });
      test('returns the state value for localTitle, defaulted to displayTitle', () => {
        expect(output.localTitle).toEqual((0, _reactRedux.useSelector)(_redux.selectors.app.displayTitle));
      });
      describe('updateTitle hook', () => {
        it('calls setBlockTitle with localTitle, and stopEditing', () => {
          const div = document.createElement('div');
          const mockEvent = {
            currentTarget: div
          };
          output.updateTitle(mockEvent);
          expect(dispatch).toHaveBeenCalledWith(_redux.actions.app.setBlockTitle(output.localTitle));
          expect(stopEditing).toHaveBeenCalled();
        });
      });
      describe('handleChange', () => {
        it('calls setLocalTitle with the event target value', () => {
          const value = 'SOME VALUe';
          output.handleChange({
            target: {
              value
            }
          });
          expect(state.setState[state.keys.localTitle]).toHaveBeenCalledWith(value);
        });
      });
      describe('cancelEdit', () => {
        it('calls setLocalTitle with previously stored title, and stopEditing', () => {
          output.cancelEdit();
          expect(state.setState[state.keys.localTitle]).toHaveBeenCalledWith((0, _reactRedux.useSelector)(_redux.selectors.app.displayTitle));
          expect(stopEditing).toHaveBeenCalled();
        });
      });
    });
    describe('local title hooks', () => {
      let oldHooks;
      const values = {
        isEditing: 'ISeDITING',
        startEditing: 'STARTeDITING',
        stopEditing: 'STOPeDITING',
        handleChange: 'HANDLEcHANGE',
        localTitle: 'LOCALtITLE',
        cancelEdit: 'CANCelEDit'
      };
      const newHooks = {
        isEditing: () => ({
          isEditing: values.isEditing,
          startEditing: values.startEditing,
          stopEditing: values.stopEditing
        }),
        localTitle: jest.fn(args => ({
          updateTitle: args,
          handleChange: values.handleChange,
          localTitle: values.localTitle,
          cancelEdit: values.cancelEdit
        })),
        handleKeyDown: jest.fn(args => ({
          handleKeyDown: args
        }))
      };
      beforeEach(() => {
        oldHooks = hooks.hooks;
        hooks.hooks.isEditing = newHooks.isEditing;
        hooks.hooks.localTitle = newHooks.localTitle;
        hooks.hooks.handleKeyDown = newHooks.handleKeyDown;
        output = hooks.localTitleHooks({
          dispatch
        });
      });
      afterEach(() => {
        // eslint-disable-next-line no-import-assign
        hooks.hooks = oldHooks;
      });
      it('returns isEditing, startEditing, and stopEditing, tied to the isEditing hook', () => {
        expect(output.isEditing).toEqual(values.isEditing);
        expect(output.startEditing).toEqual(values.startEditing);
        expect(output.stopEditing).toEqual(values.stopEditing);
      });
      it('returns localTitle, updateTitle, handleChange, and cancelEdit tied to the localTitle hook', () => {
        expect(output.updateTitle).toEqual({
          dispatch,
          stopEditing: values.stopEditing
        });
        expect(output.handleChange).toEqual(values.handleChange);
        expect(output.localTitle).toEqual(values.localTitle);
        expect(output.cancelEdit).toEqual(values.cancelEdit);
      });
      it('returns a new ref for inputRef', () => {
        expect(output.inputRef).toEqual({
          ref: undefined
        });
      });
    });
  });
});
//# sourceMappingURL=hooks.test.js.map