import React from 'react';
import { shallow } from 'enzyme';

import { formatMessage } from '../../../testUtils';
import { Gallery } from './Gallery';

jest.mock('../../data/redux', () => ({
  selectors: {
    requests: {
      isFinished: (state, { requestKey }) => ({ isFinished: { state, requestKey } }),
    },
  },
}));

jest.mock('./GalleryCard', () => 'GalleryCard');

describe('TextEditor Image Gallery component', () => {
  describe('component', () => {
    const props = {
      galleryIsEmpty: false,
      searchIsEmpty: false,
      displayList: [{ id: 1 }, { id: 2 }, { id: 3 }],
      highlighted: 'props.highlighted',
      onHighlightChange: jest.fn().mockName('props.onHighlightChange'),
      intl: { formatMessage },
      isLoaded: true,
    };
    test('snapshot: not loaded, show spinner', () => {
      expect(shallow(<Gallery {...props} isLoaded={false} />)).toMatchSnapshot();
    });
    test('snapshot: loaded but no images, show empty gallery', () => {
      expect(shallow(<Gallery {...props} galleryIsEmpty />)).toMatchSnapshot();
    });
    test('snapshot: loaded but search returns no images, show 0 search result gallery', () => {
      expect(shallow(<Gallery {...props} searchIsEmpty />)).toMatchSnapshot();
    });
    test('snapshot: loaded, show gallery', () => {
      expect(shallow(<Gallery {...props} />)).toMatchSnapshot();
    });
    test('snapshot: not shot gallery', () => {
      const wrapper = shallow(<Gallery {...props} show={false} />);
      expect(wrapper.type()).toBeNull();
    });
  });
});
