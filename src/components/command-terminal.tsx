import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Terminal, ArrowUpRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { runCommand } from '@/lib/terminal'

export function CommandTerminal(){
  const [lines,setLines]=useState([{command:'',output:'STARK COMMAND INTERFACE v10.0\nOperator ASB-10 authenticated.\nRun help to access the command directory.'}])
  const [input,setInput]=useState('')
  const [history,setHistory]=useState<string[]>([])
  const [cursor,setCursor]=useState(0)
  const scroll=useRef<HTMLDivElement>(null)
  const navigate=useNavigate()
  useEffect(()=>{scroll.current?.scrollTo({top:scroll.current.scrollHeight})},[lines])
  function execute(command:string){const result=runCommand(command);if(result.action==='clear')setLines([]);else setLines(old=>[...old,{command,output:result.output}]);setHistory(old=>[...old,command]);setCursor(history.length+1);setInput('');if(result.action==='jarvis')void navigate({to:'/assistant'})}
  return <div className="terminal-tool"><div className="tool-title"><span><Terminal size={16}/> STARK COMMAND TERMINAL</span><div><span className="signal-dot"/> BASH-STYLE SIMULATION <Button size="icon-sm" variant="ghost" aria-label="Clear terminal" title="Clear terminal" onClick={()=>setLines([])}><Trash2 size={14}/></Button></div></div><div className="terminal-output" ref={scroll} role="log" aria-label="Terminal output">{lines.map((line,i)=><div key={i}>{line.command&&<p className="command-echo">asb@stark:~$ <span>{line.command}</span></p>}<pre>{line.output}</pre></div>)}</div><form className="terminal-input" onSubmit={e=>{e.preventDefault();execute(input)}}><label htmlFor="shell-command">asb@stark:~$</label><input id="shell-command" aria-label="Terminal command" autoComplete="off" spellCheck={false} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='ArrowUp'){e.preventDefault();const next=Math.max(0,cursor-1);setCursor(next);setInput(history[next]??'')}if(e.key==='ArrowDown'){e.preventDefault();const next=Math.min(history.length,cursor+1);setCursor(next);setInput(history[next]??'')}}}/><Button type="submit" variant="ghost" size="icon" aria-label="Run command"><ArrowUpRight/></Button></form><div className="terminal-shortcuts">{['help','whoami','skills','projects','contact','sudo jarvis'].map(c=><Button variant="ghost" size="sm" key={c} onClick={()=>execute(c)}>{c}</Button>)}</div></div>
}