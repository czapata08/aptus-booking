import { Header } from "./_components/layout-components"

export default function MarketingRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
