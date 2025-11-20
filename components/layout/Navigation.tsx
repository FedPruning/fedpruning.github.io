'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'News', href: '/news' },
  { name: 'Publications', href: '/publications' },
  { name: 'Members', href: '/members' },
  { name: 'Join us', href: '/join' },
  { name: 'Code', href: 'https://github.com/FedPruning/FedPruning', external: true },
  { name: 'Documents', href: 'https://honghuangs-organization.gitbook.io/fedpruning-documents', external: true },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActivePath = (href: string) => {
    const normalizedPathname = pathname.replace(/\/$/, '') || '/'
    const normalizedHref = href.replace(/\/$/, '') || '/'
    return normalizedPathname === normalizedHref
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/image/logo-square.png"
              alt="FedPruning Logo"
              width={46}
              height={46}
              priority
              style={{ height: '46px', width: '46px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2 flex-1 justify-end">
            {navLinks.map((link) => {
              const isActive = !link.external && isActivePath(link.href)
              
              if (link.external) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </a>
                )
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = !link.external && isActivePath(link.href)
              
              if (link.external) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              }
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}