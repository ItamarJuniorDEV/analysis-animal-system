import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const RenderHTMLInIframe = () => {
    const [htmlContent, setHtmlContent] = useState('')

    const iframeRef = useRef(null);

    useEffect(() => {
        // Carrega os dados
        async function getAnalyticsData() {
            const response = await axios.get('https://localhost:7270/api/OpenAI/GetAnalyticsData')

            setHtmlContent(response.data)
        }

        getAnalyticsData()
    }, []);

    useEffect(() => {

        // Adicionando o conteúdo no iframe
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
    }, [htmlContent]);

    return (
        <iframe
            ref={iframeRef}
            title="Rendered HTML"
            style={{ width: '100%', height: '1000px', border: 'none' }}
        />
    );
};

export default RenderHTMLInIframe;
