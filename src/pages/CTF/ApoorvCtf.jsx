import Content from "@/components/Content";

const contentContext = require.context('@/content/apoorv-ctf', false, /\.md$/);

const menuItems = contentContext.keys().map(key => {
  const contents = contentContext(key).default;
  const id = key.match(/\.\/(.+)\.md$/)[1];

  const titleMatch = contents.match(/^#\s+(.+)$/m);
  const label = titleMatch ? titleMatch[1] : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    key: id,
    id: id,
    label: label,
    contents: contents
  };
});

const ApoorvCtf = () => {
  return (
    <div className="max-w-2xl flex flex-col gap-4 markdown-content">
      <Content menuItems={menuItems} />
    </div>
  );
};

export default ApoorvCtf;