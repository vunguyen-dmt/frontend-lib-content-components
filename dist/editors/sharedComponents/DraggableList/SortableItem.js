"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _sortable = require("@dnd-kit/sortable");
var _utilities = require("@dnd-kit/utilities");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const SortableItem = _ref => {
  let {
    id,
    componentStyle,
    children,
    // injected
    intl
  } = _ref;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = (0, _sortable.useSortable)({
    id
  });
  const style = _objectSpread({
    transform: _utilities.CSS.Transform.toString(transform),
    transition
  }, componentStyle);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Row, {
    ref: setNodeRef,
    style: style,
    className: "mx-0",
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButtonWithTooltip, _objectSpread(_objectSpread({
      tooltipPlacement: "top",
      tooltipContent: intl.formatMessage(_messages.default.tooltipContent),
      src: _icons.DragIndicator,
      iconAs: _paragon.Icon,
      variant: "secondary",
      alt: intl.formatMessage(_messages.default.tooltipContent)
    }, attributes), listeners), "drag-to-reorder-icon")]
  });
};
SortableItem.defaultProps = {
  componentStyle: null
};
SortableItem.propTypes = {
  id: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,
  componentStyle: _propTypes.default.shape({}),
  // injected
  intl: _i18n.intlShape.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(SortableItem);
//# sourceMappingURL=SortableItem.js.map