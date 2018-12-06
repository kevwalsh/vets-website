import localStorage from 'platform/utilities/storage/localStorage';
import { sampleUserPrefResponse } from '../helpers';

export const SET_USER_PREFERENCE_LOADING_STATUS =
  'SET_USER_PREFERENCE_LOADING_STATUS';
export const SET_DASHBOARD_USER_PREFERENCES = 'SET_DASHBOARD_USER_PREFERENCES';
export const DASHBOARD_PREFERENCE_STATUS = 'DASHBOARD_PREFERENCE_STATUS';
export const DASHBOARD_PREFERENCE_SET = 'DASHBOARD_PREFERENCE_SET';
export const DASHBOARD_PREFERENCES_SAVED = 'DASHBOARD_PREFERENCES_SAVED';
export const DASHBOARD_PREFERENCES_FETCHED = 'DASHBOARD_PREFERENCES_FETCHED';

// load the user preferences
export function fetchUserPreferences() {
  return dispatch => {
    // and immediately dispatches an action to set the state as PENDING (ie:
    // loading)
    dispatch({
      type: SET_USER_PREFERENCE_LOADING_STATUS,
      status: 'loading',
    });

    // return apiRequest('/user/preferences')
    return Promise.resolve(sampleUserPrefResponse)
      .then(response => {
        const selectedBenefits = response.data.attributes.userPreferences
          .anyOf(preferenceGroup => preferenceGroup.code === 'benefits')
          .userPreferences.map(pref => pref.code);

        dispatch({
          type: SET_DASHBOARD_USER_PREFERENCES,
          preferences: selectedBenefits,
        });

        dispatch({
          type: SET_USER_PREFERENCE_LOADING_STATUS,
          status: 'loaded',
        });
      })
      .catch(() => {
        dispatch({
          type: SET_USER_PREFERENCE_LOADING_STATUS,
          status: 'error',
        });
      });
  };
}

// load all available preferences
export function fetchAvailablePreferences() {}

export function fetchPreferences() {
  const savedPrefs = localStorage.getItem('dashboard-preferences');
  localStorage.setItem('dashboardLastVisitedAt', Date.now());

  return {
    type: DASHBOARD_PREFERENCES_FETCHED,
    data: (savedPrefs && JSON.parse(savedPrefs)) || {},
  };
}

export function setPreference(slug, value = true) {
  return {
    type: DASHBOARD_PREFERENCE_SET,
    slug,
    value,
  };
}

export function savePreferences(data) {
  // TODO: persist preferences to API
  localStorage.setItem('dashboard-preferences', JSON.stringify(data));

  return {
    type: DASHBOARD_PREFERENCES_SAVED,
    data,
  };
}
