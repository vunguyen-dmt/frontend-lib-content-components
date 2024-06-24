"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18n = require("@edx/frontend-platform/i18n");
const messages = (0, _i18n.defineMessages)({
  couldNotFindEditor: {
    id: 'authoring.editorpage.selecteditor.error',
    defaultMessage: 'Error: Could Not find Editor',
    description: 'Error Message Dispayed When An unsopported Editor is desired in V2'
  },
  dropVideoFileHere: {
    defaultMessage: 'Drag and drop video here or click to upload',
    id: 'VideoUploadEditor.dropVideoFileHere',
    description: 'Display message for Drag and Drop zone'
  },
  browse: {
    defaultMessage: 'Browse files',
    id: 'VideoUploadEditor.browse',
    description: 'Display message for browse files button'
  },
  info: {
    id: 'VideoUploadEditor.uploadInfo',
    defaultMessage: 'Upload MP4 or MOV files (5 GB max)',
    description: 'Info message for supported formats'
  }
});
var _default = exports.default = messages;
//# sourceMappingURL=messages.js.map