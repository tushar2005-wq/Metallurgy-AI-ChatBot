"use client"

import { MessageSquare, Settings, Plus, Upload, Send, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Chat {
  id: string
  title: string
}

interface SidebarProps {
  recentChats: Chat[]
  activeChat: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onUploadPDF: () => void
}

export function Sidebar({ recentChats, activeChat, onNewChat, onSelectChat, onUploadPDF }: SidebarProps) {
  return (
    <aside className="sidebar">
      <motion.div 
        className="sidebar-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="logo-icon">⚒️</span>
        <span className="logo-text">MetaMind</span>
      </motion.div>

      <div className="sidebar-actions">
        <motion.button 
          className="btn-new-chat"
          onClick={onNewChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          New Chat
        </motion.button>
        
        <motion.button 
          className="btn-upload"
          onClick={onUploadPDF}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Upload size={18} />
          Upload PDF
        </motion.button>
      </div>

      <div className="recent-chats">
        <span className="recent-chats-title">Recent Chats</span>
        <AnimatePresence>
          {recentChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              className={`recent-chat-item ${activeChat === chat.id ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <MessageSquare size={16} className="recent-chat-icon" />
              <span className="recent-chat-title">{chat.title}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="sidebar-footer">
        <motion.button 
          className="btn-settings"
          whileHover={{ x: 4 }}
        >
          <Settings size={18} />
          Settings
        </motion.button>
      </div>
    </aside>
  )
}

interface Source {
  file_name: string
  page: number
}

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  sources?: Source[]
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="chat-messages">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`message ${message.role}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="message-content">
              {message.content}
              
              {message.role === "ai" && message.sources && message.sources.length > 0 && (
                <div className="message-sources">
                  <span className="sources-title">Sources</span>
                  {message.sources.map((source, index) => (
                    <div key={index} className="source-item">
                      <FileText size={14} className="source-icon" />
                      <span className="source-file">{source.file_name}</span>
                      <span className="source-page">Page {source.page}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {isLoading && (
        <motion.div
          className="message ai"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="typing-indicator">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  disabled: boolean
}

export function ChatInput({ value, onChange, onSend, disabled }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input-area">
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask about metallurgy & materials science..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <motion.button 
          className="btn-send"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  )
}

interface WelcomeScreenProps {
  onSuggestionClick: (question: string) => void
}

const suggestions = [
  {
    title: "Bainite Formation",
    description: "Explain the mechanism of bainite formation in steels",
    question: "What is the mechanism of bainite formation in steels?"
  },
  {
    title: "Electric Arc Furnace",
    description: "How does an EAF work in steelmaking?",
    question: "How does an Electric Arc Furnace (EAF) work in steelmaking?"
  },
  {
    title: "Corrosion Protection",
    description: "Methods to prevent metal corrosion",
    question: "What are the main methods to prevent metal corrosion?"
  },
  {
    title: "FCC vs BCC",
    description: "Differences between crystal structures",
    question: "What are the differences between FCC and BCC crystal structures?"
  }
]

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <motion.div 
        className="welcome-icon-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="welcome-icon-glow" />
        <div className="welcome-icon">⚒️</div>
      </motion.div>
      
      <motion.h1 
        className="welcome-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        MetaMind
      </motion.h1>
      
      <motion.p 
        className="welcome-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Metallurgy & Materials Science AI Assistant
      </motion.p>
      
      <motion.div 
        className="suggestion-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            className="suggestion-card"
            onClick={() => onSuggestionClick(suggestion.question)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="suggestion-card-title">{suggestion.title}</div>
            <div className="suggestion-card-desc">{suggestion.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
