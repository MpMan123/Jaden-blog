"use client";

import Home from '@/pages/Home';
import Layout from '@/components/Layout'
import Archive from '@/pages/Archive'
import CTF from '@/pages/CTF'
import WriteUp from '@/pages/WriteUp'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ScrollToHash from '@/components/ScrollToHash'

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToHash />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/CTF" element={<CTF />} />
                    <Route path="/writeup" element={<WriteUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;