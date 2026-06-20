import { SocialIcons } from './SocialIcons'

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-content mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-preset-9 text-text-secondary">
          Made with ❤️ and ☕️ by Paulina
        </p>
        <SocialIcons />
      </div>
    </footer>
  )
}
