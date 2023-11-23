"use strict";

var _hooks = _interopRequireDefault(require("./hooks"));
var requests = _interopRequireWildcard(require("../../data/redux/thunkActions/requests"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
jest.mock('../../data/redux/thunkActions/requests');
describe('uploadVideo', () => {
  const dispatch = jest.fn();
  const supportedFiles = [new File(['content1'], 'file1.mp4', {
    type: 'video/mp4'
  }), new File(['content2'], 'file2.mov', {
    type: 'video/quicktime'
  })];
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });
  it('should dispatch uploadVideo action with correct data and onSuccess callback', async () => {
    requests.uploadVideo.mockImplementation(() => 'requests.uploadVideo');
    const data = {
      files: [{
        file_name: 'file1.mp4',
        content_type: 'video/mp4'
      }, {
        file_name: 'file2.mov',
        content_type: 'video/quicktime'
      }]
    };
    await _hooks.default.uploadVideo({
      dispatch,
      supportedFiles
    });
    expect(requests.uploadVideo).toHaveBeenCalledWith({
      data,
      onSuccess: expect.any(Function)
    });
    expect(dispatch).toHaveBeenCalledWith('requests.uploadVideo');
  });
  it('should call fetch with correct arguments for each file', async () => {
    const mockResponseData = {
      success: true
    };
    const mockFetchResponse = Promise.resolve({
      data: mockResponseData
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchResponse);
    const response = {
      files: [{
        file_name: 'file1.mp4',
        upload_url: 'http://example.com/put_video1'
      }, {
        file_name: 'file2.mov',
        upload_url: 'http://example.com/put_video2'
      }]
    };
    const mockRequestResponse = {
      data: response
    };
    requests.uploadVideo.mockImplementation(async _ref => {
      let {
        onSuccess
      } = _ref;
      await onSuccess(mockRequestResponse);
    });
    await _hooks.default.uploadVideo({
      dispatch,
      supportedFiles
    });
    expect(fetch).toHaveBeenCalledTimes(2);
    response.files.forEach((_ref2, index) => {
      let {
        upload_url: uploadUrl
      } = _ref2;
      expect(fetch.mock.calls[index][0]).toEqual(uploadUrl);
    });
    supportedFiles.forEach((file, index) => {
      expect(fetch.mock.calls[index][1].body.get('uploaded-file')).toBe(file);
    });
  });
  it('should log an error if fetch failed to upload a file', async () => {
    const error = new Error('Uh-oh!');
    global.fetch = jest.fn().mockRejectedValue(error);
    const response = {
      files: [{
        file_name: 'file1.mp4',
        upload_url: 'http://example.com/put_video1'
      }, {
        file_name: 'file2.mov',
        upload_url: 'http://example.com/put_video2'
      }]
    };
    const mockRequestResponse = {
      data: response
    };
    requests.uploadVideo.mockImplementation(async _ref3 => {
      let {
        onSuccess
      } = _ref3;
      await onSuccess(mockRequestResponse);
    });
    await _hooks.default.uploadVideo({
      dispatch,
      supportedFiles
    });
  });
  it('should log an error if file object is not found in supportedFiles array', () => {
    const response = {
      files: [{
        file_name: 'file2.mov',
        upload_url: 'http://example.com/put_video2'
      }]
    };
    const mockRequestResponse = {
      data: response
    };
    const spyConsoleError = jest.spyOn(console, 'error');
    requests.uploadVideo.mockImplementation(_ref4 => {
      let {
        onSuccess
      } = _ref4;
      onSuccess(mockRequestResponse);
    });
    _hooks.default.uploadVideo({
      dispatch,
      supportedFiles: [supportedFiles[0]]
    });
    expect(spyConsoleError).toHaveBeenCalledWith('Could not find file object with name "file2.mov" in supportedFiles array.');
  });
});
//# sourceMappingURL=hooks.test.js.map