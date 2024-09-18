'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { FingerprintIcon } from '@/lib/icons'

export function ProfileAccount() {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <div className="flex min-h-screen flex-col text-black">
      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto max-w-xl px-4 py-8">
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 border border-black">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="mt-3 text-sm font-medium text-gray-600">
                  Admin
                </div>
                <div className="text-3xl font-bold">Catherine Newton</div>
              </div>
              <Separator className="border-black" />
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@cnewton"
                    className="mt-2 border-black px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    New Password
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      id="password"
                      type="password"
                      className="border-black px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
              <Button
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary"
                onClick={() => setShowDialog(true)}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="border border-black px-8 py-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Update Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Enter your old password or scan your fingerprint to update your
              profile.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword" className="text-sm font-medium">
                Old Password
              </Label>
              <Input
                id="oldPassword"
                type="password"
                className="border-black px-3 py-2 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-black" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-600">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="border border-black px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-1 focus:ring-black"
              >
                <FingerprintIcon className="mr-2 h-5 w-5" />
                Scan Fingerprint
              </Button>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="border border-black px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-1 focus:ring-black"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
