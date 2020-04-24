import axios from 'axios';

import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import reducer,{ACTION_TYPES, getImgurGallery, initGalleryState} from 'app/component/imgur-gallery/react-redux/imgur-action';
import {REQUEST, SUCCESS} from 'app/shared/utils/action-type.util';

describe('Gallery reducer tests', () => {
  function isEmpty(element): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  function testInitialState(state) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      galleryList: {
        data:[],
        status:0
      }
    });
    expect(isEmpty(state.galleryList));
  }

  function testAlbumTypes(types, payload, testFunction) {
    types.forEach(e => {
      testFunction(reducer(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(reducer(undefined, {}));
    });
  });

    it('should reset the state', () => {
      expect(
        reducer(
          { ...initGalleryState, loading: true },
          {
            type: ACTION_TYPES.RESET
          }
        )
      ).toEqual({
        ...initGalleryState
      });
    });
  });

  describe('Successes', () => {
    it('should fetch all albums', () => {
      const payload = { data: [{ 1: 'fake1' }, { 2: 'fake2' }] };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.GALLERY_LIST),
          payload
        })
      ).toEqual({
        ...initGalleryState,
        loading: false,
        galleryList: payload.data
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches Imgur gallery list action', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.GALLERY_LIST)
        },
        {
          type: SUCCESS(ACTION_TYPES.GALLERY_LIST),
          payload: resolvedObject
        }
      ];
      const param=`top/sort/window/1?showViral=true&mature=true`
      await store.dispatch(getImgurGallery(param)).then(() => expect(store.getActions()).toEqual(expectedActions));
    });
});
