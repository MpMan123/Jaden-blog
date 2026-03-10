import Content from "@/components/Content";

const menuItems = [
    {
        key: '/ctf/ApoorvCtf',
        label: 'ApoorvCTF',
        contents: `
# ApoorvCTF

CTF (Capture The Flag) là một loại cuộc thi bảo mật mà các đội thách thức phải giải quyết các vấn đề bảo mật để tìm ra các cờ (flags).
        `
    }
]

const CTF = () => {
    return (
        <div className="max-w-2xl markdown-content">
            <Content menuItems={menuItems} />
        </div>
    );
};

export default CTF;

