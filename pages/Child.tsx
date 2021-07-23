import React, { memo } from 'react';
import type { VFC, FormEvent } from 'react';

type Props = { handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> };

const Child: VFC<Props> = ({ handleSubmit }) => {
  return (
    <>
      <p>Child Component</p>
      <button className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none">
        click
      </button>
    </>
  );
};

export default memo(Child);
