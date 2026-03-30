import Content from '../components/Content';

const archiveContext = require.context('@/content/archive', false, /\.md$/);

const menuItems = archiveContext.keys().map(key => {
  const module = archiveContext(key);
  const contents = module.default || module;
  const id = key.match(/\.\/(.+)\.md$/)[1];

  // Extract title from first H1 if it exists
  const titleMatch = contents.match(/^#\s+(.+)$/m);
  const label = titleMatch ? titleMatch[1] : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    key: id,
    id: id,
    label: label,
    contents: contents
  };
});

// Sort menuItems (optional, currently by filename/id)
menuItems.sort((a, b) => a.label.localeCompare(b.label));

const Archive = () => {
  return (
    <div className="max-w-2xl markdown-content">
      <Content menuItems={menuItems} />
    </div>
  );
};

export default Archive;
