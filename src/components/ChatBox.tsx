import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { Trash,Send, Edit } from "lucide-react";

import { Message } from "ai";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { Separator } from "./ui/separator";

interface ChatBoxProps {
  open: boolean;
  onClose: () => void;
}
export default function ChatBox({ open, onClose }: ChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(scrollRef.current){
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  },[messages])

  useEffect(()=>{
    if(open){
        inputRef.current?.focus();
    }
  },[open])
  const lastMessageIsUser = messages[messages.length -1]?.role==="user";

  return (
    <div
      className={cn(
        "flex h-[640px] w-[340px] md:h-[840px] md:w-[900px] lg:w-[1870px] m-auto flex-col rounded-xl bg-background border shadow-xl right-0 bottom-16 X",
        open ? "absolute" : "hidden"
      )}
    >
        <div className="flex">
        <h1 className="p-3 ">Chat Widget</h1>
        <div className="absolute right-3 top-3">
        <Button
            title="clear chat"
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8"
            type="button"
            
            onClick={()=> setMessages([])}
            >
                <Edit className="h-5"/>
            </Button>
            </div>
        
     
        
      </div>
      <Separator className="my-2 bg-white"/>
        <div className="h-full mt-3 px-3 overflow-y-auto " ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage message={{
                role:"assistant",
                content: "Thinking..."
            }}/>
          )}
          {error && (
            <ChatMessage message={{
                role: "assistant",
                content: "Something went wrong! Please try again."
            }}/>
          )}
          {!error && messages.length === 0 && (
            
                <ChatMessage message={{
                role: "assistant",
                content: "Hey there! How can I help you?"
            }}/>
            
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-2">
            
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something.."
            ref={inputRef}
            className="text-white bg-black"
          />
          <Button className="rounded-full" type="submit"><Send/></Button>
        </form>
      </div>
    
  );
}

function ChatMessage({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {
    const user = "user";
    const isAiMessage = role === "assistant";
    
  return (
    <div className={cn("mb-3 flex items-center", isAiMessage ? "justify-start me-5": "justify-end ms-5")}>
      
      <p className={cn("whitespace-pre-line rounded-lg border px-3 py-2", isAiMessage ? " bg-background ": "bg-primary text-primary-foreground")}>{content}</p>
      </div>
    
  );
}
