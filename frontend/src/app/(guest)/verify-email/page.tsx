'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<string>('')

  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
  })

  const onClickResend = () => {
    resendEmailVerification().then(response => setStatus(response.data.status))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="flex justify-center">
          <Link href="/">
            <span className="text-2xl font-bold">ReparaTech</span>
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your
            email address by clicking on the link we just emailed to you? If you
            didn&apos;t receive the email, we will gladly send you another.
          </p>

          {status === 'verification-link-sent' && (
            <Alert variant="default">
              <AlertDescription>
                A new verification link has been sent to the email address you
                provided during registration.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <Button onClick={onClickResend}>Resend Verification Email</Button>

            <Button variant="ghost" className="text-sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage
