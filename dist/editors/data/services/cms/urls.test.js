"use strict";

var _urls = require("./urls");
describe('cms url methods', () => {
  const studioEndpointUrl = 'urLgoeStOstudiO';
  const blockId = 'blOckIDTeST123';
  const learningContextId = 'lEarnIngCOntextId123';
  const courseId = 'course-v1:courseId123';
  const libraryV1Id = 'library-v1:libaryId123';
  const language = 'la';
  const handout = '/aSSet@hANdoUt';
  const videoId = '123-SOmeVidEOid-213';
  const parameters = 'SomEParAMEterS';
  describe('return to learning context urls', () => {
    const unitUrl = {
      data: {
        ancestors: [{
          id: 'unItUrlTEST'
        }]
      }
    };
    it('returns the library page when given the library', () => {
      expect((0, _urls.returnUrl)({
        studioEndpointUrl,
        unitUrl,
        learningContextId: libraryV1Id
      })).toEqual(`${studioEndpointUrl}/library/${libraryV1Id}`);
    });
    it('returns url with studioEndpointUrl and unitUrl', () => {
      expect((0, _urls.returnUrl)({
        studioEndpointUrl,
        unitUrl,
        learningContextId: courseId
      })).toEqual(`${studioEndpointUrl}/container/${unitUrl.data.ancestors[0].id}`);
    });
    it('returns empty string if no unit url', () => {
      expect((0, _urls.returnUrl)({
        studioEndpointUrl,
        unitUrl: null,
        learningContextId: courseId
      })).toEqual('');
    });
    it('returns the library page when given the library', () => {
      expect((0, _urls.libraryV1)({
        studioEndpointUrl,
        learningContextId: libraryV1Id
      })).toEqual(`${studioEndpointUrl}/library/${libraryV1Id}`);
    });
    it('returns url with studioEndpointUrl and unitUrl', () => {
      expect((0, _urls.unit)({
        studioEndpointUrl,
        unitUrl
      })).toEqual(`${studioEndpointUrl}/container/${unitUrl.data.ancestors[0].id}`);
    });
  });
  describe('block', () => {
    it('returns url with studioEndpointUrl and blockId', () => {
      expect((0, _urls.block)({
        studioEndpointUrl,
        blockId
      })).toEqual(`${studioEndpointUrl}/xblock/${blockId}`);
    });
  });
  describe('blockAncestor', () => {
    it('returns url with studioEndpointUrl, blockId and ancestor query', () => {
      expect((0, _urls.blockAncestor)({
        studioEndpointUrl,
        blockId
      })).toEqual(`${(0, _urls.block)({
        studioEndpointUrl,
        blockId
      })}?fields=ancestorInfo`);
    });
  });
  describe('blockStudioView', () => {
    it('returns url with studioEndpointUrl, blockId and studio_view query', () => {
      expect((0, _urls.blockStudioView)({
        studioEndpointUrl,
        blockId
      })).toEqual(`${(0, _urls.block)({
        studioEndpointUrl,
        blockId
      })}/studio_view`);
    });
  });
  describe('courseAssets', () => {
    it('returns url with studioEndpointUrl and learningContextId', () => {
      expect((0, _urls.courseAssets)({
        studioEndpointUrl,
        learningContextId
      })).toEqual(`${studioEndpointUrl}/assets/${learningContextId}/?page_size=500`);
    });
  });
  describe('thumbnailUpload', () => {
    it('returns url with studioEndpointUrl, learningContextId, and videoId', () => {
      expect((0, _urls.thumbnailUpload)({
        studioEndpointUrl,
        learningContextId,
        videoId
      })).toEqual(`${studioEndpointUrl}/video_images/${learningContextId}/${videoId}`);
    });
  });
  describe('videoTranscripts', () => {
    it('returns url with studioEndpointUrl and blockId', () => {
      expect((0, _urls.videoTranscripts)({
        studioEndpointUrl,
        blockId
      })).toEqual(`${(0, _urls.block)({
        studioEndpointUrl,
        blockId
      })}/handler/studio_transcript/translation`);
    });
  });
  describe('downloadVideoTranscriptURL', () => {
    it('returns url with studioEndpointUrl, blockId and language query', () => {
      expect((0, _urls.downloadVideoTranscriptURL)({
        studioEndpointUrl,
        blockId,
        language
      })).toEqual(`${(0, _urls.videoTranscripts)({
        studioEndpointUrl,
        blockId
      })}?language_code=${language}`);
    });
  });
  describe('downloadVideoHandoutUrl', () => {
    it('returns url with studioEndpointUrl and handout', () => {
      expect((0, _urls.downloadVideoHandoutUrl)({
        studioEndpointUrl,
        handout
      })).toEqual(`${studioEndpointUrl}${handout}`);
    });
  });
  describe('courseDetailsUrl', () => {
    it('returns url with studioEndpointUrl and courseKey', () => {
      expect((0, _urls.courseDetailsUrl)({
        studioEndpointUrl,
        learningContextId
      })).toEqual(`${studioEndpointUrl}/settings/details/${learningContextId}`);
    });
  });
  describe('checkTranscriptsForImport', () => {
    it('returns url with studioEndpointUrl and parameters', () => {
      expect((0, _urls.checkTranscriptsForImport)({
        studioEndpointUrl,
        parameters
      })).toEqual(`${studioEndpointUrl}/transcripts/check?data=${parameters}`);
    });
  });
  describe('replaceTranscript', () => {
    it('returns url with studioEndpointUrl and parameters', () => {
      expect((0, _urls.replaceTranscript)({
        studioEndpointUrl,
        parameters
      })).toEqual(`${studioEndpointUrl}/transcripts/replace?data=${parameters}`);
    });
  });
  describe('courseAdvanceSettings', () => {
    it('returns url with studioEndpointUrl and learningContextId', () => {
      expect((0, _urls.courseAdvanceSettings)({
        studioEndpointUrl,
        learningContextId
      })).toEqual(`${studioEndpointUrl}/api/contentstore/v0/advanced_settings/${learningContextId}`);
    });
  });
  describe('videoFeatures', () => {
    it('returns url with studioEndpointUrl and learningContextId', () => {
      expect((0, _urls.videoFeatures)({
        studioEndpointUrl,
        learningContextId
      })).toEqual(`${studioEndpointUrl}/video_features/${learningContextId}`);
    });
  });
  describe('courseVideos', () => {
    it('returns url with studioEndpointUrl and learningContextId', () => {
      expect((0, _urls.courseVideos)({
        studioEndpointUrl,
        learningContextId
      })).toEqual(`${studioEndpointUrl}/videos/${learningContextId}`);
    });
  });
  describe('mediaTranscriptURL', () => {
    it('returns url with studioEndpointUrl', () => {
      const transcriptUrl = 'this-is-a-transcript';
      expect((0, _urls.mediaTranscriptURL)({
        studioEndpointUrl,
        transcriptUrl
      })).toEqual(`${studioEndpointUrl}${transcriptUrl}`);
    });
  });
});
//# sourceMappingURL=urls.test.js.map