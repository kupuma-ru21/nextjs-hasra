import React, { useCallback, useState } from 'react';
import type { ChangeEvent, FormEvent, VFC } from 'react';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { todoVar } from '../cache';

const LocalStateA: VFC = () => {
  const [input, setInput] = useState('');
  const todos = useReactiveVar(todoVar);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      todoVar([...todoVar(), { title: input }]);
      setInput('');
    },
    [input]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => {
        return (
          <p key={index} className="mb-3 y-1">
            {task.title}
          </p>
        );
      })}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new Task ?"
          value={input}
          onChange={onChange}
        />
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white: bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  );
};

export default LocalStateA;
