import {useState} from "react";
import ChatBox from "./ChatBox";
import { MessageCircleIcon, XCircle } from "lucide-react";
import { Button } from "./ui/button";

export const ChatBoxButton = () => {
    const [chatBoxopen, setChatBoxOpen]= useState(false);

  return (
    <div className="fixed bottom-5 right-6" >
    <Button className="rounded-full" >
       {chatBoxopen?<XCircle onClick={()=>setChatBoxOpen(false)}/>: <MessageCircleIcon onClick={()=> setChatBoxOpen(true)}/>  }
    </Button>
    <ChatBox open={chatBoxopen} onClose={()=>setChatBoxOpen(false)}/>
    </div>
  )
}
