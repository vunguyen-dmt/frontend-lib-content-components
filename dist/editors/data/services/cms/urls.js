"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoTranscripts = exports.videoFeatures = exports.unit = exports.thumbnailUpload = exports.returnUrl = exports.replaceTranscript = exports.mediaTranscriptURL = exports.libraryV1 = exports.downloadVideoTranscriptURL = exports.downloadVideoHandoutUrl = exports.courseVideos = exports.courseDetailsUrl = exports.courseAssets = exports.courseAdvanceSettings = exports.checkTranscriptsForImport = exports.blockStudioView = exports.blockAncestor = exports.block = void 0;
const libraryV1 = _ref => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref;
  return `${studioEndpointUrl}/library/${learningContextId}`;
};
exports.libraryV1 = libraryV1;
const unit = _ref2 => {
  let {
    studioEndpointUrl,
    unitUrl
  } = _ref2;
  return `${studioEndpointUrl}/container/${unitUrl.data.ancestors[0]?.id}`;
};
exports.unit = unit;
const returnUrl = _ref3 => {
  let {
    studioEndpointUrl,
    unitUrl,
    learningContextId
  } = _ref3;
  if (learningContextId && learningContextId.includes('library-v1')) {
    // when the learning context is a v1 library, return to the library page
    return libraryV1({
      studioEndpointUrl,
      learningContextId
    });
  }
  // when the learning context is a course, return to the unit page
  return unitUrl ? unit({
    studioEndpointUrl,
    unitUrl
  }) : '';
};
exports.returnUrl = returnUrl;
const block = _ref4 => {
  let {
    studioEndpointUrl,
    blockId
  } = _ref4;
  return `${studioEndpointUrl}/xblock/${blockId}`;
};
exports.block = block;
const blockAncestor = _ref5 => {
  let {
    studioEndpointUrl,
    blockId
  } = _ref5;
  return `${block({
    studioEndpointUrl,
    blockId
  })}?fields=ancestorInfo`;
};
exports.blockAncestor = blockAncestor;
const blockStudioView = _ref6 => {
  let {
    studioEndpointUrl,
    blockId
  } = _ref6;
  return `${block({
    studioEndpointUrl,
    blockId
  })}/studio_view`;
};
exports.blockStudioView = blockStudioView;
const courseAssets = _ref7 => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref7;
  return `${studioEndpointUrl}/assets/${learningContextId}/?page_size=500`;
};
exports.courseAssets = courseAssets;
const thumbnailUpload = _ref8 => {
  let {
    studioEndpointUrl,
    learningContextId,
    videoId
  } = _ref8;
  return `${studioEndpointUrl}/video_images/${learningContextId}/${videoId}`;
};
exports.thumbnailUpload = thumbnailUpload;
const videoTranscripts = _ref9 => {
  let {
    studioEndpointUrl,
    blockId
  } = _ref9;
  return `${block({
    studioEndpointUrl,
    blockId
  })}/handler/studio_transcript/translation`;
};
exports.videoTranscripts = videoTranscripts;
const downloadVideoTranscriptURL = _ref10 => {
  let {
    studioEndpointUrl,
    blockId,
    language
  } = _ref10;
  return `${videoTranscripts({
    studioEndpointUrl,
    blockId
  })}?language_code=${language}`;
};
exports.downloadVideoTranscriptURL = downloadVideoTranscriptURL;
const mediaTranscriptURL = _ref11 => {
  let {
    studioEndpointUrl,
    transcriptUrl
  } = _ref11;
  return `${studioEndpointUrl}${transcriptUrl}`;
};
exports.mediaTranscriptURL = mediaTranscriptURL;
const downloadVideoHandoutUrl = _ref12 => {
  let {
    studioEndpointUrl,
    handout
  } = _ref12;
  return `${studioEndpointUrl}${handout}`;
};
exports.downloadVideoHandoutUrl = downloadVideoHandoutUrl;
const courseDetailsUrl = _ref13 => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref13;
  return `${studioEndpointUrl}/settings/details/${learningContextId}`;
};
exports.courseDetailsUrl = courseDetailsUrl;
const checkTranscriptsForImport = _ref14 => {
  let {
    studioEndpointUrl,
    parameters
  } = _ref14;
  return `${studioEndpointUrl}/transcripts/check?data=${parameters}`;
};
exports.checkTranscriptsForImport = checkTranscriptsForImport;
const replaceTranscript = _ref15 => {
  let {
    studioEndpointUrl,
    parameters
  } = _ref15;
  return `${studioEndpointUrl}/transcripts/replace?data=${parameters}`;
};
exports.replaceTranscript = replaceTranscript;
const courseAdvanceSettings = _ref16 => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref16;
  return `${studioEndpointUrl}/api/contentstore/v0/advanced_settings/${learningContextId}`;
};
exports.courseAdvanceSettings = courseAdvanceSettings;
const videoFeatures = _ref17 => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref17;
  return `${studioEndpointUrl}/video_features/${learningContextId}`;
};
exports.videoFeatures = videoFeatures;
const courseVideos = _ref18 => {
  let {
    studioEndpointUrl,
    learningContextId
  } = _ref18;
  return `${studioEndpointUrl}/videos/${learningContextId}`;
};
exports.courseVideos = courseVideos;
//# sourceMappingURL=urls.js.map