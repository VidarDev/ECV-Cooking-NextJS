import TransitionLink from '@/components/TransitionLink'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <TransitionLink href="/">Return Home</TransitionLink>
    </div>
  )
}
