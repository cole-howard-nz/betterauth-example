import { SettingsDialog } from "@/components/settings-dialog"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session){
    return <div>Not authenticated</div>
  }

  return (
    <div className="flex h-svh items-center justify-center">
      <SettingsDialog />
    </div>
  )
}

export default Page
