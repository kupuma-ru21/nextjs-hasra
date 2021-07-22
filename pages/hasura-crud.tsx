import React, { useState, useCallback } from 'react';
import type { VFC, FormEvent, ChangeEvent } from 'react';
import { Layout } from '../components/Layout';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../types/generated/graphql';
import UserItem from '../components/UserItem';

const HasuraCrud: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' });
  const { data, error } = useGetUsersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [createUserMutation] = useCreateUserMutation({
    update: (cache, { data: { insert_users_one } }) => {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users: (existingUsers, { toReference }) => {
            return [toReference(cacheId), ...existingUsers];
          },
        },
      });
    },
  });

  const [updateUserMutation] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation({
    update: (cache, { data: { delete_users_by_pk } }) => {
      cache.modify({
        fields: {
          users: (existingUsers, { readField }) => {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            );
          },
        },
      });
    },
  });

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editedUser.id) {
        try {
          await updateUserMutation({
            variables: { id: editedUser.id, name: editedUser.name },
          });
        } catch (error) {
          alert(error.message);
        }
        setEditedUser({ id: '', name: '' });
        return;
      }

      try {
        await createUserMutation({ variables: { name: editedUser.name } });
      } catch (error) {
        alert(error.message);
      }
      setEditedUser({ id: '', name: '' });
    },
    [editedUser.id, editedUser.name, createUserMutation, updateUserMutation]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditedUser((oldEditedUser) => ({
      ...oldEditedUser,
      name: e.target.value,
    }));
  }, []);

  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>;

  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={onChange}
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>
      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            deleteUserMutation={deleteUserMutation}
            setEditedUser={setEditedUser}
          />
        );
      })}
    </Layout>
  );
};

export default HasuraCrud;
