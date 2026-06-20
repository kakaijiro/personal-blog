import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import iconWarning from '@/assets/images/icon-warning.svg'
import iconTip from '@/assets/images/icon-tip.svg'
import iconInfo from '@/assets/images/icon-info.svg'
import iconError from '@/assets/images/icon-error.svg'
import iconSuccess from '@/assets/images/icon-success.svg'

interface CalloutConfig {
  icon: string
  borderColor: string
  bgColor: string
  label: string
}

const calloutMap: Record<string, CalloutConfig> = {
  Warning: { icon: iconWarning, borderColor: 'border-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-950/20', label: 'Warning' },
  Tip: { icon: iconTip, borderColor: 'border-green-400', bgColor: 'bg-green-50 dark:bg-green-950/20', label: 'Tip' },
  Information: { icon: iconInfo, borderColor: 'border-blue-400', bgColor: 'bg-blue-50 dark:bg-blue-950/20', label: 'Information' },
  Error: { icon: iconError, borderColor: 'border-red-400', bgColor: 'bg-red-50 dark:bg-red-950/20', label: 'Error' },
  Success: { icon: iconSuccess, borderColor: 'border-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/20', label: 'Success' },
}

function detectCalloutType(text: string): string | null {
  for (const key of Object.keys(calloutMap)) {
    if (text.startsWith(`**${key}:`)) return key
    if (text.startsWith(`**${key}:**`)) return key
  }
  return null
}

const components: Components = {
  blockquote({ children }) {
    const childText = String(children)
    const calloutType = detectCalloutType(childText)

    if (calloutType) {
      const cfg = calloutMap[calloutType]
      return (
        <div className={`flex gap-3 p-4 rounded-lg border-l-4 ${cfg.borderColor} ${cfg.bgColor} my-4 not-prose`}>
          <img src={cfg.icon} alt={cfg.label} className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="text-preset-8 text-text-secondary prose-sm max-w-none">
            {children}
          </div>
        </div>
      )
    }

    return (
      <blockquote className="border-l-4 border-accent bg-bg-secondary pl-4 py-2 pr-4 rounded-r-lg my-4 italic text-text-secondary">
        {children}
      </blockquote>
    )
  },

  code({ className, children, ...props }) {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="font-mono text-sm bg-bg-secondary text-text-primary px-1.5 py-0.5 rounded border border-border"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={`${className ?? ''} font-mono`} {...props}>
        {children}
      </code>
    )
  },

  pre({ children }) {
    return (
      <pre className="bg-bg-secondary border border-border rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono">
        {children}
      </pre>
    )
  },

  table({ children }) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    )
  },

  th({ children }) {
    return (
      <th className="text-left px-3 py-2 border-b-2 border-border text-text-primary font-semibold">
        {children}
      </th>
    )
  },

  td({ children }) {
    return (
      <td className="px-3 py-2 border-b border-border text-text-secondary">
        {children}
      </td>
    )
  },

  h1({ children }) {
    return <h1 className="text-preset-2 text-text-primary font-extrabold mt-8 mb-4">{children}</h1>
  },
  h2({ children }) {
    return <h2 className="text-preset-4 text-text-primary font-bold mt-8 mb-3">{children}</h2>
  },
  h3({ children }) {
    return <h3 className="text-preset-5 text-text-primary font-semibold mt-6 mb-2">{children}</h3>
  },
  h4({ children }) {
    return <h4 className="text-preset-6 text-text-primary font-medium mt-4 mb-2">{children}</h4>
  },

  p({ children }) {
    return <p className="text-preset-7 text-text-secondary mb-4 leading-relaxed">{children}</p>
  },

  ul({ children }) {
    return <ul className="list-disc list-outside pl-6 mb-4 space-y-1 text-preset-7 text-text-secondary">{children}</ul>
  },

  ol({ children }) {
    return <ol className="list-decimal list-outside pl-6 mb-4 space-y-1 text-preset-7 text-text-secondary">{children}</ol>
  },

  li({ children }) {
    return <li className="text-text-secondary">{children}</li>
  },

  hr() {
    return <hr className="border-border my-8" />
  },

  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-accent hover:opacity-80 underline underline-offset-2 transition-opacity"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },

  strong({ children }) {
    return <strong className="font-semibold text-text-primary">{children}</strong>
  },

  em({ children }) {
    return <em className="italic text-text-secondary">{children}</em>
  },
}

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
