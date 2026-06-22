import ImagePlaceholder from './ImagePlaceholder'

export default function JourneyBanner() {
  return (
    <div className="w-full bg-black overflow-hidden leading-none">
      <ImagePlaceholder label="Your Path to the League" className="w-full max-h-[650px]" aspect="16/7" />
    </div>
  )
}
