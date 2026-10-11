export const identity = {
  name: 'Akshay S Bharadwaj',
  email: 'a90361967@gmail.com',
  linkedin: 'https://www.linkedin.com/in/akshay-s-bharadwaj-71979b311/',
  github: 'https://github.com/10ASB',
}
export function contactMailto(name: string, email: string, message: string) {
  return `mailto:${identity.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`
}
