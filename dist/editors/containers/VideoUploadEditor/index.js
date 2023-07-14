"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VideoUploader = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactDropzone = require("react-dropzone");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
require("./index.scss");
var _reactRedux = require("react-redux");
var _icons = require("@edx/paragon/icons");
var hooks = _interopRequireWildcard(require("./hooks"));
var _messages = _interopRequireDefault(require("../../messages"));
var editorHooks = _interopRequireWildcard(require("../EditorContainer/hooks"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const VideoUploader = _ref => {
  let {
    onUpload,
    errorMessage
  } = _ref;
  const [, setUploadedFile] = (0, _react.useState)();
  const [textInputValue, setTextInputValue] = (0, _react.useState)('');
  const onUrlUpdatedHook = hooks.onUrlUploaded();
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = (0, _reactDropzone.useDropzone)({
    accept: 'video/*',
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        const uploadfile = acceptedFiles[0];
        setUploadedFile(uploadfile);
        onUpload(uploadfile);
      }
    }
  });
  const handleInputChange = event => {
    setTextInputValue(event.target.value);
  };
  const handleSaveButtonClick = () => {
    onUrlUpdatedHook(textInputValue);
  };
  if (errorMessage) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex flex-column justify-content-center align-items-center text-center error-message",
      children: errorMessage
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", _objectSpread(_objectSpread({
      className: "d-flex flex-column justify-content-center align-items-center p-4 w-100 min-vh-100"
    }, getRootProps()), {}, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: `d-flex flex-column justify-content-center align-items-center gap-2 text-center min-vh-100 w-100
         dropzone-middle ${isDragActive ? 'active' : ''}`,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-flex justify-content-center align-items-center bg-light rounded-circle file-upload",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.FileUpload,
            className: "text-muted"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "d-flex align-items-center justify-content-center gap-1 flex-wrap flex-column pt-5",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: '20px'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.dropVideoFileHere))
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            style: {
              fontSize: '12px'
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.info))
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "d-flex align-items-center mt-3",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: "mx-2 text-dark",
            children: "OR"
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", _objectSpread(_objectSpread({}, getInputProps()), {}, {
        "data-testid": "fileInput"
      }))]
    })), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex video-id-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex video-id-prompt",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          placeholder: "Paste your video ID or URL",
          value: textInputValue,
          onChange: handleInputChange,
          onKeyDown: e => e.key === 'Enter' && handleSaveButtonClick(),
          onClick: event => event.preventDefault()
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: "border-start-0",
          type: "button",
          onClick: handleSaveButtonClick,
          "data-testid": "inputSaveButton",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
            src: _icons.ArrowForward,
            className: "rounded-circle text-dark"
          })
        })]
      })
    })]
  });
};
exports.VideoUploader = VideoUploader;
VideoUploader.propTypes = {
  onUpload: _propTypes.default.func.isRequired,
  errorMessage: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired
};
const VideoUploadEditor = _ref2 => {
  let {
    intl,
    onClose
  } = _ref2;
  const dispatch = (0, _reactRedux.useDispatch)();
  const [errorMessage, setErrorMessage] = (0, _react.useState)(null);
  const handleCancel = () => {
    editorHooks.handleCancel({
      onClose
    });
  };
  const handleDrop = file => {
    if (!file) {
      console.log('No file selected.');
      return;
    }
    const extToMime = {
      mp4: 'video/mp4',
      mov: 'video/quicktime'
    };
    const supportedFormats = Object.keys(extToMime);
    function getFileExtension(filename) {
      return filename.slice(Math.abs(filename.lastIndexOf('.') - 1) + 2);
    }
    const ext = getFileExtension(file.name);
    const type = extToMime[ext] || '';
    const newFile = new File([file], file.name, {
      type
    });
    if (supportedFormats.includes(ext)) {
      hooks.uploadVideo({
        dispatch,
        supportedFiles: [newFile]
      });
    } else {
      const errorMsg = 'Video must be an MP4 or MOV file';
      console.log(errorMsg);
      setErrorMessage(errorMsg);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "marked-area",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex justify-content-end close-button-container",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
        src: _icons.Close,
        iconAs: _paragon.Icon,
        onClick: handleCancel
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(VideoUploader, {
      onUpload: handleDrop,
      errorMessage: errorMessage,
      intl: intl
    })]
  });
};
VideoUploadEditor.propTypes = {
  intl: _i18n.intlShape.isRequired,
  onClose: _propTypes.default.func.isRequired
};
var _default = (0, _i18n.injectIntl)(VideoUploadEditor);
exports.default = _default;
//# sourceMappingURL=index.js.map