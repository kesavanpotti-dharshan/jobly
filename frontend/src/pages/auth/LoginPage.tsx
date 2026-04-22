import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'react-router-dom';
import { loginSchema, type LoginFormValues } from '@/lib/schemas';
import { useLogin } from '@/hooks/useAuth';

export function LoginPage() {
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const apiError = error
    ? ((error as { response?: { data?: { message?: string } } })
        .response?.data?.message ?? 'Login failed. Please try again.')
    : null;

  return (
    <div className="auth-card">
      <h1 className="auth-card-title">Welcome back</h1>
      <p className="auth-card-subtitle">
        {from
          ? 'Sign in to continue where you left off.'
          : 'Sign in to your Jobly account.'}
      </p>

      {apiError && <div className="auth-api-error">{apiError}</div>}

      <form className="auth-form" onSubmit={handleSubmit((data) => login(data))} noValidate>
        <div className="auth-field">
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`auth-input${errors.email ? ' error' : ''}`}
          />
          {errors.email && <span className="auth-error">{errors.email.message}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className={`auth-input${errors.password ? ' error' : ''}`}
          />
          {errors.password && <span className="auth-error">{errors.password.message}</span>}
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending && <span className="spinner" />}
          {isPending ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="auth-link-row">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="auth-link">Create one</Link>
        </p>
      </form>
    </div>
  );
}
