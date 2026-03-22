import Navbar from "@/components/Navbar";
import CompteurExclusivite from "@/components/CompteurExclusivite";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GenerateurMenu from "@/components/GenerateurMenu";
import Chef from "@/components/Chef";
import MenuSignatures from "@/components/MenuSignatures";
import Temoignages from "@/components/Temoignages";
import CalendrierDispo from "@/components/CalendrierDispo";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CompteurExclusivite />
      <Services />
      <GenerateurMenu />
      <Chef />
      <MenuSignatures />
      <Temoignages />
      <CalendrierDispo />
      <Reservation />
      <Footer />
    </main>
  );
}
