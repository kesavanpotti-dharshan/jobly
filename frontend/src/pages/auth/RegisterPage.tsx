import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { registerSchema, type RegisterFormValues } from '@/lib/schemas';
import { useRegister } from '@/hooks/useAuth';

export function RegisterPage() {
  const { mutate: register_, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const apiError = error
    ? ((error as { response?: { data?: { message?: string } } })
        .response?.data?.message ?? 'Registration failed. Please try again.')
    : null;

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword: _, ...payload } = data;
    register_(payload);
  };

  return (
    <div className="auth-card">
      <h1 className="auth-card-title">Create your account</h1>
      <p className="auth-card-subtitle">
        Start tracking your job applications today.
      </p>

      {apiError && <div className="auth-api-error">{apiError}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="auth-field-row">
          <div className="auth-field">
            <label className="auth-label" htmlFor="firstName">First name</label>
            <input
              {...register('firstName')}
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Jane"
              className={`auth-input${errors.firstName ? ' error' : ''}`}
            />
            {errors.firstName && <span className="auth-error">{errors.firstName.message}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="lastName">Last name</label>
            <input
              {...register('lastName')}
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              className={`auth-input${errors.lastName ? ' error' : ''}`}
            />
            {errors.lastName && <span className="auth-error">{errors.lastName.message}</span>}
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="email">Email</label>
          <input
            {...register('email')}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
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
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className={`auth-input${errors.password ? ' error' : ''}`}
          />
          {errors.password && <span className="auth-error">{errors.password.message}</span>}
        </div>

        <div className="auth-field">
          <label className="auth-label" htmlFor="confirmPassword">Confirm password</label>
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className={`auth-input${errors.confirmPassword ? ' error' : ''}`}
          />
          {errors.confirmPassword && (
            <span className="auth-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending && <span className="spinner" />}
          {isPending ? 'Creating account…' : 'Create account'}
        </button>

        <p className="auth-link-row">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
