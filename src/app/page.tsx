import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Chef from "@/components/Chef";
import MenuSignatures from "@/components/MenuSignatures";
import Temoignages from "@/components/Temoignages";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Chef />
      <MenuSignatures />
      <Temoignages />
      <Reservation />
      <Footer />
    </main>
  );
}
