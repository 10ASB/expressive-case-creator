import { identity } from './identity'
import { dossier, skillGroups } from './dossier'
import { portfolioProjects } from './projects'
export function runCommand(raw: string): {output:string; action?:'clear'|'jarvis'} {
  const command = raw.trim().toLowerCase()
  switch(command) {
    case 'help': return {output:'AVAILABLE COMMANDS\nhelp        Command directory\nwhoami      Operator identity\nskills      Technical specifications\nprojects    Field deployments\ncontact     Comms coordinates\nclear       Clear terminal\nsudo jarvis Activate assistant'}
    case 'whoami': return {output:`${identity.name}\n${dossier.title}\nB.E. AI & ML · 2024–2028\nMysore University School of Engineering\n${dossier.location}`}
    case 'skills': return {output:skillGroups.map(g=>`${g.name.toUpperCase()}\n${g.skills.join(' · ')}`).join('\n\n')}
    case 'projects':return {output:portfolioProjects.map((p,i)=>`0${i+1} ${p.name}\n   ${p.liveUrl ?? p.githubUrl ?? 'Project dossier available in Field Deployments'}`).join('\n\n')}
    case 'contact':return {output:`EMAIL    ${identity.email}\nGITHUB   ${identity.github}\nLINKEDIN ${identity.linkedin}`}
    case 'clear':return {output:'',action:'clear'}
    case 'sudo jarvis':return {output:'J.A.R.V.I.S. protocol activated. Opening intelligence interface…',action:'jarvis'}
    case '':return {output:''}
    default:return {output:`Command not found: ${raw.trim()}\nRun help for available commands.`}
  }
}