"use strict";

var reactRedux = _interopRequireWildcard(require("react-redux"));
var hooks = _interopRequireWildcard(require("./hooks"));
var _utils = require("./utils");
var _testUtils = require("../../../testUtils");
var _utils2 = require("../../utils");
var appHooks = _interopRequireWildcard(require("../../hooks"));
var _redux = require("../../data/redux");
var _analyticsEvt = _interopRequireDefault(require("../../data/constants/analyticsEvt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  useRef: jest.fn(val => ({
    current: val
  })),
  useEffect: jest.fn(),
  useCallback: (cb, prereqs) => ({
    cb,
    prereqs
  })
}));
jest.mock('react-redux', () => {
  const dispatchFn = jest.fn();
  return _objectSpread(_objectSpread({}, jest.requireActual('react-redux')), {}, {
    dispatch: dispatchFn,
    useDispatch: jest.fn(() => dispatchFn),
    useSelector: jest.fn()
  });
});
jest.mock('../../data/redux', () => ({
  selectors: {
    app: {
      returnUrl: 'returnUrl',
      analytics: 'analytics'
    }
  }
}));
jest.mock('../../hooks', () => _objectSpread(_objectSpread({}, jest.requireActual('../../hooks')), {}, {
  navigateCallback: jest.fn(args => ({
    navigateCallback: args
  })),
  navigateTo: jest.fn(args => ({
    navigateTo: args
  }))
}));
const state = new _testUtils.MockUseState(hooks);
const hookKeys = (0, _utils2.keyStore)(hooks);
let hook;
const testValue = 'testVALUEVALID';
describe('VideoGallery hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('state hooks', () => {
    state.testGetter(state.keys.highlighted);
    state.testGetter(state.keys.searchString);
    state.testGetter(state.keys.showSelectVideoError);
    state.testGetter(state.keys.showSizeError);
    state.testGetter(state.keys.sortBy);
    state.testGetter(state.keys.filertBy);
    state.testGetter(state.keys.hideSelectedVideos);
  });
  describe('using state', () => {
    beforeEach(() => {
      state.mock();
    });
    afterEach(() => {
      state.restore();
    });
    describe('searchAndSortProps', () => {
      beforeEach(() => {
        hook = hooks.searchAndSortProps();
      });
      it('returns searchString value, initialized to an empty string', () => {
        expect(state.stateVals.searchString).toEqual(hook.searchString);
        expect(state.stateVals.searchString).toEqual('');
      });
      it('returns highlighted value, initialized to dateNewest', () => {
        expect(state.stateVals.sortBy).toEqual(hook.sortBy);
        expect(state.stateVals.sortBy).toEqual(_utils.sortKeys.dateNewest);
      });
      test('onSearchChange sets searchString with event target value', () => {
        hook.onSearchChange({
          target: {
            value: testValue
          }
        });
        expect(state.setState.searchString).toHaveBeenCalledWith(testValue);
      });
      test('clearSearchString sets search string to empty string', () => {
        hook.clearSearchString();
        expect(state.setState.searchString).toHaveBeenCalledWith('');
      });
      test('onSortClick takes a key and returns callback to set sortBY to that key', () => {
        hook.onSortClick(testValue);
        expect(state.setState.sortBy).not.toHaveBeenCalled();
        hook.onSortClick(testValue)();
        expect(state.setState.sortBy).toHaveBeenCalledWith(testValue);
      });
    });
    describe('filterListBySearch', () => {
      const matching = ['test', 'TEst', 'eeees', 'essSSSS'];
      const notMatching = ['bad', 'other', 'bad stuff'];
      const searchString = 'eS';
      test('returns list filtered lowercase by displayName', () => {
        const filter = jest.fn(cb => ({
          filter: cb
        }));
        hook = hooks.filterListBySearch({
          searchString,
          videoList: {
            filter
          }
        });
        expect(filter).toHaveBeenCalled();
        const [[filterCb]] = filter.mock.calls;
        matching.forEach(val => expect(filterCb({
          displayName: val
        })).toEqual(true));
        notMatching.forEach(val => expect(filterCb({
          displayName: val
        })).toEqual(false));
      });
    });
    describe('buildVideos', () => {
      const rawVideos = [{
        edx_video_id: 'id_1',
        client_video_id: 'client_id_1',
        course_video_image_url: 'course_video_image_url_1',
        created: 'created_1',
        status: 'status_1',
        duration: 1,
        transcripts: []
      }, {
        edx_video_id: 'id_2',
        client_video_id: 'client_id_2',
        course_video_image_url: 'course_video_image_url_2',
        created: 'created_2',
        status: 'status_2',
        duration: 2,
        transcripts: []
      }];
      const expectedValues = [{
        id: 'id_1',
        displayName: 'client_id_1',
        externalUrl: 'course_video_image_url_1',
        dateAdded: 'created_1',
        locked: false,
        thumbnail: 'course_video_image_url_1',
        status: 'status_1',
        statusBadgeVariant: null,
        duration: 1,
        transcripts: []
      }, {
        id: 'id_2',
        displayName: 'client_id_2',
        externalUrl: 'course_video_image_url_2',
        dateAdded: 'created_2',
        locked: false,
        thumbnail: 'course_video_image_url_2',
        status: 'status_2',
        statusBadgeVariant: null,
        duration: 2,
        transcripts: []
      }];
      test('return the expected values', () => {
        const values = hooks.buildVideos({
          rawVideos
        });
        expect(values).toEqual(expectedValues);
      });
    });
    describe('getstatusBadgeVariant', () => {
      test('return the expected values', () => {
        let value = hooks.getstatusBadgeVariant({
          status: _utils.filterKeys.failed
        });
        expect(value).toEqual('danger');
        value = hooks.getstatusBadgeVariant({
          status: _utils.filterKeys.uploading
        });
        expect(value).toEqual('light');
        value = hooks.getstatusBadgeVariant({
          status: _utils.filterKeys.processing
        });
        expect(value).toEqual('light');
        value = hooks.getstatusBadgeVariant({
          status: _utils.filterKeys.videoStatus
        });
        expect(value).toBeNull();
        value = hooks.getstatusBadgeVariant({
          status: _utils.filterKeys.ready
        });
        expect(value).toBeNull();
      });
    });
    describe('videoListProps outputs', () => {
      const props = {
        searchSortProps: {
          searchString: 'Es',
          sortBy: _utils.sortKeys.dateNewest,
          filterBy: _utils.filterKeys.videoStatus
        },
        videos: [{
          displayName: 'sOmEuiMAge',
          staTICUrl: '/assets/sOmEuiMAge',
          id: 'sOmEuiMAgeURl'
        }]
      };
      const filterList = args => ({
        filterList: args
      });
      const load = () => {
        jest.spyOn(hooks, hookKeys.filterList).mockImplementationOnce(filterList);
        hook = hooks.videoListProps(props);
      };
      beforeEach(() => {
        load();
      });
      describe('selectBtnProps', () => {
        test('on click, if sets selection', () => {
          const highlighted = 'videoId';
          state.mockVal(state.keys.highlighted, highlighted);
          load();
          expect(appHooks.navigateTo).not.toHaveBeenCalled();
          hook.selectBtnProps.onClick();
          expect(appHooks.navigateTo).toHaveBeenCalled();
        });
        test('on click, sets showSelectVideoError to true if nothing is highlighted', () => {
          state.mockVal(state.keys.highlighted, null);
          load();
          hook.selectBtnProps.onClick();
          expect(appHooks.navigateTo).not.toHaveBeenCalled();
          expect(state.setState.showSelectVideoError).toHaveBeenCalledWith(true);
        });
      });
      describe('galleryProps', () => {
        it('returns highlighted value, initialized to null', () => {
          expect(hook.galleryProps.highlighted).toEqual(state.stateVals.highlighted);
          expect(state.stateVals.highlighted).toEqual(null);
        });
        test('onHighlightChange sets highlighted with event target value', () => {
          hook.galleryProps.onHighlightChange({
            target: {
              value: testValue
            }
          });
          expect(state.setState.highlighted).toHaveBeenCalledWith(testValue);
        });
        test('displayList returns filterListhook called with searchSortProps and videos', () => {
          expect(hook.galleryProps.displayList).toEqual(filterList(_objectSpread(_objectSpread({}, props.searchSortProps), {}, {
            videos: props.videos
          })));
        });
      });
      describe('galleryError', () => {
        test('show is initialized to false and returns properly', () => {
          const show = 'sHOWSelectiRROr';
          expect(hook.galleryError.show).toEqual(false);
          state.mockVal(state.keys.showSelectVideoError, show);
          hook = hooks.videoListProps(props);
          expect(hook.galleryError.show).toEqual(show);
        });
        test('set sets showSelectVideoError to true', () => {
          hook.galleryError.set();
          expect(state.setState.showSelectVideoError).toHaveBeenCalledWith(true);
        });
        test('dismiss sets showSelectVideoError to false', () => {
          hook.galleryError.dismiss();
          expect(state.setState.showSelectVideoError).toHaveBeenCalledWith(false);
        });
      });
    });
  });
  describe('fileInputHooks', () => {
    test('click calls current.click on the ref', () => {
      jest.spyOn(hooks, hookKeys.handleVideoUpload).mockImplementationOnce();
      expect(hooks.handleVideoUpload).not.toHaveBeenCalled();
      hook = hooks.fileInputProps();
      expect(hooks.handleVideoUpload).toHaveBeenCalled();
      expect(appHooks.navigateTo).not.toHaveBeenCalled();
      hook.click();
      expect(appHooks.navigateTo).toHaveBeenCalled();
    });
  });
  describe('videoProps', () => {
    const videoList = {
      galleryProps: 'some gallery props',
      selectBtnProps: 'some select btn props'
    };
    const searchAndSortProps = {
      search: 'props'
    };
    const fileInput = {
      file: 'input hooks'
    };
    const videos = {
      video: {
        staTICUrl: '/assets/sOmEuiMAge'
      }
    };
    const spies = {};
    beforeEach(() => {
      spies.videoList = jest.spyOn(hooks, hookKeys.videoListProps).mockReturnValueOnce(videoList);
      spies.search = jest.spyOn(hooks, hookKeys.searchAndSortProps).mockReturnValueOnce(searchAndSortProps);
      spies.file = jest.spyOn(hooks, hookKeys.fileInputProps).mockReturnValueOnce(fileInput);
      hook = hooks.videoProps({
        videos
      });
    });
    it('forwards fileInput as fileInput', () => {
      expect(hook.fileInput).toEqual(fileInput);
      expect(spies.file.mock.calls.length).toEqual(1);
      expect(spies.file).toHaveBeenCalled();
    });
    it('initializes videoList', () => {
      expect(spies.videoList.mock.calls.length).toEqual(1);
      expect(spies.videoList).toHaveBeenCalledWith({
        searchSortProps: searchAndSortProps,
        videos
      });
    });
    it('forwards searchAndSortHooks as searchSortProps', () => {
      expect(hook.searchSortProps).toEqual(searchAndSortProps);
      expect(spies.search.mock.calls.length).toEqual(1);
      expect(spies.search).toHaveBeenCalled();
    });
    it('forwards galleryProps and selectBtnProps from the video list hooks', () => {
      expect(hook.galleryProps).toEqual(videoList.galleryProps);
      expect(hook.selectBtnProps).toEqual(videoList.selectBtnProps);
    });
  });
  describe('handleCancel', () => {
    it('calls navigateCallback', () => {
      expect(hooks.handleCancel()).toEqual(appHooks.navigateCallback({
        destination: reactRedux.useSelector(_redux.selectors.app.returnUrl),
        analyticsEvent: _analyticsEvt.default.videoGalleryCancelClick,
        analytics: reactRedux.useSelector(_redux.selectors.app.analytics)
      }));
    });
  });
});
//# sourceMappingURL=hooks.test.js.map