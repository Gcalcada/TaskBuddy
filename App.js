import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import React from 'react';
import { default as mapping } from './mapping.json';
import { default as theme } from './theme.json';


export default () => (
  <ApplicationProvider
    {...eva}
    theme={{ ...eva.dark, ...theme }}
    customMapping={mapping}>
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    </Layout>
  </ApplicationProvider>
);