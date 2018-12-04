import React from 'react';
import _ from 'lodash/fp';
import moment from 'moment';
import AdditionalInfo from '@department-of-veterans-affairs/formation/AdditionalInfo';

import {
  stringifyFormReplacer,
  filterViewFields,
  filterInactivePageData,
  getActivePages,
  expandArrayPages,
  createFormPageList,
} from 'us-forms-system/lib/js/helpers';
import { getInactivePages } from 'platform/forms/helpers';
import { isValidDate } from 'platform/forms/validations';

import facilityLocator from '../facility-locator/manifest';

export function transform(formConfig, form) {
  const expandedPages = expandArrayPages(
    createFormPageList(formConfig),
    form.data,
  );
  const activePages = getActivePages(expandedPages, form.data);
  const inactivePages = getInactivePages(expandedPages, form.data);
  const withoutInactivePages = filterInactivePageData(
    inactivePages,
    activePages,
    form,
  );
  let withoutViewFields = filterViewFields(withoutInactivePages);

  // add back dependents here, because it could have been removed in filterViewFields
  if (!withoutViewFields.dependents) {
    withoutViewFields = _.set('dependents', [], withoutViewFields);
  }

  const formData =
    JSON.stringify(withoutViewFields, (key, value) => {
      // Don’t let dependents be removed in the normal empty object clean up
      if (key === 'dependents') {
        return value;
      }

      return stringifyFormReplacer(key, value);
    }) || '{}';

  let gaClientId;
  try {
    // eslint-disable-next-line no-undef
    gaClientId = ga.getAll()[0].get('clientId');
  } catch (e) {
    // don't want to break submitting because of a weird GA issue
  }

  return JSON.stringify({
    gaClientId,
    asyncCompatible: true,
    form: formData,
  });
}

export const facilityHelp = (
  <div>
    <div>
      OR{' '}
      <a href={facilityLocator.rootUrl} target="_blank">
        Find locations with the VA Facility Locator
      </a>
    </div>
    <br />
    If you’re looking for medical care outside the continental U.S. or Guam,
    you’ll need to sign up for our Foreign Medical Program.{' '}
    <a
      href="https://www.va.gov/COMMUNITYCARE/programs/veterans/fmp/index.asp"
      target="_blank"
    >
      Learn more about the Foreign Medical Program
    </a>
    .<br />
    <p>
      You can also visit{' '}
      <a
        href="https://www.benefits.va.gov/PERSONA/veteran-abroad.asp"
        target="_blank"
      >
        Veterans Living Abroad
      </a>
      .
    </p>
  </div>
);

const vaMedicalFacilities = {
  AK: [
    { value: '463GA', label: 'FAIRBANKS VA CLINIC' },
    { value: '463GB', label: 'KENAI VA CLINIC' },
    { value: '463GC', label: 'MAT-SU VA CLINIC' },
    { value: '463GD', label: 'HOMER VA CLINIC' },
    { value: '463GE', label: 'JUNEAU VA CLINIC' },
  ],
  AL: [
    { value: '520GA', label: 'MOBILE OPC' },
    { value: '521', label: 'BIRMINGHAM VAMC' },
    { value: '521GA', label: 'HUNTSVILLE CBOC' },
    { value: '521GB', label: 'DECATUR CBOC' },
    { value: '521GC', label: 'FLORENCE CBOC' },
    { value: '521GD', label: 'RAINBOW CITY CBOC' },
    { value: '521GE', label: 'ANNISTON CBOC' },
    { value: '521GF', label: 'JASPER VA CLINIC' },
    { value: '521GG', label: 'BESSEMER CBOC' },
    { value: '521GH', label: 'CHILDERSBURG CBOC' },
    { value: '521GI', label: 'GUNTERSVILLE CBOC' },
    { value: '521GJ', label: 'BIRMINGHAM VA CLINIC' },
    {
      value: '619',
      label: 'CENTRAL ALABAMA HEALTH CARE SYSTEM - MONTGOMERY DIVISION',
    },
    {
      value: '619A4',
      label: 'CENTRAL ALABAMA HEALTH CARE SYSTEM - TUSKEGEE DIVISION',
    },
    { value: '619GB', label: 'CENTRAL ALABAMA HCS - DOTHAN CBOC' },
    { value: '619GD', label: 'WIREGRASS CBOC' },
    { value: '619GE', label: 'MONROE COUNTY CBOC' },
    { value: '679', label: 'TUSCALOOSA VA MEDICAL CENTER' },
    { value: '679GA', label: 'SELMA VA CLINIC' },
  ],
  AR: [
    { value: '564', label: 'FAYETTEVILLE VA MEDICAL' },
    { value: '564GA', label: 'HARRISON VA CLINIC' },
    { value: '564GB', label: 'FORT SMITH VA CLINIC' },
    { value: '564GD', label: 'OZARK CBOC' },
    {
      value: '598',
      label: 'CENTRAL ARKANSAS HEALTH CARE SYSTEM - LITTLE ROCK',
    },
    { value: '598A0', label: 'NORTH LITTLE ROCK, AR VANPH' },
    { value: '598GA', label: 'MOUNTAIN HOME, AR CBOC' },
    { value: '598GB', label: 'EL DORADO, AR CBOC' },
    { value: '598GC', label: 'HOT SPRINGS, AR CBOC' },
    { value: '598GD', label: 'MENA, AR (CBOC)' },
    { value: '598GE', label: 'PINE BLUFF CBOC' },
    { value: '598GF', label: 'SEARCY CBOC' },
    { value: '598GG', label: 'CONWAY CBOC' },
    { value: '598GH', label: 'RUSSELLVILLE CBOC' },
    { value: '614GB', label: 'JONESBORO VA CLINIC' },
    { value: '614GN', label: 'HELENA VA CLINIC' },
    { value: '657GG', label: 'PARAGOULD VA CLINIC' },
    { value: '657GW', label: 'POCAHONTAS VA CLINIC' },
    { value: '667GA', label: 'TEXARKANA CBOC' },
  ],
  AS: [{ value: '459GF', label: 'AMERICAN SAMOA VA CLINIC' }],
  AZ: [
    { value: '644', label: 'PHOENIX VAMC' },
    { value: '644BY', label: 'SOUTHEAST CBOC' },
    { value: '644GA', label: 'SUN CITY, AZ CBOC' },
    { value: '644GB', label: 'SHOW LOW CBOC' },
    { value: '644GC', label: 'SOUTHWEST CBOC' },
    { value: '644GD', label: 'PAYSON CBOC' },
    { value: '644GE', label: 'THUNDERBIRD VA CBOC' },
    { value: '644GF', label: 'GLOBE HEALTH CARE CLINIC' },
    { value: '644GG', label: 'N EAST PHOENIX VA CLINIC' },
    {
      value: '649',
      label: 'NORTHERN ARIZONA HEALTH CARE SYSTEM - PRESCOTT DIVISION',
    },
    { value: '649GA', label: 'KINGMAN CBOC' },
    { value: '649GB', label: 'FLAGSTAFF CBOC' },
    { value: '649GC', label: 'PRESCOTT CBOC LAKE HAVASU CITY' },
    { value: '649GD', label: 'ANTHEM CBOC' },
    { value: '649GE', label: 'COTTONWOOD CBOC' },
    {
      value: '678',
      label: 'SOUTHERN ARIZONA HEALTH CARE SYSTEM - TUCSON DIVISION',
    },
    { value: '678GA', label: 'SIERRA VISTA CBOC' },
    { value: '678GB', label: 'YUMA CBOC' },
    { value: '678GC', label: 'CASA GRANDE CBOC' },
    { value: '678GD', label: 'SAFFORD CBOC' },
    { value: '678GE', label: 'GREEN VALLEY CBOC' },
    { value: '678GF', label: 'NORTHWEST TUCSON URBAN CBOC' },
    { value: '678GG', label: 'SOUTHEAST TUCSON' },
  ],
  CA: [
    { value: '570', label: 'FRESNO VA MEDICAL CENTER' },
    { value: '570GA', label: 'MERCED VA CLINIC' },
    { value: '570GB', label: 'TULARE VA CLINIC' },
    { value: '570GC', label: 'OAKHURST VA CLINIC' },
    { value: '600', label: 'VA LONG BEACH HEALTHCARE SYSTEM' },
    { value: '600GA', label: 'ANAHEIM VETERANS HEALTH CLINIC' },
    { value: '600GB', label: 'SANTA ANA VETERANS HEALTH CLINIC' },
    { value: '600GC', label: 'CABRILLO VETERANS HEALTH CLINIC' },
    { value: '600GD', label: 'WHITTIER/SANTA FE SPRINGS CLINIC' },
    { value: '600GE', label: 'LAGUNA HILLS VET HLTH CLINIC' },
    { value: '605', label: 'LOMA LINDA HCS' },
    { value: '605BZ', label: 'LOMA LINDA VA CLINIC' },
    { value: '605GA', label: 'VICTORVILLE CBOC' },
    { value: '605GB', label: 'MURRIETA CBOC' },
    { value: '605GC', label: 'PALM DESERT CBOC' },
    { value: '605GD', label: 'CORONA CBOC' },
    { value: '605GE', label: 'RANCHO CUCAMONGA CBOC' },
    { value: '612', label: 'NORTHERN CALIFORNIA HCS' },
    { value: '612A4', label: 'SACRAMENTO VA MEDICAL CENTER' },
    { value: '612B4', label: 'REDDING VA CLINIC' },
    { value: '612BY', label: 'OAKLAND VA CLINIC' },
    { value: '612GD', label: 'FAIRFIELD VA CLINIC' },
    { value: '612GE', label: 'MARE ISLAND VA CLINIC' },
    { value: '612GF', label: 'MARTINEZ CBOC' },
    { value: '612GG', label: 'CHICO VA CLINIC' },
    { value: '612GH', label: 'MCCLELLAN VA CLINIC' },
    { value: '612GI', label: 'YUBA CITY CBOC' },
    { value: '612GJ', label: 'YREKA VA CLINIC' },
    { value: '612MA', label: 'IDES MCCLELLAN OPC' },
    { value: '640', label: 'PALO ALTO VA MEDICAL CENTER' },
    { value: '640A4', label: 'PALO ALTO VAMC-LIVERMORE' },
    { value: '640BY', label: 'SAN JOSE VA CLINIC' },
    { value: '640GA', label: 'CAPITOLA VA CLINIC' },
    { value: '640GB', label: 'SONORA VA CLINIC' },
    { value: '640GC', label: 'FREMONT VA CLINIC' },
    {
      value: '640HA',
      label: 'PALO ALTO HEALTH CARE SYSTEM - STOCKTON DIVSION',
    },
    { value: '640HB', label: 'MODESTO VA CLINIC' },
    { value: '640HC', label: 'MONTEREY VA CLINIC' },
    { value: '654GA', label: 'SIERRA FOOTHILLS VA CLINIC' },
    { value: '654GD', label: 'DIAMOND VIEW VA CLINIC' },
    { value: '662', label: 'SAN FRANCISCO VAMC' },
    { value: '662GA', label: 'SANTA ROSA, CA CBOC' },
    { value: '662GB', label: 'VALLEJO CBOC' },
    { value: '662GC', label: 'EUREKA VA CLINIC' },
    { value: '662GD', label: 'UKIAH VA CLINIC' },
    { value: '662GE', label: 'SAN BRUNO CBOC' },
    { value: '662GF', label: 'SAN FRANCISCO VA CLINIC' },
    { value: '662GG', label: 'CLEARLAKE VA CLINIC' },
    { value: '664', label: 'VA SAN DIEGO HEALTHCARE SYSTEM (664)' },
    { value: '664BY', label: 'MISSION VALLEY SOC' },
    { value: '664GA', label: 'IMPERIAL VALLEY CBOC' },
    { value: '664GB', label: 'OCEANSIDE CBOC' },
    { value: '664GC', label: 'CHULA VISTA CBOC' },
    { value: '664GD', label: 'ESCONDIDO CBOC' },
    {
      value: '691',
      label:
        'VA GREATER LOS ANGELES HEALTHCARE SYSTEM - WEST LOS ANGELES DIVISION',
    },
    { value: '691A4', label: 'SEPULVEDA OUTPATIENT & NURSING HOME CARE' },
    { value: '691GB', label: 'SANTA BARBARA CBOC' },
    { value: '691GC', label: 'GARDENA CBOC' },
    { value: '691GD', label: 'BAKERSFIELD CBOC' },
    { value: '691GE', label: 'LOS ANGELES CBOC' },
    { value: '691GF', label: 'EAST LOS ANGELES CBOC' },
    { value: '691GG', label: 'ANTELOPE VALLEY VA CLINIC' },
    { value: '691GK', label: 'SAN LUIS OBISPO CBOC' },
    { value: '691GL', label: 'SANTA MARIA CBOC' },
    { value: '691GM', label: 'OXNARD CBOC' },
    { value: '691GN', label: 'LYNWOOD CBOC' },
    { value: '691GO', label: 'PASADENA CBOC' },
  ],
  CO: [
    { value: '442GC', label: 'FORT COLLINS VA CLINIC' },
    { value: '442GD', label: 'GREELEY VA CLINIC' },
    { value: '501GJ', label: 'DURANGO VA CLINIC' },
    { value: '554', label: 'DENVER VA MEDICAL CENTER' },
    { value: '554GB', label: 'AURORA VA CLINIC' },
    { value: '554GC', label: 'GOLDEN VA CLINIC' },
    { value: '554GD', label: 'PUEBLO VA CLINIC' },
    { value: '554GE', label: 'FLOYD K. LINDSTROM VA CLINIC' },
    { value: '554GF', label: 'ALAMOSA VA CLINIC' },
    {
      value: '554GG',
      label: 'LA JUNTA COMMUNITY BASED OUTPATIENT CLINIC (554GG)',
    },
    { value: '554GH', label: 'LAMAR VA CLINIC' },
    { value: '554GI', label: 'BURLINGTON VA CLINIC' },
    { value: '575', label: 'GRAND JUNCTION VAMC' },
    { value: '575GA', label: 'MONTROSE CBOC' },
  ],
  CT: [
    {
      value: '689',
      label: 'VA CONNECTICUT HEALTHCARE SYSTEM - WEST HAVEN DIVISION',
    },
    { value: '689A4', label: 'NEWINGTON' },
    { value: '689GA', label: 'WATERBURY' },
    { value: '689GB', label: 'STAMFORD VA PRIMARY CARE CTR' },
    { value: '689GC', label: 'WINDHAM CBOC' },
    { value: '689GD', label: 'WINSTED' },
    { value: '689GE', label: 'DANBURY' },
    { value: '689HC', label: 'NEW LONDON' },
  ],
  DC: [
    { value: '688', label: 'WASHINGTON VA MEDICAL CENTER' },
    { value: '688GB', label: 'SOUTHEAST WASHINGTON VA CLINIC' },
    { value: '688QA', label: 'FRANKLIN STREET VA CLINIC' },
  ],
  DE: [
    { value: '460', label: 'WILMINGTON VA MEDICAL CENTER' },
    { value: '460GA', label: 'SUSSEX COUNTY VA CLINIC' },
    { value: '460GC', label: 'KENT COUNTY VA CLINIC' },
  ],
  FL: [
    { value: '516', label: 'C.W. BILL YOUNG DEPT OF VAMC' },
    { value: '516BZ', label: 'LEE COUNTY VA CLINIC' },
    { value: '516GA', label: 'SARASOTA COUNTY CBOC' },
    { value: '516GB', label: 'ST. PETERSBURG VA CLINIC' },
    { value: '516GC', label: 'PALM HARBOR VA CLINIC' },
    { value: '516GD', label: 'BRADENTON VA CLINIC' },
    { value: '516GE', label: 'PORT CHARLOTTE VA CLINIC' },
    { value: '516GF', label: 'NAPLES VA CLINIC' },
    { value: '516GH', label: 'SEBRING VA CLINIC' },
    { value: '520BZ', label: 'PENSACOLA VA CLINIC' },
    { value: '520GB', label: 'PANAMA CITY BEACH VA CLINIC' },
    { value: '520GC', label: 'EGLIN AIR FORCE BASE VA CLINIC' },
    { value: '546', label: 'BRUCE W. CARTER DEPT OF VAMC' },
    { value: '546B0', label: 'MIAMI (OCS)' },
    { value: '546BZ', label: 'WILLIAM BILL KLING VAOC' },
    { value: '546GA', label: 'MIAMI (ALCOHOL/DRUG)' },
    { value: '546GB', label: 'KEY WEST CBOC' },
    { value: '546GC', label: 'HOMESTEAD VA CLINIC' },
    { value: '546GD', label: 'PEMBROKE PINES VA CLINIC' },
    { value: '546GE', label: 'KEY LARGO VA CLINIC' },
    { value: '546GF', label: 'HOLLYWOOD VA CLINIC' },
    { value: '546GH', label: 'DEERFIELD BEACH CLINIC' },
    { value: '548', label: 'WEST PALM BEACH VAMC' },
    { value: '548GA', label: 'FORT PIERCE VA CLINIC' },
    { value: '548GB', label: 'DELRAY BEACH VA CLINIC' },
    { value: '548GC', label: 'STUART VA CLINIC' },
    { value: '548GD', label: 'BOCA RATON CBOC' },
    { value: '548GE', label: 'VERO BEACH VA CLINIC' },
    { value: '548GF', label: 'OKEECHOBEE VA CLINIC' },
    { value: '573', label: 'MALCOM RANDALL DEPT OF VAMC' },
    { value: '573A4', label: 'LAKE CITY VA MEDICAL CENTER' },
    { value: '573BY', label: 'JACKSONVILLE 1 VA CLINIC' },
    { value: '573GB', label: 'JACKSONVILLE CBOC' },
    { value: '573GC', label: 'DAYTONA BEACH CBOC' },
    { value: '573GD', label: 'OCALA VA CLINIC' },
    { value: '573GE', label: 'SAINT AUGUSTINE VA CLINIC' },
    { value: '573GF', label: 'TALLAHASSEE VA CLINIC' },
    { value: '573GG', label: 'LECANTO VA CLINIC' },
    { value: '573GI', label: 'THE VILLAGES VA CLINIC' },
    { value: '573GK', label: 'MARIANNA VA CLINIC' },
    { value: '573GL', label: 'PALATKA VA CLINIC' },
    { value: '573GN', label: 'PERRY VA CLINIC' },
    { value: '673', label: 'JAMES A. HALEY VETERANS HOSP' },
    { value: '673BZ', label: 'PORT RICHEY OUTPATIENT CLINIC' },
    { value: '673GB', label: 'LAKELAND VA CLINIC' },
    { value: '673GC', label: 'BROOKSVILLE CBOC' },
    { value: '673GF', label: 'ZEPHYRHILLS VA CLINIC' },
    { value: '675', label: 'ORLANDO VAMC' },
    { value: '675GA', label: 'VIERA VA CLINIC' },
    { value: '675GB', label: 'WILLIAM V. CHAPPELL, JR. VOC' },
    { value: '675GC', label: 'KISSIMMEE VA CLINIC' },
    { value: '675GD', label: 'ORANGE CITY VA CLINIC' },
    { value: '675GE', label: 'TAVARES VA CLINIC' },
    { value: '675GF', label: 'CLERMONT CBOC' },
    { value: '675GG', label: 'LAKE BALDWIN VA CLINIC' },
  ],
  GA: [
    { value: '508', label: 'ATLANTA VAMC' },
    { value: '508GA', label: 'ATLANTA VA CBOC' },
    { value: '508GE', label: 'OAKWOOD VA CLINIC' },
    { value: '508GF', label: 'AUSTELL CBOC' },
    { value: '508GG', label: 'STOCKBRIDGE CBOC' },
    { value: '508GH', label: 'LAWRENCEVILLE CBOC' },
    { value: '508GI', label: 'NEWNAN CBOC' },
    { value: '508GJ', label: 'BLAIRSVILLE CBOC' },
    { value: '508GK', label: 'CARROLLTON CBOC' },
    { value: '508GL', label: 'ROME VA CLINIC' },
    { value: '509', label: 'AUGUSTA VAMC' },
    { value: '509A0', label: 'AUGUSTA VAMC - UPTOWN' },
    { value: '509GA', label: 'ATHENS CBOC' },
    { value: '534BY', label: 'SAVANNAH PRIMARY CARE CLINIC' },
    { value: '534GE', label: 'HINESVILLE CBOC' },
    { value: '557', label: 'DUBLIN' },
    { value: '557GA', label: 'MACON VA CBOC' },
    { value: '557GB', label: 'ALBANY VA CBOC' },
    { value: '557GC', label: 'BALDWIN CBOC' },
    { value: '557GE', label: 'BRUNSWICK CBOC' },
    { value: '557GF', label: 'TIFTON VA CLINIC' },
    { value: '573GA', label: 'VALDOSTA CBOC' },
    { value: '573GJ', label: 'ST. MARYS VA CLINIC' },
    { value: '573GM', label: 'WAYCROSS VA CLINIC' },
    { value: '619GA', label: 'CENTRAL ALABAMA HCS - COLUMBUS CBOC' },
    { value: '619QB', label: 'FORT BENNING VA CLINIC' },
  ],
  GU: [{ value: '459GE', label: 'GUAM CBOC' }],
  HI: [
    { value: '459', label: 'SPARK M. MATSUNAGA VAMC' },
    { value: '459GA', label: 'MAUI VA CLINIC' },
    { value: '459GB', label: 'HILO CBOC' },
    { value: '459GC', label: 'KONA CBOC' },
    { value: '459GD', label: 'KAUAI CBOC' },
    { value: '459GG', label: 'LEEWARD OAHU CBOC' },
  ],
  IA: [
    { value: '433', label: 'DES MOINES VAMROC' },
    { value: '438GA', label: 'SPIRIT LAKE CBOC' },
    { value: '438GC', label: 'SIOUX CITY CBOC' },
    { value: '636A6', label: 'VA CIHS, DES MOINES DIVISION' },
    { value: '636A8', label: 'IOWA CITY HCS' },
    { value: '636GC', label: 'MASON CITY COMMINITY BASED OUTPATIENT CLINIC' },
    { value: '636GD', label: 'MARSHALLTOWN COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GF', label: 'BETTENDORF COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GH', label: 'WATERLOO COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GJ', label: 'DUBUQUE COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GK', label: 'FORT DODGE CBOC' },
    { value: '636GM', label: 'CARROLL CBOC' },
    { value: '636GN', label: 'CEDAR RAPIDS CBOC' },
    { value: '636GP', label: 'SHENANDOAH CBOC' },
    { value: '636GR', label: 'KNOXVILLE CBOC' },
    { value: '636GS', label: 'OTTUMWA CBOC' },
    { value: '636GU', label: 'DECORAH CBOC' },
    { value: '636GW', label: 'CORALVILLE VA CBOC' },
  ],
  ID: [
    { value: '447', label: 'BOISE VAMROC' },
    { value: '531', label: 'BOISE VA MEDICAL CENTER' },
    { value: '531GE', label: 'TWIN FALLS VA CLINIC' },
    { value: '531GG', label: 'CALDWELL VA CLINIC' },
    { value: '531GI', label: 'MOUNTAIN HOME VA CLINIC' },
    { value: '531GJ', label: 'SALMON VA CLINIC' },
    { value: '660GA', label: 'VA POCATELLO CBOC (660GA)' },
    { value: '668GB', label: 'COEUR D ALENE VA CLINIC' },
    { value: '687GB', label: 'LEWISTON VA CLINIC' },
  ],
  IL: [
    { value: '537', label: 'JESSE BROWN VA MEDICAL CENTER' },
    { value: '537GA', label: 'CHICAGO HEIGHTS CBOC' },
    { value: '537GD', label: 'LAKESIDE CBOC' },
    { value: '537HA', label: 'BEVERLY CBOC' },
    { value: '550', label: 'DANVILLE VA MEDICAL CENTER' },
    { value: '550BY', label: 'BOB MICHEL VA OPC' },
    { value: '550GA', label: 'DECATUR VA CLINIC' },
    { value: '550GD', label: 'SPRINGFIELD VA CLINIC' },
    { value: '550GF', label: 'MATTOON CBOC' },
    { value: '556', label: 'CAPTN JAMES LOVELL FED HLT CTR' },
    { value: '556GA', label: 'EVANSTON CBOC' },
    { value: '556GC', label: 'MCHENRY CBOC' },
    { value: '578', label: 'EDWARD J. HINES JR. HOSPITAL' },
    { value: '578GA', label: 'JOLIET CBOC (578GA)' },
    { value: '578GC', label: 'KANKAKEE COUNTY CBOC' },
    { value: '578GD', label: 'AURORA CBOC (578GD)' },
    { value: '578GE', label: 'HOFFMAN ESTATES VA CLINIC' },
    { value: '578GF', label: 'LASSALLE CBOC (578GF)' },
    { value: '578GG', label: 'OAK LAWN CBOC (578GG)' },
    { value: '607GF', label: 'FREEPORT CBOC' },
    { value: '607HA', label: 'ROCKFORD, IL OPC' },
    { value: '636GG', label: 'QUINCY COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GI', label: 'GALESBURG COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '636GT', label: 'STERLING CBOC' },
    { value: '657A5', label: 'MARION VA MEDICAL CENTER' },
    { value: '657GA', label: 'BELLEVILLE VA CLINIC' },
    { value: '657GK', label: 'MT. VERNON IL CBOC (657GK)' },
    { value: '657GM', label: 'EFFINGHAM VA CLINIC' },
    { value: '657GT', label: 'CARBONDALE CBOC' },
    { value: '657GU', label: 'HARRISBURG VA CLINIC' },
  ],
  IN: [
    { value: '537BY', label: 'ADAM BENJAMIN JR OPC' },
    { value: '539GC', label: 'LAWRENCEBURG (DEARBORN COUNTY)' },
    { value: '550GC', label: 'LAFAYETTE, IN CBOC' },
    { value: '552GC', label: 'RICHMOND CBOC' },
    { value: '583', label: 'RICHARD L. ROUDEBUSH VAMC' },
    { value: '583GA', label: 'TERRE HAUTE VA CLINIC' },
    { value: '583GB', label: 'BLOOMINGTON VA CLINIC' },
    { value: '583GC', label: 'MARTINSVILLE VA CLINIC' },
    { value: '583GD', label: 'INDIANAPOLIS WEST VA CLINIC' },
    { value: '583GE', label: 'WEST LAFAYETTE VA CLINIC' },
    { value: '603GB', label: 'NEW ALBANY VA CLINIC' },
    { value: '603GG', label: 'SCOTT COUNTY VA CLINIC' },
    { value: '610', label: 'MARION VA MEDICAL CENTER' },
    { value: '610A4', label: 'FORT WAYNE VA MEDICAL CENTER' },
    { value: '610GA', label: 'SOUTH BEND VA CLINIC' },
    { value: '610GB', label: 'MUNCIE VA CLINIC' },
    { value: '610GC', label: 'GOSHEN VA CLINIC' },
    { value: '610GD', label: 'PERU VA CLINIC' },
    { value: '657GJ', label: 'EVANSVILLE VA CLINIC' },
    { value: '657GQ', label: 'VINCENNES VA CLINIC' },
  ],
  KS: [
    { value: '589A5', label: 'COLMERY O NEIL VAMC' },
    { value: '589A6', label: 'DWIGHT D. EISENHOWER VAMC' },
    { value: '589A7', label: 'ROBERT J. DOLE VAMC' },
    { value: '589G2', label: 'DODGE CITY VA CLINIC' },
    { value: '589G3', label: 'LIBERAL CBOC' },
    { value: '589G4', label: 'HAYS CBOC' },
    { value: '589G5', label: 'PARSONS CBOC' },
    { value: '589G7', label: 'HUTCHINSON CBOC' },
    { value: '589G9', label: 'FORT RILEY CBOC' },
    { value: '589GC', label: 'PAOLA VA CLINIC' },
    { value: '589GJ', label: 'WYANDOTTE COUNTY VA CLINIC' },
    { value: '589GM', label: 'CHANUTE VA CLINIC' },
    { value: '589GN', label: 'EMPORIA VA CLINIC' },
    { value: '589GP', label: 'GARNETT VA CLINIC' },
    { value: '589GR', label: 'JUNCTION CITY VA CLINIC' },
    { value: '589GU', label: 'LAWRENCE VA CLINIC' },
    { value: '589GV', label: 'FORT SCOTT VA CLINIC' },
    { value: '589GW', label: 'SALINA CBOC WICHITA' },
    { value: '677HQ', label: 'JUNCTION CITY CBOC' },
  ],
  KY: [
    { value: '539A4', label: 'CINCINNATI VAMC FORT THOMAS' },
    { value: '539GA', label: 'BELLEVUE CBOC' },
    { value: '539GD', label: 'FLORENCE CBOC' },
    { value: '581GA', label: 'PRESTONSBURG CBOC' },
    { value: '596', label: 'LEXINGTON VAMC-LEESTOWN' },
    { value: '596A4', label: 'LEXINGTON VETERANS AFFAIRS MEDICAL CENTER' },
    { value: '596GA', label: 'SOMERSET VA CLINIC' },
    { value: '596GB', label: 'MOREHEAD VA CLINIC' },
    { value: '596GC', label: 'HAZARD VA CLINIC' },
    { value: '596GD', label: 'BEREA VA CLINIC' },
    { value: '596HA', label: 'LEXINGTON MOBILE OUTREACH CLINIC' },
    { value: '603', label: 'ROBLEY REX VAMC' },
    { value: '603GA', label: 'VA HEALTHCARE CENTER, FT. KNOX' },
    { value: '603GC', label: 'SHIVELY VA CLINIC' },
    { value: '603GD', label: 'DUPONT VA CLINIC' },
    { value: '603GE', label: 'NEWBURG VA CLINIC' },
    { value: '603GF', label: 'GRAYSON COUNTY VA CLINIC' },
    { value: '603GH', label: 'CARROLLTON VA CLINIC' },
    {
      value: '626GC',
      label: 'BOWLING GREEN COMMUNITY BASED OUTPATIENT CLINIC',
    },
    { value: '626GJ', label: 'HOPKINSVILLE VA CLINIC' },
    { value: '657GL', label: 'PADUCAH KY CBOC (657GL)' },
    { value: '657GO', label: 'HANSON VA CLINIC' },
    { value: '657GP', label: 'OWENSBORO VA CLINIC' },
    { value: '657GR', label: 'MAYFIELD VA CLINIC' },
  ],
  LA: [
    { value: '502', label: 'ALEXANDRIA VA MEDICAL CENTER' },
    { value: '502GA', label: 'JENNINGS CBOC' },
    { value: '502GB', label: 'LAFAYETTE VA CLINIC' },
    { value: '502GE', label: 'LAKE CHARLES VA CLINIC' },
    { value: '502GF', label: 'FORT POLK VA CLINIC' },
    { value: '502GG', label: 'NATCHITOCHES VA CLINIC' },
    { value: '629', label: 'SE LOUISIANA VETERANS HCS' },
    { value: '629BY', label: 'VA BATON ROUGE OUTPATIENT CLINIC' },
    { value: '629GA', label: 'HOUMA CBOC' },
    { value: '629GB', label: 'HAMMOND CBOC' },
    { value: '629GC', label: 'SLIDELL CBOC' },
    { value: '629GD', label: 'ST. JOHN VA OUTPATIENT CLINIC' },
    { value: '629GE', label: 'FRANKLIN CBOC' },
    { value: '629GF', label: 'BOGALUSA CBOC' },
    { value: '667', label: 'OVERTON BROOKS VA MEDICAL CENTER' },
    { value: '667GB', label: 'MONROE VA CLINIC' },
  ],
  MA: [
    { value: '518', label: 'EDITH NOURSE ROGERS VAMC' },
    { value: '518GA', label: 'LYNN VA CLINIC' },
    { value: '518GB', label: 'HAVERHILL VA CLINIC' },
    { value: '518GE', label: 'GLOUCESTER VA CLINIC' },
    { value: '518GG', label: 'FITCHBURG CBOC' },
    { value: '523', label: 'VA BOSTON HEALTHCARE SYSTEM - BOSTON DIVISION' },
    {
      value: '523A4',
      label: 'VA BOSTON HEALTHCARE SYSTEM - WEST ROXBURY DIVISION',
    },
    {
      value: '523A5',
      label: 'VA BOSTON HEALTHCARE SYSTEM - BROCKTON DIVISION',
    },
    { value: '523BY', label: 'VA BOSTON HEALTHCARE SYSTEM - LOWELL DIVISION' },
    {
      value: '523BZ',
      label: 'VA BOSTON HEALTHCARE SYSTEM - BOSTON OPC DIVISION',
    },
    { value: '523GA', label: 'VA BOSTON HEALTHCARE SYSTEM - FRAMINGHAM CBOC' },
    {
      value: '523GB',
      label: 'VA BOSTON HEALTHCARE SYSTEM - WORCESTER DIVISION',
    },
    { value: '523GC', label: 'VA BOSTON HEALTHCARE SYSTEM - QUINCY CBOC' },
    { value: '523GD', label: 'PLYMOUTH CBOC' },
    { value: '631', label: 'VA CNTRL WSTRN MASSCHUSETS HCS' },
    { value: '631BY', label: 'SPRINGFIELD OPC' },
    { value: '631GC', label: 'PITTSFIELD CBOC' },
    { value: '631GD', label: 'GREENFIELD CBOC' },
    { value: '631GE', label: 'WORCESTER CBOC' },
    { value: '631GF', label: 'FITCHBURG CBOC' },
    { value: '650GA', label: 'NEW BEDFORD CBOC' },
    { value: '650GB', label: 'HYANNIS CBOC' },
  ],
  MD: [
    { value: '512', label: 'VA MARYLAND HEALTH CARE SYS' },
    { value: '512A5', label: 'PERRY POINT VAMC' },
    { value: '512GA', label: 'CAMBRIDGE VA CLINIC' },
    { value: '512GC', label: 'GLEN BURNIE VA CLINIC' },
    { value: '512GD', label: 'LOCH RAVEN VA CLINIC' },
    { value: '512GE', label: 'POCOMOKE CITY VA CLINIC' },
    { value: '512GF', label: 'FORT HOWARD VA CLINIC' },
    { value: '512GG', label: 'FORT MEADE VA CLINIC' },
    { value: '613GA', label: 'CUMBERLAND CBOC' },
    { value: '613GB', label: 'HAGERSTOWN VA CLINIC' },
    { value: '613GG', label: 'FORT DETRICK VA CLINIC' },
    { value: '688GC', label: 'GREENBELT VA CLINIC' },
    { value: '688GD', label: 'CHARLOTTE HALL VA CLINIC' },
    { value: '688GE', label: 'S PRINCE GEORGES CITY VA CLINIC' },
  ],
  ME: [
    { value: '402', label: 'MAINE VA HCS' },
    { value: '402GA', label: 'CARIBOU MAINE CBOC' },
    { value: '402GB', label: 'CALAIS MAINE CBOC' },
    { value: '402GC', label: 'RUMFORD MAINE CBOC' },
    { value: '402GD', label: 'SACO MAINE CBOC' },
    { value: '402GE', label: 'LEWISTON AUBURN CBOC' },
    { value: '402GF', label: 'LINCOLN VA CLINIC' },
    { value: '402HB', label: 'BANGOR MAINE CBOC' },
    { value: '402HC', label: 'PORTLAND MAINE MH ORC' },
  ],
  MI: [
    { value: '506', label: 'ANN ARBOR VA MEDICAL CENTER' },
    { value: '506GB', label: 'FLINT VA CLINIC' },
    { value: '506GC', label: 'JACKSON CBOC' },
    { value: '515', label: 'BATTLE CREEK VA MEDICAL CENTER' },
    { value: '515BY', label: 'WYOMING HEALTH CARE CENTER' },
    { value: '515GA', label: 'MUSKEGON VA CLINIC' },
    { value: '515GB', label: 'LANSING CBOC' },
    { value: '515GC', label: 'BENTON HARBOR VA CLINIC' },
    { value: '553', label: 'JOHN D. DINGELL VAMC' },
    { value: '553GA', label: 'YALE VA CLINIC' },
    { value: '553GB', label: 'PONTIAC VA CLINIC' },
    { value: '585', label: 'IRON MOUNTAIN VA MEDICAL CENTER' },
    { value: '585GA', label: 'HANCOCK CBOC' },
    { value: '585GC', label: 'MENOMINEE CBOC' },
    { value: '585GD', label: 'IRONWOOD CBOC' },
    { value: '585HA', label: 'MARQUETTE CBOC' },
    { value: '585HB', label: 'SAULT SAINT MARIE CBOC' },
    { value: '655', label: 'ALEDA E. LUTZ VAMC' },
    { value: '655GA', label: 'GAYLORD VA OUTPATIENT CLINIC' },
    { value: '655GB', label: 'TRAVERSE CITY VA CLINIC' },
    { value: '655GC', label: 'OSCODA VA CLINIC' },
    { value: '655GD', label: 'LT. COL CLEMENT VAN WAGONER VA' },
    { value: '655GE', label: 'CLARE VA CLINIC' },
    { value: '655GF', label: 'BAD AXE VA CLINIC' },
    { value: '655GG', label: 'CADILLAC VA CLINIC' },
    { value: '655GH', label: 'CHEBOYGAN COUNTY VA CLINIC' },
    { value: '655GI', label: 'GRAYLING VA CLINIC' },
  ],
  MN: [
    { value: '437GC', label: 'FERGUS FALLS' },
    { value: '437GE', label: 'BEMIDJI CBOC' },
    { value: '618', label: 'MINNEAPOLIS VA HCS' },
    { value: '618GA', label: 'SOUTH CENTRAL CBOC' },
    { value: '618GB', label: 'HIBBING (CBOC)' },
    { value: '618GD', label: 'ST. PAUL (CBOC)' },
    { value: '618GG', label: 'ROCHESTER (CBOC)' },
    { value: '618GI', label: 'NORTHWEST METRO VA OPC' },
    { value: '618GJ', label: 'SHAKOPEE CBOC' },
    { value: '618GK', label: 'ALBERT LEA CBOC' },
    { value: '618GL', label: 'MINNEAPOLIS VA CBOC' },
    { value: '656', label: 'ST. CLOUD VA HEALTH CARE SYSTEM' },
    { value: '656GA', label: 'BRAINERD VA COMMUNITY OUTPATIENT CLINIC' },
    { value: '656GB', label: 'MONTEVIDEO CBOC' },
    { value: '656GC', label: 'MAX J. BEILKE CBOC' },
  ],
  MO: [
    { value: '564BY', label: 'MOUNT VERNON-SOC' },
    { value: '564GC', label: 'BRANSON CBOC' },
    { value: '589', label: 'KANSAS CITY VAMC' },
    { value: '589A4', label: 'HARRY S. TRUMAN VAMC' },
    { value: '589G1', label: 'WARRENSBURG MO CBOC' },
    { value: '589G8', label: 'JEFFERSON CITY, MO CBOC' },
    { value: '589GB', label: 'BELTON VA CLINIC' },
    { value: '589GD', label: 'NEVADA VA CLINIC' },
    { value: '589GE', label: 'KIRKSVILLE VA CLINIC' },
    { value: '589GF', label: 'FORT LEONARD WOOD VA CLINIC' },
    { value: '589GG', label: 'WHITEMAN AFB CBOC' },
    { value: '589GH', label: 'LAKE OF THE OZARKS VA CLINIC' },
    { value: '589GI', label: 'ST. JOSEPH VA CLINIC' },
    { value: '589GX', label: 'MEXICO CBOC (MO)' },
    { value: '589GY', label: 'ST. JAMES VA CLINIC' },
    { value: '589GZ', label: 'CAMERON CBOC' },
    { value: '589JA', label: 'SEDALIA CBOC' },
    { value: '589JB', label: 'EXCELSIOR SPRINGS CBOC' },
    { value: '589JD', label: 'MARSHFIELD CBOC' },
    { value: '589JE', label: 'PLATTE CITY VA CLINIC' },
    { value: '589JF', label: 'HONOR VA CLINIC' },
    {
      value: '657',
      label: 'VA HEARTLAND-EAST, VISN 15 HCS JOHN COCHRAN MEMORIAL HOSPITAL',
    },
    {
      value: '657A0',
      label: 'VA HEARTLAND-EAST, VISN 15 HCS JEFFERSON BARRACKS',
    },
    { value: '657A4', label: 'JOHN PERSHING VAMC' },
    { value: '657GB', label: 'ST LOUIS COUNTY VA CLINIC' },
    { value: '657GD', label: 'ST CHARLES VA CLINIC' },
    { value: '657GF', label: 'WEST PLAINS VA CLINIC' },
    { value: '657GH', label: 'CAPE GIRARDEAU VA CLINIC' },
    { value: '657GI', label: 'FARMINTON VA CLINIC' },
    { value: '657GN', label: 'SALEM VA CLINIC' },
    { value: '657GS', label: 'WASHINGTON VA CLINIC' },
    { value: '657GV', label: 'SIKESTON CBOC' },
    { value: '657GX', label: 'ST. LOUIS VA CLINIC' },
    { value: '657GY', label: 'MANCHESTER VA CLINIC' },
  ],
  MP: [{ value: '459GH', label: 'SAIPAN VA CLINIC' }],
  MS: [
    { value: '423', label: 'JACKSON VAMROC' },
    { value: '520', label: 'BILOXI VA MEDICAL CENTER' },
    { value: '520A0', label: 'GULFPORT VAMC' },
    { value: '520BY', label: 'BILOXI OPC' },
    { value: '586', label: 'G.V. (SONNY) MONTGOMERY' },
    { value: '586GA', label: 'KOSCIUSKO VA CLINIC' },
    { value: '586GB', label: 'MERIDIAN' },
    { value: '586GC', label: 'GREENVILLE' },
    { value: '586GD', label: 'HATTIESBURG' },
    { value: '586GE', label: 'NATCHEZ' },
    { value: '586GF', label: 'COLUMBUS' },
    { value: '586GG', label: 'MCCOMB CBOC' },
    { value: '586QB', label: 'DOGWOOD VIEW PARKWAY VA CLINIC' },
    { value: '614GA', label: 'TUPELO CBOC' },
    { value: '614GC', label: 'MARSHALL COUNTY VA CLINIC' },
  ],
  MT: [
    { value: '436', label: 'FORT HARRISON MEDICAL CENTER' },
    { value: '436A4', label: 'MILES CITY VA MEDICAL CENTER' },
    { value: '436GA', label: 'ANACONDA CBOC' },
    { value: '436GB', label: 'GREAT FALLS CBOC' },
    { value: '436GC', label: 'MISSOULA CBOC' },
    { value: '436GD', label: 'BOZEMAN VA CLINIC' },
    { value: '436GF', label: 'KALISPELL VA CLINIC' },
    { value: '436GH', label: 'BILLINGS VA CLINIC' },
    { value: '436GI', label: 'GLASGOW VA CLINIC' },
    { value: '436GJ', label: 'MILES CITY VA CLINIC' },
    { value: '436GK', label: 'GLENDIVE VA CLINIC' },
    { value: '436GL', label: 'CUT BANK VA CLINIC' },
    { value: '436GM', label: 'LEWISTON CBOC' },
  ],
  NC: [
    { value: '558', label: 'DURHAM VA MEDICAL CENTER' },
    { value: '558GA', label: 'GREENVILLE VA CLINIC NC' },
    { value: '558GB', label: 'RALEIGH VA CLINIC' },
    { value: '558GC', label: 'MOREHEAD CITY VA CLINIC' },
    { value: '558GD', label: 'DURHAM COUNTY VA CLINIC' },
    { value: '558GE', label: 'HILLANDALE ROAD VA CLINIC' },
    { value: '558GF', label: 'WAKE COUNTY VA CLINIC' },
    { value: '565', label: 'FAYETTEVILLE VA MEDICAL CENTER' },
    { value: '565GA', label: 'JACKSONVILLE VA CLINIC' },
    { value: '565GC', label: 'WILMINGTON VA CLINIC (NC)' },
    { value: '565GD', label: 'HAMLET VA CLINIC' },
    { value: '565GE', label: 'ROBESON COUNTY VA CLINIC' },
    { value: '565GF', label: 'GOLDSBORO VA CLINIC' },
    { value: '565GG', label: 'LEE COUNTY VA CLINIC' },
    { value: '565GH', label: 'BRUNSWICK COUNTY VA CLINIC' },
    { value: '565GI', label: 'VILLAGE GREEN VA CLINIC' },
    { value: '565GJ', label: 'JACKSONVILLE 2 VA CLINIC-NC' },
    { value: '565GK', label: 'FAYETTEVILLE VA CLINIC' },
    { value: '565GL', label: 'CUMBERLAND COUNTY VA CLINIC' },
    { value: '590GC', label: 'ALBEMARLE VA CLINIC' },
    { value: '637', label: 'CHARLES GEORGE VAMC' },
    { value: '637GA', label: 'FRANKLIN VA CLINIC' },
    { value: '637GB', label: 'RUTHERFORD COUNTY VA CLINIC' },
    { value: '637GC', label: 'HICKORY VA CLINIC' },
    { value: '659', label: 'W.G. HEFNER SALISBURY VAMC' },
    { value: '659BY', label: 'KERNERSVILLE VA CLINIC' },
    { value: '659BZ', label: 'SOUTH CHARLOTTE VA CLINIC' },
    { value: '659GA', label: 'NORTH CHARLOTTE VA CLINIC' },
    { value: '659GB', label: 'HICKORY CBOC' },
    { value: '659GC', label: 'PETERS CREEK VA CLINIC' },
  ],
  ND: [
    { value: '437', label: 'FARGO VA HCS' },
    { value: '437GA', label: 'GRAFTON' },
    { value: '437GB', label: 'BISMARCK' },
    { value: '437GD', label: 'MINOT CBOC' },
    { value: '437GF', label: 'WILLISTON CBOC' },
    { value: '437GI', label: 'GRAND FORKS CBOC' },
    { value: '437GJ', label: 'STARK COUNTY VA CBOC' },
    { value: '437GK', label: 'STUTSMAN COUNTY VA CBOC' },
    { value: '437GL', label: 'DEVILS LAKE VA CBOC' },
  ],
  NE: [
    { value: '442GB', label: 'SIDNEY VA CLINC' },
    { value: '568HB', label: 'GORDON CBOC' },
    { value: '568HH', label: 'SCOTTSBLUFF CBOC' },
    {
      value: '636',
      label: 'VA CENTRAL PLAINS HEALTH NETWORK - OMAHA DIVISION',
    },
    { value: '636A4', label: 'VA NWIHS, GRAND ISLAND DIV' },
    {
      value: '636A5',
      label: 'VA CENTRAL PLAINS HEALTH NETWORK - LINCOLN DIVISION',
    },
    { value: '636GA', label: 'NORFOLK CBOC' },
    { value: '636GB', label: 'NORTH PLATTE CBOC' },
    { value: '636GL', label: 'BELLEVUE VA CBOC' },
    { value: '636GQ', label: 'HOLDREGE, NE CBOC' },
    { value: '636GV', label: "O'NEILL VA CBOC" },
  ],
  NH: [
    { value: '405HC', label: 'ST. JOHNSBURY VERMONT OUTREACH CLINIC' },
    { value: '405HE', label: 'KEENE OUT REACH CENTER' },
    { value: '608', label: 'MANCHESTER VAMC' },
    { value: '608GA', label: 'PORTSMOUTH CBOC' },
    { value: '608GC', label: 'SOMERSWORTH CBOC' },
    { value: '608GD', label: 'CONWAY CBOC' },
    { value: '608HA', label: 'TILTON CBOC' },
  ],
  NJ: [
    { value: '460GD', label: 'CAPE MAY (WILMINGTON)' },
    { value: '460HE', label: 'ATLANTIC COUNTY VA CLINIC' },
    { value: '460HG', label: 'CUMBERLAND COUNTY VA CLINIC' },
    { value: '561', label: 'NEW JERSEY HEALTH CARE SYSTEM - EAST ORANGE' },
    { value: '561A4', label: 'NEW JERSEY HEALTH CARE SYSTEM - LYONS CAMPUS' },
    { value: '561BY', label: 'NEWARK DTC' },
    { value: '561BZ', label: 'JAMES J HOWARD OUTPATIENT CLINIC' },
    { value: '561GA', label: 'HAMILTON CBOC' },
    { value: '561GB', label: 'ELIZABETH CBOC' },
    { value: '561GD', label: 'HACKENSACK CBOC' },
    { value: '561GE', label: 'JERSEY CITY CBOC' },
    { value: '561GF', label: 'PISCATAWAY CBOC' },
    { value: '561GH', label: 'MORRIS PLAINS CBOC' },
    { value: '561GI', label: 'TINTON FALLS CBOC' },
    { value: '561GJ', label: 'PATERSON CBOC' },
    { value: '642GA', label: 'BURLINGTON COUNTY VA CLINIC' },
    { value: '642GD', label: 'GLOUCESTER COUNTY VA CLINIC' },
    { value: '642GF', label: 'CAMDEN VA CLINIC' },
  ],
  NM: [
    { value: '501', label: 'RAYMOND G. MURPHY VAMC' },
    { value: '501G2', label: 'LAS VEGAS (CBOC)' },
    { value: '501GA', label: 'ARTESIA VA CLINIC' },
    { value: '501GB', label: 'FARMINGTON VA CLINIC' },
    { value: '501GC', label: 'SILVER CITY VA CLINIC' },
    { value: '501GD', label: 'GALLUP VA CLINIC' },
    { value: '501GE', label: 'ESPANOLA (CBOC)' },
    { value: '501GH', label: 'TRUTH OR CONSEQUENCES (CBOC)' },
    { value: '501GI', label: 'ALAMOGORDO VA CLINIC' },
    { value: '501GK', label: 'SANTA FE VA CLINIC' },
    { value: '501GM', label: 'NORTHWEST METRO VA CLINIC' },
    { value: '501GN', label: 'TAOS VA CLINIC' },
    { value: '501HB', label: 'RATON (CBOC)' },
    { value: '504BZ', label: 'CLOVIS OUTPATIENT CLINIC' },
    { value: '504HA', label: 'CLAYTON OUTPATIENT CLINIC' },
    { value: '519GB', label: 'HOBBS CBOC' },
    { value: '756GA', label: 'LAS CRUCES CBOC' },
  ],
  NV: [
    { value: '454', label: 'RENO VAMROC' },
    { value: '593', label: 'SOUTHERN NEVADA HCS' },
    { value: '593GC', label: 'PAHRUMP CBOC' },
    { value: '593GD', label: 'NORTHWEST PCC' },
    { value: '593GE', label: 'SOUTHEAST PCC' },
    { value: '593GF', label: 'SOUTHWEST PCC' },
    { value: '593GG', label: 'NORTHEAST PCC' },
    { value: '593GH', label: 'LAUGHLIN VA CBOC' },
    { value: '654', label: 'IOANNIS A. LOUGARIS VAMC' },
    { value: '654GB', label: 'CARSON VALLEY VA CLINIC' },
    { value: '654GC', label: 'LAHONTAN VALLEY VA CLINIC' },
    { value: '654GE', label: 'RENO EAST VA CLINIC' },
    { value: '660GC', label: 'ELY VA CLINIC' },
  ],
  NY: [
    { value: '526', label: 'BRONX VA HOSPITAL' },
    { value: '526GA', label: 'WHITE PLAINS CLINIC' },
    { value: '526GB', label: 'YONKERS CLINIC' },
    { value: '526GD', label: 'NORTH QUEENS CLINIC' },
    { value: '528', label: 'BUFFALO VA MEDICAL CENTER' },
    {
      value: '528A4',
      label:
        'VA HEALTHCARE NETWORK UPSTATE NEW YORK SYSTEM VISN 2 - BATAVIA DIVISION',
    },
    { value: '528A5', label: 'CANANDAIGUA VA MEDICAL CENTER' },
    { value: '528A6', label: 'BATH VA MEDICAL CENTER' },
    { value: '528A7', label: 'SYRACUSE VA MEDICAL CENTER' },
    { value: '528A8', label: 'SAMUEL S. STRATTON VAMC' },
    { value: '528G1', label: 'MALONE CBOC' },
    { value: '528G2', label: 'WESTPORT CBOC' },
    { value: '528G3', label: 'SIDNEY CBOC' },
    { value: '528G4', label: 'ELMIRA CBOC' },
    { value: '528G5', label: 'AUBURN' },
    { value: '528G6', label: 'FONDA CBOC' },
    { value: '528G7', label: 'CATSKILL CBOC' },
    { value: '528G8', label: 'WELLSVILLE CBOC' },
    { value: '528G9', label: 'CORTLAND' },
    { value: '528GB', label: 'JAMESTOWN VA CLINIC' },
    { value: '528GC', label: 'DUNKIRK VA CLINIC' },
    { value: '528GD', label: 'NIAGARA FALLS VA CLINIC' },
    { value: '528GE', label: 'ROCHESTER OPC' },
    { value: '528GG', label: 'LYONS CBOC' },
    { value: '528GH', label: 'ITHACA CBOC' },
    { value: '528GK', label: 'LOCKPORT' },
    { value: '528GL', label: 'MASSENA CBOC' },
    { value: '528GM', label: 'ROME CBOC' },
    { value: '528GN', label: 'BINGHAMTON CBOC' },
    { value: '528GO', label: 'WATERTOWN CBOC' },
    { value: '528GP', label: 'OSWEGO CBOC' },
    { value: '528GQ', label: 'LACKAWANNA CBOC' },
    { value: '528GR', label: 'OLEAN CBOC' },
    { value: '528GT', label: 'GLENS FALLS CBOC' },
    { value: '528GV', label: 'PLATTSBURGH' },
    { value: '528GW', label: 'SCHENECTADY CBOC' },
    { value: '528GX', label: 'TROY CBOC' },
    { value: '528GY', label: 'CLIFTON PARK CBOC' },
    { value: '528GZ', label: 'KINGSTON CBOC' },
    {
      value: '620',
      label: 'VA HUDSON VALLEY HEALTH CARE SYSTEM - MONTROSE DIVISION',
    },
    {
      value: '620A4',
      label: 'VA HUDSON VALLEY HEALTH CARE - CASTLE POINT DIVISION',
    },
    { value: '620GA', label: 'NEW CITY' },
    { value: '620GB', label: 'PUTNAM COUNTY' },
    { value: '620GD', label: 'GOSHEN CBOC' },
    { value: '620GE', label: 'PORT JERVIS' },
    { value: '620GF', label: 'HARRIS' },
    { value: '620GG', label: 'POUGHKEEPSIE' },
    { value: '620GH', label: 'EASTERN DUTCHESS CBOC' },
    {
      value: '630',
      label: 'VA NEW YORK HARBOR HEALTHCARE SYSTEM - NEW YORK DIVISION',
    },
    {
      value: '630A4',
      label: 'VA NEW YORK HARBOR HEALTHCARE SYSTEM - BROOKLYN DIVISION',
    },
    { value: '630A5', label: 'ST ALBANS EXTENDED CARE CNTR' },
    { value: '630GA', label: 'HARLEM CBOC-NYHHS' },
    { value: '630GB', label: 'STATEN ISLAND CBOC-NYHHCS' },
    { value: '630GC', label: 'CHAPEL STREET OPC' },
    { value: '632', label: 'NORTHPORT VAMC NY' },
    { value: '632GA', label: 'EAST MEADOW CBOC' },
    { value: '632HA', label: 'VALLEY STREAM CBOC' },
    { value: '632HB', label: 'RIVERHEAD,NY ORC' },
    { value: '632HC', label: 'BAY SHORE CBOC' },
    { value: '632HD', label: 'PATCHOGUE,NY ORC' },
  ],
  OH: [
    { value: '506GA', label: 'TOLEDO VA CLINIC' },
    { value: '538', label: 'CHILLICOTHE VA MEDICAL CENTER' },
    { value: '538GA', label: 'ATHENS VA CLINIC' },
    { value: '538GB', label: 'PORTSMOUTH VA CLINIC' },
    { value: '538GC', label: 'MARIETTA VA CLINIC' },
    { value: '538GD', label: 'LANCASTER VA CLINIC' },
    { value: '538GE', label: 'CAMBRIDGE VA CLINIC' },
    { value: '538GF', label: 'WILMINGTON VA CLINIC (OH)' },
    { value: '539', label: 'CINCINNATI VAMC' },
    { value: '539GB', label: 'CINCINNATI (CLERMONT COUNTY)' },
    { value: '539GE', label: 'HAMILTON OHIO CBOC' },
    { value: '539GF', label: 'GEORGETOWN CBOC' },
    { value: '541', label: 'CLEVELAND VAMC' },
    { value: '541BY', label: 'CANTON CBOC' },
    { value: '541BZ', label: 'YOUNGSTOWN CBOC' },
    { value: '541GB', label: 'LORAIN CBOC' },
    { value: '541GC', label: 'SANDUSKY CBOC' },
    { value: '541GD', label: 'MANSFIELD CBOC' },
    { value: '541GE', label: 'MCCAFERTY CBOC' },
    { value: '541GF', label: 'PAINSVILLE CBOC' },
    { value: '541GG', label: 'AKRON CBOC' },
    { value: '541GH', label: 'EAST LIVERPOOL CBOC' },
    { value: '541GI', label: 'WARREN CBOC' },
    { value: '541GJ', label: 'NEW PHILADELPHIA CBOC' },
    { value: '541GK', label: 'RAVENNA CBOC' },
    { value: '541GL', label: 'PARMA CBOC' },
    { value: '541GM', label: 'CLEVELAND AMBULATORY CTR CBOC' },
    { value: '541GN', label: 'STATE STREET VA CLINIC' },
    { value: '552', label: 'DAYTON, OH VAMC' },
    { value: '552GA', label: 'MIDDLETOWN CBOC' },
    { value: '552GB', label: 'LIMA CBOC' },
    { value: '552GD', label: 'SPRINGFIELD CBOC' },
    { value: '562GB', label: 'ASHTABULA COUNTY VA CLINIC' },
    { value: '581GG', label: 'GALLIPOLIS VA CLINIC' },
    { value: '646GA', label: 'BELMONT COUNTY VA CLINIC' },
    {
      value: '757',
      label: 'CHALMERS P. WYLIE VA AMBULATORY CARE CENTER (757)',
    },
    { value: '757GA', label: 'ZANESVILLE CBOC' },
    { value: '757GB', label: 'GROVE CITY CBOC' },
    { value: '757GC', label: 'MARION CBOC' },
    { value: '757GD', label: 'NEWARK CBOC' },
  ],
  OK: [
    { value: '564GE', label: 'JAY CBOC' },
    { value: '623', label: 'MUSKOGEE, OK VAMC' },
    { value: '623BY', label: 'TULSA, OK CBOC' },
    { value: '623GA', label: 'HARTSHORNE CBOC' },
    { value: '623GB', label: 'VINITA CBOC' },
    { value: '635', label: 'OKLAHOMA CITY VA MEDICAL CENTER' },
    { value: '635GA', label: 'LAWTON/FT. SILL VA OUTPATIENT CLINIC' },
    { value: '635GC', label: 'BLACKWELL CBOC' },
    { value: '635GD', label: 'ADA CBOC' },
    { value: '635GE', label: 'STILLWATER CBOC' },
    { value: '635GF', label: 'ALTUS CBOC' },
    { value: '635GG', label: 'ENID CBOC' },
    { value: '635HB', label: 'ARDMORE VETERANS CENTER CLINIC' },
    { value: '635QB', label: 'SOUTH OKLAHOMA CITY VA CLINIC' },
  ],
  OR: [
    { value: '531GH', label: 'BURNS VA CLINIC' },
    { value: '648', label: 'PORTLAND VA MEDICAL CENTER' },
    { value: '648GA', label: 'BEND, OR CBOC' },
    { value: '648GB', label: 'SALEM VA CLINIC' },
    { value: '648GD', label: 'NORTH COAST VA CLINIC' },
    { value: '648GE', label: 'EAST PORTLAND VA CLINIC' },
    { value: '648GF', label: 'HILLSBORO VA CLINIC' },
    { value: '648GG', label: 'WEST LINN CBOC' },
    { value: '648GH', label: 'NEWPORT VA CLINIC' },
    { value: '648GI', label: 'PORTLAND VA CLINIC' },
    { value: '648GJ', label: 'THE DALLES VA CLINIC' },
    { value: '653', label: 'ROSEBURG VA MEDICAL CENTER' },
    { value: '653BY', label: 'EUGENE, OR CBOC' },
    { value: '653GA', label: 'NORTH BEND VA CLINIC' },
    { value: '653GB', label: 'BROOKINGS VA CLINIC' },
    { value: '687GC', label: 'LA GRANDE CBOC' },
    { value: '692', label: 'WHITE CITY VA MEDICAL CENTER' },
    { value: '692GA', label: 'KLAMATH FALLS VA CLINIC' },
    { value: '692GB', label: 'GRANTS PASS CBOC' },
  ],
  PA: [
    { value: '503', label: 'JAMES E VAN ZANDT VAMC' },
    { value: '503GA', label: 'JOHNSTOWN VA CLINIC' },
    { value: '503GB', label: 'DUBOIS CBOC' },
    { value: '503GC', label: 'STATE COLLEGE VA CLINIC' },
    { value: '503GD', label: 'HUNTINGDON COUNTY VA CLINIC' },
    { value: '503GE', label: 'INDIANA COUNTY VA CLINIC' },
    { value: '529', label: 'BUTLER VA MEDICAL CENTER' },
    { value: '529GA', label: 'MICHAEL A. MARZANO VA OPC' },
    { value: '529GB', label: 'LAWRENCE COUNTY VA CLINIC' },
    { value: '529GC', label: 'ARMSTRONG COUNTY VA CLINIC' },
    { value: '529GD', label: 'CLARION COUNTY VA CLINIC' },
    { value: '529GF', label: 'CRANBERRY TOWNSHIP VA CLINIC' },
    { value: '542', label: 'COATESVILLE VA MEDICAL CENTER' },
    { value: '542GA', label: 'MEDIA CBOC' },
    { value: '542GE', label: 'SPRING CITY VA CLINIC' },
    { value: '562', label: 'ERIE VA MEDICAL CENTER' },
    { value: '562GA', label: 'CRAWFORD COUNTY VA CLINIC' },
    { value: '562GC', label: 'MCKEAN COUNTY VA CLINIC' },
    { value: '562GD', label: 'VENANGO COUNTY VA CLINIC' },
    { value: '562GE', label: 'WARREN COUNTY CLINIC' },
    { value: '595', label: 'LEBANON VA MEDICAL CENTER' },
    { value: '595GA', label: 'CAMP HILL VA CLINIC' },
    { value: '595GC', label: 'LANCASTER VA CLINIC' },
    { value: '595GD', label: 'BERKS VA OUTPATIENT CLINIC' },
    { value: '595GE', label: 'YORK VA CLINIC' },
    { value: '595GF', label: 'POTTSVILLE VA CLINIC' },
    { value: '595QA', label: 'FORT INDIANTOWN GAP VA CLINIC' },
    { value: '642', label: 'PHILADELPHIA, PA VAMC' },
    { value: '642GC', label: 'VICTOR J. SARACINI VA OPC' },
    { value: '642QA', label: 'CHESTNUT STREET VA CLINIC' },
    { value: '646', label: 'PITTSBURGH VAMC UNIVERSITY DR.' },
    { value: '646A4', label: 'H. JOHN HEINZ III VAMC' },
    { value: '646GB', label: 'WESTMORELAND COUNTY VA CLINIC' },
    { value: '646GC', label: 'BEAVER COUNTY VA CLINIC' },
    { value: '646GD', label: 'WASHINGTON VA PRIMARY CARE OUTPATIENT CLINIC' },
    { value: '646GE', label: 'FAYETTE COUNTY VA CLINIC' },
    { value: '693', label: 'WILKES-BARRE VAMC' },
    { value: '693B4', label: 'ALLENTOWN OPC' },
    { value: '693GA', label: 'SAYRE OPC' },
    { value: '693GB', label: 'WILLIAMSPORT VA CLINIC' },
    { value: '693GC', label: 'TOBYHANNA VA CLINIC' },
    { value: '693GD', label: 'WILKES-BARRE (CBOC)' },
    { value: '693GE', label: 'SCHUYLKILL COUNTY CBOC' },
    { value: '693GF', label: 'COLUMBIA COUNTY VA CLINIC' },
    { value: '693GG', label: 'NORTHAMPTON COUNTY CLINIC' },
  ],
  POSTALNAME: [{ value: 'STATIONNUMBER', label: 'NAME' }],
  PR: [
    { value: '672', label: 'SAN JUAN VA MEDICAL CENTER' },
    { value: '672B0', label: 'PONCE OUTPATIENT CLINIC' },
    { value: '672BZ', label: 'MAYAGUEZ OUTPATIENT CLINIC' },
    { value: '672GC', label: 'ARECIBO VETERANS CLINIC (CBOC)' },
    { value: '672GD', label: 'CEIBA VA CLINIC' },
    { value: '672GE', label: 'GUAYAMA VA CLINIC' },
  ],
  RI: [
    { value: '650', label: 'PROVIDENCE VAMC' },
    { value: '650GD', label: 'MIDDLETOWN CBOC' },
  ],
  SC: [
    { value: '509GB', label: 'AIKEN CBOC' },
    { value: '534', label: 'RALPH H. JOHNSON VA MEDICAL CENTER (534)' },
    { value: '534GB', label: 'MYRTLE  BEACH PRIMARY CARE CLINIC' },
    { value: '534GC', label: 'BEAUFORT PRIMARY CARE CLINIC' },
    { value: '534GD', label: 'GOOSE CREEK CBOC' },
    { value: '534GF', label: 'NORTH CHARLESTON VA CBOC' },
    {
      value: '544',
      label: 'WM JENNINGS BRYAN DORN VETERANS AFFAIRS MEDICAL CENTER',
    },
    { value: '544BZ', label: 'GREENVILLE VA CLINIC SC' },
    { value: '544GB', label: 'FLORENCE CBOC' },
    { value: '544GC', label: 'ROCK HILL CBOC' },
    { value: '544GD', label: 'ANDERSON CBOC' },
    { value: '544GE', label: 'ORANGEBURG CBOC' },
    { value: '544GF', label: 'SUMTER CBOC' },
    { value: '544GG', label: 'SPARTANBURG CBOC' },
  ],
  SD: [
    { value: '438', label: 'SIOUX FALLS VA HCS' },
    { value: '438GD', label: 'ABERDEEN CBOC' },
    { value: '438GE', label: 'WAGNER CBOC' },
    { value: '438GF', label: 'WATERTOWN CBOC' },
    {
      value: '568',
      label: 'BLACK HILLS HEALTH CARE SYSTEM - FT. MEADE DIVISION',
    },
    { value: '568A4', label: 'HOT SPRINGS, SD MC' },
    { value: '568GA', label: 'RAPID CITY CBOC' },
    { value: '568GB', label: 'PIERRE CBOC' },
    { value: '568HF', label: 'PINE RIDGE' },
    { value: '568HJ', label: 'MISSION CBOC' },
    { value: '568HK', label: 'MCLAUGHLIN' },
    { value: '568HM', label: 'EAGLE BUTTE' },
    { value: '568HP', label: 'WINNER' },
  ],
  TN: [
    { value: '614', label: 'MEMPHIS VA MEDICAL CENTER' },
    { value: '614GD', label: 'SAVANNAH VA CLINIC' },
    { value: '614GE', label: 'COVINGTON VA CLINIC' },
    { value: '614GF', label: 'MEMPHIS SOUTH VA CLINIC' },
    { value: '614GG', label: 'JACKSON VA CLINIC' },
    { value: '614GH', label: 'BOLIVAR CBOC' },
    { value: '614GI', label: 'DYERSBURG VA CLINIC' },
    { value: '621', label: 'JAMES H. QUILLEN VAMC' },
    { value: '621BY', label: 'WILLIAM C. TALLENT VA OPC' },
    { value: '621GA', label: 'ROGERSVILLE VA CLINIC' },
    { value: '621GG', label: 'MORRISTOWN VA CLINIC' },
    { value: '621GI', label: 'SEVIERVILLE VA CLINIC' },
    { value: '621GK', label: 'CAMPBELL COUNTY VA CLINIC' },
    { value: '626', label: 'NASHVILLE VA MEDICAL CENTER' },
    { value: '626A4', label: 'ALVIN C. YORK VAMC' },
    { value: '626GA', label: 'DOVER VA CLINIC' },
    { value: '626GE', label: 'CLARKSVILLE VA CLINIC' },
    { value: '626GF', label: 'CHATTANOOGA VA CLINIC' },
    { value: '626GG', label: 'TULLAHOMA COMMUNITY BASED OUTPATIENT CLINIC' },
    { value: '626GH', label: 'COOKEVILLE VA CLINIC' },
    { value: '626GK', label: 'MCMINNVILLE VA CLINIC' },
    { value: '626GL', label: 'ROANE COUNTY VA CLINIC' },
    { value: '626GM', label: 'MAURY COUNTY CBOC' },
    { value: '626QC', label: 'POINTE CENTRE VA CLINIC' },
  ],
  TX: [
    { value: '504', label: 'AMARILLO HCS' },
    { value: '504BY', label: 'LUBBOCK OUTPATIENT CLINIC' },
    { value: '504GA', label: 'CHILDRESS OUTPATIENT CLINIC' },
    { value: '504HB', label: 'DALHART CBOC' },
    {
      value: '519',
      label: 'WEST TEXAS VA HEALTH CARE SYSTEM - BIG SPRING DIVISION',
    },
    { value: '519GA', label: 'PERMIAN BASIN CBOC' },
    { value: '519GD', label: 'FT. STOCKTON CBOC' },
    { value: '519HC', label: 'ABILENE CBOC' },
    { value: '519HD', label: 'STAMFORD CBOC' },
    { value: '519HF', label: 'SAN ANGELO CBOC' },
    { value: '549', label: 'DALLAS VA MEDICAL CENTER' },
    { value: '549A4', label: 'SAM RAYBURN MEM VET CENTER' },
    { value: '549BY', label: 'FORT WORTH VA CLINIC' },
    { value: '549GA', label: 'TYLER VA CLINIC' },
    { value: '549GB', label: 'NORTH TEXAS HEALTH CARE SYSTEM - DALLAS CBOC' },
    { value: '549GC', label: 'BONHAM VA CLINIC' },
    { value: '549GD', label: 'DENTON VA CLINIC' },
    { value: '549GE', label: 'BRIDGEPORT VA CLINIC' },
    { value: '549GF', label: 'GRANBURY VA CLINIC' },
    { value: '549GH', label: 'GREENVILLE VA CLINIC TX' },
    { value: '549GI', label: 'NORTH TEXAS HEALTH CARE SYSTEM - CLEBURNE CBOC' },
    { value: '549GJ', label: 'SHERMAN VA CLINIC' },
    { value: '549GK', label: 'POLK STREET VA CLINIC' },
    { value: '549GL', label: 'PLANO VA CLINIC' },
    { value: '580', label: 'MICHAEL E. DEBAKEY VA MEDICAL CENTER' },
    { value: '580BY', label: 'BEAUMONT' },
    { value: '580BZ', label: 'LUFKIN OUTPATIENT CLINIC' },
    { value: '580GA', label: 'HOUSTON CBOC' },
    { value: '580GC', label: 'GALVESTON COUNTY VA CLINIC' },
    { value: '580GD', label: 'CONROE CBOC' },
    { value: '580GE', label: 'KATY CBOC' },
    { value: '580GF', label: 'LAKE JACKSON CBOC' },
    { value: '580GG', label: 'RICHMOND CBOC' },
    { value: '580GH', label: 'TOMBALL CBOC' },
    { value: '580GJ', label: 'TEXAS CITY VA CLINIC' },
    {
      value: '635GB',
      label: 'WICHITA FALLS CBOC VETERANS CLINIC OF NORTH TEXAS',
    },
    { value: '667GC', label: 'LONGVIEW CBOC' },
    { value: '671', label: 'AUDIE L. MURPHY MEMORIAL HOSP' },
    { value: '671A4', label: 'KERRVILLE VA MEDICAL CENTER' },
    {
      value: '671B0',
      label: 'SOUTH TEXAS HEALTH CARE SYSTEM - MC ALLEN OUTPATIENT CLINIC',
    },
    { value: '671BY', label: 'FRANK M. TEJEDA VA OPC' },
    {
      value: '671BZ',
      label:
        'SOUTH TEXAS HEALTH CARE SYSTEM - CORPUS CHRISTI OUTPATIENT CLINIC',
    },
    { value: '671GA', label: 'VA HARLINGEN OUTPATIENT CLINIC' },
    { value: '671GB', label: 'VICTORIA VA CLINIC' },
    { value: '671GC', label: 'DEL RIO VA CLINIC' },
    { value: '671GD', label: 'UNITED MEDICAL CENTERS' },
    {
      value: '671GE',
      label: 'SOUTH TEXAS HEALTH CARE SYSTEM - LAREDO OUTPATIENT CLINIC',
    },
    { value: '671GF', label: 'SOUTH BEXAR COUNTY VA CLINIC' },
    { value: '671GG', label: 'CHRISTUS SPOHN SAN DIEGO FAMILY HEALTH CLINIC' },
    { value: '671GH', label: 'BEEVILLE VA CLINIC' },
    { value: '671GI', label: 'CHRISTUS SPOHN BISHOP FAMILY HEALTH CLINIC' },
    { value: '671GJ', label: 'UVALDE VA CLINIC' },
    { value: '671GK', label: 'SAN ANTONIO VA CLINIC' },
    { value: '671GL', label: 'NEW BRAUNFELS VA CLINIC' },
    { value: '671GN', label: 'SEGUIN VA CLINIC' },
    { value: '671GO', label: 'NORTH CENTRAL FED VA CLINIC' },
    { value: '671GP', label: 'BALCONES HEIGHTS VA CLINIC' },
    { value: '671GQ', label: 'SHAVANO PARK VA CLINIC' },
    { value: '674', label: 'OLIN E. TEAGUE VET CENTER' },
    { value: '674A4', label: 'WACO, TX VAMC' },
    { value: '674BY', label: 'AUSTIN VA CLINIC' },
    { value: '674GA', label: 'PALESTINE VA CLINIC' },
    { value: '674GB', label: 'BROWNWOOD VA CLINIC' },
    { value: '674GC', label: 'BRYAN VA CLINIC' },
    { value: '674GD', label: 'CEDAR PARK VA CLINIC' },
    { value: '674GF', label: 'TEMPLE VA CLINIC' },
    { value: '740', label: 'HARLINGEN VA CLINIC' },
    { value: '740GA', label: 'HARLINGEN OPC' },
    { value: '740GB', label: 'MCALLEN OPC' },
    { value: '740GC', label: 'CORPUS CHRISTI OPC' },
    { value: '740GD', label: 'LAREDO OPC' },
    { value: '740GE', label: 'EAGLE PASS CBOC' },
    { value: '740GH', label: 'SOUTH ENTERPRIZE VA CLINIC' },
    { value: '740GI', label: 'OLD BROWNSVILLE VA CLINIC' },
    { value: '740GJ', label: 'NORTH TENTH STREET VA CLINIC' },
    { value: '755', label: 'SAN ANTONIO OPC' },
    { value: '756GB', label: 'EL PASO EASTSIDE CBOC' },
  ],
  UT: [
    { value: '660', label: 'GEORGE E. WAHLEN VAMC' },
    { value: '660GB', label: 'OGDEN VA CLINIC' },
    { value: '660GD', label: 'ROOSEVELT VA CLINIC' },
    { value: '660GE', label: 'OREM VA CLINIC' },
    { value: '660GG', label: 'ST. GEORGE VA CLINIC' },
    { value: '660GJ', label: 'WESTERN SALT LAKE VA CLINIC' },
  ],
  VA: [
    { value: '590', label: 'HAMPTON VA MEDICAL CENTER' },
    { value: '590GB', label: 'VIRGINIA BEACH VA CLINIC' },
    { value: '590GD', label: 'CHESAPEAKE VA CLINIC' },
    { value: '613GC', label: 'STEPHENS CITY VA CLINIC' },
    { value: '613GF', label: 'HARRISONBURG VA CLINIC' },
    { value: '621GC', label: 'NORTON VA CLINIC' },
    { value: '621GJ', label: 'BRISTOL VA CLINIC' },
    { value: '652', label: 'HUNTER HOLMES MCGUIRE HOSPITAL' },
    { value: '652GA', label: 'FREDERICKSBURG VA CLINIC' },
    { value: '652GB', label: 'FREDERICKSBURG 2 VA CLINIC' },
    { value: '652GE', label: 'CHARLOTTESVILLE VA CLINIC' },
    { value: '652GF', label: 'EMPORIA VA CLINIC' },
    { value: '652GG', label: 'RICHMOND VA MOBILE CLINIC' },
    { value: '652GH', label: 'HUNTER HOLMES MCGUIRE 2 MOB CL' },
    { value: '658', label: 'SALEM VA MEDICAL CENTER' },
    { value: '658GA', label: 'TAZEWELL VA CLINIC' },
    { value: '658GB', label: 'DANVILLE VA CLINIC' },
    { value: '658GC', label: 'LYNCHBURG VA CLINIC' },
    { value: '658GD', label: 'STAUNTON CBOC' },
    { value: '658GE', label: 'WYTHEVILLE VA CLINIC' },
    { value: '688GA', label: 'FORT BELVOIR VA CLINIC' },
  ],
  VI: [
    { value: '672GA', label: 'ST.CROIX VETERANS CLINIC' },
    { value: '672GB', label: 'ST.THOMAS VETERANS CLINIC' },
  ],
  VT: [
    { value: '405', label: 'WHITE RIVER JCT VAMROC' },
    { value: '405GA', label: 'BENNINGTON VERMONT OUTREACH CLINIC' },
    { value: '405GC', label: 'BRATTLEBORO CBOC' },
    { value: '405HA', label: 'BURLINGTON LAKESIDE CBOC' },
    { value: '405HF', label: 'RUTLAND VERMONT OUTREACH CLINIC' },
  ],
  WA: [
    { value: '648A4', label: 'VANCOUVER,WA DIV PORTLAND VAMC' },
    { value: '663', label: 'SEATTLE VA MEDICAL CENTER' },
    {
      value: '663A4',
      label: 'PUGET SOUND HEALTH CARE SYSTEM - AMERICAN LAKE DIVISION',
    },
    { value: '663GA', label: 'BELLEVUE VA CLINIC' },
    { value: '663GB', label: 'BREMERTON VA CLINIC' },
    { value: '663GC', label: 'MOUNT VERNON VA CLINIC' },
    { value: '663GD', label: 'SOUTH SOUND VA CLINIC' },
    { value: '663GE', label: 'PORT ANGELES VA CBOC' },
    { value: '668', label: 'MANN-GRANDSTAFF VAMC' },
    { value: '668GA', label: 'WENATCHEE VA CLINIC' },
    { value: '687', label: 'JONATHAN M. WAINWRIGHT VAMC' },
    { value: '687GA', label: 'RICHLAND VA CLINIC' },
    { value: '687HA', label: 'YAKIMA CBOC' },
  ],
  WI: [
    { value: '556GD', label: 'KENOSHA CBOC' },
    { value: '585GB', label: 'RHINELANDER CBOC' },
    { value: '607', label: 'WILLIAM S. MIDDLETON MEMORIAL VA HOSPITAL' },
    { value: '607GC', label: 'JANESVILLE, WI CBOC' },
    { value: '607GD', label: 'BARABOO, WI CBOC' },
    { value: '607GE', label: 'BEAVER DAM, WI CBOC' },
    { value: '607GG', label: 'MADISON WEST VA CLINIC' },
    { value: '618BY', label: 'TWIN PORTS CBOC' },
    { value: '618GE', label: 'CHIPPEWA VALLEY CBOC' },
    { value: '618GH', label: 'HAYWARD CBOC' },
    { value: '618GM', label: 'RICE LAKE VA CBOC' },
    { value: '676', label: 'TOMAH VAMC' },
    { value: '676GA', label: 'WAUSAU CBOC' },
    { value: '676GB', label: 'LEAVENWORTH, WI CBOC' },
    { value: '676GC', label: 'LACROSSE CBOC' },
    { value: '676GD', label: 'WISCONSIN RAPIDS CBOC' },
    { value: '676GE', label: 'CLARK COUNTY CBOC' },
    { value: '695', label: 'CLEMENT J ZABLOCKI' },
    { value: '695BY', label: 'FOX VALLEY' },
    { value: '695GA', label: 'UNION GROVE' },
    { value: '695GC', label: 'CLEVELAND CBOC' },
    { value: '695GD', label: 'MILO C. HUEMPFNER CBOC' },
  ],
  WV: [
    { value: '517', label: 'BECKLEY VA MEDICAL CENTER' },
    { value: '517GB', label: 'GREENBRIER COUNTY VA CLINIC' },
    { value: '540', label: 'LOUIS A JOHNSON VAMC' },
    { value: '540GA', label: 'TUCKER COUNTY VA CLINIC' },
    { value: '540GB', label: 'CLARKSBURG/WOOD' },
    { value: '540GC', label: 'BRAXTON COUNTY VA CLINIC' },
    { value: '540GD', label: 'MONONGALIA COUNTY VA CLINIC' },
    { value: '581', label: 'HUNTINGTON VAMC' },
    { value: '581GB', label: 'CHARLESTON VA CLINIC' },
    { value: '581GH', label: 'LENORE VA CLINIC' },
    { value: '613', label: 'MARTINSBURG VA MEDICAL CENTER' },
    { value: '613GD', label: 'FRANKLIN VA CLINIC' },
    { value: '613GE', label: 'PETERSBURG VA CLINIC' },
  ],
  WY: [
    { value: '442', label: 'CHEYENNE VA MEDICAL' },
    { value: '442MB', label: 'IDES SHERIDAN VAMC' },
    { value: '568HA', label: 'NEWCASTLE' },
    { value: '666', label: 'SHERIDAN VA MEDICAL CENTER' },
    { value: '666GB', label: 'CASPER CBOC' },
    { value: '666GC', label: 'RIVERTON VA CLINIC' },
    { value: '666GD', label: 'POWELL VA CLINIC' },
    { value: '666GE', label: 'GILLETTE VA CLINIC' },
    { value: '666GF', label: 'ROCK SPRINGS CBOC' },
  ],
};
// Turns the facility list for each state into an array of strings
export const medicalCentersByState = _.mapValues(
  val => val.map(center => center.value),
  vaMedicalFacilities,
);

// Merges all the state facilities into one object with values as keys
// and labels as values
export const medicalCenterLabels = Object.keys(vaMedicalFacilities).reduce(
  (labels, state) => {
    const stateLabels = vaMedicalFacilities[state].reduce(
      (centers, center) =>
        Object.assign(centers, {
          [center.value]: center.label,
        }),
      {},
    );

    return Object.assign(labels, stateLabels);
  },
  {},
);

export const dischargeTypeLabels = {
  honorable: 'Honorable',
  general: 'General',
  other: 'Other Than Honorable',
  'bad-conduct': 'Bad Conduct',
  dishonorable: 'Dishonorable',
  undesirable: 'Undesirable',
};

export const lastServiceBranchLabels = {
  'air force': 'Air Force',
  army: 'Army',
  'coast guard': 'Coast Guard',
  'marine corps': 'Marine Corps',
  'merchant seaman': 'Merchant Seaman',
  navy: 'Navy',
  noaa: 'Noaa',
  usphs: 'USPHS',
  'f.commonwealth': 'Filipino Commonwealth Army',
  'f.guerilla': 'Filipino Guerilla Forces',
  'f.scouts new': 'Filipino New Scout',
  'f.scouts old': 'Filipino Old Scout',
  other: 'Other',
};

export const financialDisclosureText = (
  <div>
    <p>
      Next, we’ll ask you to provide your financial information from the most
      recent tax year, which we’ll verify with the IRS. We use this information
      to figure out if you:
    </p>

    <ol>
      <li>
        Are eligible for health care even if you don’t have one of the
        qualifying factors
      </li>
      <li>
        Are eligible for added benefits, like reimbusement for travel costs or
        cost-free medications
      </li>
      <li>Should be charged for copays or medication</li>
    </ol>

    <div className="usa-alert usa-alert-info">
      <div className="usa-alert-body">
        <span>
          <strong>Note:</strong> You don’t have to provide your financial
          information. But if you don’t have a qualifying eligibility factor,
          this information is the only other way for us to see if you can get VA
          health care benefits--including added benefits like waived copays.
        </span>
      </div>
    </div>
    <p>Qualifying factors:</p>
    <ul>
      <li>Former Prisoner of War</li>
      <li>Received a Purple Heart</li>
      <li>Recently discharged combat Veteran</li>
      <li>
        Discharged for a disability that resulted from your service or got worse
        in the line of duty
      </li>
      <li>Getting VA service-connected disability compensation</li>
      <li>Getting a VA pension</li>
      <li>Receiving Medicaid benefits</li>
      <li>Served in Vietnam between January 9, 1962, and May 7, 1975</li>
      <li>
        Served in Southwest Asia during the Gulf War between August 2, 1990, and
        November 11, 1998
      </li>
      <li>
        Served at least 30 days at Camp Lejeune between August 1, 1953, and
        December 31, 1987
      </li>
    </ul>

    <div className="input-section">
      <a
        target="_blank"
        href="http://www.va.gov/healthbenefits/cost/income_thresholds.asp"
      >
        Learn more
      </a>{' '}
      about our income thresholds (also called income limits) and copayments.
    </div>
  </div>
);

export const incomeDescription = (
  <div>
    <p>
      Please fill this section out to the best of your knowledge. Provide the
      previous calendar year’s gross annual income for you, your spouse, and
      your dependents.
    </p>
    <p>
      <strong>Gross annual income:</strong> This income is from employment only,
      and doesn’t include income from your farm, ranch, property, or business.
      When you calculate your gross annual income, include your wages, bonuses,
      tips, severance pay, and other accrued benefits. Include your dependent’s
      income information if it could have been used to pay your household
      expenses.
    </p>
    <p>
      <strong>Net income:</strong> This is the income from your farm, ranch,
      property, or business.
    </p>
    <p>
      <strong>Other income:</strong> This includes retirement and pension
      income; Social Security Retirement and Social Security Disability income;
      compensation benefits such as VA disability, unemployment, Workers, and
      black lung; cash gifts; interest and dividends, including tax exempt
      earnings and distributions from Individual Retirement Accounts (IRAs) or
      annuities.
    </p>
  </div>
);

export const disclosureWarning = (
  <div className="usa-alert usa-alert-info">
    <div className="usa-alert-body">
      <span>
        If you don’t provide your financial information and you don’t have
        another qualifying eligibility factor, VA can’t enroll you.
      </span>
    </div>
  </div>
);

export const expensesGreaterThanIncomeWarning = (
  <div className="usa-alert usa-alert-warning">
    <div className="usa-alert-body">
      <h2 className="usa-alert-heading">
        Your expenses are higher than or equal to your income.
      </h2>
      <p className="usa-alert-text">
        You can stop entering your expenses. We’ll adjust your expenses to be
        equal to your income. This won’t affect your application or benefits.
      </p>
    </div>
  </div>
);

export function expensesLessThanIncome(fieldShownUnder) {
  const fields = [
    'deductibleMedicalExpenses',
    'deductibleFuneralExpenses',
    'deductibleEducationExpenses',
  ];
  return formData => {
    const {
      veteranGrossIncome = 0,
      veteranNetIncome = 0,
      veteranOtherIncome = 0,
      dependents = [],
    } = formData;

    const {
      spouseGrossIncome = 0,
      spouseNetIncome = 0,
      spouseOtherIncome = 0,
    } = formData['view:spouseIncome'] || {};

    const vetSpouseIncome =
      veteranGrossIncome +
      veteranNetIncome +
      veteranOtherIncome +
      spouseGrossIncome +
      spouseNetIncome +
      spouseOtherIncome;

    const income = dependents.reduce((sum, dependent) => {
      const { grossIncome = 0, netIncome = 0, otherIncome = 0 } = dependent;

      return grossIncome + netIncome + otherIncome + sum;
    }, vetSpouseIncome);

    const {
      deductibleMedicalExpenses = 0,
      deductibleFuneralExpenses = 0,
      deductibleEducationExpenses = 0,
    } = formData;

    const expenses =
      deductibleMedicalExpenses +
      deductibleEducationExpenses +
      deductibleFuneralExpenses;

    const hideBasedOnValues = income > expenses;

    // If we're not going to hide based on values entered,
    // then we need to make sure the current field is the last non-empty field
    if (!hideBasedOnValues) {
      const nonEmptyFields = fields.filter(field => formData[field]);
      if (
        !nonEmptyFields.length ||
        nonEmptyFields[nonEmptyFields.length - 1] !== fieldShownUnder
      ) {
        return true;
      }

      return false;
    }

    return true;
  };
}

export const deductibleExpensesDescription = (
  <div>
    Tell us a bit about your expenses this past calendar year. Enter information
    for any expenses that apply to you.
    <div className="hca-tooltip-wrapper">
      <AdditionalInfo triggerText="What if my expenses are higher than my annual income?">
        We understand in some cases your expenses might be higher than your
        income. If your expenses exceed your income, we’ll adjust them to be
        equal to your income. This won’t affect your application or benefits.
      </AdditionalInfo>
    </div>
  </div>
);
export const isEssentialAcaCoverageDescription = (
  <div>
    I’m enrolling to get minimum essential coverage under the Affordable Care
    Act.
    <div className="hca-tooltip-wrapper">
      <AdditionalInfo triggerText="Learn more about minimum essential coverage.">
        To avoid the penalty for not having insurance, you must be enrolled in a
        health plan that qualifies as minimum essential coverage. Being signed
        up for VA health care meets the minimum essential coverage requirement
        under the Affordable Care Act.
      </AdditionalInfo>
    </div>
  </div>
);
export const medicaidDescription = (
  <div>
    <div className="hca-tooltip-wrapper">
      <AdditionalInfo triggerText="Learn more about Medicaid.">
        Medicaid is a government health program for eligible low-income
        individuals and families and people with disabilities.
      </AdditionalInfo>
    </div>
  </div>
);
export const medicarePartADescription = (
  <div>
    <div className="hca-tooltip-wrapper">
      <AdditionalInfo triggerText="Learn more about Medicare Part A insurance.">
        Medicare is a federal health insurance program providing coverage for
        people who are 65 years or older or who meet who meet special criteria.
        Part A insurance covers hospital care, skilled nursing and nursing home
        care, hospice, and home health services.
      </AdditionalInfo>
    </div>
  </div>
);

/**
 *
 * Provides the current Central Time (CT) offset according to whether or not daylight savings is in effect
 * @export
 * @param {boolean} isDST
 * @returns {number} offset in minutes
 */
export function getCSTOffset(isDST) {
  const offsetHours = isDST ? -5 : -6;
  return offsetHours * 60;
}

/**
 *
 * Converts a timezone offset into milliseconds
 * @export
 * @param {number} offset (in minutes)
 */
export function getOffsetTime(offset) {
  return 60000 * offset;
}

/**
 *
 * Adjusts a given time using an offset
 * @export
 * @param {number} time (in milliseconds)
 * @param {number} offset (in milliseconds)
 */
export function getAdjustedTime(time, offset) {
  return time + offset;
}

/**
 * Provides a current date object in Central Time (CT)
 * Adapted from https://stackoverflow.com/a/46355483 and https://stackoverflow.com/a/17085556
 */
export function getCSTDate() {
  const today = new Date();
  const isDST = moment().isDST();
  const cstOffset = getCSTOffset(isDST);

  // The UTC and Central Time times are defined in milliseconds
  // UTC time is determined by adding the local offset to the local time
  const utcTime = getAdjustedTime(
    today.getTime(),
    getOffsetTime(today.getTimezoneOffset()),
  );

  // Central Time is determined by adjusting the UTC time (derived above) using the CST offset
  const centralTime = getAdjustedTime(utcTime, getOffsetTime(cstOffset));
  return new Date(centralTime);
}

export function isBeforeCentralTimeDate(date) {
  const lastDischargeDate = moment(date, 'YYYY-MM-DD');
  const centralTimeDate = moment(getCSTDate());
  return lastDischargeDate.isBefore(centralTimeDate.startOf('day'));
}

export function isAfterCentralTimeDate(date) {
  return !isBeforeCentralTimeDate(date);
}

export function validateDate(date) {
  const newDate = moment(date, 'YYYY-MM-DD');
  const day = newDate.date();
  const month = newDate.month() + 1; // Note: Months are zero indexed, so January is month 0.
  const year = newDate.year();
  return isValidDate(day, month, year);
}
