export default function AccountPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  return <h1>AccountPage</h1>
}
