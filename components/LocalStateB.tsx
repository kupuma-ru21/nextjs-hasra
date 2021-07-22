import React from 'react';
import type { VFC } from 'react';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { todoVar } from '../cache';

const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar);

  return (
    <>
      {todos?.map((task, index) => {
        return (
          <p key={index} className="mb-3 y-1">
            {task.title}
          </p>
        );
      })}
      <Link href="/local-state-a">
        <a>Back</a>
      </Link>
    </>
  );
};

export default LocalStateB;
