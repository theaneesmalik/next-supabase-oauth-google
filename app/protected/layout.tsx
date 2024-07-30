import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
const defaultUrl = `${process.env.NEXT_PUBLIC_URL!}protected`

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }
  return <main className='min-h-screen flex flex-col items-center justify-center'>{children}</main>
}
