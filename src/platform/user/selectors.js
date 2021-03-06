// TODO: perhaps make these selectors fail gracefully if state.user, or any of
// the properties on the user object are not defined
export const selectUser = state => state.user;
export const isLoggedIn = state => selectUser(state).login.currentlyLoggedIn;
export const selectProfile = state => selectUser(state).profile;
export const isInMVI = state => selectProfile(state).status === 'OK';
export const isProfileLoading = state => selectProfile(state).loading;
export const isLOA3 = state => selectProfile(state).loa.current === 3;
export const isLOA1 = state => selectProfile(state).loa.current === 1;
export const isMultifactorEnabled = state => selectProfile(state).multifactor;
export const selectAvailableServices = state => selectProfile(state).services;
export const selectVet360 = state => selectProfile(state).vet360;
export const selectVet360EmailAddress = state =>
  selectVet360(state)?.email?.emailAddress;
const createPhoneNumberStringFromData = (phoneNumberData = {}) => {
  const areaCode = phoneNumberData.areaCode || '';
  const phoneNumber = phoneNumberData.phoneNumber || '';
  // in some test data the extension is set to '0000' and we want to treat that
  // as a null extension
  const extension =
    phoneNumberData.extension === '0000'
      ? undefined
      : phoneNumberData.extension;
  return `${areaCode}${phoneNumber}${extension ? `x${extension}` : ''}`;
};
export const selectVet360MobilePhone = state =>
  selectVet360(state)?.mobilePhone;
export const selectVet360MobilePhoneString = state =>
  createPhoneNumberStringFromData(selectVet360MobilePhone(state));
export const selectVet360HomePhone = state => selectVet360(state)?.homePhone;
export const selectVet360HomePhoneString = state =>
  createPhoneNumberStringFromData(selectVet360HomePhone(state));

export function createIsServiceAvailableSelector(service) {
  return state => selectAvailableServices(state).includes(service);
}
