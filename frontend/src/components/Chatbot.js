import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your career guidance assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cleanMarkdown = (text) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#+/g, '')
      .replace(/•/g, '')
      .replace(/`/g, '')
      .replace(/~/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputText,
          context: 'Career guidance chat'
        })
      });

      const data = await response.json();
      const botMessage = { 
        type: 'bot', 
        text: cleanMarkdown(data.response || data.error || 'Sorry, I couldn\'t process that request.')
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        type: 'bot', 
        text: 'Sorry, I\'m having trouble connecting. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What careers are available after B.Sc.?",
    "How do I choose between engineering and medicine?",
    "What skills do I need for data science?",
    "Tell me about government job opportunities"
  ];

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="header-info">
            <div className="bot-avatar">
              <i className="fas fa-user-tie"></i>
            </div>
            <div>
              <h3>Career Assistant</h3>
              <span className="status">
                <i className="fas fa-circle"></i>
                Online
              </span>
            </div>
          </div>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-questions">
            <p>Quick questions:</p>
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question"
                onClick={() => {
                  setInputText(question);
                  setTimeout(sendMessage, 100);
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="chatbot-input">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about careers, courses, or skills..."
            rows={1}
          />
          <button 
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="send-btn"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <i className="fas fa-headset"></i>
        <span className="tooltip">Career Counselor</span>
      </button>
    </>
  );
};

export default Chatbot;