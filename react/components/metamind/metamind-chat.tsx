"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Sidebar, ChatMessages, ChatInput, WelcomeScreen } from "@/components/metamind/chat-components"
import "@/styles/metamind.css"

interface Source {
  file: string
  page: number
}

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  sources?: Source[]
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

export function MetaMindChat() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find((c) => c.id === activeChat)
  const messages: Message[] = currentChat?.messages || []

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    }
    setChats((prev) => [newChat, ...prev])
    setActiveChat(newChat.id)
  }, [])

  const handleSelectChat = useCallback((id: string) => {
    setActiveChat(id)
  }, [])

  const handleUploadPDF = useCallback(() => {
    // Create a file input and trigger click
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".pdf"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("[v0] PDF uploaded:", file.name)
        // In a real implementation, you would upload this to your backend
        alert(`PDF "${file.name}" selected. In production, this would be uploaded to the server.`)
      }
    }
    input.click()
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    // Create new chat if none exists
    let chatId = activeChat
    if (!chatId) {
      const newChat: Chat = {
        id: crypto.randomUUID(),
        title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
        messages: []
      }
      setChats((prev) => [newChat, ...prev])
      chatId = newChat.id
      setActiveChat(chatId)
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content
    }

    // Update the chat title if it's the first message
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === chatId) {
          const updatedChat = {
            ...chat,
            messages: [...chat.messages, userMessage]
          }
          // Update title if it's still "New Chat"
          if (chat.title === "New Chat") {
            updatedChat.title = content.slice(0, 30) + (content.length > 30 ? "..." : "")
          }
          return updatedChat
        }
        return chat
      })
    )

    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: content })
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: data.answer,
        sources: data.sources
      }

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiMessage]
            }
          }
          return chat
        })
      )
    } catch {
      // If the backend is not available, show a fallback response
      const fallbackMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: "I apologize, but I'm unable to connect to the backend server at the moment. Please ensure the server is running at http://localhost:8000 and try again.",
        sources: []
      }

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, fallbackMessage]
            }
          }
          return chat
        })
      )
    } finally {
      setIsLoading(false)
    }
  }, [activeChat, isLoading])

  const handleSend = useCallback(() => {
    sendMessage(inputValue)
  }, [inputValue, sendMessage])

  const handleSuggestionClick = useCallback((question: string) => {
    sendMessage(question)
  }, [sendMessage])

  const recentChats = chats.map((chat) => ({
    id: chat.id,
    title: chat.title
  }))

  return (
    <div className="metamind-container">
      <Sidebar
        recentChats={recentChats}
        activeChat={activeChat}
        onNewChat={createNewChat}
        onSelectChat={handleSelectChat}
        onUploadPDF={handleUploadPDF}
      />

      <main className="main-area">
        {!activeChat || messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="chat-screen">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <div ref={messagesEndRef} />
          </div>
        )}

        {(activeChat || messages.length > 0) && (
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={isLoading}
          />
        )}
        
        {!activeChat && messages.length === 0 && (
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
            disabled={isLoading}
          />
        )}
      </main>
    </div>
  )
}
