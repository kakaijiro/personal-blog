import iconGithub from '@/assets/images/logo-github.svg'
import iconLinkedin from '@/assets/images/logo-linkedin.svg'
import iconX from '@/assets/images/logo-x.svg'
import iconFrontendMentor from '@/assets/images/logo-frontend-mentor.svg'

interface SocialLink {
  href: string
  src: string
  alt: string
}

const links: SocialLink[] = [
  { href: 'https://www.frontendmentor.io', src: iconFrontendMentor, alt: 'Frontend Mentor' },
  { href: 'https://github.com', src: iconGithub, alt: 'GitHub' },
  { href: 'https://x.com', src: iconX, alt: 'X (Twitter)' },
  { href: 'https://linkedin.com', src: iconLinkedin, alt: 'LinkedIn' },
]

interface SocialIconsProps {
  className?: string
}

export function SocialIcons({ className = '' }: SocialIconsProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map(({ href, src, alt }) => (
        <a
          key={alt}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity"
          aria-label={alt}
        >
          <img src={src} alt={alt} className="w-5 h-5 dark:invert" />
        </a>
      ))}
    </div>
  )
}
