import { DashboarProvider } from "@/Context/DashboarContex";
import Page from "./Page";
import { useEffect } from 'react';

export default (props) => {
    useEffect(() => {       
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []); 

    return (
        <DashboarProvider>
            <Page {...props}></Page>
        </DashboarProvider>
    );
};
