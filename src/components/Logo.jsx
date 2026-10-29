/** Single place that renders the logo (/public/logo.png). */
export default function Logo({ className = 'h-10 w-auto' }) {
  return <img src="/logo.png" alt="ZGDC–CASPAM logo" className={className} />
}
