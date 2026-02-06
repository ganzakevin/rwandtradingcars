import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConversations, useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Send, Loader2, MessageCircle } from 'lucide-react';

const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('conversation');
  const { user } = useAuth();
  const { conversations, isLoading: loadingConversations } = useConversations();
  const { messages, isLoading: loadingMessages, sendMessage } = useMessages(selectedId);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    await sendMessage(newMessage.trim());
    setNewMessage('');
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getOtherUser = (conv: typeof selectedConversation) => {
    if (!conv || !user) return null;
    return conv.buyer_id === user.id ? conv.seller : conv.buyer;
  };

  return (
    <DashboardLayout title="Messages">
      <div className="h-[calc(100vh-8rem)]">
        <Card className="h-full flex overflow-hidden">
          {/* Conversations List */}
          <div className={`w-full md:w-80 border-r border-border flex flex-col ${selectedId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Conversations</h2>
            </div>
            <ScrollArea className="flex-1">
              {loadingConversations ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No conversations yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {conversations.map((conv) => {
                    const otherUser = getOtherUser(conv);
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setSearchParams({ conversation: conv.id })}
                        className={`w-full p-4 text-left hover:bg-muted transition-colors ${
                          selectedId === conv.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-medium">
                              {(otherUser?.full_name || 'U')[0]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">
                                {otherUser?.full_name || 'Unknown User'}
                              </p>
                              {conv.unread_count ? (
                                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                  {conv.unread_count}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.car?.name || 'Car inquiry'}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${selectedId ? 'flex' : 'hidden md:flex'}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <button
                    onClick={() => setSearchParams({})}
                    className="md:hidden text-muted-foreground hover:text-foreground"
                  >
                    ←
                  </button>
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {(getOtherUser(selectedConversation)?.full_name || 'U')[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {getOtherUser(selectedConversation)?.full_name || 'Unknown'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.car?.name}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  {loadingMessages ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => {
                        const isOwn = msg.sender_id === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                                isOwn
                                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                                  : 'bg-muted rounded-bl-sm'
                              }`}
                            >
                              <p>{msg.content}</p>
                              <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={sending}
                    />
                    <Button onClick={handleSend} disabled={!newMessage.trim() || sending}>
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
