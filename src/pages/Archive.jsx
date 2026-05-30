import Content from '../components/Content';

const archiveContext = require.context('@/content/archive', false, /\.md$/);

const menuItems = archiveContext.keys().map(key => {
  const learningModule = archiveContext(key);
  const contents = (learningModule.default || learningModule || "").toString();
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
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-end mb-8 border-b border-outline-variant/30 pb-4 select-none">
        <h2 className="font-headline-md text-2xl text-on-surface font-semibold">Manuals</h2>
        <span className="font-label-code text-xs text-on-surface-variant tracking-wider uppercase">{menuItems.length} DOCS_FOUND</span>
      </div>
      <div className="markdown-content">
        <Content menuItems={menuItems} />
      </div>
    </div>
  );
};

export default Archive;
