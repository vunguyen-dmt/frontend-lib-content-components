"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsString = exports.imgProps = exports.hooks = exports.default = exports.ImageUploadModal = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _tinyMCE = _interopRequireDefault(require("../../data/constants/tinyMCE"));
var _ImageSettingsModal = _interopRequireDefault(require("./ImageSettingsModal"));
var _SelectImageModal = _interopRequireDefault(require("./SelectImageModal"));
var _module = _interopRequireWildcard(require("."));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const propsString = props => Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ');
exports.propsString = propsString;
const imgProps = _ref => {
  let {
    settings,
    selection,
    lmsEndpointUrl,
    editorType
  } = _ref;
  let url = selection.externalUrl;
  if (url.startsWith(lmsEndpointUrl) && editorType !== 'expandable') {
    const sourceEndIndex = lmsEndpointUrl.length;
    url = url.substring(sourceEndIndex);
  }
  return {
    src: url,
    alt: settings.isDecorative ? '' : settings.altText,
    width: settings.dimensions.width,
    height: settings.dimensions.height
  };
};
exports.imgProps = imgProps;
const hooks = {
  createSaveCallback: _ref2 => {
    let {
      close,
      editorRef,
      editorType,
      setSelection,
      selection,
      lmsEndpointUrl
    } = _ref2;
    return settings => {
      editorRef.current.execCommand(_tinyMCE.default.commands.insertContent, false, _module.hooks.imgTag({
        settings,
        selection,
        lmsEndpointUrl,
        editorType
      }));
      setSelection(null);
      close();
    };
  },
  onClose: _ref3 => {
    let {
      clearSelection,
      close
    } = _ref3;
    return () => {
      clearSelection();
      close();
    };
  },
  imgTag: _ref4 => {
    let {
      settings,
      selection,
      lmsEndpointUrl,
      editorType
    } = _ref4;
    const props = _module.imgProps({
      settings,
      selection,
      lmsEndpointUrl,
      editorType
    });
    return `<img ${propsString(props)} />`;
  }
};
exports.hooks = hooks;
const ImageUploadModal = _ref5 => {
  let {
    // eslint-disable-next-line
    editorRef,
    isOpen,
    close,
    clearSelection,
    selection,
    setSelection,
    images,
    editorType,
    lmsEndpointUrl
  } = _ref5;
  if (selection) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ImageSettingsModal.default, {
      isOpen,
      close: _module.hooks.onClose({
        clearSelection,
        close
      }),
      selection,
      saveToEditor: _module.hooks.createSaveCallback({
        close,
        editorRef,
        editorType,
        selection,
        setSelection,
        lmsEndpointUrl
      }),
      returnToSelection: clearSelection
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectImageModal.default, {
    isOpen,
    close,
    setSelection,
    clearSelection,
    images
  });
};
exports.ImageUploadModal = ImageUploadModal;
ImageUploadModal.defaultProps = {
  editorRef: null,
  editorType: null,
  selection: null
};
ImageUploadModal.propTypes = {
  clearSelection: _propTypes.default.func.isRequired,
  close: _propTypes.default.func.isRequired,
  editorRef: _propTypes.default.oneOfType([_propTypes.default.func,
  // eslint-disable-next-line react/forbid-prop-types
  _propTypes.default.shape({
    current: _propTypes.default.any
  })]),
  isOpen: _propTypes.default.bool.isRequired,
  selection: _propTypes.default.shape({
    url: _propTypes.default.string,
    externalUrl: _propTypes.default.string,
    altText: _propTypes.default.bool
  }),
  setSelection: _propTypes.default.func.isRequired,
  images: _propTypes.default.shape({}).isRequired,
  lmsEndpointUrl: _propTypes.default.string.isRequired,
  editorType: _propTypes.default.string
};
var _default = (0, _i18n.injectIntl)(ImageUploadModal);
exports.default = _default;
//# sourceMappingURL=index.js.map