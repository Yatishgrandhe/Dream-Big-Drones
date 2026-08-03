import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva('flight-button', {
  variants: {
    variant: {
      primary: 'flight-button--primary',
      secondary: 'flight-button--secondary',
    },
  },
  defaultVariants: { variant: 'primary' },
})

function Button({ className, variant, asChild = false, ...props }) {
  const Component = asChild ? Slot : 'button'
  return <Component className={cn(buttonVariants({ variant }), className)} {...props} />
}

export { Button }
