import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation'
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message'
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from '@/components/ai-elements/prompt-input'
import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ai-elements/reasoning'
import { Shimmer } from '@/components/ai-elements/shimmer'

export function JarvisChat(){
  const [input,setInput]=useState('')
  const [failure,setFailure]=useState('')
  const field=useRef<HTMLTextAreaElement>(null)
  const transport=useMemo(()=>new DefaultChatTransport({api:'/api/public/jarvis'}),[])
  const {messages,status,sendMessage,stop,setMessages}=useChat({transport,onError:e=>setFailure(e.message)})
  const busy=status==='submitted'||status==='streaming'
  useEffect(()=>{if(!busy && (!document.activeElement || document.activeElement===document.body || document.activeElement.closest('.jarvis-tool')))field.current?.focus()},[busy])
  function send(text:string){if(!text.trim()||busy)return;setFailure('');setInput('');void sendMessage({text});field.current?.focus()}
  return <div className="jarvis-tool"><div className="tool-title"><span><span className="mini-reactor"/> J.A.R.V.I.S. // ASK AKSHAY</span><Button size="icon-sm" variant="ghost" aria-label="Reset conversation" title="Reset conversation" disabled={busy} onClick={()=>{setMessages([]);setFailure('');field.current?.focus()}}><RotateCcw size={15}/></Button></div><Conversation className="jarvis-conversation"><ConversationContent>{messages.length===0?<div className="jarvis-empty"><div className="jarvis-emblem"><span/></div><span className="eyebrow">PERSONAL INTELLIGENCE INTERFACE</span><h2>At your service.</h2><p>What would you like to know about Akshay?</p><div className="suggestions">{['What is Akshay’s background?','Tell me about his projects','What are his technical skills?','Is Akshay available for an internship?'].map(q=><Button variant="outline" key={q} onClick={()=>send(q)}>{q}<ArrowUpRight size={14}/></Button>)}</div></div>:messages.map(m=><Message key={m.id} from={m.role}><span className="message-label">{m.role==='user'?'VISITOR':'J.A.R.V.I.S.'}</span><MessageContent>{m.parts.map((p,i)=>p.type==='text'?<MessageResponse key={i}>{p.text}</MessageResponse>:p.type==='reasoning'?<Reasoning key={i} defaultOpen={false} isStreaming={busy&&m.id===messages.at(-1)?.id}><ReasoningTrigger/><ReasoningContent>{p.text}</ReasoningContent></Reasoning>:null)}</MessageContent></Message>)}{status==='submitted'&&<Shimmer>Consulting Akshay’s dossier…</Shimmer>}</ConversationContent><ConversationScrollButton/></Conversation>{failure&&<p role="alert" className="chat-error">{failure}</p>}<div className="jarvis-composer"><PromptInput onSubmit={({text})=>send(text)}><PromptInputTextarea ref={field} aria-label="Ask J.A.R.V.I.S." placeholder="Ask about skills, projects, or the person behind the code…" value={input} onChange={e=>setInput(e.target.value)}/><PromptInputFooter><span className="composer-status">{busy?'PROCESSING QUERY':'ENCRYPTED AESTHETIC / SESSION ONLY'}</span><PromptInputSubmit status={status} onStop={()=>void stop()} disabled={!busy&&!input.trim()}/></PromptInputFooter></PromptInput></div></div>
}