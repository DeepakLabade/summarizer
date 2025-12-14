'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({href, classname, children}: {href: string, classname?: string, children: React.ReactNode}) => {

    const pathname = usePathname()
    const isActive = (href === pathname) || (pathname.startsWith(href))

  return (
      <div>
          <Link href={href} className={cn('transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500', classname)}>
            {children}
          </Link>
    </div>
  )
}

export default NavLink