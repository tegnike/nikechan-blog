export const CONTACT_EMAIL = 'support@nikechan.com'

export function ContactEmailLink() {
  return <a href={`mailto:${CONTACT_EMAIL}`} className="break-all underline">{CONTACT_EMAIL}</a>
}
