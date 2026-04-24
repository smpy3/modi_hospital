/** Home page: composes all sections into a single “scroll story” landing page. */

import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Doctors } from "@/components/Doctors";
import { Treatments } from "@/components/Treatments";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Doctors />
        <Treatments />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
