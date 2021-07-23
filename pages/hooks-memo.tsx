import React from 'react';
import type { VFC } from 'react';
import { Layout } from '../components/Layout';
import CreateUser from './CreateUser';

const HooksMemo: VFC = () => {
  return (
    <Layout title="Hooks memo">
      <CreateUser />
    </Layout>
  );
};

export default HooksMemo;
