import _ from 'lodash/fp';

import {
  DASHBOARD_PREFERENCE_SET,
  DASHBOARD_PREFERENCES_SAVED,
  DASHBOARD_PREFERENCES_FETCHED,
  SET_USER_PREFERENCE_LOADING_STATUS,
  SET_DASHBOARD_USER_PREFERENCES,
} from '../actions';

const initialState = {
  dashboard: {},
};

export default function preferences(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PREFERENCE_LOADING_STATUS: {
      console.log(`setting the loading status to: ${action.status}`);
      return _.set(`loadingStatus`, action.status, state);
    }
    case SET_DASHBOARD_USER_PREFERENCES: {
      return _.set(`dashboard`, action.preferences, state);
    }
    case DASHBOARD_PREFERENCE_SET: {
      return _.set(`dashboard.${action.slug}`, action.value, state);
    }
    case DASHBOARD_PREFERENCES_FETCHED: {
      return _.set('dashboard', action.data, state);
    }
    case DASHBOARD_PREFERENCES_SAVED: {
      let newState = _.set('dashboard', action.data, state);
      newState = _.set('savedAt', Date.now(), newState);
      return newState;
    }
    default: {
      return state;
    }
  }
}
