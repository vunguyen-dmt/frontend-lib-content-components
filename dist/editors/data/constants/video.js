"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoTranscriptLanguages = exports.timeKeys = exports.in8lTranscriptLanguages = exports.default = void 0;
var _utils = require("../../utils");
const videoTranscriptLanguages = exports.videoTranscriptLanguages = (0, _utils.StrictDict)({
  placeholder: '',
  aa: 'Afar',
  ab: 'Abkhazian',
  af: 'Afrikaans',
  ak: 'Akan',
  sq: 'Albanian',
  am: 'Amharic',
  ar: 'Arabic',
  an: 'Aragonese',
  hy: 'Armenian',
  as: 'Assamese',
  av: 'Avaric',
  ae: 'Avestan',
  ay: 'Aymara',
  az: 'Azerbaijani',
  ba: 'Bashkir',
  bm: 'Bambara',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bh: 'Bihari languages',
  bi: 'Bislama',
  bs: 'Bosnian',
  br: 'Breton',
  bg: 'Bulgarian',
  my: 'Burmese',
  ca: 'Catalan',
  ch: 'Chamorro',
  ce: 'Chechen',
  zh: 'Chinese',
  zh_HANS: 'Simplified Chinese',
  zh_HANT: 'Traditional Chinese',
  cu: 'Church Slavic',
  cv: 'Chuvash',
  kw: 'Cornish',
  co: 'Corsican',
  cr: 'Cree',
  cs: 'Czech',
  da: 'Danish',
  dv: 'Divehi',
  nl: 'Dutch',
  dz: 'Dzongkha',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  ee: 'Ewe',
  fo: 'Faroese',
  fj: 'Fijian',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Western Frisian',
  ff: 'Fulah',
  ka: 'Georgian',
  de: 'German',
  gd: 'Gaelic',
  ga: 'Irish',
  gl: 'Galician',
  gv: 'Manx',
  el: 'Greek',
  gn: 'Guarani',
  gu: 'Gujarati',
  ht: 'Haitian',
  ha: 'Hausa',
  he: 'Hebrew',
  hz: 'Herero',
  hi: 'Hindi',
  ho: 'Hiri Motu',
  hr: 'Croatian',
  hu: 'Hungarian',
  ig: 'Igbo',
  is: 'Icelandic',
  io: 'Ido',
  ii: 'Sichuan Yi',
  iu: 'Inuktitut',
  ie: 'Interlingue',
  ia: 'Interlingua',
  id: 'Indonesian',
  ik: 'Inupiaq',
  it: 'Italian',
  jv: 'Javanese',
  ja: 'Japanese',
  kl: 'Kalaallisut',
  kn: 'Kannada',
  ks: 'Kashmiri',
  kr: 'Kanuri',
  kk: 'Kazakh',
  km: 'Central Khmer',
  ki: 'Kikuyu',
  rw: 'Kinyarwanda',
  ky: 'Kirghiz',
  kv: 'Komi',
  kg: 'Kongo',
  ko: 'Korean',
  kj: 'Kuanyama',
  ku: 'Kurdish',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  li: 'Limburgan',
  ln: 'Lingala',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  lu: 'Luba-Katanga',
  lg: 'Ganda',
  mk: 'Macedonian',
  mh: 'Marshallese',
  ml: 'Malayalam',
  mi: 'Maori',
  mr: 'Marathi',
  ms: 'Malay',
  mg: 'Malagasy',
  mt: 'Maltese',
  mn: 'Mongolian',
  na: 'Nauru',
  nv: 'Navajo',
  nr: 'Ndebele: South',
  nd: 'Ndebele: North',
  ng: 'Ndonga',
  ne: 'Nepali',
  nn: 'Norwegian Nynorsk',
  nb: 'Bokmål: Norwegian',
  no: 'Norwegian',
  ny: 'Chichewa',
  oc: 'Occitan',
  oj: 'Ojibwa',
  or: 'Oriya',
  om: 'Oromo',
  os: 'Ossetian',
  pa: 'Panjabi',
  fa: 'Persian',
  pi: 'Pali',
  pl: 'Polish',
  pt: 'Portuguese',
  ps: 'Pushto',
  qu: 'Quechua',
  rm: 'Romansh',
  ro: 'Romanian',
  rn: 'Rundi',
  ru: 'Russian',
  sg: 'Sango',
  sa: 'Sanskrit',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  se: 'Northern Sami',
  sm: 'Samoan',
  sn: 'Shona',
  sd: 'Sindhi',
  so: 'Somali',
  st: 'Sotho: Southern',
  es: 'Spanish',
  sc: 'Sardinian',
  sr: 'Serbian',
  ss: 'Swati',
  su: 'Sundanese',
  sw: 'Swahili',
  sv: 'Swedish',
  ty: 'Tahitian',
  ta: 'Tamil',
  tt: 'Tatar',
  te: 'Telugu',
  tg: 'Tajik',
  tl: 'Tagalog',
  th: 'Thai',
  bo: 'Tibetan',
  ti: 'Tigrinya',
  to: 'Tonga (Tonga Islands)',
  tn: 'Tswana',
  ts: 'Tsonga',
  tk: 'Turkmen',
  tr: 'Turkish',
  tw: 'Twi',
  ug: 'Uighur',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  ve: 'Venda',
  vi: 'Vietnamese',
  vo: 'Volapük',
  cy: 'Welsh',
  wa: 'Walloon',
  wo: 'Wolof',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  za: 'Zhuang',
  zu: 'Zulu'
});
const in8lTranscriptLanguages = intl => {
  const messageLookup = {};
  // for tests and non-internationlized setups, return en
  if (!intl?.formatMessage) {
    return videoTranscriptLanguages;
  }
  Object.keys(videoTranscriptLanguages).forEach(code => {
    messageLookup[code] = intl.formatMessage({
      id: `authoring.videoeditor.transcripts.language.${code}`,
      defaultMessage: videoTranscriptLanguages[code],
      description: `Name of Language called in English ${videoTranscriptLanguages[code]}`
    });
  });
  return messageLookup;
};
exports.in8lTranscriptLanguages = in8lTranscriptLanguages;
const timeKeys = exports.timeKeys = (0, _utils.StrictDict)({
  startTime: 'startTime',
  stopTime: 'stopTime'
});
var _default = exports.default = {
  timeKeys,
  videoTranscriptLanguages
};
//# sourceMappingURL=video.js.map