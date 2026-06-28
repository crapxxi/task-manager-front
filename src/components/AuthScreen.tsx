import { useState, type FormEvent } from 'react';
import { BrandGlyph, Icon } from '../icons';
import { useAuth, useTheme } from '../state';
import { AUTH_LIMITS } from '../types';

type Mode = 'login' | 'register';

export function AuthScreen() {
  const { login, register, sessionExpired } = useAuth();
  const { theme, toggle } = useTheme();

  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isLogin = mode === 'login';

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
  };

  function validate(): string | null {
    if (username.trim().length < AUTH_LIMITS.usernameMin)
      return `Username must be at least ${AUTH_LIMITS.usernameMin} characters.`;
    if (!isLogin && name.trim().length < AUTH_LIMITS.nameMin)
      return `Name must be at least ${AUTH_LIMITS.nameMin} characters.`;
    if (password.length < AUTH_LIMITS.passwordMin)
      return `Password must be at least ${AUTH_LIMITS.passwordMin} characters.`;
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      if (isLogin) {
        await login(username.trim(), password);
      } else {
        await register({
          username: username.trim(),
          name: name.trim(),
          surname: surname.trim() || null,
          password,
        });
      }
      // On success the auth gate unmounts this screen and shows the app.
    } catch (err) {
      setError((err as Error).message || 'Something went wrong. Please try again.');
      setBusy(false);
    }
  }

  return (
    <div className="auth">
      <button className="iconbtn auth__theme" title="Toggle theme" onClick={toggle}>
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      </button>

      <div className="auth__card">
        <div className="auth__brand">
          <span className="auth__mark"><BrandGlyph size={26} /></span>
          <div>
            <h1 className="auth__title">Taskflow</h1>
            <p className="auth__sub">dependency-aware task manager</p>
          </div>
        </div>

        <div className="switch auth__switch" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isLogin}
            className={`switch__btn ${isLogin ? 'is-active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isLogin}
            className={`switch__btn ${!isLogin ? 'is-active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Create account
          </button>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          {sessionExpired && !error && (
            <div className="hint">
              <Icon name="info" />
              Your session expired. Please sign in again.
            </div>
          )}
          {error && <div className="form__err">{error}</div>}

          <div className="field">
            <label className="field__label" htmlFor="auth-username">
              Username <span className="field__req">required</span>
            </label>
            <input
              id="auth-username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              placeholder="your_username"
            />
          </div>

          {!isLogin && (
            <>
              <div className="field">
                <label className="field__label" htmlFor="auth-name">
                  Name <span className="field__req">required</span>
                </label>
                <input
                  id="auth-name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Ada"
                />
              </div>
              <div className="field">
                <label className="field__label" htmlFor="auth-surname">
                  Surname <span className="drawer__sublabel">optional</span>
                </label>
                <input
                  id="auth-surname"
                  className="input"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  autoComplete="family-name"
                  placeholder="Lovelace"
                />
              </div>
            </>
          )}

          <div className="field">
            <label className="field__label" htmlFor="auth-password">
              Password <span className="field__req">required</span>
            </label>
            <input
              id="auth-password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              placeholder={`At least ${AUTH_LIMITS.passwordMin} characters`}
            />
          </div>

          <button type="submit" className="btn btn--accent" disabled={busy}>
            {busy ? (
              <>
                <span className="spinner spinner--sm" />
                {isLogin ? 'Signing in…' : 'Creating account…'}
              </>
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="auth__foot">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" className="linkbtn" onClick={() => switchMode(isLogin ? 'register' : 'login')}>
            {isLogin ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
