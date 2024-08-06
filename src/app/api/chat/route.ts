
import openai, { getEmbedding } from "@/lib/openai";
import {OpenAIStream, StreamingTextResponse} from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-6);

    

    const systemMessage: ChatCompletionMessage={
        role:"assistant",
        content : "You are an intelligent chatbot",
        refusal: ""
    };

    const response = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        stream: true,
        messages: [systemMessage,...messagesTruncated]
    })

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server srror" }, { status: 500 });
  }
}
