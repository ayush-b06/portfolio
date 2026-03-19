import Navbar from '@/components/Navbar'
import GradientBlobs from '@/components/GradientBlobs'
import Cursor from '@/components/ui/Cursor'
import ScrollControllerLoader from '@/components/ScrollControllerLoader'
import LeftPanelLoader from '@/components/LeftPanelLoader'
import About from '@/components/sections/About'
import Berkeley from '@/components/sections/Berkeley'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <Cursor />
      <GradientBlobs />
      <Navbar />

      <div className="flex h-full w-full">
        {/* Fixed left panel — Celsius lives here permanently */}
        <div className="w-[38%] h-full flex-shrink-0">
          <LeftPanelLoader />
        </div>

        {/* Right panel — sections scroll through here */}
        <div className="w-[62%] h-full flex-shrink-0 overflow-hidden">
          <ScrollControllerLoader>
            <About />
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
