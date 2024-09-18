'use client'
import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'

export default function Component() {
  const [activeSection, setActiveSection] = useState('privacy-policy')

  const privacyPolicyContent = [
    {
      title: 'Information Collection',
      content:
        'We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.',
    },
    {
      title: 'Use of Information',
      content:
        'We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users.',
    },
    {
      title: 'Information Sharing',
      content:
        'We do not share personal information with companies, organizations, or individuals outside of our company except in the following cases: with your consent, for external processing, for legal reasons.',
    },
  ]

  const termsContent = [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.',
    },
    {
      title: 'Description of Service',
      content:
        'We provide users with access to a rich collection of resources, including various communications tools, forums, shopping services, search services, personalized content and branded programming through its network of properties.',
    },
    {
      title: 'Modifications to Service',
      content:
        'We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice to the user.',
    },
  ]

  return (
    <div className="min-h-screen bg-white p-4 text-black sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="border-b border-gray-200 p-6 md:w-64 md:border-b-0 md:border-r">
            <h2 className="mb-6 text-2xl font-bold uppercase tracking-wide">
              Legal & Privacy
            </h2>
            <nav>
              <ul className="space-y-4">
                <li>
                  <button
                    className={`w-full p-2 text-left transition-colors ${
                      activeSection === 'privacy-policy'
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveSection('privacy-policy')}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full p-2 text-left transition-colors ${
                      activeSection === 'terms'
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveSection('terms')}
                  >
                    Terms and Agreement
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-12">
            <h1 className="mb-8 text-4xl font-bold uppercase tracking-wide">
              {activeSection === 'privacy-policy'
                ? 'Privacy Policy'
                : 'Terms and Agreement'}
            </h1>
            <Separator className="my-8 bg-gray-200" />
            <Accordion type="single" collapsible className="w-full">
              {activeSection === 'privacy-policy'
                ? privacyPolicyContent.map((item, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-b border-gray-200 py-4"
                    >
                      <AccordionTrigger className="text-lg font-semibold">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 text-gray-700">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                : termsContent.map((item, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-b border-gray-200 py-4"
                    >
                      <AccordionTrigger className="text-lg font-semibold">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 text-gray-700">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
