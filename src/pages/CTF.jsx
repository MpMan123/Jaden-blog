import Content from "@/components/Content";

const ctfContext = require.context('@/content/ctf', false, /\.md$/);

const menuItems = ctfContext.keys().map(key => {
    const module = ctfContext(key);
    const contents = (module.default || module || "").toString();
    const id = key.match(/\.\/(.+)\.md$/)[1];

    const titleMatch = contents.match(/^#\s+(.+)$/m);
    const label = titleMatch ? titleMatch[1] : id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return {
        key: id, // Or use the path if needed
        label: label,
        contents: contents
    };
});

const CTF = () => {
    return (
        <div className="max-w-2xl markdown-content">
            <Content menuItems={menuItems} />
        </div>
    );
};

export default CTF;
