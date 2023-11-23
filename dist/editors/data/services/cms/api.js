"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processVideoIds = exports.processLicense = exports.parseYoutubeId = exports.loadImages = exports.loadImage = exports.isEdxVideo = exports.default = exports.checkMockApi = exports.apiMethods = void 0;
var _utils = require("../../../utils");
var urls = _interopRequireWildcard(require("./urls"));
var _utils2 = require("./utils");
var _module = _interopRequireWildcard(require("./api"));
var mockApi = _interopRequireWildcard(require("./mockApi"));
var _hooks = require("../../../containers/VideoEditor/components/VideoSettingsModal/components/DurationWidget/hooks");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const apiMethods = {
  fetchBlockById: _ref => {
    let {
      blockId,
      studioEndpointUrl
    } = _ref;
    return (0, _utils2.get)(urls.block({
      blockId,
      studioEndpointUrl
    }));
  },
  fetchByUnitId: _ref2 => {
    let {
      blockId,
      studioEndpointUrl
    } = _ref2;
    return (0, _utils2.get)(urls.blockAncestor({
      studioEndpointUrl,
      blockId
    }));
  },
  fetchStudioView: _ref3 => {
    let {
      blockId,
      studioEndpointUrl
    } = _ref3;
    return (0, _utils2.get)(urls.blockStudioView({
      studioEndpointUrl,
      blockId
    }));
  },
  fetchAssets: _ref4 => {
    let {
      learningContextId,
      studioEndpointUrl
    } = _ref4;
    return (0, _utils2.get)(urls.courseAssets({
      studioEndpointUrl,
      learningContextId
    }));
  },
  fetchVideos: _ref5 => {
    let {
      studioEndpointUrl,
      learningContextId
    } = _ref5;
    return (0, _utils2.get)(urls.courseVideos({
      studioEndpointUrl,
      learningContextId
    }));
  },
  fetchCourseDetails: _ref6 => {
    let {
      studioEndpointUrl,
      learningContextId
    } = _ref6;
    return (0, _utils2.get)(urls.courseDetailsUrl({
      studioEndpointUrl,
      learningContextId
    }));
  },
  fetchAdvancedSettings: _ref7 => {
    let {
      studioEndpointUrl,
      learningContextId
    } = _ref7;
    return (0, _utils2.get)(urls.courseAdvanceSettings({
      studioEndpointUrl,
      learningContextId
    }));
  },
  uploadAsset: _ref8 => {
    let {
      learningContextId,
      studioEndpointUrl,
      asset
    } = _ref8;
    const data = new FormData();
    data.append('file', asset);
    return (0, _utils2.post)(urls.courseAssets({
      studioEndpointUrl,
      learningContextId
    }), data);
  },
  uploadThumbnail: _ref9 => {
    let {
      studioEndpointUrl,
      learningContextId,
      videoId,
      thumbnail
    } = _ref9;
    const data = new FormData();
    data.append('file', thumbnail);
    return (0, _utils2.post)(urls.thumbnailUpload({
      studioEndpointUrl,
      learningContextId,
      videoId
    }), data);
  },
  checkTranscriptsForImport: _ref10 => {
    let {
      studioEndpointUrl,
      blockId,
      youTubeId,
      videoId
    } = _ref10;
    const getJSON = `{"locator":"${blockId}","videos":[{"mode":"youtube","video":"${youTubeId}","type":"youtube"},{"mode":"edx_video_id","type":"edx_video_id","video":"${videoId}"}]}`;
    return (0, _utils2.get)(urls.checkTranscriptsForImport({
      studioEndpointUrl,
      parameters: encodeURIComponent(getJSON)
    }));
  },
  importTranscript: _ref11 => {
    let {
      studioEndpointUrl,
      blockId,
      youTubeId
    } = _ref11;
    const getJSON = `{"locator":"${blockId}","videos":[{"mode":"youtube","video":"${youTubeId}","type":"youtube"}]}`;
    return (0, _utils2.get)(urls.replaceTranscript({
      studioEndpointUrl,
      parameters: encodeURIComponent(getJSON)
    }));
  },
  getTranscript: _ref12 => {
    let {
      studioEndpointUrl,
      language,
      blockId,
      videoId
    } = _ref12;
    const getJSON = {
      data: {
        lang: language,
        edx_video_id: videoId
      }
    };
    return (0, _utils2.get)(`${urls.videoTranscripts({
      studioEndpointUrl,
      blockId
    })}?language_code=${language}`, getJSON);
  },
  deleteTranscript: _ref13 => {
    let {
      studioEndpointUrl,
      language,
      blockId,
      videoId
    } = _ref13;
    const deleteJSON = {
      data: {
        lang: language,
        edx_video_id: videoId
      }
    };
    return (0, _utils2.deleteObject)(urls.videoTranscripts({
      studioEndpointUrl,
      blockId
    }), deleteJSON);
  },
  uploadTranscript: _ref14 => {
    let {
      blockId,
      studioEndpointUrl,
      transcript,
      videoId,
      language,
      newLanguage = null
    } = _ref14;
    const data = new FormData();
    data.append('file', transcript);
    data.append('edx_video_id', videoId);
    data.append('language_code', language);
    data.append('new_language_code', newLanguage || language);
    return (0, _utils2.post)(urls.videoTranscripts({
      studioEndpointUrl,
      blockId
    }), data);
  },
  normalizeContent: _ref15 => {
    let {
      blockId,
      blockType,
      content,
      learningContextId,
      title
    } = _ref15;
    let response = {};
    if (blockType === 'html') {
      response = {
        category: blockType,
        courseKey: learningContextId,
        data: content,
        has_changes: true,
        id: blockId,
        metadata: {
          display_name: title
        }
      };
    } else if (blockType === 'problem') {
      response = {
        data: content.olx,
        category: blockType,
        couseKey: learningContextId,
        has_changes: true,
        id: blockId,
        metadata: _objectSpread({
          display_name: title
        }, content.settings)
      };
    } else if (blockType === 'video') {
      const {
        html5Sources,
        edxVideoId,
        youtubeId
      } = _module.processVideoIds({
        videoId: content.videoId,
        videoUrl: content.videoSource,
        fallbackVideos: content.fallbackVideos
      });
      response = {
        category: blockType,
        courseKey: learningContextId,
        display_name: title,
        id: blockId,
        metadata: {
          display_name: title,
          download_video: content.allowVideoDownloads,
          public_access: content.allowVideoSharing.value,
          edx_video_id: edxVideoId,
          html5_sources: html5Sources,
          youtube_id_1_0: youtubeId,
          thumbnail: content.thumbnail,
          download_track: content.allowTranscriptDownloads,
          track: '',
          // TODO Downloadable Transcript URL. Backend expects a file name, for example: "something.srt"
          show_captions: content.showTranscriptByDefault,
          handout: content.handout,
          start_time: (0, _hooks.durationStringFromValue)(content.duration.startTime),
          end_time: (0, _hooks.durationStringFromValue)(content.duration.stopTime),
          license: _module.processLicense(content.licenseType, content.licenseDetails)
        }
      };
    } else {
      throw new TypeError(`No Block in V2 Editors named /"${blockType}/", Cannot Save Content.`);
    }
    return _objectSpread({}, response);
  },
  saveBlock: _ref16 => {
    let {
      blockId,
      blockType,
      content,
      learningContextId,
      studioEndpointUrl,
      title
    } = _ref16;
    return (0, _utils2.post)(urls.block({
      studioEndpointUrl,
      blockId
    }), _module.apiMethods.normalizeContent({
      blockType,
      content,
      blockId,
      learningContextId,
      title
    }));
  },
  fetchVideoFeatures: _ref17 => {
    let {
      studioEndpointUrl,
      learningContextId
    } = _ref17;
    return (0, _utils2.get)(urls.videoFeatures({
      studioEndpointUrl,
      learningContextId
    }));
  },
  uploadVideo: _ref18 => {
    let {
      data,
      studioEndpointUrl,
      learningContextId
    } = _ref18;
    return (0, _utils2.post)(urls.courseVideos({
      studioEndpointUrl,
      learningContextId
    }), data);
  }
};
exports.apiMethods = apiMethods;
const loadImage = imageData => _objectSpread(_objectSpread({}, imageData), {}, {
  dateAdded: new Date(imageData.dateAdded.replace(' at', '')).getTime()
});
exports.loadImage = loadImage;
const loadImages = rawImages => (0, _utils.camelizeKeys)(rawImages).reduce((obj, image) => _objectSpread(_objectSpread({}, obj), {}, {
  [image.id]: _module.loadImage(image)
}), {});
exports.loadImages = loadImages;
const processVideoIds = _ref19 => {
  let {
    videoId,
    videoUrl,
    fallbackVideos
  } = _ref19;
  let youtubeId = '';
  const html5Sources = [];
  if (videoUrl) {
    if (_module.parseYoutubeId(videoUrl)) {
      youtubeId = _module.parseYoutubeId(videoUrl);
    } else {
      html5Sources.push(videoUrl);
    }
  }
  if (fallbackVideos) {
    fallbackVideos.forEach(src => src ? html5Sources.push(src) : null);
  }
  return {
    edxVideoId: videoId,
    html5Sources,
    youtubeId
  };
};
exports.processVideoIds = processVideoIds;
const isEdxVideo = src => {
  const uuid4Regex = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
  if (src && src.match(uuid4Regex)) {
    return true;
  }
  return false;
};
exports.isEdxVideo = isEdxVideo;
const parseYoutubeId = src => {
  const youtubeRegex = new RegExp(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/);
  if (!src.match(youtubeRegex)) {
    return null;
  }
  return src.match(youtubeRegex)[5];
};
exports.parseYoutubeId = parseYoutubeId;
const processLicense = (licenseType, licenseDetails) => {
  if (licenseType === 'creative-commons') {
    return 'creative-commons: ver=4.0'.concat(licenseDetails.attribution ? ' BY' : '', licenseDetails.noncommercial ? ' NC' : '', licenseDetails.noDerivatives ? ' ND' : '', licenseDetails.shareAlike ? ' SA' : '');
  }
  if (licenseType === 'all-rights-reserved') {
    return 'all-rights-reserved';
  }
  return '';
};
exports.processLicense = processLicense;
const checkMockApi = key => {
  if (process.env.REACT_APP_DEVGALLERY) {
    return mockApi[key] ? mockApi[key] : mockApi.emptyMock;
  }
  return _module.apiMethods[key];
};
exports.checkMockApi = checkMockApi;
var _default = Object.keys(apiMethods).reduce((obj, key) => _objectSpread(_objectSpread({}, obj), {}, {
  [key]: checkMockApi(key)
}), {});
exports.default = _default;
//# sourceMappingURL=api.js.map