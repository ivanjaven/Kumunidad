import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { BLOG_CONFIG } from '@/lib/config/BLOG_CONFIG'
import { useBarangayOfficialForm } from '@/lib/hooks/useBarangayOfficialForm'
import { BlogFormTypedef } from '@/lib/typedef/blog-form-typedef'
import { BlogFormSection } from '@/components/blog-custom-form-section'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export function BlogCustomForm({
  officials,
  kagawads,
  lupons,
  tanods,
  skOfficials,
  skKagawads,
  startYear,
  endYear,
  termsAccepted,
  setOfficials,
  setKagawads,
  setLupons,
  setTanods,
  setSkOfficials,
  setSkKagawads,
  setStartYear,
  setEndYear,
  setTermsAccepted,
  closeDialog,
}: BlogFormTypedef) {
  const { handleSubmit, handleClear } = useBarangayOfficialForm({
    officials,
    kagawads,
    lupons,
    tanods,
    skOfficials,
    skKagawads,
    startYear,
    endYear,
    termsAccepted,
    setOfficials,
    setKagawads,
    setLupons,
    setTanods,
    setSkOfficials,
    setSkKagawads,
    setStartYear,
    setEndYear,
    setTermsAccepted,
    closeDialog,
  })

  return (
    <div className="max-h-[70vh] overflow-y-auto p-6">
      <div className="space-y-12">
        {BLOG_CONFIG.SECTIONS.map((section, index) => (
          <div key={section.key}>
            <BlogFormSection
              title={section.title}
              infoText={section.infoText}
              officials={
                section.key === 'EXECUTIVE'
                  ? officials
                  : section.key === 'BARANGAY_KAGAWAD'
                    ? kagawads
                    : section.key === 'LUPONG_TAGAPAMAYAPA'
                      ? lupons
                      : section.key === 'SK_EXECUTIVE'
                        ? skOfficials
                        : section.key === 'SK_KAGAWAD'
                          ? skKagawads
                          : tanods
              }
              setOfficials={
                section.key === 'EXECUTIVE'
                  ? setOfficials
                  : section.key === 'BARANGAY_KAGAWAD'
                    ? setKagawads
                    : section.key === 'LUPONG_TAGAPAMAYAPA'
                      ? setLupons
                      : section.key === 'SK_EXECUTIVE'
                        ? setSkOfficials
                        : section.key === 'SK_KAGAWAD'
                          ? setSkKagawads
                          : setTanods
              }
              sectionKey={section.key}
            />
            {index < BLOG_CONFIG.SECTIONS.length - 1 && (
              <Separator className="my-12" />
            )}
          </div>
        ))}
      </div>
      {/* Rest of the component remains the same */}
      <Separator className="my-12" />
      <div className="mb-8 flex flex-col gap-8">
        <div className="w-full">
          <p className="mb-6 text-gray-700">{BLOG_CONFIG.TERM_INFO_TEXT}</p>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full md:w-1/2">
            <Label
              htmlFor="startYear"
              className="text-sm font-medium text-gray-900"
            >
              Starting Year
            </Label>
            <Input
              id="startYear"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Enter starting year"
              className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-1/2">
            <Label
              htmlFor="endYear"
              className="text-sm font-medium text-gray-900"
            >
              Ending Year
            </Label>
            <Input
              id="endYear"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="Enter ending year"
              className="mt-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center">
          <Checkbox
            id="terms"
            className="mr-2"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <Label
            htmlFor="terms"
            className="flex items-center space-x-1 text-sm font-medium text-gray-700"
          >
            <span>{BLOG_CONFIG.TERMS_AND_CONDITIONS.TEXT}</span>
            <HoverCard>
              <HoverCardTrigger>
                <p className="cursor-pointer text-blue-500 underline">
                  {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <h3 className="text-lg font-semibold">
                  {BLOG_CONFIG.TERMS_AND_CONDITIONS.LINK_TEXT}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {BLOG_CONFIG.TERMS_AND_CONDITIONS.CONTENT}
                </p>
              </HoverCardContent>
            </HoverCard>
          </Label>
        </div>
      </div>
      <div className="flex justify-end gap-4 p-6">
        <Button variant="outline" onClick={handleClear}>
          Reset
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  )
}
