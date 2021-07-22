import { VFC } from 'react';
import Link from 'next/link';
import { useGetUsersQuery } from '../types/generated/graphql';
import { Layout } from '../components/Layout';

const FetchMain: VFC = () => {
  const { data, error } = useGetUsersQuery({ fetchPolicy: 'network-only' });
  if (error) {
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );
  }
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {console.log(data)}
      {data?.users.map((user) => {
        return (
          <p key={user.id} className="my-1">
            {user.name}
          </p>
        );
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  );
};

export default FetchMain;
