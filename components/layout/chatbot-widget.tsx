"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User, Bot, Minimize2, Loader2, Check, ChevronRight, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatAction } from "@/actions/chat"; 
import ReactMarkdown from "react-markdown"; 
import remarkGfm from "remark-gfm";

// --- TYPES ---
type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type UIComponentState = {
  type: 'serviceSelector' | 'pricing' | 'leadConfirmation' | null;
  data: any;
};

// --- COMPONENT 1: SERVICE SELECTOR ---
const ServiceSelector = ({ services, onConfirm, onCancel }: { services: string[], onConfirm: (s: string[]) => void, onCancel: () => void }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelected(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 z-50 bg-[#0c0c12]/95 backdrop-blur-sm p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Select Services</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-white"><X size={20}/></button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => toggleService(service)}
            className={cn(
              "w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group",
              selected.includes(service) 
                ? "bg-indigo-600 border-indigo-500 text-white" 
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            )}
          >
            <span className="text-sm">{service}</span>
            {selected.includes(service) && <Check size={16} />}
          </button>
        ))}
      </div>

      <div className="pt-4 mt-auto">
        <button
          disabled={selected.length === 0}
          onClick={() => onConfirm(selected)}
          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          Confirm Selection <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

// --- COMPONENT 2: SUCCESS VIEW (New) ---
const SuccessView = ({ onClose }: { onClose: () => void }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 z-50 bg-[#0c0c12]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                <Check size={32} className="text-black stroke-[3]" />
            </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">Received!</h3>
        <p className="text-slate-400 mb-8 max-w-[250px]">
            We&apos;ve got your details. We will reach out to you shortly via email.
        </p>

        <button 
            onClick={onClose}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-colors"
        >
            Start New Chat
        </button>
      </motion.div>
    );
};

// --- MAIN WIDGET ---
const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const [showNotification, setShowNotification] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [activeUI, setActiveUI] = useState<UIComponentState>({ type: null, data: null });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      text: "Hi there! 👋 I'm **JumboBot**.\n\nI can help you:\n* Explore Services\n* Check Pricing\n* **Book a Project** (I'll guide you step-by-step!)",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3");
    audioRef.current.volume = 0.5;

    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowNotification(true);
        audioRef.current?.play().catch((e) => console.log("Audio autoplay blocked:", e));
      }
    }, 5000); 

    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const conversationHistory = messages
        .filter((msg, index) => !(index === 0 && msg.sender === 'bot'))
        .map(msg => ({
          role: msg.sender === 'user' ? "user" : "model" as "user" | "model",
          parts: msg.text
        }));

      const response = await chatAction(conversationHistory, text);

      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMsg]);

      if (response.uiComponent) {
        setActiveUI(response.uiComponent as UIComponentState);
      }

    } catch (error) {
      console.error("Chat error", error);
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleServiceSelection = (selectedServices: string[]) => {
    setActiveUI({ type: null, data: null });
    const messageText = `I have selected the following services: ${selectedServices.join(", ")}`;
    handleSendMessage(messageText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
    setHasInteracted(true);
  };

  // --- NEW HANDLER FOR SUCCESS CLOSING ---
  const handleCloseSuccess = () => {
    setActiveUI({ type: null, data: null }); // Unlocks the input
    // Optional: Reset chat history if you want a fresh start
    // setMessages([ ...initialMessage ]); 
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
        
        {/* --- NOTIFICATION BUBBLE --- */}
        <AnimatePresence>
          {showNotification && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white text-black p-4 rounded-xl shadow-xl mb-2 relative max-w-[250px] border border-indigo-100"
            >
              <button 
                onClick={() => {
                    setShowNotification(false);
                    setHasInteracted(true);
                }}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
              >
                <X size={14} />
              </button>
              
              <div className="flex gap-3 items-start">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-white"/>
                 </div>
                 <div>
                    <h4 className="font-bold text-sm">Hey there! 👋</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                        Ready to grow your business? Let&apos;s chat!
                    </p>
                 </div>
              </div>
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-b border-r border-indigo-100"></div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* --- CHAT WINDOW --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "bg-[#0c0c12] border border-white/10 shadow-2xl flex flex-col overflow-hidden relative",
                "fixed inset-0 sm:inset-auto sm:static sm:w-[380px] sm:h-[600px] md:h-[75vh] sm:rounded-2xl"
              )}
            >
              {/* --- CUSTOM UI LAYER --- */}
              <AnimatePresence>
                {/* 1. Service Selector */}
                {activeUI.type === 'serviceSelector' && (
                    <ServiceSelector 
                        services={activeUI.data || ["Web Dev", "SEO", "Design"]}
                        onConfirm={handleServiceSelection}
                        onCancel={() => setActiveUI({ type: null, data: null })}
                    />
                )}

                {/* 2. Success View (Fixes the disabled input issue) */}
                {activeUI.type === 'leadConfirmation' && (
                    <SuccessView onClose={handleCloseSuccess} />
                )}
              </AnimatePresence>
              
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0c0c12] rounded-full"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">JumboBot</h3>
                    <p className="text-xs text-indigo-300">Powered by Gemini AI</p>
                  </div>
                </div>
                
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <span className="sm:hidden"><Minimize2 size={20} /></span>
                  <span className="hidden sm:block"><X size={20} /></span>
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-[#0c0c12]">
                {messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                          msg.sender === 'user' ? "bg-slate-700" : "bg-indigo-600/20"
                    )}>
                        {msg.sender === 'user' ? <User size={14} className="text-slate-300"/> : <Bot size={16} className="text-indigo-400"/>}
                    </div>

                    <div className={cn(
                        "p-3 rounded-2xl text-sm overflow-hidden", 
                        msg.sender === 'user' 
                            ? "bg-indigo-600 text-white rounded-tr-none" 
                            : "bg-white/10 text-slate-200 rounded-tl-none border border-white/5"
                    )}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                ul: ({children}) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                                ol: ({children}) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                                li: ({children}) => <li className="pl-1">{children}</li>,
                                a: ({children, href}) => (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline break-all">
                                        {children}
                                    </a>
                                ),
                                strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>,
                                code: ({ node, className, children, ...props }: any) => {
                                    const match = /language-(\w+)/.exec(className || '')
                                    const isInline = !match && !String(children).includes('\n');
                                    return isInline ? (
                                        <code className="bg-black/30 px-1 py-0.5 rounded text-xs font-mono text-indigo-200" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <div className="relative my-3 rounded-md overflow-hidden bg-black/50 border border-white/10">
                                            <div className="px-3 py-1 bg-white/5 border-b border-white/5 text-[10px] text-slate-400 font-mono">
                                                {match ? match[1] : 'code'}
                                            </div>
                                            <pre className="p-3 overflow-x-auto">
                                                <code className="text-xs font-mono text-slate-300 whitespace-pre" {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        </div>
                                    )
                                }
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0 mt-1">
                          <Loader2 size={16} className="text-indigo-400 animate-spin"/>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 text-xs text-slate-400 italic">
                          JumboBot is thinking...
                      </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length < 3 && !activeUI.type && (
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                    {["Services?", "Pricing info", "Consult with us"].map(chip => (
                        <button key={chip} onClick={() => handleSendMessage(chip)} className="text-xs whitespace-nowrap bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/50 text-slate-300 hover:text-indigo-300 px-3 py-1.5 rounded-full transition-colors">
                            {chip}
                        </button>
                    ))}
                  </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-[#0c0c12] border-t border-white/10">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping || !!activeUI.type} 
                    placeholder={activeUI.type ? "Please select an option above..." : "Type a message..."}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500 disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping || !!activeUI.type}
                    className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/10 disabled:text-slate-500 text-white rounded-full transition-all"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          className={cn(
            "group relative p-4 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 z-[9999]",
            isOpen ? "bg-white text-black rotate-90" : "bg-indigo-600 text-white"
          )}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} className="fill-white" />}
          
          {!isOpen && (
             <span className="absolute top-0 right-0 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
             </span>
          )}
        </button>
      </div>
    </>
  );
};

export default ChatbotWidget;