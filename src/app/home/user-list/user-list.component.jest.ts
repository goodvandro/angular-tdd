import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { UserListComponent } from './user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { render, screen, waitFor } from '@testing-library/angular';

const page = {
  content: [
    { id: 1, username: 'user1', email: 'user1@mail.com' },
    { id: 2, username: 'user2', email: 'user2@mail.com' },
    { id: 3, username: 'user3', email: 'user3@mail.com' },
  ],
  page: 0,
  size: 5,
  totalPages: 5,
};

const server = setupServer(
  rest.get('/api/1.0/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(page));
  })
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('User List', () => {
  it('displays user list', async () => {
    await render(UserListComponent, {
      imports: [HttpClientModule],
    });

    await waitFor(() => {
      expect(screen.queryAllByText(/user/).length).toBe(3);
    });
  });
});
