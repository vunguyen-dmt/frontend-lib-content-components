"use strict";

var _testUtils = require("../../../testUtils");
var _tinyMCE = _interopRequireDefault(require("../../data/constants/tinyMCE"));
var _utils = require("../../utils");
var _pluginConfig = _interopRequireDefault(require("./pluginConfig"));
var _module = _interopRequireWildcard(require("./hooks"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
jest.mock('react', () => _objectSpread(_objectSpread({}, jest.requireActual('react')), {}, {
  createRef: jest.fn(val => ({
    ref: val
  })),
  useRef: jest.fn(val => ({
    current: val
  })),
  useEffect: jest.fn(),
  useCallback: (cb, prereqs) => ({
    cb,
    prereqs
  })
}));
const state = new _testUtils.MockUseState(_module);
const moduleKeys = (0, _utils.keyStore)(_module);
let hook;
let output;
const mockNode = {
  src: 'sOmEuRl.cOm',
  alt: 'aLt tExt',
  width: 2022,
  height: 1619
};
describe('TinyMceEditor hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('state hooks', () => {
    state.testGetter(state.keys.isImageModalOpen);
    state.testGetter(state.keys.isSourceCodeModalOpen);
    state.testGetter(state.keys.imageSelection);
  });
  describe('non-state hooks', () => {
    beforeEach(() => {
      state.mock();
    });
    afterEach(() => {
      state.restore();
    });
    describe('setupCustomBehavior', () => {
      test('It calls addButton and addToggleButton in the editor, but openModal is not called', () => {
        const addButton = jest.fn();
        const addIcon = jest.fn();
        const addToggleButton = jest.fn();
        const openImgModal = jest.fn();
        const openSourceCodeModal = jest.fn();
        const setImage = jest.fn();
        const updateContent = jest.fn();
        const editorType = 'expandable';
        const lmsEndpointUrl = 'sOmEvaLue.cOm';
        const editor = {
          ui: {
            registry: {
              addButton,
              addToggleButton,
              addIcon
            }
          },
          on: jest.fn()
        };
        const mockOpenModalWithImage = args => ({
          openModalWithSelectedImage: args
        });
        const expectedSettingsAction = mockOpenModalWithImage({
          editor,
          setImage,
          openImgModal
        });
        const toggleCodeFormatting = expect.any(Function);
        const toggleLabelFormatting = expect.any(Function);
        const setupCodeFormatting = expect.any(Function);
        jest.spyOn(_module, moduleKeys.openModalWithSelectedImage).mockImplementationOnce(mockOpenModalWithImage);
        output = _module.setupCustomBehavior({
          editorType,
          updateContent,
          openImgModal,
          openSourceCodeModal,
          setImage,
          lmsEndpointUrl
        })(editor);
        expect(addIcon.mock.calls).toEqual([['textToSpeech', _tinyMCE.default.textToSpeechIcon]]);
        expect(addButton.mock.calls).toEqual([[_tinyMCE.default.buttons.imageUploadButton, {
          icon: 'image',
          tooltip: 'Add Image',
          onAction: openImgModal
        }], [_tinyMCE.default.buttons.editImageSettings, {
          icon: 'image',
          tooltip: 'Edit Image Settings',
          onAction: expectedSettingsAction
        }], [_tinyMCE.default.buttons.code, {
          text: 'HTML',
          tooltip: 'Source code',
          onAction: openSourceCodeModal
        }], ['customLabelButton', {
          icon: 'textToSpeech',
          text: 'Label',
          tooltip: 'Apply a "Question" label to specific text, recognized by screen readers. Recommended to improve accessibility.',
          onAction: toggleLabelFormatting
        }]]);
        expect(addToggleButton.mock.calls).toEqual([[_tinyMCE.default.buttons.codeBlock, {
          icon: 'sourcecode',
          tooltip: 'Code Block',
          onAction: toggleCodeFormatting,
          onSetup: setupCodeFormatting
        }]]);
        expect(openImgModal).not.toHaveBeenCalled();
        expect(editor.on).toHaveBeenCalled();
      });
    });
    describe('parseContentForLabels', () => {
      test('it calls getContent and updateQuestion for some content', () => {
        const editor = {
          getContent: jest.fn(() => '<p><label>Some question label</label></p><p>some content <label>around a label</label> followed by more text</p><img src="/static/soMEImagEURl1.jpeg"/>')
        };
        const updateContent = jest.fn();
        const content = '<p><label>Some question label</label></p><p>some content </p><p><label>around a label</label></p><p> followed by more text</p><img src="/static/soMEImagEURl1.jpeg"/>';
        _module.parseContentForLabels({
          editor,
          updateContent
        });
        expect(editor.getContent).toHaveBeenCalled();
        expect(updateContent).toHaveBeenCalledWith(content);
      });
      test('it calls getContent and updateQuestion for empty content', () => {
        const editor = {
          getContent: jest.fn(() => '')
        };
        const updateContent = jest.fn();
        const content = '';
        _module.parseContentForLabels({
          editor,
          updateContent
        });
        expect(editor.getContent).toHaveBeenCalled();
        expect(updateContent).toHaveBeenCalledWith(content);
      });
    });
    describe('replaceStaticwithAsset', () => {
      test('it calls getContent and setContent for text editor', () => {
        const editor = {
          getContent: jest.fn(() => '<img src="/static/soMEImagEURl1.jpeg"/>'),
          setContent: jest.fn()
        };
        const imageUrls = [{
          staticFullUrl: '/assets/soMEImagEURl1.jpeg',
          displayName: 'soMEImagEURl1.jpeg'
        }];
        const lmsEndpointUrl = 'sOmEvaLue.cOm';
        _module.replaceStaticwithAsset({
          editor,
          imageUrls,
          lmsEndpointUrl
        });
        expect(editor.getContent).toHaveBeenCalled();
        expect(editor.setContent).toHaveBeenCalled();
      });
      test('it calls getContent and updateContent for expandable editor', () => {
        const editor = {
          getContent: jest.fn(() => '<img src="/static/soMEImagEURl1.jpeg"/>')
        };
        const imageUrls = [{
          staticFullUrl: '/assets/soMEImagEURl1.jpeg',
          displayName: 'soMEImagEURl1.jpeg'
        }];
        const lmsEndpointUrl = 'sOmEvaLue.cOm';
        const editorType = 'expandable';
        const updateContent = jest.fn();
        _module.replaceStaticwithAsset({
          editor,
          imageUrls,
          editorType,
          lmsEndpointUrl,
          updateContent
        });
        expect(editor.getContent).toHaveBeenCalled();
        expect(updateContent).toHaveBeenCalled();
      });
    });
    describe('setAssetToStaticUrl', () => {
      it('returns content with updated img links', () => {
        const editorValue = '<img src="/asset@asset-block/soME_ImagE_URl1"/> <a href="/asset@soMEImagEURl">testing link</a>';
        const assets = [{
          portableUrl: '/static/soMEImagEURl',
          displayName: 'soMEImagEURl'
        }, {
          portableUrl: '/static/soME_ImagE_URl1',
          displayName: 'soME ImagE URl1'
        }];
        const lmsEndpointUrl = 'sOmEvaLue.cOm';
        const content = _module.setAssetToStaticUrl({
          editorValue,
          assets,
          lmsEndpointUrl
        });
        expect(content).toEqual('<img src="/static/soME_ImagE_URl1"/> <a href="/static/soMEImagEURl">testing link</a>');
      });
    });
    describe('editorConfig', () => {
      const props = {
        textValue: null,
        editorType: 'text',
        lmsEndpointUrl: 'sOmEuRl.cOm',
        studioEndpointUrl: 'sOmEoThEruRl.cOm',
        images: [{
          staTICUrl: '/assets/sOmEuiMAge'
        }],
        isLibrary: false
      };
      const evt = 'fakeEvent';
      const editor = 'myEditor';
      const setupCustomBehavior = args => ({
        setupCustomBehavior: args
      });
      beforeEach(() => {
        props.setEditorRef = jest.fn();
        props.openImgModal = jest.fn();
        props.openSourceCodeModal = jest.fn();
        props.initializeEditor = jest.fn();
        props.updateContent = jest.fn();
        jest.spyOn(_module, moduleKeys.setupCustomBehavior).mockImplementationOnce(setupCustomBehavior);
        output = _module.editorConfig(props);
      });
      describe('text editor plugins and toolbar', () => {
        test('It configures plugins and toolbars correctly', () => {
          const pluginProps = {
            isLibrary: props.isLibrary,
            editorType: props.editorType
          };
          expect(output.init.plugins).toEqual((0, _pluginConfig.default)(pluginProps).plugins);
          expect(output.init.imagetools_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).imageToolbar);
          expect(output.init.toolbar).toEqual((0, _pluginConfig.default)(pluginProps).toolbar);
          Object.keys((0, _pluginConfig.default)(pluginProps).config).forEach(key => {
            expect(output.init[key]).toEqual((0, _pluginConfig.default)(pluginProps).config[key]);
          });
          // Commented out as we investigate whether this is only needed for image proxy
          // expect(output.init.imagetools_cors_hosts).toMatchObject([props.lmsEndpointUrl]);
        });
      });

      describe('text editor plugins and toolbar for content library', () => {
        test('It configures plugins and toolbars correctly', () => {
          const pluginProps = {
            isLibrary: true,
            editorType: props.editorType
          };
          output = _module.editorConfig(_objectSpread(_objectSpread({}, props), {}, {
            isLibrary: true
          }));
          expect(output.init.plugins).toEqual((0, _pluginConfig.default)(pluginProps).plugins);
          expect(output.init.imagetools_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).imageToolbar);
          expect(output.init.toolbar).toEqual((0, _pluginConfig.default)(pluginProps).toolbar);
          expect(output.init.quickbars_insert_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsInsertToolbar);
          expect(output.init.quickbars_selection_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsSelectionToolbar);
          Object.keys((0, _pluginConfig.default)(pluginProps).config).forEach(key => {
            expect(output.init[key]).toEqual((0, _pluginConfig.default)(pluginProps).config[key]);
          });
        });
      });
      describe('problem editor question plugins and toolbar', () => {
        test('It configures plugins and toolbars correctly', () => {
          const pluginProps = {
            isLibrary: props.isLibrary,
            editorType: 'question',
            placeholder: 'soMEtExT'
          };
          output = _module.editorConfig(_objectSpread(_objectSpread({}, props), {}, {
            editorType: 'question',
            placeholder: 'soMEtExT'
          }));
          expect(output.init.plugins).toEqual((0, _pluginConfig.default)(pluginProps).plugins);
          expect(output.init.imagetools_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).imageToolbar);
          expect(output.init.toolbar).toEqual((0, _pluginConfig.default)(pluginProps).toolbar);
          expect(output.init.quickbars_insert_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsInsertToolbar);
          expect(output.init.quickbars_selection_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsSelectionToolbar);
          Object.keys((0, _pluginConfig.default)(pluginProps).config).forEach(key => {
            expect(output.init[key]).toEqual((0, _pluginConfig.default)(pluginProps).config[key]);
          });
        });
      });
      describe('expandable text area plugins and toolbar', () => {
        test('It configures plugins, toolbars, and quick toolbars correctly', () => {
          const pluginProps = {
            isLibrary: props.isLibrary,
            editorType: 'expandable',
            placeholder: 'soMEtExT'
          };
          output = _module.editorConfig(_objectSpread(_objectSpread({}, props), {}, {
            editorType: 'expandable',
            placeholder: 'soMEtExT'
          }));
          expect(output.init.plugins).toEqual((0, _pluginConfig.default)(pluginProps).plugins);
          expect(output.init.imagetools_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).imageToolbar);
          expect(output.init.toolbar).toEqual((0, _pluginConfig.default)(pluginProps).toolbar);
          expect(output.init.quickbars_insert_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsInsertToolbar);
          expect(output.init.quickbars_selection_toolbar).toEqual((0, _pluginConfig.default)(pluginProps).quickbarsSelectionToolbar);
          Object.keys((0, _pluginConfig.default)(pluginProps).config).forEach(key => {
            expect(output.init[key]).toEqual((0, _pluginConfig.default)(pluginProps).config[key]);
          });
        });
      });
      test('It creates an onInit which calls initializeEditor and setEditorRef', () => {
        output.onInit(evt, editor);
        expect(props.setEditorRef).toHaveBeenCalledWith(editor);
        expect(props.initializeEditor).toHaveBeenCalled();
      });
      test('It sets the blockvalue to be empty string by default', () => {
        expect(output.initialValue).toBe('');
      });
      test('It sets the blockvalue to be the blockvalue if nonempty', () => {
        const textValue = 'SomE hTML content';
        output = _module.editorConfig(_objectSpread(_objectSpread({}, props), {}, {
          textValue
        }));
        expect(output.initialValue).toBe(textValue);
      });
      it('calls setupCustomBehavior on setup', () => {
        expect(output.init.setup).toEqual(setupCustomBehavior({
          editorType: props.editorType,
          updateContent: props.updateContent,
          openImgModal: props.openImgModal,
          openSourceCodeModal: props.openSourceCodeModal,
          setImage: props.setSelection,
          imageUrls: _module.fetchImageUrls(props.images),
          lmsEndpointUrl: props.lmsEndpointUrl
        }));
      });
    });
    describe('filterAssets', () => {
      const emptyAssets = {};
      const assets = {
        sOmEaSsET: {
          contentType: 'image/'
        }
      };
      test('returns an empty array', () => {
        const emptyFilterAssets = _module.filterAssets({
          assets: emptyAssets
        });
        expect(emptyFilterAssets).toEqual([]);
      });
      test('returns filtered array of images', () => {
        const FilteredAssets = _module.filterAssets({
          assets
        });
        expect(FilteredAssets).toEqual([{
          contentType: 'image/'
        }]);
      });
    });
    describe('imgModalToggle', () => {
      const hookKey = state.keys.isImageModalOpen;
      beforeEach(() => {
        hook = _module.imgModalToggle();
      });
      test('isOpen: state value', () => {
        expect(hook.isImgOpen).toEqual(state.stateVals[hookKey]);
      });
      test('openModal: calls setter with true', () => {
        hook.openImgModal();
        expect(state.setState[hookKey]).toHaveBeenCalledWith(true);
      });
      test('closeModal: calls setter with false', () => {
        hook.closeImgModal();
        expect(state.setState[hookKey]).toHaveBeenCalledWith(false);
      });
    });
    describe('sourceCodeModalToggle', () => {
      const editorRef = {
        current: {
          focus: jest.fn()
        }
      };
      const hookKey = state.keys.isSourceCodeModalOpen;
      beforeEach(() => {
        hook = _module.sourceCodeModalToggle(editorRef);
      });
      test('isOpen: state value', () => {
        expect(hook.isSourceCodeOpen).toEqual(state.stateVals[hookKey]);
      });
      test('openModal: calls setter with true', () => {
        hook.openSourceCodeModal();
        expect(state.setState[hookKey]).toHaveBeenCalledWith(true);
      });
      test('closeModal: calls setter with false', () => {
        hook.closeSourceCodeModal();
        expect(state.setState[hookKey]).toHaveBeenCalledWith(false);
      });
    });
    describe('openModalWithSelectedImage', () => {
      test('image is set to be value stored in editor, modal is opened', () => {
        const setImage = jest.fn();
        const openImgModal = jest.fn();
        const editor = {
          selection: {
            getNode: () => mockNode
          }
        };
        _module.openModalWithSelectedImage({
          editor,
          openImgModal,
          setImage
        })();
        expect(setImage).toHaveBeenCalledWith({
          externalUrl: mockNode.src,
          altText: mockNode.alt,
          width: mockNode.width,
          height: mockNode.height
        });
        expect(openImgModal).toHaveBeenCalled();
      });
    });
    describe('selectedImage hooks', () => {
      const val = {
        a: 'VaLUe'
      };
      beforeEach(() => {
        hook = _module.selectedImage(val);
      });
      test('selection: state value', () => {
        expect(hook.selection).toEqual(state.stateVals[state.keys.imageSelection]);
      });
      test('setSelection: setter for value', () => {
        expect(hook.setSelection).toEqual(state.setState[state.keys.imageSelection]);
      });
      test('clearSelection: calls setter with null', () => {
        expect(hook.setSelection).not.toHaveBeenCalled();
        hook.clearSelection();
        expect(hook.setSelection).toHaveBeenCalledWith(null);
      });
    });
  });
});
//# sourceMappingURL=hooks.test.js.map