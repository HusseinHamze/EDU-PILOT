import Hero from "./Hero.jsx"
import Hiw from "./Hiw.jsx"
import Features from "./Features.jsx";
import Faq from "./Faq.jsx";
import Testimonials from "./Testimonials.jsx";
import Cta from "./Cta.jsx";

// Define a full-page section style
const fullPageSection = {
  minHeight: "100vh", // Each section takes up the full viewport height
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Vertically center content
  alignItems: "center", // Horizontally center content
  width: "100%", // Full width
  padding: "20px", // Add some padding
};

export default function HomeBody() {

  return (
    <>
    {/* Apply the full-page style to each section */}
    <section style={fullPageSection}><Hero /></section>
    <section style={fullPageSection}><Hiw /></section>
    <section style={fullPageSection}><Features /></section>
    <section style={fullPageSection}><Faq /></section>
    <section style={fullPageSection}><Testimonials /></section>
    <section style={fullPageSection}><Cta /></section>
  </>
  );
}
