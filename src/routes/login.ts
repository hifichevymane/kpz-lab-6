import { createFileRoute, redirect } from '@tanstack/react-router'
import type { Redirect } from '@tanstack/react-router';
import Login from '../pages/Login';

export const Route = createFileRoute('/login')({
  component: Login,
  beforeLoad: (): Redirect | undefined => {
    if (!localStorage.getItem('token') && !sessionStorage.getItem('token')) return;
    return redirect({ to: '/entities' });
  }
});
