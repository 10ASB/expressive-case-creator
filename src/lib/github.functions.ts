import { createServerFn } from '@tanstack/react-start'
export const getGithubActivity = createServerFn({method:'GET'}).handler(async()=>{
  const headers = {'Accept':'application/vnd.github+json','User-Agent':'ASB-Portfolio'}
  const responses = await Promise.all([fetch('https://api.github.com/users/10ASB',{headers}),fetch('https://api.github.com/users/10ASB/repos?per_page=100&sort=updated',{headers}),fetch('https://api.github.com/users/10ASB/events/public?per_page=5',{headers})])
  if(responses.some(r=>!r.ok)) return {ok:false as const,message:'GitHub telemetry is temporarily unavailable. View the public profile.'}
  const [user,repos,events] = await Promise.all(responses.map(r=>r.json()))
  return {ok:true as const,repos:Number(user.public_repos),followers:Number(user.followers),stars:repos.reduce((n:number,r:{stargazers_count:number})=>n+r.stargazers_count,0),events:events.map((e:{id:string;type:string;repo:{name:string};created_at:string})=>({id:e.id,type:e.type.replace('Event',''),repo:e.repo.name,date:e.created_at})) as {id:string;type:string;repo:string;date:string}[]}
})