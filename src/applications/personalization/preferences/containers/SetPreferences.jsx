import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

import LoadingButton from '../../profile360/vet360/components/base/LoadingButton';

import PreferenceOption from '../components/PreferenceOption';
import { benefitChoices } from '../helpers';

import {
  setPreference,
  savePreferences,
  fetchAvailableBenefits,
} from '../actions';

class SetPreferences extends React.Component {
  componentWillMount() {
    this.props.fetchAvailableBenefits();
  }

  handleSave = () => {
    this.props.savePreferences(this.props.preferences.dashboard);
    this.props.router.push('/');
  };

  handlePreferenceToggle = slug => () => {
    this.props.setPreference(slug, !this.props.preferences.dashboard[slug]);
  };

  render() {
    const isSaving = this.props.isSaving;
    return (
      <div className="row user-profile-row">
        <div className="small-12 columns">
          <h1 id="dashboard-title">Find VA Benefits</h1>
          <p className="va-introtext">
            Tell us which benefits you’re interested in, so we can help you
            apply. Select one or more of the types of benefits below, and we’ll
            help you get started.
          </p>
          <div className="preferences-grid">
            {/* this will map over the preferences from the BE and merge with data from benefitsChoices */}
            {benefitChoices.map((item, itemIndex) => (
              <PreferenceOption
                key={itemIndex}
                item={item}
                onChange={this.handlePreferenceToggle}
                checked={!!this.props.preferences.dashboard[item.slug]}
              />
            ))}
          </div>
          <div>
            <LoadingButton isLoading={isSaving} onClick={this.handleSave}>
              <span>Save Preferences</span>
            </LoadingButton>
            <Link to="/" className="usa-button usa-button-secondary">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  preferences: state.preferences,
});

const mapDispatchToProps = {
  setPreference,
  savePreferences,
  fetchAvailableBenefits,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SetPreferences),
);
export { SetPreferences };
