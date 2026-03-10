import ClientAppWrapper from '../ClientAppWrapper';

export function generateStaticParams() {
  console.log('generateStaticParams', [{ slug: [] }]);
  return [{ slug: [] }];
}

export default function Home() {
  console.log("PAGE.js rendering on server");
  return (
    <main>
      <ClientAppWrapper />
    </main>
  );
}
