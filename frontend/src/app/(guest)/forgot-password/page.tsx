'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import axios from 'axios'

import AuthSessionStatus from '@/components/AuthSessionStatus'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
})

type FormValues = z.infer<typeof formSchema>

const ForgotPasswordPage = () => {
  const [status, setStatus] = useState<string>('')
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await forgotPassword(values)
      setStatus(response.data.status)
    } catch (error) {
      setStatus('')
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response.data.errors
        Object.keys(errors).forEach(key => {
          form.setError(key as keyof FormValues, {
            type: 'manual',
            message: errors[key][0],
          })
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex justify-center">
          <Link href="/">
            <span className="text-2xl font-bold">ReparaTech</span>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </p>

          <AuthSessionStatus className="mb-4" status={status} />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Email Password Reset Link</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
