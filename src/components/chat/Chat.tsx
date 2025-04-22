
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
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
                    "flex max-w-[80%] rounded-lg p-3",
                    message.sender === 'user' 
                      ? "ml-auto bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {message.text}
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
