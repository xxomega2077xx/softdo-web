import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureShowcase } from './components/FeatureShowcase';
import { ProductShowcase } from './components/ProductShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { Stats } from './components/Stats';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import './i18n';

function App() {
  return (
    <div className="min-h-screen text-white selection:bg-indigo-500/30">
      <SpeedInsights />
      <Analytics />
      <CustomCursor />
      <Navbar />
      <Hero />
      <ProductShowcase />
      <FeatureShowcase />
      <WorkflowSection />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
