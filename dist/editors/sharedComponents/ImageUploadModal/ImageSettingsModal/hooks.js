"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.onSaveClick = exports.onInputChange = exports.onCheckboxChange = exports.getValidDimensions = exports.findGcd = exports.dimensionLockHooks = exports.dimensionHooks = exports.dimKeys = exports.default = exports.checkFormValidation = exports.altTextHooks = void 0;
var _react = _interopRequireDefault(require("react"));
var _utils = require("../../../utils");
var _module = _interopRequireWildcard(require("./hooks"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Simple wrappers for useState to allow easy mocking for tests.
const state = {
  altText: val => _react.default.useState(val),
  dimensions: val => _react.default.useState(val),
  showAltTextDismissibleError: val => _react.default.useState(val),
  showAltTextSubmissionError: val => _react.default.useState(val),
  isDecorative: val => _react.default.useState(val),
  isLocked: val => _react.default.useState(val),
  local: val => _react.default.useState(val),
  lockDims: val => _react.default.useState(val),
  lockInitialized: val => _react.default.useState(val)
};
exports.state = state;
const dimKeys = (0, _utils.StrictDict)({
  height: 'height',
  width: 'width'
});

/**
 * findGcd(numerator, denominator)
 * Find the greatest common denominator of a ratio or fraction.
 * @param {number} numerator - ratio numerator
 * @param {number} denominator - ratio denominator
 * @return {number} - ratio greatest common denominator
 */
exports.dimKeys = dimKeys;
const findGcd = (a, b) => b ? findGcd(b, a % b) : a;
exports.findGcd = findGcd;
const checkEqual = (d1, d2) => d1.height === d2.height && d1.width === d2.width;

/**
 * getValidDimensions({ dimensions, local, locked })
 * Find valid ending dimensions based on start state, request, and lock state
 * @param {obj} dimensions - current stored dimensions
 * @param {obj} local - local (active) dimensions in the inputs
 * @param {obj} locked - locked dimensions
 * @return {obj} - output dimensions after move ({ height, width })
 */
const getValidDimensions = _ref => {
  let {
    dimensions,
    local,
    isLocked,
    lockDims
  } = _ref;
  if (!isLocked || checkEqual(local, dimensions)) {
    return local;
  }
  const out = {};
  let iter;
  const isMin = dimensions.height === lockDims.height;
  const keys = local.height !== dimensions.height ? {
    changed: dimKeys.height,
    other: dimKeys.width
  } : {
    changed: dimKeys.width,
    other: dimKeys.height
  };
  const direction = local[keys.changed] > dimensions[keys.changed] ? 1 : -1;

  // don't move down if already at minimum size
  if (direction < 0 && isMin) {
    return dimensions;
  }
  // find closest valid iteration of the changed field
  iter = Math.max(Math.round(local[keys.changed] / lockDims[keys.changed]), 1);
  // if closest valid iteration is current iteration, move one iteration in the change direction
  if (iter === dimensions[keys.changed] / lockDims[keys.changed]) {
    iter += direction;
  }
  out[keys.changed] = Math.round(iter * lockDims[keys.changed]);
  out[keys.other] = Math.round(out[keys.changed] * (lockDims[keys.other] / lockDims[keys.changed]));
  return out;
};

/**
 * dimensionLockHooks({ dimensions })
 * Returns a set of hooks pertaining to the dimension locks.
 * Locks the dimensions initially, on lock initialization.
 * @param {obj} dimensions - current stored dimensions
 * @return {obj} - dimension lock hooks
 *   {func} initializeLock - enable the lock mechanism
 *   {bool} isLocked - are dimensions locked?
 *   {obj} lockDims - image dimensions ({ height, width })
 *   {func} lock - lock the dimensions
 *   {func} unlock - unlock the dimensions
 */
exports.getValidDimensions = getValidDimensions;
const dimensionLockHooks = () => {
  const [lockDims, setLockDims] = _module.state.lockDims(null);
  const [isLocked, setIsLocked] = _module.state.isLocked(true);
  const initializeLock = _ref2 => {
    let {
      width,
      height
    } = _ref2;
    // find minimum viable increment
    let gcd = _module.findGcd(width, height);
    if ([width, height].some(v => !Number.isInteger(v / gcd))) {
      gcd = 1;
    }
    setLockDims({
      width: width / gcd,
      height: height / gcd
    });
  };
  return {
    initializeLock,
    isLocked,
    lock: () => setIsLocked(true),
    lockDims,
    unlock: () => setIsLocked(false)
  };
};

/**
 * dimensionHooks()
 * Returns an object of dimension-focused react hooks.
 * @return {obj} - dimension hooks
 *   {func} onImgLoad - initializes image dimension fields
 *     @param {object} selection - selected image object with possible override dimensions.
 *     @return {callback} - image load event callback that loads dimensions.
 *   {object} locked - current locked state
 *   {func} lock - lock current dimensions
 *   {func} unlock - unlock dimensions
 *   {object} value - current dimension values
 *   {func} setHeight - set height
 *     @param {string} - new height string
 *   {func} setWidth - set width
 *     @param {string} - new width string
 *   {func} updateDimensions - set dimensions based on state
 *   {obj} errorProps - props for user feedback error
 *     {bool} isError - true if dimensions are blank
 *     {func} setError - sets isError to true
 *     {func} dismissError - sets isError to false
 *     {bool} isHeightValid - true if height field is ready to save
 *     {func} setHeightValid - sets isHeightValid to true
 *     {func} setHeightNotValid - sets isHeightValid to false
 *     {bool} isWidthValid - true if width field is ready to save
 *     {func} setWidthValid - sets isWidthValid to true
 *     {func} setWidthNotValid - sets isWidthValid to false
 */
exports.dimensionLockHooks = dimensionLockHooks;
const dimensionHooks = altTextHook => {
  const [dimensions, setDimensions] = _module.state.dimensions(null);
  const [local, setLocal] = _module.state.local(null);
  const setAll = _ref3 => {
    let {
      height,
      width,
      altText
    } = _ref3;
    if (altText === '' || altText) {
      if (altText === '') {
        altTextHook.setIsDecorative(true);
      }
      altTextHook.setValue(altText);
    }
    setDimensions({
      height,
      width
    });
    setLocal({
      height,
      width
    });
  };
  const {
    initializeLock,
    isLocked,
    lock,
    lockDims,
    unlock
  } = _module.dimensionLockHooks({
    dimensions
  });
  return {
    onImgLoad: selection => _ref4 => {
      let {
        target: img
      } = _ref4;
      const imageDims = {
        height: img.naturalHeight,
        width: img.naturalWidth
      };
      setAll(selection.height ? selection : imageDims);
      initializeLock(imageDims);
    },
    isLocked,
    lock,
    unlock,
    value: local,
    setHeight: height => {
      if (height.match(/[0-9]+[%]{1}/)) {
        const heightPercent = height.match(/[0-9]+[%]{1}/)[0];
        setLocal(_objectSpread(_objectSpread({}, local), {}, {
          height: heightPercent
        }));
      } else if (height.match(/[0-9]/)) {
        setLocal(_objectSpread(_objectSpread({}, local), {}, {
          height: parseInt(height, 10)
        }));
      }
    },
    setWidth: width => {
      if (width.match(/[0-9]+[%]{1}/)) {
        const widthPercent = width.match(/[0-9]+[%]{1}/)[0];
        setLocal(_objectSpread(_objectSpread({}, local), {}, {
          width: widthPercent
        }));
      } else if (width.match(/[0-9]/)) {
        setLocal(_objectSpread(_objectSpread({}, local), {}, {
          width: parseInt(width, 10)
        }));
      }
    },
    updateDimensions: () => setAll(_module.getValidDimensions({
      dimensions,
      local,
      isLocked,
      lockDims
    }))
  };
};

/**
 * altTextHooks(savedText)
 * Returns a set of react hooks focused around alt text
 * @return {obj} - alt text hooks
 *   {string} value - alt text value
 *   {func} setValue - set alt test value
 *     @param {string} - new alt text
 *   {bool} isDecorative - is the image decorative?
 *   {func} setIsDecorative - set isDecorative field
 *   {obj} error - error at top of page
 *     {bool} show - is error being displayed?
 *     {func} set - set show to true
 *     {func} dismiss - set show to false
 *   {obj} validation - local alt text error
 *     {bool} show - is validation error being displayed?
 *     {func} set - set validation to true
 *     {func} dismiss - set validation to false
 */
exports.dimensionHooks = dimensionHooks;
const altTextHooks = savedText => {
  const [value, setValue] = _module.state.altText(savedText || '');
  const [isDecorative, setIsDecorative] = _module.state.isDecorative(false);
  const [showAltTextDismissibleError, setShowAltTextDismissibleError] = _module.state.showAltTextDismissibleError(false);
  const [showAltTextSubmissionError, setShowAltTextSubmissionError] = _module.state.showAltTextSubmissionError(false);
  const validateAltText = (newVal, newDecorative) => {
    if (showAltTextSubmissionError) {
      if (newVal || newDecorative) {
        setShowAltTextSubmissionError(false);
      }
    }
  };
  return {
    value,
    setValue: val => {
      setValue(val);
      validateAltText(val, null);
    },
    isDecorative,
    setIsDecorative: decorative => {
      setIsDecorative(decorative);
      validateAltText(null, decorative);
    },
    error: {
      show: showAltTextDismissibleError,
      set: () => setShowAltTextDismissibleError(true),
      dismiss: () => setShowAltTextDismissibleError(false)
    },
    validation: {
      show: showAltTextSubmissionError,
      set: () => setShowAltTextSubmissionError(true),
      dismiss: () => setShowAltTextSubmissionError(false)
    }
  };
};

/**
 * onInputChange(handleValue)
 * Simple event handler forwarding the event target value to a given callback
 * @param {func} handleValue - event value handler
 * @return {func} - evt callback that will call handleValue with the event target value.
 */
exports.altTextHooks = altTextHooks;
const onInputChange = handleValue => e => handleValue(e.target.value);

/**
 * onCheckboxChange(handleValue)
 * Simple event handler forwarding the event target checked prop to a given callback
 * @param {func} handleValue - event value handler
 * @return {func} - evt callback that will call handleValue with the event target checked prop.
 */
exports.onInputChange = onInputChange;
const onCheckboxChange = handleValue => e => handleValue(e.target.checked);

/**
 * checkFormValidation({ altText, isDecorative, onAltTextFail })
 * Handle saving the image context to the text editor
 * @param {string} altText - image alt text
 * @param {bool} isDecorative - is the image decorative?
 * @param {func} onAltTextFail - called if alt text validation fails
 */
exports.onCheckboxChange = onCheckboxChange;
const checkFormValidation = _ref5 => {
  let {
    altText,
    isDecorative,
    onAltTextFail
  } = _ref5;
  if (!isDecorative && altText === '') {
    onAltTextFail();
    return false;
  }
  return true;
};

/**
 * onSave({ altText, dimensions, isDecorative, saveToEditor })
 * Handle saving the image context to the text editor
 * @param {string} altText - image alt text
 * @param {object} dimensions - image dimensions ({ width, height })
 * @param {bool} isDecorative - is the image decorative?
 * @param {func} saveToEditor - save method for submitting image settings.
 */
exports.checkFormValidation = checkFormValidation;
const onSaveClick = _ref6 => {
  let {
    altText,
    dimensions,
    isDecorative,
    saveToEditor
  } = _ref6;
  return () => {
    if (_module.checkFormValidation({
      altText: altText.value,
      isDecorative,
      onAltTextFail: () => {
        altText.error.set();
        altText.validation.set();
      }
    })) {
      altText.error.dismiss();
      altText.validation.dismiss();
      saveToEditor({
        altText: altText.value,
        dimensions,
        isDecorative
      });
    }
  };
};
exports.onSaveClick = onSaveClick;
var _default = {
  altText: altTextHooks,
  dimensions: dimensionHooks,
  onCheckboxChange,
  onInputChange,
  onSaveClick,
  checkFormValidation
};
exports.default = _default;
//# sourceMappingURL=hooks.js.map