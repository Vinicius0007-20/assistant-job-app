"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2, Maximize2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  sender: "user" | "support";
  text: string;
  timestamp: Date;
  senderName?: string;
}

interface LiveChatProps {
  userId?: string;
  userName?: string;
}

export default function LiveChat({ userId, userName = "Visitante" }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "support",
      text: "Olá! 👋 Bem-vindo ao suporte do CareerCatalyst. Como posso ajudá-lo hoje?",
      timestamp: new Date(),
      senderName: "Suporte"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatChannelRef = useRef<any>(null);

  // Auto-scroll para última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Configurar canal de chat em tempo real com Supabase
  useEffect(() => {
    if (!userId) return;

    const setupRealtimeChat = async () => {
      // Criar ou buscar sessão de chat
      const { data: chatSession } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      let sessionId = chatSession?.id;

      if (!chatSession) {
        const { data: newSession } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: userId,
            status: 'active',
            started_at: new Date().toISOString()
          })
          .select()
          .single();
        
        sessionId = newSession?.id;
      }

      // Carregar mensagens anteriores
      if (sessionId) {
        const { data: previousMessages } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });

        if (previousMessages && previousMessages.length > 0) {
          const formattedMessages = previousMessages.map(msg => ({
            id: msg.id,
            sender: msg.sender_type as "user" | "support",
            text: msg.message,
            timestamp: new Date(msg.created_at),
            senderName: msg.sender_type === 'support' ? 'Suporte' : userName
          }));
          setMessages(prev => [...prev, ...formattedMessages]);
        }

        // Configurar listener em tempo real
        chatChannelRef.current = supabase
          .channel(`chat:${sessionId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'chat_messages',
              filter: `session_id=eq.${sessionId}`
            },
            (payload) => {
              const newMessage = payload.new;
              if (newMessage.sender_type === 'support') {
                setMessages(prev => [...prev, {
                  id: newMessage.id,
                  sender: 'support',
                  text: newMessage.message,
                  timestamp: new Date(newMessage.created_at),
                  senderName: 'Suporte'
                }]);
                
                if (!isOpen) {
                  setUnreadCount(prev => prev + 1);
                }
                
                setIsTyping(false);
              }
            }
          )
          .subscribe();
      }
    };

    setupRealtimeChat();

    return () => {
      if (chatChannelRef.current) {
        supabase.removeChannel(chatChannelRef.current);
      }
    };
  }, [userId, userName, isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
      senderName: userName
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    // Salvar mensagem no Supabase
    if (userId) {
      const { data: chatSession } = await supabase
        .from('chat_sessions')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (chatSession) {
        await supabase
          .from('chat_messages')
          .insert({
            session_id: chatSession.id,
            sender_type: 'user',
            message: inputMessage,
            created_at: new Date().toISOString()
          });
      }
    }

    // Simular resposta automática se não houver conexão com suporte real
    setIsTyping(true);
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "support",
        text: "Obrigado pela sua mensagem! Um membro da nossa equipe responderá em breve. Enquanto isso, você pode explorar nossas ferramentas de IA para criar currículos e preparar entrevistas.",
        timestamp: new Date(),
        senderName: "Suporte"
      };
      setMessages(prev => [...prev, autoReply]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 transition-all duration-300 hover:scale-110 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 shadow-2xl border-gray-200 z-50 flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Suporte ao Vivo</h3>
                <p className="text-xs text-white/80">Estamos online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-96">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-gray-900 border border-gray-200 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {message.sender === "support" && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User className="w-3 h-3 text-indigo-600" />
                          </div>
                          <span className="text-xs font-medium text-gray-600">
                            {message.senderName}
                          </span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-indigo-200" : "text-gray-400"
                      }`}>
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="rounded-full w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Pressione Enter para enviar
                </p>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}
