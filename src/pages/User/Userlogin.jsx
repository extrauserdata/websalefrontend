import React, { useState } from 'react';
import './UserAuth.css';

const Userlogin = () => {
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice('');
    setHasError(false);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: formData.get('username').trim(),
          password: formData.get('password'),
        }),
      });
      const responseText = await response.text();
      let responseData = null;
      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = responseText;
        }
      }
      if (!response.ok) {
        const message = responseData && typeof responseData === 'object'
          ? responseData.detail || responseData.message || responseData.error
          : '';
        throw new Error(
          message ||
          (typeof responseData === 'string' && /<!doctype html|<html|Cannot POST/i.test(responseData)
            ? 'The API returned an HTML error. Restart the frontend dev server so the API proxy can forward this request.'
            : `Request failed (${response.status} ${response.statusText}).`),
        );
      }
     
  setNotice('Login succeeded.');


    } catch (error) {
      setHasError(true);
      setNotice(error.message || 'Unable to sign in. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase" aria-label="Welcome">
        <a className="auth-brand" href="/login">
          <span className="auth-brand-icon" aria-hidden="true">N</span>
          Northstar
        </a>
        <div className="showcase-content">
          <span className="showcase-kicker"><span /> YOUR WORKSPACE, IN FOCUS</span>
          <h1>Good things happen when your team finds its flow.</h1>
          <p>One calm place to bring your work, your people, and your next big idea together.</p>
          <div className="showcase-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-star">✳</div>
            <div className="art-card art-card-one"><span className="art-card-dot" /><i /><i /><i /></div>
            <div className="art-card art-card-two"><span className="art-avatar">J</span><span>Project update<br /><small>Looking good!</small></span><b>✓</b></div>
            <div className="art-card art-card-three"><span className="art-chart"><i /><i /><i /><i /><i /></span><span>On track</span></div>
          </div>
        </div>
        <div className="showcase-footer"><span>Made for the way you work.</span><span>© 2025 Northstar</span></div>
      </section>

      <section className="auth-main">
        <div className="auth-form-wrap">
          <div className="mobile-brand"><span className="auth-brand-icon" aria-hidden="true">N</span>Northstar</div>
          <div className="form-heading">
            <span className="form-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Enter your details below to continue.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              required
            />

            <div className="password-label-row">
              <label htmlFor="login-password">Password</label>
              <a href="#forgot-password" onClick={(event) => event.preventDefault()}>Forgot password?</a>
            </div>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <label className="remember-row">
              <input type="checkbox" name="remember" />
              <span>Keep me signed in</span>
            </label>

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'} <span aria-hidden="true">→</span>
            </button>
            {notice && <p className={`auth-notice${hasError ? ' error' : ''}`} role={hasError ? 'alert' : 'status'}>{notice}</p>}
          </form>

          <div className="auth-switch">New to Northstar? <a href="/register">Create an account</a></div>
          <div className="auth-legal">By continuing, you agree to our <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</div>
        </div>
      </section>
    </main>
  );
};

export default Userlogin;
