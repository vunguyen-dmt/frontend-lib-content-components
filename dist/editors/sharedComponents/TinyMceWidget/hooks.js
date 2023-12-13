"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImages = exports.updateImageDimensions = exports.stringToFragment = exports.state = exports.sourceCodeModalToggle = exports.setupCustomBehavior = exports.setAssetToStaticUrl = exports.selectedImage = exports.replaceStaticwithAsset = exports.removeProtocolFromUrl = exports.prepareEditorRef = exports.parseContentForLabels = exports.openModalWithSelectedImage = exports.matchImageStringsByIdentifiers = exports.imgModalToggle = exports.imageMatchRegex = exports.getImageResizeHandler = exports.getImageFromHtmlString = exports.filterAssets = exports.fetchImageUrls = exports.editorConfig = exports.detectImageMatchingError = exports.addImagesAndDimensionsToRef = void 0;
var _react = require("react");
var _tinyMCEStyles = _interopRequireDefault(require("../../data/constants/tinyMCEStyles"));
var _utils = require("../../utils");
var _pluginConfig = _interopRequireDefault(require("./pluginConfig"));
var _module = _interopRequireWildcard(require("./hooks"));
var _tinyMCE = _interopRequireDefault(require("../../data/constants/tinyMCE"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const state = (0, _utils.StrictDict)({
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isImageModalOpen: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isSourceCodeModalOpen: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  imageSelection: val => (0, _react.useState)(val),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  refReady: val => (0, _react.useState)(val)
});
exports.state = state;
const addImagesAndDimensionsToRef = _ref => {
  let {
    imagesRef,
    assets,
    editorContentHtml
  } = _ref;
  const imagesWithDimensions = _module.filterAssets({
    assets
  }).map(image => {
    const imageFragment = _module.getImageFromHtmlString(editorContentHtml, image.url);
    return _objectSpread(_objectSpread({}, image), {}, {
      width: imageFragment?.width,
      height: imageFragment?.height
    });
  });
  imagesRef.current = imagesWithDimensions;
};
exports.addImagesAndDimensionsToRef = addImagesAndDimensionsToRef;
const useImages = _ref2 => {
  let {
    assets,
    editorContentHtml
  } = _ref2;
  const imagesRef = (0, _react.useRef)([]);
  (0, _react.useEffect)(() => {
    _module.addImagesAndDimensionsToRef({
      imagesRef,
      assets,
      editorContentHtml
    });
  }, []);
  return {
    imagesRef
  };
};
exports.useImages = useImages;
const parseContentForLabels = _ref3 => {
  let {
    editor,
    updateContent
  } = _ref3;
  let content = editor.getContent();
  if (content && content?.length > 0) {
    const parsedLabels = content.split(/<label>|<\/label>/gm);
    let updatedContent;
    parsedLabels.forEach((label, i) => {
      if (!label.startsWith('<') && !label.endsWith('>')) {
        let previousLabel = parsedLabels[i - 1];
        let nextLabel = parsedLabels[i + 1];
        if (!previousLabel.endsWith('<p>')) {
          previousLabel = `${previousLabel}</p><p>`;
          updatedContent = content.replace(parsedLabels[i - 1], previousLabel);
          content = updatedContent;
          updateContent(content);
        }
        if (!nextLabel.startsWith('</p>')) {
          nextLabel = `</p><p>${nextLabel}`;
          updatedContent = content.replace(parsedLabels[i + 1], nextLabel);
          content = updatedContent;
          updateContent(content);
        }
      }
    });
  } else {
    updateContent(content);
  }
};
exports.parseContentForLabels = parseContentForLabels;
const replaceStaticwithAsset = _ref4 => {
  let {
    editor,
    imageUrls,
    editorType,
    lmsEndpointUrl,
    updateContent
  } = _ref4;
  let content = editor.getContent();
  const imageSrcs = content.split('src="');
  imageSrcs.forEach(src => {
    const currentContent = content;
    let staticFullUrl;
    const isStatic = src.startsWith('/static/');
    const isExpandableAsset = src.startsWith('/assets/') && editorType === 'expandable';
    if ((isStatic || isExpandableAsset) && imageUrls.length > 0) {
      const assetSrc = src.substring(0, src.indexOf('"'));
      const assetName = assetSrc.replace(/\/assets\/.+[^/]\//g, '');
      const staticName = assetSrc.substring(8);
      imageUrls.forEach(url => {
        if (isExpandableAsset && assetName === url.displayName) {
          staticFullUrl = `${lmsEndpointUrl}${url.staticFullUrl}`;
        } else if (staticName === url.displayName) {
          staticFullUrl = url.staticFullUrl;
          if (isExpandableAsset) {
            staticFullUrl = `${lmsEndpointUrl}${url.staticFullUrl}`;
          }
        }
      });
      if (staticFullUrl) {
        const currentSrc = src.substring(0, src.indexOf('"'));
        content = currentContent.replace(currentSrc, staticFullUrl);
        if (editorType === 'expandable') {
          updateContent(content);
        } else {
          editor.setContent(content);
        }
      }
    }
  });
};
exports.replaceStaticwithAsset = replaceStaticwithAsset;
const getImageResizeHandler = _ref5 => {
  let {
    editor,
    imagesRef,
    setImage
  } = _ref5;
  return () => {
    const {
      src,
      alt,
      width,
      height
    } = editor.selection.getNode();
    imagesRef.current = _module.updateImageDimensions({
      images: imagesRef.current,
      url: src,
      width,
      height
    }).result;
    setImage({
      externalUrl: src,
      altText: alt,
      width,
      height
    });
  };
};
exports.getImageResizeHandler = getImageResizeHandler;
const setupCustomBehavior = _ref6 => {
  let {
    updateContent,
    openImgModal,
    openSourceCodeModal,
    editorType,
    imageUrls,
    images,
    setImage,
    lmsEndpointUrl
  } = _ref6;
  return editor => {
    // image upload button
    editor.ui.registry.addButton(_tinyMCE.default.buttons.imageUploadButton, {
      icon: 'image',
      tooltip: 'Add Image',
      onAction: openImgModal
    });
    // editing an existing image
    editor.ui.registry.addButton(_tinyMCE.default.buttons.editImageSettings, {
      icon: 'image',
      tooltip: 'Edit Image Settings',
      onAction: _module.openModalWithSelectedImage({
        editor,
        images,
        setImage,
        openImgModal
      })
    });
    // overriding the code plugin's icon with 'HTML' text
    editor.ui.registry.addButton(_tinyMCE.default.buttons.code, {
      text: 'HTML',
      tooltip: 'Source code',
      onAction: openSourceCodeModal
    });
    // add a custom simple inline code block formatter.
    const setupCodeFormatting = api => {
      editor.formatter.formatChanged('code', active => api.setActive(active));
    };
    const toggleCodeFormatting = () => {
      editor.formatter.toggle('code');
      editor.undoManager.add();
      editor.focus();
    };
    editor.ui.registry.addToggleButton(_tinyMCE.default.buttons.codeBlock, {
      icon: 'sourcecode',
      tooltip: 'Code Block',
      onAction: toggleCodeFormatting,
      onSetup: setupCodeFormatting
    });
    // add a custom simple inline label formatter.
    const toggleLabelFormatting = () => {
      editor.execCommand('mceToggleFormat', false, 'label');
    };
    editor.ui.registry.addIcon('textToSpeech', _tinyMCE.default.textToSpeechIcon);
    editor.ui.registry.addButton('customLabelButton', {
      icon: 'textToSpeech',
      text: 'Label',
      tooltip: 'Apply a "Question" label to specific text, recognized by screen readers. Recommended to improve accessibility.',
      onAction: toggleLabelFormatting
    });
    if (editorType === 'expandable') {
      editor.on('init', () => {
        _module.replaceStaticwithAsset({
          editor,
          imageUrls,
          editorType,
          lmsEndpointUrl,
          updateContent
        });
      });
    }
    editor.on('ExecCommand', e => {
      if (editorType === 'text' && e.command === 'mceFocus') {
        _module.replaceStaticwithAsset({
          editor,
          imageUrls
        });
      }
      if (e.command === 'RemoveFormat') {
        editor.formatter.remove('blockquote');
        editor.formatter.remove('label');
      }
    });
    // after resizing an image in the editor, synchronize React state and ref
    editor.on('ObjectResized', getImageResizeHandler({
      editor,
      imagesRef: images,
      setImage
    }));
  };
};

// imagetools_cors_hosts needs a protocol-sanatized url
exports.setupCustomBehavior = setupCustomBehavior;
const removeProtocolFromUrl = url => url.replace(/^https?:\/\//, '');
exports.removeProtocolFromUrl = removeProtocolFromUrl;
const editorConfig = _ref7 => {
  let {
    editorType,
    setEditorRef,
    editorContentHtml,
    images,
    lmsEndpointUrl,
    studioEndpointUrl,
    isLibrary,
    placeholder,
    initializeEditor,
    openImgModal,
    openSourceCodeModal,
    setSelection,
    updateContent,
    content,
    minHeight
  } = _ref7;
  const {
    toolbar,
    config,
    plugins,
    imageToolbar,
    quickbarsInsertToolbar,
    quickbarsSelectionToolbar
  } = (0, _pluginConfig.default)({
    isLibrary,
    placeholder,
    editorType
  });
  return {
    onInit: (evt, editor) => {
      setEditorRef(editor);
      if (editorType === 'text') {
        initializeEditor();
      }
    },
    initialValue: editorContentHtml || '',
    init: _objectSpread(_objectSpread({}, config), {}, {
      skin: false,
      content_css: false,
      content_style: _tinyMCEStyles.default,
      min_height: minHeight,
      contextmenu: 'link table',
      document_base_url: lmsEndpointUrl,
      imagetools_cors_hosts: [removeProtocolFromUrl(lmsEndpointUrl), removeProtocolFromUrl(studioEndpointUrl)],
      imagetools_toolbar: imageToolbar,
      formats: {
        label: {
          inline: 'label'
        }
      },
      setup: _module.setupCustomBehavior({
        editorType,
        updateContent,
        openImgModal,
        openSourceCodeModal,
        lmsEndpointUrl,
        setImage: setSelection,
        content,
        images,
        imageUrls: _module.fetchImageUrls(images)
      }),
      quickbars_insert_toolbar: quickbarsInsertToolbar,
      quickbars_selection_toolbar: quickbarsSelectionToolbar,
      quickbars_image_toolbar: false,
      toolbar,
      plugins,
      valid_children: '+body[style]',
      valid_elements: '*[*]',
      entity_encoding: 'utf-8'
    })
  };
};
exports.editorConfig = editorConfig;
const prepareEditorRef = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const editorRef = (0, _react.useRef)(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setEditorRef = (0, _react.useCallback)(ref => {
    editorRef.current = ref;
  }, []);
  const [refReady, setRefReady] = _module.state.refReady(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => setRefReady(true), []);
  return {
    editorRef,
    refReady,
    setEditorRef
  };
};
exports.prepareEditorRef = prepareEditorRef;
const imgModalToggle = () => {
  const [isImgOpen, setIsOpen] = _module.state.isImageModalOpen(false);
  return {
    isImgOpen,
    openImgModal: () => setIsOpen(true),
    closeImgModal: () => setIsOpen(false)
  };
};
exports.imgModalToggle = imgModalToggle;
const sourceCodeModalToggle = editorRef => {
  const [isSourceCodeOpen, setIsOpen] = _module.state.isSourceCodeModalOpen(false);
  return {
    isSourceCodeOpen,
    openSourceCodeModal: () => setIsOpen(true),
    closeSourceCodeModal: () => {
      setIsOpen(false);
      editorRef.current.focus();
    }
  };
};

/**
 * const imageMatchRegex
 *
 * Image urls and ids used in the TinyMceEditor vary wildly, with different base urls,
 * different lengths and constituent parts, and replacement of some "/" with "@".
 * Common are the keys "asset-v1", "type", and "block", each holding a value after some separator.
 * This regex captures only the values for these keys using capture groups, which can be used for matching.
 */
exports.sourceCodeModalToggle = sourceCodeModalToggle;
const imageMatchRegex = /asset-v1.(.*).type.(.*).block.(.*)/;

/**
 * function matchImageStringsByIdentifiers
 *
 * matches two strings by comparing their regex capture groups using the `imageMatchRegex`
 */
exports.imageMatchRegex = imageMatchRegex;
const matchImageStringsByIdentifiers = (a, b) => {
  if (!a || !b || !(typeof a === 'string') || !(typeof b === 'string')) {
    return null;
  }
  const matchA = JSON.stringify(a.match(imageMatchRegex)?.slice?.(1));
  const matchB = JSON.stringify(b.match(imageMatchRegex)?.slice?.(1));
  return matchA && matchA === matchB;
};
exports.matchImageStringsByIdentifiers = matchImageStringsByIdentifiers;
const stringToFragment = htmlString => document.createRange().createContextualFragment(htmlString);
exports.stringToFragment = stringToFragment;
const getImageFromHtmlString = (htmlString, imageSrc) => {
  const images = stringToFragment(htmlString)?.querySelectorAll('img') || [];
  return Array.from(images).find(img => matchImageStringsByIdentifiers(img.src || '', imageSrc));
};
exports.getImageFromHtmlString = getImageFromHtmlString;
const detectImageMatchingError = _ref8 => {
  let {
    matchingImages,
    tinyMceHTML
  } = _ref8;
  if (!matchingImages.length) {
    return true;
  }
  if (matchingImages.length > 1) {
    return true;
  }
  if (!matchImageStringsByIdentifiers(matchingImages[0].id, tinyMceHTML.src)) {
    return true;
  }
  if (!matchingImages[0].width || !matchingImages[0].height) {
    return true;
  }
  if (matchingImages[0].width !== tinyMceHTML.width) {
    return true;
  }
  if (matchingImages[0].height !== tinyMceHTML.height) {
    return true;
  }
  return false;
};
exports.detectImageMatchingError = detectImageMatchingError;
const openModalWithSelectedImage = _ref9 => {
  let {
    editor,
    images,
    setImage,
    openImgModal
  } = _ref9;
  return () => {
    const tinyMceHTML = editor.selection.getNode();
    const {
      src: mceSrc
    } = tinyMceHTML;
    const matchingImages = images.current.filter(image => matchImageStringsByIdentifiers(image.id, mceSrc));
    const imageMatchingErrorDetected = detectImageMatchingError({
      tinyMceHTML,
      matchingImages
    });
    const width = imageMatchingErrorDetected ? null : matchingImages[0]?.width;
    const height = imageMatchingErrorDetected ? null : matchingImages[0]?.height;
    setImage({
      externalUrl: tinyMceHTML.src,
      altText: tinyMceHTML.alt,
      width,
      height
    });
    openImgModal();
  };
};
exports.openModalWithSelectedImage = openModalWithSelectedImage;
const filterAssets = _ref10 => {
  let {
    assets
  } = _ref10;
  let images = [];
  const assetsList = Object.values(assets);
  if (assetsList.length > 0) {
    images = assetsList.filter(asset => asset?.contentType?.startsWith('image/'));
  }
  return images;
};
exports.filterAssets = filterAssets;
const setAssetToStaticUrl = _ref11 => {
  let {
    editorValue,
    assets,
    lmsEndpointUrl
  } = _ref11;
  /* For assets to remain usable across course instances, we convert their url to be course-agnostic.
   * For example, /assets/course/<asset hash>/filename gets converted to /static/filename. This is
   * important for rerunning courses and importing/exporting course as the /static/ part of the url
   * allows the asset to be mapped to the new course run.
  */

  // TODO: should probably move this to when the assets are being looped through in the off chance that
  // some of the text in the editor contains the lmsEndpointUrl
  const regExLmsEndpointUrl = RegExp(lmsEndpointUrl, 'g');
  let content = editorValue.replace(regExLmsEndpointUrl, '');
  const assetUrls = [];
  const assetsList = Object.values(assets);
  assetsList.forEach(asset => {
    assetUrls.push({
      portableUrl: asset.portableUrl,
      displayName: asset.displayName
    });
  });
  const assetSrcs = typeof content === 'string' ? content.split(/(src="|src=&quot;|href="|href=&quot)/g) : [];
  assetSrcs.forEach(src => {
    if (src.startsWith('/asset') && assetUrls.length > 0) {
      const assetBlockName = src.substring(src.indexOf('@') + 1, src.search(/("|&quot;)/));
      const nameFromEditorSrc = assetBlockName.substring(assetBlockName.indexOf('@') + 1);
      const nameFromStudioSrc = assetBlockName.substring(assetBlockName.indexOf('/') + 1);
      let portableUrl;
      assetUrls.forEach(url => {
        const displayName = url.displayName.replace(/\s/g, '_');
        if (displayName === nameFromEditorSrc || displayName === nameFromStudioSrc) {
          portableUrl = url.portableUrl;
        }
      });
      if (portableUrl) {
        const currentSrc = src.substring(0, src.search(/("|&quot;)/));
        const updatedContent = content.replace(currentSrc, portableUrl);
        content = updatedContent;
      }
    }
  });
  return content;
};
exports.setAssetToStaticUrl = setAssetToStaticUrl;
const fetchImageUrls = images => {
  const imageUrls = [];
  images.current.forEach(image => {
    imageUrls.push({
      staticFullUrl: image.staticFullUrl,
      displayName: image.displayName
    });
  });
  return imageUrls;
};
exports.fetchImageUrls = fetchImageUrls;
const selectedImage = val => {
  const [selection, setSelection] = _module.state.imageSelection(val);
  return {
    clearSelection: () => setSelection(null),
    selection,
    setSelection
  };
};

/**
 * function updateImageDimensions
 *
 * Updates one images' dimensions in an array by identifying one image via a url string match
 * that includes asset-v1, type, and block. Returns a new array.
 *
 * @param {Object[]} images - [{ id, ...other }]
 * @param {string} url
 * @param {number} width
 * @param {number} height
 *
 * @returns {Object} { result, foundMatch }
 */
exports.selectedImage = selectedImage;
const updateImageDimensions = _ref12 => {
  let {
    images,
    url,
    width,
    height
  } = _ref12;
  let foundMatch = false;
  const result = images.map(image => {
    const imageIdentifier = image.id || image.url || image.src || image.externalUrl;
    const isMatch = matchImageStringsByIdentifiers(imageIdentifier, url);
    if (isMatch) {
      foundMatch = true;
      return _objectSpread(_objectSpread({}, image), {}, {
        width,
        height
      });
    }
    return image;
  });
  return {
    result,
    foundMatch
  };
};
exports.updateImageDimensions = updateImageDimensions;
//# sourceMappingURL=hooks.js.map