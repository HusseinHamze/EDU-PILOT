import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Is Edu-Pilot free to use?",
    answer: "Yes, Edu-Pilot is completely free for students exploring their career paths.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer: "While no system is perfect, our AI is trained on real academic and personality data for strong guidance.",
  },
  {
    question: "Can I retake the questionnaire?",
    answer: "Absolutely! You can retake the assessment any time to refine your results.",
  },
];

export default function HomeBody() {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center px-8 py-20 max-w-6xl mx-auto gap-12">
        {/* Text Section */}
        <div className="basis-1/2 shrink-0 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Choose the Right <span className="text-[#0E1C36]">College Major</span>
            <br /> for You
          </h1>
          <p className="text-lg text-gray-700">
            Edu-Pilot helps guide high school students and graduates in finding
            the major that fits their interests and strengths best. Make your
            decision with confidence.
          </p>
          <button className="px-6 py-2 rounded-lg font-medium bg-[#0E1C36] text-white hover:bg-[#142c5e]">
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="basis-1/2 shrink-0 flex justify-center">
          <img
            src="/Hero.png"
            alt="Student with laptop and signs"
            className="w-full max-w-[500px] object-contain"
          />
        </div>
      </main>

      {/* How It Works Section */}
      <section className="text-[#0E1C36] body-font">
        <div className="max-w-7xl w-full px-6 sm:px-8 py-24 mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-12 text-[#0E1C36] text-center">How It Works</h1>
          <div className="flex flex-col lg:flex-row items-center w-full">
            <div className="lg:w-2/5 md:w-full md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-[#0E1C36] pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 1</h2>
                  <p className="leading-relaxed text-gray-600">Answer a series of carefully designed questions to help the AI understand your strengths and interests.</p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-[#0E1C36] pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M12 4h9" />
                    <path d="M4 9h16" />
                    <path d="M4 15h16" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 2</h2>
                  <p className="leading-relaxed text-gray-600">Our AI analyzes your profile using advanced algorithms to match your personality with ideal college majors.</p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0E1C36] inline-flex items-center justify-center text-white relative z-10">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-[#0E1C36] mb-1 tracking-wider">STEP 3</h2>
                  <p className="leading-relaxed text-gray-600">Receive personalized recommendations and explore paths that align with your goals and strengths.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 md:w-full w-full flex justify-center mt-12 lg:mt-0">
              <img className="max-w-[500px] w-full h-auto object-contain rounded-lg" src="/steps.png" alt="step" />
            </div>
          </div>
        </div>
      </section>




       {/* Features Section */}
       <section className="max-w-6xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0E1C36] rounded-2xl shadow-md p-6">
            <h3 className="text-xl text-[#AFCBFF] font-semibold mb-2">AI-Powered Suggestions</h3>
            <p className="text-gray-600">Intelligent recommendations based on your answers and personality.</p>
          </div>
          <div className="bg-[#0E1C36]  rounded-2xl shadow-md p-6">
            <h3 className="text-xl text-[#AFCBFF] font-semibold mb-2">User-Friendly Interface</h3>
            <p className="text-gray-600">Easy to navigate and designed for students of all backgrounds.</p>
          </div>
          <div className="bg-[#0E1C36]  rounded-2xl shadow-md p-6">
            <h3 className="text-xl text-[#AFCBFF] font-semibold mb-2">Expert Insights</h3>
            <p className="text-gray-600">Curated content and advice from career counselors and educators.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#0E1C36] text-white p-6 rounded-2xl shadow-md transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center text-left"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg text-[#AFCBFF] font-semibold">{faq.question}</h3>
              <span className="text-[#AFCBFF] text-xl font-bold">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-300 transition-opacity duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>

      {/* Testimonials Section */}
      <section className="text-[#0E1C36] body-font">
        <div className="container px-6 sm:px-8 py-24 mx-auto">
          <h1 className="text-3xl font-medium title-font text-[#0E1C36] mb-12 text-center">Testimonials</h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full p-8 rounded-lg bg-[#E6F0FF]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-[#0E1C36] mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-[#0E1C36] mb-6">"Edu-Pilot helped me find the perfect major based on my skills and interests. The AI advisor guided me through a series of insightful questions, and I now feel confident about pursuing a career in Software Engineering!"</p>
                <div className="text-center">
                  <p className="title-font font-medium text-[#0E1C36]">Emily Johnson</p>
                  <p className="text-sm text-[#0E1C36]">Software Engineering Student</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full p-8 rounded-lg bg-[#E6F0FF]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-[#0E1C36] mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed text-[#0E1C36] mb-6">"I was so lost when it came to choosing a college major. Thanks to Edu-Pilot, I was able to answer a few questions and discover that I would be perfect for a career in Environmental Science. It truly helped me understand my strengths!"</p>
                <div className="text-center">
                  <p className="title-font font-medium text-[#0E1C36]">Matthew Davis</p>
                  <p className="text-sm text-[#0E1C36]">Environmental Science Major</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Call to Action */}
      <section className="text-center px-8 pb-20">
        <h2 className="text-3xl font-bold mb-6">Ready to Find Your Future?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Take the first step towards discovering the right academic path for you.
        </p>
        <button className="px-6 py-3 rounded-lg font-medium bg-[#0E1C36] text-white hover:bg-[#142c5e]">
          Start Your Assessment
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E1C36] text-white py-10 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Edu-Pilot</h3>
            <p className="text-sm text-gray-300">Empowering students to make confident academic decisions.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Assessment</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-300">Email: support@edupilots.com</p>
            <p className="text-sm text-gray-300">Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-10">© {new Date().getFullYear()} Edu-Pilot. All rights reserved.</div>
      </footer>
    </div>
  );
}
