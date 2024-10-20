import axios from 'axios';
import { useState } from 'react';

const ChatApp = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const sendMessage = async () => {
        if (message.trim() === '') return;

        try {
            // Adiciona a mensagem enviada ao histórico do chat
            setChatHistory((prevHistory) => [...prevHistory, { user: 'Você', text: message }]);

            // Faz uma requisição à API
            const response = await axios.post(`https://localhost:7270/api/OpenAI/SendMessage?message=${message}`);

            console.log(response)

            // Adiciona a resposta da API ao histórico do chat
            setChatHistory((prevHistory) => [...prevHistory, { user: 'Farm Support Helper', text: response.data }]);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            setChatHistory((prevHistory) => [...prevHistory, { user: 'Farm Support Helper', text: 'Erro ao obter resposta da API.' }]);
        }

        // Limpa o campo de mensagem
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ height: '500px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                {chatHistory.map((entry, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <strong>{entry.user}: </strong>{entry.text}
                    </div>
                ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem"
                style={{ width: '80%', padding: '10px' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px' }}>Enviar</button>
        </div>
    );
};

export default ChatApp;
