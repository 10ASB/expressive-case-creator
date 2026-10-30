/** Akshay's birthday: October 9 (month index 9). */
export function isBirthday(date: Date = new Date()): boolean {
  return date.getMonth() === 9 && date.getDate() === 9
}
/** Birthday check on the India calendar date, used server-side for J.A.R.V.I.S. */
export function isBirthdayInIndia(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', month: 'numeric', day: 'numeric' }).formatToParts(date)
  return Number(parts.find(p => p.type === 'month')?.value) === 10 && Number(parts.find(p => p.type === 'day')?.value) === 9
}
export const birthdayPalette = { core: '#FFD700', accent: '#ED1D24', boost: 1.8 }
export function reactorTelemetry(date: Date = new Date()) {
  return isBirthday(date)
    ? { label: 'ARC REACTOR / MARK ASB', status: 'PROTOCOL: ASB-10 ENGAGED', detail: 'OVERCHARGE: 200% (OCTOBER 09 BIRTHDAY)', birthday: true }
    : { label: 'ARC REACTOR / MARK ASB', status: 'CORE STABLE', detail: 'AI · ML · VISION', birthday: false }
}
