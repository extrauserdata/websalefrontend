import React, { useState } from 'react';
import './UserAuth.css';

const UserRegister = () => {
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get('password') !== formData.get('confirm-password')) {
      setHasError(true);
      setNotice('Your passwords do not match. Please check and try again.');
      return;
    }

    setIsSubmitting(true);
    setNotice('');
    setHasError(false);
    try {
      const response = await fetch('/api/v1/users/register', {
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
      const responseMessage = responseData && typeof responseData === 'object'
        ? responseData.message || responseData.detail
        : responseData;
      setNotice(responseMessage || 'Your account has been created successfully.');
    } catch (error) {
      setHasError(true);
      setNotice(error.message || 'Unable to create your account. Check your connection and try again.');
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
          <span className="showcase-kicker"><span /> A BETTER WAY TO WORK</span>
          <h1>Make room for the work that moves you forward.</h1>
          <p>Bring your projects and people together, and turn your next idea into progress.</p>
          <div className="showcase-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-star">✳</div>
            <div className="art-card art-card-one"><span className="art-card-dot" /><i /><i /><i /></div>
            <div className="art-card art-card-two"><span className="art-avatar">M</span><span>Team workspace<br /><small>Ready when you are</small></span><b>✓</b></div>
            <div className="art-card art-card-three"><span className="art-chart"><i /><i /><i /><i /><i /></span><span>Let’s get started</span></div>
          </div>
        </div>
        <div className="showcase-footer"><span>Made for the way you work.</span><span>© 2025 Northstar</span></div>
      </section>

      <section className="auth-main">
        <div className="auth-form-wrap register-form-wrap">
          <div className="mobile-brand"><span className="auth-brand-icon" aria-hidden="true">N</span>Northstar</div>
          <div className="form-heading">
            <span className="form-eyebrow">GET STARTED — IT’S FREE</span>
            <h2>Create your account</h2>
            <p>Start bringing your team’s work together.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              name="username"
              type="text"
              placeholder="Choose a username"
              autoComplete="username"
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Enter your password again"
              autoComplete="new-password"
              required
            />

            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'} <span aria-hidden="true">→</span>
            </button>
            {notice && <p className={`auth-notice${hasError ? ' error' : ''}`} role={hasError ? 'alert' : 'status'}>{notice}</p>}
          </form>

          <div className="auth-switch">Already have an account? <a href="/login">Sign in</a></div>
        </div>
      </section>
    </main>
  );
};

export default UserRegister;
