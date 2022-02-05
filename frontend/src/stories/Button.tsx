import { VFC } from 'react'
import './button.css'

type ButtonProps = {
  label: string
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button: VFC<ButtonProps> = ({ primary = false, size = 'medium', backgroundColor, label }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary'
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={{ backgroundColor }}
    >
      {label}
    </button>
  )
}
