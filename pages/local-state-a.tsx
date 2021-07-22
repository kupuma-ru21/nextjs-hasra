import React from 'react';
import type { VFC } from 'react';
import LocalStateA from '../components/LocalStateA';
import { Layout } from '../components/Layout';

const LocalStatePageA: VFC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  );
};

export default LocalStatePageA;
