import { SubmitButton } from '@/components/submit-button'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function ForgotPassword({ searchParams }: { searchParams: { message: string } }) {
  const forgotPassword = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const supabase = createClient()

    // const { error } = await supabase.auth.resetPasswordForEmail(email)
    const res = await supabase.auth.resetPasswordForEmail(email)
    console.log(res)
    console.log({ msg: res.error?.message })
    // if (error) {
    //   return redirect(`/login?message=${error.message}`)
    // }

    return redirect('/protected')
  }
  return (
    <section className='flex flex-col items-center pt-6'>
      <div className='w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-white'>
            Forget Password
          </h1>

          <form className='space-y-4 md:space-y-6'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-white'>
                Your Email
              </label>
              <input
                type='text'
                name='email'
                id='email'
                className='border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                placeholder='abc@gmail.com'
                required
              />
            </div>

            <SubmitButton
              formAction={forgotPassword}
              pendingText='Submitting...'
              className='w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
            >
              Forget Password
            </SubmitButton>

            <p className='text-sm font-light text-gray-400'>
              Remember password?
              <a className='font-medium hover:underline text-blue-500' href='/login'>
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
