import React from 'react';
import { TextLink, Note } from '@contentful/f36-components';

export function LocalhostWarning() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px',
      }}
    >
      <Note
        title="App running outside of Contentful"
        style={{ maxWidth: '800px' }}
      >
        Contentful Apps need to run inside the Contentful web app to function
        properly. Install the app into a space and render your app into one of
        the{' '}
        <TextLink href="https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#locations">
          available locations
        </TextLink>
        .
        <br />
        Follow{' '}
        <TextLink href="https://www.contentful.com/developers/docs/extensibility/app-framework/tutorial/">
          our guide
        </TextLink>{' '}
        to get started or{' '}
        <TextLink href="https://app.contentful.com/deeplink?link=apps">
          open Contentful
        </TextLink>{' '}
        to manage your app.
      </Note>
    </div>
  );
}
