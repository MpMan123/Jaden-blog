"use client";

import Home from '@/pages/Home';
import Layout from '@/components/Layout'
import Archive from '@/pages/Archive'
import Project from '@/pages/Project'
import WriteUp from '@/pages/WriteUp'
import About from '@/pages/About'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToHash from '@/components/ScrollToHash'

// Automatically import all .jsx files from @/pages/CTF
// and create route components
const ctfContext = require.context('@/pages/CTF', false, /\.jsx$/);
const ctfRoutes = ctfContext.keys().map(key => {
    const Component = ctfContext(key).default;
    const name = key.match(/\.\/(.+)\.jsx$/)[1];
    return {
        path: `/ctf/${name}`,
        element: <Component />,
        key: name
    };
});


const App = () => {
    return (
        <Router basename="/jaden-blog">
            <ScrollToHash />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/writeup" element={<WriteUp />} />
                    <Route path="/about" element={<About />} />
                    {ctfRoutes.map(route => (
                        <Route key={route.key} path={route.path} element={route.element} />
                    ))}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;