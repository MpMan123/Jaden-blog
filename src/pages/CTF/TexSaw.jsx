import Content from "@/components/Content";

// Updated to load from TexSaw2026 content folder
const contentContext = require.context('@/content/TexSaw2026', false, /\.md$/);

const menuItems = contentContext.keys().map(key => {
  const module = contentContext(key);
  const contents = module.default || module;
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

const TexSaw = () => {
  return (
    <div className="max-w-2xl flex flex-col gap-4 markdown-content">
      <Content menuItems={menuItems} />
    </div>
  );
};

export default TexSaw;