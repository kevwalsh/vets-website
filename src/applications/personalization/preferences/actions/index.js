import localStorage from 'platform/utilities/storage/localStorage';
import {
  sampleUserPrefResponse,
  sampleAllPrefOptionsResponse,
} from '../helpers';

export const SET_USER_PREFERENCE_LOADING_STATUS =
  'SET_USER_PREFERENCE_LOADING_STATUS';
export const SET_ALL_PREFERENCE_OPTIONS_LOADING_STATUS =
  'SET_ALL_PREFERENCE_OPTIONS_LOADING_STATUS';
export const SET_AVAILABLE_BENEFITS = 'SET_AVAILABLE_BENEFITS';
export const SET_DASHBOARD_USER_PREFERENCES = 'SET_DASHBOARD_USER_PREFERENCES';
export const DASHBOARD_PREFERENCE_STATUS = 'DASHBOARD_PREFERENCE_STATUS';
export const DASHBOARD_PREFERENCE_SET = 'DASHBOARD_PREFERENCE_SET';
export const DASHBOARD_PREFERENCES_SAVED = 'DASHBOARD_PREFERENCES_SAVED';
export const DASHBOARD_PREFERENCES_FETCHED = 'DASHBOARD_PREFERENCES_FETCHED';

// load the benefits the user has picked to learn more about
export function fetchUserSelectedBenefits() {
  return dispatch => {
    dispatch({
      type: SET_USER_PREFERENCE_LOADING_STATUS,
      status: 'loading',
    });

    setTimeout(
      () =>
        // return apiRequest('/user/preferences')
        Promise.resolve(sampleUserPrefResponse)
          .then(response => {
            // We just want to get an array of Benefits preferences
            const selectedBenefits = response.data.attributes.userPreferences
              .filter(preferenceGroup => preferenceGroup.code === 'benefits')
              .pop()
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
          }),
      4000,
    );
  };
}

// load all available benefits
export function fetchAvailableBenefits() {
  return dispatch => {
    dispatch({
      type: SET_ALL_PREFERENCE_OPTIONS_LOADING_STATUS,
      status: 'loading',
    });

    // return apiRequest('/user/preferences/choices')
    return Promise.resolve(sampleAllPrefOptionsResponse)
      .then(response => {
        // We just want to get an array of Benefits preferences
        const availableBenefits = response.data.attributes.preferences
          .filter(preferenceGroup => preferenceGroup.code === 'benefits')
          .pop()
          .preferenceChoices.map(pref => pref.code);

        dispatch({
          type: SET_AVAILABLE_BENEFITS,
          preferences: availableBenefits,
        });

        dispatch({
          type: SET_ALL_PREFERENCE_OPTIONS_LOADING_STATUS,
          status: 'loaded',
        });
      })
      .catch(() => {
        dispatch({
          type: SET_ALL_PREFERENCE_OPTIONS_LOADING_STATUS,
          status: 'error',
        });
      });
  };
}

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
