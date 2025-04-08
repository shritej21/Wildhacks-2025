"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import financeAnimation from "./finance.json";
import dashboardAnimation from "./dashboardAnimation.json";
import aiInsightsAnimation from './aiInsightsAnimation.json';
import Navbar from "./Navbar";

function Landing() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
    <Navbar/>
      <div className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12 text-left">
            <div className="w-full lg:w-1/2" data-aos="fade-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight text-left">
                See your financial future with
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {" "}
                  crystal clarity
                </span>
              </h1>
              <p className="mt-6 text-xl text-white leading-relaxed text-left">
                Our AI-powered predictive engine forecasts your cash flow,
                identifies savings opportunities, and guides you to financial
                freedom.
              </p>
            </div>
            <div className="w-60 lg:w-1/2 relative" data-aos="fade-left">
              <div className="bg-white text-black rounded-2xl shadow-xl border border-gray-100 p-6 animate-float transition-transform duration-300 hover:scale-105">
                <h3 className="text-lg font-bold mb-4 text-left">
                  Your Cash Flow Forecast
                </h3>
              <div className="w-90 h-60 mx-auto rounded-lg shadow-lg bg-white transition-transform duration-300 hover:scale-105">
                <Lottie
                  animationData={financeAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              </div>
            </div>
          </div>

          <section
            className="mt-24 flex flex-col lg:flex-row-reverse gap-10 p-6 rounded-lg text-left"
            data-aos="fade-up"
          >
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col items-start text-left">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Comprehensive Financial Dashboard
                </h2>
                <p className="text-white max-w-xl">
                  Gain a holistic view of your finances with our interactive
                  dashboard, tracking your income, expenses, and savings in
                  real-time.
                </p>
              </div>
            </div>
            <div className="w-90 lg:w-1/2">
              <div className="w-90 h-60 mx-auto rounded-lg shadow-lg bg-white transition-transform duration-300 hover:scale-105">
                <Lottie
                  animationData={dashboardAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>

          <section
            className="mt-24 flex flex-col lg:flex-row gap-10 p-6 rounded-lg text-left"
            data-aos="fade-up"
          >
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <h2 className="text-3xl font-bold text-white mb-6 text-left">
                AI-Powered Financial Insights
              </h2>
              <p className="text-white max-w-xl text-left">
                Leverage artificial intelligence to receive personalized
                financial advice and predictive analytics tailored to your
                spending habits.
              </p>
            </div>
            <div className="w-90 lg:w-1/2">
              <div className="w-90 h-60 mx-auto rounded-lg shadow-lg bg-white transition-transform duration-300 hover:scale-105">
                <Lottie
                  animationData={aiInsightsAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Landing;