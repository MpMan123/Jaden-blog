import ClientAppWrapper from '../ClientAppWrapper';

export function generateStaticParams() {
  const paths = [
    { slug: [] },
    { slug: ['home'] },
    { slug: ['archive'] },
    { slug: ['project'] },
    { slug: ['writeup'] },
    { slug: ['writeup', 'AdventOfPwn2025'] },
    { slug: ['writeup', 'ApoorvCtf2026']},
    { slug: ['about'] },
  ];

  try {
    const fs = require('fs');
    const path = require('path');
    const ctfDir = path.join(process.cwd(), 'src/pages/writeup');
    if (fs.existsSync(ctfDir)) {
      const files = fs.readdirSync(ctfDir);
      files.forEach(file => {
        const match = file.match(/^(.+)\.jsx$/);
        if (match) {
          const name = match[1];
          paths.push({ slug: ['ctf', name] });
        }
      });
    }
  } catch (err) {
    console.error('Error reading CTF directory in generateStaticParams:', err);
  }

  console.log('generateStaticParams paths:', paths);
  return paths;
}

export default function Home() {
  console.log("PAGE.js rendering on server");
  return (
    <main>
      <ClientAppWrapper />
    </main>
  );
}
