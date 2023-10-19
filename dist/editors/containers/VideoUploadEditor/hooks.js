"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadVideo = exports.onUrlUploaded = exports.onFileUploaded = exports.navigateTo = exports.default = void 0;
var requests = _interopRequireWildcard(require("../../data/redux/thunkActions/requests"));
var _module = _interopRequireWildcard(require("./hooks"));
var _redux = require("../../data/redux");
var _store = _interopRequireDefault(require("../../data/store"));
var appHooks = _interopRequireWildcard(require("../../hooks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  navigateTo
} = appHooks;
exports.navigateTo = navigateTo;
const uploadVideo = async _ref => {
  let {
    dispatch,
    supportedFiles
  } = _ref;
  const data = {
    files: []
  };
  supportedFiles.forEach(file => {
    data.files.push({
      file_name: file.name,
      content_type: file.type
    });
  });
  const onFileUploadedHook = _module.onFileUploaded();
  dispatch(await requests.uploadVideo({
    data,
    onSuccess: async response => {
      const {
        files
      } = response.data;
      await Promise.all(Object.values(files).map(async fileObj => {
        const fileName = fileObj.file_name;
        const edxVideoId = fileObj.edx_video_id;
        const uploadUrl = fileObj.upload_url;
        const uploadFile = supportedFiles.find(file => file.name === fileName);
        if (!uploadFile) {
          console.error(`Could not find file object with name "${fileName}" in supportedFiles array.`);
          return;
        }
        const formData = new FormData();
        formData.append('uploaded-file', uploadFile);
        await fetch(uploadUrl, {
          method: 'PUT',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => onFileUploadedHook(edxVideoId)).catch(error => console.error('Error uploading file:', error));
      }));
    }
  }));
};
exports.uploadVideo = uploadVideo;
const onFileUploaded = () => {
  const state = _store.default.getState();
  const learningContextId = _redux.selectors.app.learningContextId(state);
  const blockId = _redux.selectors.app.blockId(state);
  return edxVideoId => navigateTo(`/course/${learningContextId}/editor/video/${blockId}?selectedVideoId=${edxVideoId}`);
};
exports.onFileUploaded = onFileUploaded;
const onUrlUploaded = () => {
  const state = _store.default.getState();
  const learningContextId = _redux.selectors.app.learningContextId(state);
  const blockId = _redux.selectors.app.blockId(state);
  return videoUrl => navigateTo(`/course/${learningContextId}/editor/video/${blockId}?selectedVideoUrl=${videoUrl}`);
};
exports.onUrlUploaded = onUrlUploaded;
var _default = {
  uploadVideo
};
exports.default = _default;
//# sourceMappingURL=hooks.js.map