"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockVideoData = exports.mockImageData = exports.mockBlockIdByType = void 0;
/* istanbul ignore file */
const mockImageData = exports.mockImageData = [{
  displayName: 'shahrukh.jpg',
  contentType: 'image/jpeg',
  dateAdded: 'Jan 05, 2022 at 17:38 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
  portableUrl: '/static/shahrukh.jpg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@shahrukh.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg'
}, {
  displayName: 'IMG_5899.jpg',
  contentType: 'image/jpeg',
  dateAdded: 'Nov 16, 2021 at 18:55 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
  portableUrl: '/static/IMG_5899.jpg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@IMG_5899.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg'
}, {
  displayName: 'ccexample.srt',
  contentType: 'application/octet-stream',
  dateAdded: 'Nov 01, 2021 at 15:42 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
  portableUrl: '/static/ccexample.srt',
  thumbnail: null,
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt'
}, {
  displayName: 'Tennis Ball.jpeg',
  contentType: 'image/jpeg',
  dateAdded: 'Aug 04, 2021 at 16:52 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
  portableUrl: '/static/Tennis_Ball.jpeg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@Tennis_Ball-jpeg.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg'
}];
const mockVideoData = exports.mockVideoData = [{
  displayName: 'shahrukh.jpg',
  contentType: 'image/jpeg',
  dateAdded: 'Jan 05, 2022 at 17:38 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg',
  portableUrl: '/static/shahrukh.jpg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@shahrukh.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@shahrukh.jpg'
}, {
  displayName: 'IMG_5899.jpg',
  contentType: 'image/jpeg',
  dateAdded: 'Nov 16, 2021 at 18:55 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg',
  portableUrl: '/static/IMG_5899.jpg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@IMG_5899.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@IMG_5899.jpg'
}, {
  displayName: 'ccexample.srt',
  contentType: 'application/octet-stream',
  dateAdded: 'Nov 01, 2021 at 15:42 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt',
  portableUrl: '/static/ccexample.srt',
  thumbnail: null,
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@ccexample.srt'
}, {
  displayName: 'Tennis Ball.jpeg',
  contentType: 'image/jpeg',
  dateAdded: 'Aug 04, 2021 at 16:52 UTC',
  url: '/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
  externalUrl: 'https://courses.edx.org/asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg',
  portableUrl: '/static/Tennis_Ball.jpeg',
  thumbnail: '/asset-v1:edX+test101+2021_T1+type@thumbnail+block@Tennis_Ball-jpeg.jpg',
  locked: false,
  id: 'asset-v1:edX+test101+2021_T1+type@asset+block@Tennis_Ball.jpeg'
}];
const mockBlockIdByType = type => `${type}-block-id`;
exports.mockBlockIdByType = mockBlockIdByType;
//# sourceMappingURL=mockData.js.map