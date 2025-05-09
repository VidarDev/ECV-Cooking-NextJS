import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

const BaseLayout = ({
  children,
  className,
  additionalClasses,
  ...props
}: PageLayoutProps & { additionalClasses: string }) => (
  <main
    className={cn('flex flex-col min-h-screen', additionalClasses, className)}
    {...props}
  >
    {children}
  </main>
)

export function PageDefaultLayout({
  children,
  className = '',
  ...props
}: PageLayoutProps) {
  return (
    <BaseLayout
      className={className}
      additionalClasses="pt-0 pb-[48px]"
      {...props}
    >
      {children}
    </BaseLayout>
  )
}

export function PageCustomLayout({
  children,
  className = '',
  ...props
}: PageLayoutProps) {
  return (
    <BaseLayout
      className={className}
      additionalClasses="cards-effect z-20"
      {...props}
    >
      <div className="relative h-[60vh] min-h-[300px]">
        <div className="cards-effect absolute top-0 left-0 w-full -z-10"></div>
      </div>
      <div className="flex flex-col px-4 mx-auto w-full">
        <div className="relative bg-white rounded-t-[2.8vw] mx-auto p-6 pt-12 w-full pb-[80px]">
          {children}
        </div>
      </div>
    </BaseLayout>
  )
}
