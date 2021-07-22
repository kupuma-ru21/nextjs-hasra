import React, { useCallback, memo } from 'react';
import type { VFC, Dispatch, SetStateAction } from 'react';
import { Users, DeleteUserMutationFn } from '../types/generated/graphql';

type SetEditedUser = Dispatch<SetStateAction<{ id: string; name: string }>>;

type Props = {
  user: Pick<Users, 'name' | 'id' | 'created_at'>;
  deleteUserMutation: DeleteUserMutationFn;
  setEditedUser: SetEditedUser;
};

const UserItem: VFC<Props> = ({ user, deleteUserMutation, setEditedUser }) => {
  const deleteUser = useCallback(async () => {
    await deleteUserMutation({ variables: { id: user.id } });
  }, [deleteUserMutation, user.id]);

  const editUser = useCallback(() => {
    setEditedUser(user);
  }, [setEditedUser, user]);

  return (
    <div className="my-1">
      <span className="mr-2">{user.name}</span>
      <span className="mr-2">{user.created_at}</span>
      <button
        className="mr-1 py-1 px-3 text-white bg-green-600 hover:bg-green-700 rounded-2xl focus:outline-none"
        data-testid={`edit-${user.id}`}
        onClick={editUser}
      >
        Edit
      </button>
      <button
        className="py-1 px-3 text-white bg-pink-600 hover:bg-pink-700 rounded-2xl focus:outline-none"
        data-testid={`delete-${user.id}`}
        onClick={deleteUser}
      >
        delete
      </button>
    </div>
  );
};

export default memo(UserItem);
