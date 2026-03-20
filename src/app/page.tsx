import Navbar from '@/components/Navbar'
import GradientBlobs from '@/components/GradientBlobs'
import Cursor from '@/components/ui/Cursor'
import TopProgressBar from '@/components/ui/TopProgressBar'
import EasterEgg from '@/components/EasterEgg'
import ScrollControllerLoader from '@/components/ScrollControllerLoader'
import LeftPanelLoader from '@/components/LeftPanelLoader'
import About from '@/components/sections/About'
import Berkeley from '@/components/sections/Berkeley'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Currently from '@/components/sections/Currently'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="hidden md:block"><Cursor /></div>
      <TopProgressBar />
      <GradientBlobs />
      <Navbar />
      <EasterEgg />

      <div className="flex h-full w-full">
        {/* Fixed left panel — hidden on mobile */}
        <div className="hidden md:block md:w-[38%] h-full flex-shrink-0">
          <LeftPanelLoader />
        </div>

        {/* Right panel — full width on mobile, 62% on desktop */}
        <div className="w-full md:w-[62%] h-full flex-shrink-0 overflow-hidden">
          <ScrollControllerLoader>
            <About />
            <Currently />
            <Berkeley />
            <Projects />
            <Experience />
            <Contact />
          </ScrollControllerLoader>
        </div>
      </div>
    </div>
  )
}
