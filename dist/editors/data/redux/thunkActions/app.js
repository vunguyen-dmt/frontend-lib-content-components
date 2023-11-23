"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.saveBlock = exports.initialize = exports.fetchVideos = exports.fetchUnit = exports.fetchStudioView = exports.fetchCourseDetails = exports.fetchBlock = exports.fetchAssets = exports.default = void 0;
var _utils = require("../../../utils");
var _ = require("..");
var requests = _interopRequireWildcard(require("./requests"));
var _module = _interopRequireWildcard(require("./app"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable import/no-cycle */

const fetchBlock = () => dispatch => {
  dispatch(requests.fetchBlock({
    onSuccess: response => dispatch(_.actions.app.setBlockValue(response)),
    // eslint-disable-next-line
    onFailure: e => console.log({
      fetchFailure: e
    })
  }));
};
exports.fetchBlock = fetchBlock;
const fetchStudioView = () => dispatch => {
  dispatch(requests.fetchStudioView({
    onSuccess: response => dispatch(_.actions.app.setStudioView(response)),
    onFailure: e => dispatch(_.actions.app.setStudioView(e))
  }));
};
exports.fetchStudioView = fetchStudioView;
const fetchUnit = () => dispatch => {
  dispatch(requests.fetchUnit({
    onSuccess: response => dispatch(_.actions.app.setUnitUrl(response)),
    onFailure: e => dispatch(_.actions.app.setUnitUrl(e))
  }));
};
exports.fetchUnit = fetchUnit;
const fetchAssets = () => dispatch => {
  dispatch(requests.fetchAssets({
    onSuccess: response => dispatch(_.actions.app.setAssets(response))
  }));
};
exports.fetchAssets = fetchAssets;
const fetchVideos = () => dispatch => {
  dispatch(requests.fetchVideos({
    onSuccess: response => dispatch(_.actions.app.setVideos(response.data.videos))
  }));
};
exports.fetchVideos = fetchVideos;
const fetchCourseDetails = () => dispatch => {
  dispatch(requests.fetchCourseDetails({
    onSuccess: response => dispatch(_.actions.app.setCourseDetails(response)),
    onFailure: e => dispatch(_.actions.app.setCourseDetails(e))
  }));
};

/**
 * @param {string} studioEndpointUrl
 * @param {string} blockId
 * @param {string} learningContextId
 * @param {string} blockType
 */
exports.fetchCourseDetails = fetchCourseDetails;
const initialize = data => dispatch => {
  dispatch(_.actions.app.initialize(data));
  dispatch(_module.fetchBlock());
  dispatch(_module.fetchUnit());
  dispatch(_module.fetchStudioView());
  dispatch(_module.fetchAssets());
  dispatch(_module.fetchVideos());
  dispatch(_module.fetchCourseDetails());
};

/**
 * @param {func} onSuccess
 */
exports.initialize = initialize;
const saveBlock = _ref => {
  let {
    content,
    returnToUnit
  } = _ref;
  return dispatch => {
    dispatch(_.actions.app.setBlockContent(content));
    dispatch(requests.saveBlock({
      content,
      onSuccess: response => {
        dispatch(_.actions.app.setSaveResponse(response));
        returnToUnit(response.data)();
      }
    }));
  };
};
exports.saveBlock = saveBlock;
const uploadImage = _ref2 => {
  let {
    file,
    setSelection
  } = _ref2;
  return dispatch => {
    dispatch(requests.uploadAsset({
      asset: file,
      onSuccess: response => setSelection((0, _utils.camelizeKeys)(response.data.asset))
    }));
  };
};
exports.uploadImage = uploadImage;
var _default = (0, _utils.StrictDict)({
  fetchBlock,
  fetchCourseDetails,
  fetchStudioView,
  fetchUnit,
  fetchVideos,
  initialize,
  saveBlock,
  fetchAssets,
  uploadImage
});
exports.default = _default;
//# sourceMappingURL=app.js.map