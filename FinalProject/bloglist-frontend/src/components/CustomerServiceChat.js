import React, {useEffect, useState, useRef} from 'react';
import {IconButton, Paper, TextField, Button, Divider, Typography} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import gptService from '../services/gpt'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const CustomerServiceChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([
        {"role": "system", "content": '这是基于GFT-4的对话窗口,可以问他任何事情！'}
    ]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const data = {
        "model": "gpt-4",
        "messages": chatLog,
        "max_tokens": 150
    }

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };
    const [waitng, setWaiting] = useState(false)

    const handleSendMessage = async () => {
        setChatLog(prevChatLog => [...prevChatLog, {role: 'user', content: message}]);
        setMessage('');
        setWaiting(true)
    };

    useEffect(() => {
        const gptAnswer = async () => {
            const reply = await gptService.getReply(data)
            setChatLog([...chatLog, {role: 'assistant', content: reply}]);
            setWaiting(false)

        }
        if (chatLog[chatLog.length - 1].role === 'user') {
            gptAnswer()
        }
        scrollToBottom();
    }, [chatLog])

    return (
        <div style={{position: 'fixed', right: '30px', bottom: '108px'}}>
            {isOpen && (
                <Paper elevation={4} style={{
                    width: '300px',
                    height: '500px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '8px',
                        height: '5px'
                    }}>
                        <IconButton onClick={toggleChatBox} size="small">
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    <div style={{
                        overflowY: 'auto', flexGrow: 1, padding: '0px 16px ',
                    }}>
                        {chatLog.map((entry, index) => (
                            <div key={index} style={{marginBottom: '16px'}}>
                                <Typography variant="subtitle1" style={{
                                    fontWeight: 'bold',
                                    color: '#333333'
                                }}>{capitalizeFirstLetter(entry.role)} </Typography>
                                <div style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    backgroundColor: entry.role === 'user' ? '#fff2e6' : '#e6f7ff'
                                }}>
                                    <Typography variant="subtitle1">{entry.content}</Typography>
                                </div>
                            </div>
                        ))}
                        {waitng && (
                            <div style={{marginBottom: '16px'}}>
                                <Typography variant="subtitle1" style={{
                                    fontWeight: 'bold',
                                    color: '#333333'
                                }}>Assistant</Typography>
                                <div style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    backgroundColor: '#e6f7ff'
                                }}>
                                    <div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef}/>
                    </div>
                    <div style={{padding: '16px'}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSendMessage}
                            style={{marginTop: '8px'}}>
                            Send
                        </Button>
                    </div>
                </Paper>
            )}
            {!isOpen && (
                <IconButton
                    onClick={toggleChatBox}
                    style={{
                        background: '#007BFF',   // 蓝色背景
                        borderRadius: '20px',    // 圆角
                        padding: '10px 20px',    // 垂直和水平间距
                    }}
                >
                    <ChatIcon fontSize="large" style={{color: 'white'}}/>
                    <Typography
                        variant="h6"
                        style={{
                            marginLeft: '8px',
                            color: 'white',     // 白色文本
                            fontFamily: '"Your Font Name", sans-serif'  // 你可以选择自己喜欢的字体
                        }}
                    >
                        Chat
                    </Typography>
                </IconButton>
            )}
        </div>
    );
};

export default CustomerServiceChat;
