"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadTranscript = exports.uploadThumbnail = exports.uploadHandout = exports.updateTranscriptLanguage = exports.saveVideoData = exports.replaceTranscript = exports.parseVideoSharingSetting = exports.parseTranscripts = exports.parseLicense = exports.loadVideoData = exports.importTranscript = exports.determineVideoSources = exports.deleteTranscript = exports.default = void 0;
var _ = require("..");
var _utils = require("../../../utils");
var requests = _interopRequireWildcard(require("./requests"));
var _module = _interopRequireWildcard(require("./video"));
var _hooks = require("../../../containers/VideoEditor/components/VideoSettingsModal/components/DurationWidget/hooks");
var _api = require("../../services/cms/api");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable import/no-cycle */

const loadVideoData = (selectedVideoId, selectedVideoUrl) => (dispatch, getState) => {
  const state = getState();
  const blockValueData = state.app.blockValue.data;
  let rawVideoData = blockValueData.metadata ? blockValueData.metadata : {};
  const courseData = state.app.courseDetails.data ? state.app.courseDetails.data : {};
  if (selectedVideoId != null) {
    const rawVideos = Object.values(_.selectors.app.videos(state));
    const selectedVideo = rawVideos.find(video => video.edx_video_id === selectedVideoId);
    rawVideoData = {
      edx_video_id: selectedVideo.edx_video_id,
      thumbnail: selectedVideo.course_video_image_url,
      duration: selectedVideo.duration,
      transcriptsFromSelected: selectedVideo.transcripts,
      selectedVideoTranscriptUrls: selectedVideo.transcript_urls
    };
  }
  const studioView = state.app.studioView?.data?.html;
  const {
    videoId,
    videoUrl,
    fallbackVideos
  } = _module.determineVideoSources({
    edxVideoId: rawVideoData.edx_video_id,
    youtubeId: rawVideoData.youtube_id_1_0,
    html5Sources: rawVideoData.html5_sources
  });

  // Use the selected video url first
  const videoSourceUrl = selectedVideoUrl != null ? selectedVideoUrl : videoUrl;
  const [licenseType, licenseOptions] = _module.parseLicense({
    licenseData: studioView,
    level: 'block'
  });
  const transcripts = rawVideoData.transcriptsFromSelected ? rawVideoData.transcriptsFromSelected : _module.parseTranscripts({
    transcriptsData: studioView
  });
  const [courseLicenseType, courseLicenseDetails] = _module.parseLicense({
    licenseData: courseData.license,
    level: 'course'
  });
  const allowVideoSharing = _module.parseVideoSharingSetting({
    courseSetting: blockValueData?.video_sharing_options,
    blockSetting: rawVideoData.public_access
  });
  dispatch(_.actions.video.load({
    videoSource: videoSourceUrl || '',
    videoId,
    fallbackVideos,
    allowVideoDownloads: rawVideoData.download_video,
    allowVideoSharing,
    videoSharingLearnMoreLink: blockValueData?.video_sharing_doc_url,
    videoSharingEnabledForCourse: blockValueData?.video_sharing_enabled,
    transcripts,
    selectedVideoTranscriptUrls: rawVideoData.selectedVideoTranscriptUrls,
    allowTranscriptDownloads: rawVideoData.download_track,
    showTranscriptByDefault: rawVideoData.show_captions,
    duration: {
      // TODO duration is not always sent so they should be calculated.
      startTime: (0, _hooks.valueFromDuration)(rawVideoData.start_time || '00:00:00'),
      stopTime: (0, _hooks.valueFromDuration)(rawVideoData.end_time || '00:00:00'),
      total: rawVideoData.duration || 0 // TODO can we get total duration? if not, probably dropping from widget
    },

    handout: rawVideoData.handout,
    licenseType,
    licenseDetails: {
      attribution: licenseOptions.by,
      noncommercial: licenseOptions.nc,
      noDerivatives: licenseOptions.nd,
      shareAlike: licenseOptions.sa
    },
    courseLicenseType,
    courseLicenseDetails: {
      attribution: courseLicenseDetails.by,
      noncommercial: courseLicenseDetails.nc,
      noDerivatives: courseLicenseDetails.nd,
      shareAlike: courseLicenseDetails.sa
    },
    thumbnail: rawVideoData.thumbnail
  }));
  dispatch(requests.fetchVideoFeatures({
    onSuccess: response => dispatch(_.actions.video.updateField({
      allowThumbnailUpload: response.data.allowThumbnailUpload,
      videoSharingEnabledForAll: response.data.videoSharingEnabled
    }))
  }));
  const youTubeId = (0, _api.parseYoutubeId)(videoSourceUrl);
  if (youTubeId) {
    dispatch(requests.checkTranscriptsForImport({
      videoId,
      youTubeId,
      onSuccess: response => {
        if (response.data.command === 'import') {
          dispatch(_.actions.video.updateField({
            allowTranscriptImport: true
          }));
        }
      }
    }));
  }
};
exports.loadVideoData = loadVideoData;
const determineVideoSources = _ref => {
  let {
    edxVideoId,
    youtubeId,
    html5Sources
  } = _ref;
  const youtubeUrl = `https://youtu.be/${youtubeId}`;
  let videoUrl;
  let fallbackVideos;
  if (youtubeId) {
    [videoUrl, fallbackVideos] = [youtubeUrl, html5Sources];
  } else if (Array.isArray(html5Sources) && html5Sources[0]) {
    [videoUrl, fallbackVideos] = [html5Sources[0], html5Sources.slice(1)];
  }
  return {
    videoId: edxVideoId || '',
    videoUrl: videoUrl || '',
    fallbackVideos: fallbackVideos || []
  };
};
exports.determineVideoSources = determineVideoSources;
const parseVideoSharingSetting = _ref2 => {
  let {
    courseSetting,
    blockSetting
  } = _ref2;
  switch (courseSetting) {
    case 'all-on':
      return {
        level: 'course',
        value: true
      };
    case 'all-off':
      return {
        level: 'course',
        value: false
      };
    case 'per-video':
      return {
        level: 'block',
        value: blockSetting
      };
    default:
      return {
        level: 'block',
        value: blockSetting
      };
  }
};
exports.parseVideoSharingSetting = parseVideoSharingSetting;
const parseTranscripts = _ref3 => {
  let {
    transcriptsData
  } = _ref3;
  if (!transcriptsData) {
    return [];
  }
  const cleanedStr = transcriptsData.replace(/&#34;/g, '"');
  const startString = '"transcripts": ';
  const endString = ', "youtube_id_0_75": ';
  const transcriptsJson = cleanedStr.substring(cleanedStr.indexOf(startString) + startString.length, cleanedStr.indexOf(endString));
  // const transcriptsObj = JSON.parse(transcriptsJson);
  try {
    const transcriptsObj = JSON.parse(transcriptsJson);
    return Object.keys(transcriptsObj.value);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON:', error.message);
    } else {
      throw error;
    }
    return [];
  }
};

// partially copied from frontend-app-learning/src/courseware/course/course-license/CourseLicense.jsx
exports.parseTranscripts = parseTranscripts;
const parseLicense = _ref4 => {
  let {
    licenseData,
    level
  } = _ref4;
  if (!licenseData) {
    return [null, {}];
  }
  let license = licenseData;
  if (level === 'block') {
    const metadataArr = licenseData.split('data-metadata');
    metadataArr.forEach(arr => {
      const parsedStr = arr.replace(/&#34;/g, '"');
      if (parsedStr.includes('license')) {
        license = parsedStr.substring(parsedStr.indexOf('"value"'), parsedStr.indexOf(', "type"')).replace(/"value": |"/g, '');
      }
    });
  }
  if (!license || license.includes('null')) {
    return [null, {}];
  }
  if (license === 'all-rights-reserved') {
    // no options, so the entire thing is the license type
    return [license, {}];
  }
  // Search for a colon character denoting the end
  // of the license type and start of the options
  const colonIndex = license.lastIndexOf(':');
  // Split the license on the colon
  const licenseType = license.slice(0, colonIndex).trim();
  const optionStr = license.slice(colonIndex + 1).trim();
  const options = {};
  let version = '';

  // Set the defaultVersion to 4.0
  const defaultVersion = '4.0';
  optionStr.split(' ').forEach(option => {
    // Split the option into key and value
    // Default the value to `true` if no value
    let key = '';
    let value = '';
    if (option.indexOf('=') !== -1) {
      [key, value] = option.split('=');
    } else {
      key = option;
      value = true;
    }

    // Check for version
    if (key === 'ver') {
      version = value;
    } else {
      // Set the option key to lowercase to make
      // it easier to query
      options[key.toLowerCase()] = value;
    }
  });

  // Set the version to whatever was included,
  // using `defaultVersion` as a fallback if unset
  version = version || defaultVersion;
  return [licenseType, options, version];
};
exports.parseLicense = parseLicense;
const saveVideoData = () => (dispatch, getState) => {
  const state = getState();
  return _.selectors.video.videoSettings(state);
};
exports.saveVideoData = saveVideoData;
const uploadThumbnail = _ref5 => {
  let {
    thumbnail,
    emptyCanvas
  } = _ref5;
  return (dispatch, getState) => {
    const state = getState();
    const {
      videoId
    } = state.video;
    const {
      studioEndpointUrl
    } = state.app;
    dispatch(requests.uploadThumbnail({
      thumbnail,
      videoId,
      onSuccess: response => {
        let thumbnailUrl;
        if (response.data.image_url.startsWith('/')) {
          // in local environments, image_url is a relative path
          thumbnailUrl = studioEndpointUrl + response.data.image_url;
        } else {
          // in stage and production, image_url is an absolute path to the image
          thumbnailUrl = response.data.image_url;
        }
        if (!emptyCanvas) {
          dispatch(_.actions.video.updateField({
            thumbnail: thumbnailUrl
          }));
        }
      },
      onFailure: e => console.log({
        UploadFailure: e
      }, 'Resampling thumbnail upload')
    }));
  };
};

// Handout Thunks:
exports.uploadThumbnail = uploadThumbnail;
const uploadHandout = _ref6 => {
  let {
    file
  } = _ref6;
  return dispatch => {
    dispatch(requests.uploadAsset({
      asset: file,
      onSuccess: response => {
        const handout = response.data.asset.url;
        dispatch(_.actions.video.updateField({
          handout
        }));
      }
    }));
  };
};

// Transcript Thunks:
exports.uploadHandout = uploadHandout;
const importTranscript = () => (dispatch, getState) => {
  const state = getState();
  const {
    transcripts,
    videoSource
  } = state.video;
  // Remove the placeholder '' from the unset language from the list of transcripts.
  const transcriptsPlaceholderRemoved = transcripts === [] ? transcripts : (0, _utils.removeItemOnce)(transcripts, '');
  dispatch(requests.importTranscript({
    youTubeId: (0, _api.parseYoutubeId)(videoSource),
    onSuccess: response => {
      dispatch(_.actions.video.updateField({
        transcripts: [...transcriptsPlaceholderRemoved, 'en']
      }));
      if (_.selectors.video.videoId(state) === '') {
        dispatch(_.actions.video.updateField({
          videoId: response.data.edx_video_id
        }));
      }
    }
  }));
};
exports.importTranscript = importTranscript;
const uploadTranscript = _ref7 => {
  let {
    language,
    file
  } = _ref7;
  return (dispatch, getState) => {
    const state = getState();
    const {
      transcripts,
      videoId
    } = state.video;
    // Remove the placeholder '' from the unset language from the list of transcripts.
    const transcriptsPlaceholderRemoved = transcripts === [] ? transcripts : (0, _utils.removeItemOnce)(transcripts, '');
    dispatch(requests.uploadTranscript({
      language,
      videoId,
      transcript: file,
      onSuccess: response => {
        // if we aren't replacing, add the language to the redux store.
        if (!transcriptsPlaceholderRemoved.includes(language)) {
          dispatch(_.actions.video.updateField({
            transcripts: [...transcriptsPlaceholderRemoved, language]
          }));
        }
        if (_.selectors.video.videoId(state) === '') {
          dispatch(_.actions.video.updateField({
            videoId: response.data.edx_video_id
          }));
        }
      }
    }));
  };
};
exports.uploadTranscript = uploadTranscript;
const deleteTranscript = _ref8 => {
  let {
    language
  } = _ref8;
  return (dispatch, getState) => {
    const state = getState();
    const {
      transcripts,
      videoId
    } = state.video;
    dispatch(requests.deleteTranscript({
      language,
      videoId,
      onSuccess: () => {
        const updatedTranscripts = transcripts.filter(langCode => langCode !== language);
        dispatch(_.actions.video.updateField({
          transcripts: updatedTranscripts
        }));
      }
    }));
  };
};
exports.deleteTranscript = deleteTranscript;
const updateTranscriptLanguage = _ref9 => {
  let {
    newLanguageCode,
    languageBeforeChange
  } = _ref9;
  return (dispatch, getState) => {
    const state = getState();
    const {
      video: {
        transcripts,
        videoId
      }
    } = state;
    _.selectors.video.getTranscriptDownloadUrl(state);
    dispatch(requests.getTranscriptFile({
      videoId,
      language: languageBeforeChange,
      onSuccess: response => {
        dispatch(requests.updateTranscriptLanguage({
          languageBeforeChange,
          file: new File([new Blob([response.data], {
            type: 'text/plain'
          })], `${videoId}_${newLanguageCode}.srt`, {
            type: 'text/plain'
          }),
          newLanguageCode,
          videoId,
          onSuccess: () => {
            const newTranscripts = transcripts.filter(transcript => transcript !== languageBeforeChange);
            newTranscripts.push(newLanguageCode);
            dispatch(_.actions.video.updateField({
              transcripts: newTranscripts
            }));
          }
        }));
      }
    }));
  };
};
exports.updateTranscriptLanguage = updateTranscriptLanguage;
const replaceTranscript = _ref10 => {
  let {
    newFile,
    newFilename,
    language
  } = _ref10;
  return (dispatch, getState) => {
    const state = getState();
    const {
      videoId
    } = state.video;
    dispatch(requests.deleteTranscript({
      language,
      videoId,
      onSuccess: () => {
        dispatch(uploadTranscript({
          language,
          file: newFile,
          filename: newFilename
        }));
      }
    }));
  };
};
exports.replaceTranscript = replaceTranscript;
var _default = {
  loadVideoData,
  determineVideoSources,
  parseLicense,
  saveVideoData,
  uploadThumbnail,
  importTranscript,
  uploadTranscript,
  deleteTranscript,
  updateTranscriptLanguage,
  replaceTranscript,
  uploadHandout
};
exports.default = _default;
//# sourceMappingURL=video.js.map