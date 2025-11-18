import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              FedPruning Team<br />
              Research Group<br />
              Federated Learning & Model Compression<br />
              Stanford University
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2">
              <div>
                <a
                  href="mailto:contact@fedpruning.org"
                  className="text-[#C0165F] hover:text-[#a00d4a] transition-colors text-sm flex items-center gap-2"
                >
                  <span>✉</span> Contact via email
                </a>
              </div>
              <div>
                <Link
                  href="/join"
                  className="text-[#C0165F] hover:text-[#a00d4a] transition-colors text-sm flex items-center gap-2"
                >
                  <span>→</span> Use this site as template
                </Link>
              </div>
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-2">
              <div>
                <a
                  href="https://github.com/FedPruning/FedPruning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C0165F] hover:text-[#a00d4a] transition-colors text-sm"
                >
                  GitHub Repository
                </a>
              </div>
              <div>
                <a
                  href="https://honghuangs-organization.gitbook.io/fedpruning-documents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C0165F] hover:text-[#a00d4a] transition-colors text-sm"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-gray-600 text-sm">
            © 2025 FedPruning Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
