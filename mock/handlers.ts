import { graphql } from 'msw';

export const users = [
  {
    __typename: 'users',
    id: '2cb1151a-9513-4b86-a4ed-d4b3988e6cc0',
    name: 'user1',
    created_at: '2021-07-19T13:06:34.686714+00:00',
  },
  {
    __typename: 'users',
    id: 'a590ee17-a2a2-4515-ab21-774a46bf31f3',
    name: 'user2',
    created_at: '2021-07-19T13:06:42.419452+00:00',
  },
  {
    __typename: 'users',
    id: '516c2b0a-f813-45d1-b9ec-b8b0da27cc18',
    name: 'user3',
    created_at: '2021-07-19T13:06:49.303893+00:00',
  },
  {
    __typename: 'users',
    id: '1df8843c-7445-4a50-8e5a-a2fe4f5cd4b1',
    name: 'user4',
    created_at: '2021-07-22T16:55:51.793037+00:00',
  },
];
export const handlers = [
  graphql.query('GetUsers', (req, res, ctx) => {
    return res(ctx.data({ users }));
  }),

  graphql.query('GetUserIDs', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          { __typename: 'users', id: '2cb1151a-9513-4b86-a4ed-d4b3988e6cc0' },
          { __typename: 'users', id: 'a590ee17-a2a2-4515-ab21-774a46bf31f3' },
          { __typename: 'users', id: '516c2b0a-f813-45d1-b9ec-b8b0da27cc18' },
          { __typename: 'users', id: '1df8843c-7445-4a50-8e5a-a2fe4f5cd4b1' },
        ],
      })
    );
  }),

  graphql.query('GetUserById', (req, res, ctx) => {
    const { id } = req.variables;
    if (id === '2cb1151a-9513-4b86-a4ed-d4b3988e6cc0') {
      return res(
        ctx.data({
          user_by_pk: {
            __typename: 'users',
            id: '2cb1151a-9513-4b86-a4ed-d4b3988e6cc0',
            name: 'user1',
            created_at: '2021-07-19T13:06:34.686714+00:00',
          },
        })
      );
    }
    if (id === 'a590ee17-a2a2-4515-ab21-774a46bf31f3') {
      return res(
        ctx.data({
          user_by_pk: {
            __typename: 'users',
            id: 'a590ee17-a2a2-4515-ab21-774a46bf31f3',
            name: 'user2',
            created_at: '2021-07-19T13:06:42.419452+00:00',
          },
        })
      );
    }
    if (id === '516c2b0a-f813-45d1-b9ec-b8b0da27cc18') {
      return res(
        ctx.data({
          user_by_pk: {
            __typename: 'users',
            id: '516c2b0a-f813-45d1-b9ec-b8b0da27cc18',
            name: 'user3',
            created_at: '2021-07-19T13:06:49.303893+00:00',
          },
        })
      );
    }
    if (id === '1df8843c-7445-4a50-8e5a-a2fe4f5cd4b1') {
      return res(
        ctx.data({
          user_by_pk: {
            __typename: 'users',
            id: '1df8843c-7445-4a50-8e5a-a2fe4f5cd4b1',
            name: 'user4',
            created_at: '2021-07-22T16:55:51.793037+00:00',
          },
        })
      );
    }
  }),
];
