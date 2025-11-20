import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">FedPruning Research Group</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Department of Computer Science<br />
              City University of Hong Kong<br />
              Kowloon, Hong Kong SAR
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Quick Links</h3>
            <div className="space-y-2">
              <div>
                <Link
                  href="/publications"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Publications
                </Link>
              </div>
              <div>
                <Link
                  href="/members"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Team Members
                </Link>
              </div>
              <div>
                <Link
                  href="/join"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Join Us
                </Link>
              </div>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">Resources</h3>
            <div className="space-y-2">
              <div>
                <a
                  href="https://github.com/FedPruning/FedPruning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  GitHub Repository
                </a>
              </div>
              <div>
                <a
                  href="https://honghuangs-organization.gitbook.io/fedpruning-documents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} FedPruning Research Group, City University of Hong Kong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}