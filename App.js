.notification {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999;
  display: flex; align-items: flex-start; gap: .75rem;
  padding: .9rem 1.25rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  max-width: 360px;
  animation: slideIn .35s cubic-bezier(.4,0,.2,1) both;
  backdrop-filter: blur(8px);
}
.notification--success { background: var(--success-bg); border-left: 4px solid var(--success); }
.notification--error   { background: var(--danger-bg);  border-left: 4px solid var(--danger); }
.notification--warn    { background: #fffbeb;            border-left: 4px solid var(--warn); }
.notification--info    { background: var(--sky-light);   border-left: 4px solid var(--sky); }

.notification-icon { font-size: 1.1rem; line-height: 1.4; flex-shrink: 0; }
.notification-msg  { font-size: .85rem; color: var(--slate-700); line-height: 1.5; }
