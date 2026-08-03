import { Fragment } from 'react'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

export interface KeyboardHintProps {
  keys: string[]
  description: string
}

export function KeyboardHint({ keys, description }: KeyboardHintProps) {
  return (
    <p className="flex items-center gap-1.5 text-xs italic">
      <span>Press</span>
      <KbdGroup>
        {keys.map((key, index) => (
          <Fragment key={key}>
            {index > 0 && <span className="not-italic">+</span>}
            <Kbd variant="click">{key}</Kbd>
          </Fragment>
        ))}
      </KbdGroup>
      <span>{description}</span>
    </p>
  )
}
