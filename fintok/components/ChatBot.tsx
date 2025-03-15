"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Menu, ChevronLeft } from "lucide-react";

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chatbot",
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dummyConversations = [
    "Conversation 1",
    "Conversation 2",
    "Conversation 3",
    "Conversation 4",
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"
          } flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-lg font-semibold ${sidebarOpen ? "block" : "hidden"}`}>
            Conversations
          </h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <ChevronLeft /> : <Menu />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {dummyConversations.map((conv, i) => (
            <div
              key={i}
              className="p-2 hover:bg-gray-700 cursor-pointer text-sm text-center"
            >
              {sidebarOpen ? conv : "💬"}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col p-4 h-full">
        <Card className="w-full max-w-8xl py-0 h-full shadow-lg flex flex-col">
          <CardContent className="p-4 flex flex-col flex-grow min-h-0">
            {/* Chat Messages - Scrollable */}
            <div className="flex-grow overflow-y-auto border p-2 rounded-md space-y-2">
              {messages.map((msg, i) => (
                // Full-width container to stack messages vertically
                <div key={i} className="w-full flex mb-2">
                  {/* Inline-block bubble occupies only as much width as needed */}
                  <div
                    className={`inline-block p-2 rounded-md max-w-[75%] break-words ${msg.role === "user"
                      ? "bg-gray-800 text-white ml-auto"
                      : "bg-gray-300 text-black mr-auto"
                      }`}
                  >
                    <ReactMarkdown
                      components={{
                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mt-4 mb-2">
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 my-2 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 my-2 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        p: ({ children }) => (
                          <p className="mb-2 whitespace-pre-wrap">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => (
                          <code className="bg-gray-800 text-white px-1 rounded break-words whitespace-pre-wrap inline-block max-w-full">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-800 text-white p-3 rounded my-2 overflow-x-auto text-sm">
                            {children}
                          </pre>
                        ),
                      }}
                    >{msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box - Fixed at Bottom */}
            <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
              <Textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 min-h-[40px] max-h-40 overflow-y-auto resize-none"
              />
              <Button type="submit">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
