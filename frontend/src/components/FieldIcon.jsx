const paths = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z',
  building: 'M4 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M12 21v-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9M4 21h16M7 7h1M7 11h1M7 15h1M15 12h1M15 16h1',
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 0 8 7 8-7',
  phone: 'M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z',
  lock: 'M6 11V8a6 6 0 1 1 12 0v3m-13 0h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm7 4.5v2',
  shieldCheck: 'M12 3l7 3v6c0 4.4-3 8.4-7 9-4-.6-7-4.6-7-9V6l7-3Zm-2.5 9 1.8 1.8L15 10',
};

export default function FieldIcon({ name, ...props }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" {...props}>
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
