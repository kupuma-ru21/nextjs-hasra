import { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useCreateUserMutation } from '../types/generated/graphql';

export const useCreateForm = () => {
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');

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

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const userNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await createUserMutation({ variables: { name: userName } });
      } catch (error) {
        alert(error.message);
      }
      setUserName('');
    },
    [createUserMutation, userName]
  );

  return {
    text,
    handleSubmit,
    userName,
    userNameChange,
    handleTextChange,
  };
};
