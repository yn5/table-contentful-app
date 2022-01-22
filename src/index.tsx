import React from 'react';
import { render } from 'react-dom';

import { FieldExtensionSDK, init, locations } from '@contentful/app-sdk';
import type { KnownSDK } from '@contentful/app-sdk';
import './index.css';

import { Field } from './components/Field/Field';
import { LocalhostWarning } from './components/LocalhostWarning/LocalhostWarning';

export function initialize() {
  if (window.self === window.top) {
    const root = document.getElementById('root');

    render(<LocalhostWarning />, root);
  } else {
    init((sdk: KnownSDK) => {
      const root = document.getElementById('root');

      const ComponentLocationSettings = [
        {
          location: locations.LOCATION_ENTRY_FIELD,
          component: <Field sdk={sdk as FieldExtensionSDK} />,
        },
      ];

      // Select a component depending on a location in which the app is rendered.
      ComponentLocationSettings.forEach((componentLocationSetting) => {
        if (sdk.location.is(componentLocationSetting.location)) {
          render(componentLocationSetting.component, root);
        }
      });
    });
  }
}

// Ignoring these lines for code coverage since they are specifically
// to be ignored during tests.
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  /* istanbul ignore next */
  initialize();
}
