
import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/types/models';

// Mock chat history for demonstration - in a real app this would come from a database
const mockChatHistory: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      text: "Buenos días, ¿podrías revisar mi solicitud de vacaciones?",
      sender: { id: '1', name: 'Worker Demo' },
      receiver: { id: '2', name: 'HR Manager Demo' },
      timestamp: new Date('2024-04-22T09:00:00')
    },
    {
      id: '2',
      text: "Por supuesto, la revisaré hoy mismo",
      sender: { id: '2', name: 'HR Manager Demo' },
      receiver: { id: '1', name: 'Worker Demo' },
      timestamp: new Date('2024-04-22T09:05:00')
    }
  ]
};

export const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      // Load chat history for current user
      const userHistory = mockChatHistory[user.id] || [];
      setMessages(userHistory);
    }
  }, [user?.id]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: {
        id: user.id,
        name: user.name
      },
      receiver: {
        id: user.role === 'worker' ? '2' : '1', // Mock: workers send to HR, HR sends to worker
        name: user.role === 'worker' ? 'HR Manager Demo' : 'Worker Demo'
      },
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isUserMessage = (message: ChatMessage) => message.sender.id === user?.id;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex flex-col w-80 h-96 bg-background border rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-3 border-b">
            <h3 className="font-semibold">Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-lg p-3",
                    isUserMessage(message) 
                      ? "ml-auto bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  <div className="text-sm opacity-75 mb-1">
                    {isUserMessage(message) ? 'Tú' : message.sender.name}
                  </div>
                  <div>{message.text}</div>
                  <div className="text-xs opacity-50 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe un mensaje..."
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

