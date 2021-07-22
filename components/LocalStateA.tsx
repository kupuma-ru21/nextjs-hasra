import React, { useState } from 'react';
import type { ChangeEvent, FormEvent, VFC } from 'react';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { todoVar } from '../cache';
import { tsAnyKeyword } from '@babel/types';

const LocalStateA: VFC = () => {
  const [input, setInput] = useState('');
  const todos = useReactiveVar(todoVar);

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
    </>
  );
};

export default LocalStateA;
