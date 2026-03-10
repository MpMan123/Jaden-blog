import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Find the element with the ID matching the hash (minus the #)
            const id = hash.replace('#', '');
            const element = document.getElementById(id);

            if (element) {
                // Wait a bit for the page to render completely if needed
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [hash]);

    return null; // This component doesn't render anything
};

export default ScrollToHash;
