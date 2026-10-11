import { describe,it,expect } from 'vitest'
import { runCommand } from '@/lib/terminal'
describe('Stark command simulator',()=>{
 it('shows résumé-backed data',()=>{expect(runCommand('whoami').output).toContain('Akshay S Bharadwaj');expect(runCommand('skills').output).toContain('PyTorch');expect(runCommand('projects').output).toContain('Mysore City Bus');expect(runCommand('contact').output).toContain('akshaysbharadwaj1@gmail.com')})
 it('supports clear and assistant actions without executing shell input',()=>{expect(runCommand('clear').action).toBe('clear');expect(runCommand('sudo jarvis').action).toBe('jarvis');expect(runCommand('rm -rf /').output).toContain('Command not found')})
})