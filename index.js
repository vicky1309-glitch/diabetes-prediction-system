.form-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

/* ─── Header ─────────────────────────────────────────────────────────────── */
.form-header {
  background: linear-gradient(135deg, var(--slate-900) 0%, var(--slate-800) 100%);
  padding: 1.5rem 1.75rem;
}
.form-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem; font-weight: 700;
  color: var(--white); margin-bottom: .25rem;
}
.form-subtitle { font-size: .82rem; color: var(--slate-400); margin-bottom: .9rem; }
.sample-btns { display: flex; gap: .5rem; flex-wrap: wrap; }
.btn-sample {
  font-size: .75rem; font-weight: 500; padding: .35rem .9rem;
  border-radius: 999px; border: 1.5px solid; cursor: pointer;
  transition: background .2s, color .2s;
}
.btn-sample--risk   { color: #fca5a5; border-color: #fca5a5; background: transparent; }
.btn-sample--risk:hover   { background: rgba(239,68,68,.15); }
.btn-sample--normal { color: #6ee7b7; border-color: #6ee7b7; background: transparent; }
.btn-sample--normal:hover { background: rgba(34,197,94,.12); }

/* ─── Grid ───────────────────────────────────────────────────────────────── */
.fields-grid {
  display: grid; gap: 0;
  grid-template-columns: 1fr;
  padding: 0;
}
@media(min-width:600px){
  .fields-grid { grid-template-columns: 1fr 1fr; }
}

/* ─── Field ──────────────────────────────────────────────────────────────── */
.field {
  padding: 1rem 1.75rem;
  border-bottom: 1px solid var(--slate-100);
}
.field:nth-child(even) { border-left: 1px solid var(--slate-100); }
@media(max-width:599px){
  .field:nth-child(even) { border-left: none; }
}

.field-label {
  display: flex; align-items: center; justify-content: space-between;
  font-size: .8rem; font-weight: 600;
  color: var(--slate-700); margin-bottom: .45rem;
}
.field-unit {
  font-size: .7rem; font-weight: 400; color: var(--slate-400);
}
.field-input {
  width: 100%; padding: .55rem .85rem;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius-sm);
  font-size: .9rem; font-family: inherit; color: var(--slate-800);
  transition: border-color .2s, box-shadow .2s;
  background: var(--slate-50);
}
.field-input:focus {
  outline: none; border-color: var(--sky);
  box-shadow: 0 0 0 3px rgba(14,165,233,.12);
  background: var(--white);
}
.field-input:disabled { opacity: .5; cursor: not-allowed; }
.field--error .field-input { border-color: var(--danger); }
.field-hint  { font-size: .72rem; color: var(--slate-400); margin-top: .3rem; }
.field-error { font-size: .72rem; color: var(--danger);    margin-top: .3rem; }

/* ─── Actions ────────────────────────────────────────────────────────────── */
.form-actions {
  display: flex; gap: .75rem; padding: 1.25rem 1.75rem;
  border-top: 1px solid var(--slate-100);
  justify-content: flex-end;
}
.btn-reset {
  padding: .65rem 1.4rem; border-radius: var(--radius-sm);
  border: 1.5px solid var(--slate-200); background: var(--white);
  color: var(--slate-600); font-size: .9rem; font-weight: 500;
  cursor: pointer; transition: background .2s, border-color .2s;
}
.btn-reset:hover { background: var(--slate-100); border-color: var(--slate-300); }
.btn-predict {
  flex: 1; max-width: 220px;
  padding: .7rem 1.4rem; border-radius: var(--radius-sm);
  border: none;
  background: linear-gradient(135deg, var(--sky) 0%, var(--teal) 100%);
  color: var(--white); font-size: .9rem; font-weight: 600;
  cursor: pointer; transition: opacity .2s, transform .1s;
  display: flex; align-items: center; justify-content: center; gap: .5rem;
}
.btn-predict:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
.btn-predict:disabled { opacity: .6; cursor: not-allowed; transform: none; }

.spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.4);
  border-top-color: #fff; border-radius: 50%;
  animation: spin 1s linear infinite;
}
