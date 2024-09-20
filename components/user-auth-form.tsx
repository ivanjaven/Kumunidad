'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { FingerprintIcon } from 'lucide-react'
import { useRouter } from 'next/navigation' // Import the useRouter hook
import Cookies from 'js-cookie'

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

type UserFormValue = z.infer<typeof formSchema>

export function UserAuthForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const { token } = await response.json()

        Cookies.set('token', token)

        router.push('/')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Error logging in:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        className="border border-black px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-1 focus:ring-black"
      >
        <FingerprintIcon className="mr-2 h-5 w-5" />
        Scan Fingerprint
      </Button>
    </>
  )
}
