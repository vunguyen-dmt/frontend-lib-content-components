"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = exports.actions = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _utils = require("../../../utils");
var _requests = require("../../constants/requests");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const initialState = exports.initialState = {
  [_requests.RequestKeys.fetchUnit]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchBlock]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchStudioView]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.saveBlock]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.uploadAsset]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.allowThumbnailUpload]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.uploadThumbnail]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.uploadTranscript]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.deleteTranscript]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchCourseDetails]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchAssets]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchVideos]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.uploadVideo]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.checkTranscriptsForImport]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.importTranscript]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchVideoFeatures]: {
    status: _requests.RequestStates.inactive
  },
  [_requests.RequestKeys.fetchAdvancedSettings]: {
    status: _requests.RequestStates.inactive
  }
};

// eslint-disable-next-line no-unused-vars
const requests = (0, _toolkit.createSlice)({
  name: 'requests',
  initialState,
  reducers: {
    startRequest: (state, _ref) => {
      let {
        payload
      } = _ref;
      return _objectSpread(_objectSpread({}, state), {}, {
        [payload]: {
          status: _requests.RequestStates.pending
        }
      });
    },
    completeRequest: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      return _objectSpread(_objectSpread({}, state), {}, {
        [payload.requestKey]: {
          status: _requests.RequestStates.completed,
          response: payload.response
        }
      });
    },
    failRequest: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      return _objectSpread(_objectSpread({}, state), {}, {
        [payload.requestKey]: {
          status: _requests.RequestStates.failed,
          error: payload.error
        }
      });
    },
    clearRequest: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      return _objectSpread(_objectSpread({}, state), {}, {
        [payload.requestKey]: {}
      });
    }
  }
});
const actions = exports.actions = (0, _utils.StrictDict)(requests.actions);
const {
  reducer
} = requests;
exports.reducer = reducer;
//# sourceMappingURL=reducer.js.map