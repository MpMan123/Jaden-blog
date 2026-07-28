"use client";
import { Link } from 'react-router-dom';

const ctfContext = require.context('@/pages/WriteUp', false, /\.jsx$/);
const writeUpLinks = ctfContext.keys().map(key => {
    const name = key.match(/\.\/(.+)\.jsx$/)[1];
    const label = name.replace(/([a-z])([A-Z0-9])/g, '$1 $2');
    return {
        path: `/WriteUp/${name}`,
        name: name,
        label: label
    };
});

const WriteUp = () => {
    return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4 select-none">
        <h2 className="font-headline-md text-2xl text-on-surface font-semibold">Writeups</h2>
      </div>
      <div className="markdown-content">
        <p>This is where I write my writeups.</p>
        <ul className="mt-6 space-y-3">
          {writeUpLinks.map(link => (
            <li key={link.name} className="list-none pl-0">
              <Link to={link.path} className="text-primary hover:underline text-lg font-medium flex items-center gap-2 !no-underline hover:text-primary/80 transition-colors">
                <svg className="w-5 h-5 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WriteUp;
