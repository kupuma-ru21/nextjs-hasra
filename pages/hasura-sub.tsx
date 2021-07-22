import { VFC } from 'react';
import Link from 'next/link';
import { useGetUsersLocalQuery } from '../types/generated/graphql';
import { Layout } from '../components/Layout';

const HasuraSub: VFC = () => {
  const { data, error } = useGetUsersLocalQuery();
  if (error) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );
  }

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        );
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  );
};

export default HasuraSub;
