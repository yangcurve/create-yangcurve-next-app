import { type ReactNode } from 'react'

type ComposeProps = {
  components: ((props: { children: ReactNode }) => JSX.Element)[]
  children: ReactNode
}
export const Compose = ({ components, children }: ComposeProps) => {
  const ComposedComponents = components.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ))
  return <ComposedComponents>{children}</ComposedComponents>
}
