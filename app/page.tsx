"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react"

import bgUrl from '../public/images/9c6bdcfd-bad9-43c2-a7c8-d545f4911ac3.jpg';

export default function WeddingInvitation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const carouselImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-07-03-m5D4V1pSAcykkCqfPrni8srq6EXzkI.jpg",
      alt: "Couple holding hands against white wall",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_15-27-43-1UUqex6aBnqIQbmOddlARsuFerg9Q7.jpg",
      alt: "Couple at historic site with building",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-07-37-LpczbPg4HQK65F6GiF7AEAcVRuYvXO.jpg",
      alt: "Couple smiling at camera against white wall",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-04-18-9HfgJElIoJt9JsAl01FWnIOOa1PW2m.jpg",
      alt: "Couple at garden with fountain",
    },
  ]

  const navLinks = [
    { label: "Home", href: "https://jomarynaomiwedding.my.canva.site/invitation/#home" },
    { label: "Reception", href: "#reception" },
    { label: "Dress Code", href: "#dress-code" },
    { label: "Gifts", href: "#gifts" },
    { label: "Reminders", href: "#reminders" },
    { label: "Entourage", href: "#entourage" },
    { label: "RSVP", href: "https://forms.gle/wdxdt9B9twXJHv7P9" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const handleNavClick = (e, href) => {
    if (href.startsWith("#") && !href.startsWith("http")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setSidebarOpen(false)
      }
    }
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date("2025-12-08T00:00:00").getTime()
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#e8dcc8" }}
      >
        <div className="p-6">
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-2">
            <X className="w-6 h-6" style={{ color: "#371e00" }} />
          </button>
          <nav className="mt-12 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                className="block px-4 py-3 rounded-lg transition-colors duration-200 text-lg font-medium"
                style={{
                  color: "#371e00",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d4c4b0"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />}

      {/* Menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-lg transition-colors duration-200"
        style={{ backgroundColor: "#cbbfb1" }}
      >
        <Menu className="w-6 h-6" style={{ color: "#371e00" }} />
      </button>

      {/* Pre-nup Photos Section - Page 1 */}
      <section id="home" className="py-16 px-4 bg-card relative">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-12"
            style={{ fontFamily: "var(--font-great-vibes)", letterSpacing: "0.15em" }}
          >
            A Glimpse of Forever
          </h2>

          <div className="relative overflow-hidden rounded-lg mb-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
                    <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-07-03-m5D4V1pSAcykkCqfPrni8srq6EXzkI.jpg"
                alt="Couple holding hands against white wall"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden" style={{ objectPosition: "left" }}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_15-27-43-1UUqex6aBnqIQbmOddlARsuFerg9Q7.jpg"
                alt="Couple at historic site with building"
                className="w-full h-full object-cover object-left"
              />
            </div>
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-07-37-LpczbPg4HQK65F6GiF7AEAcVRuYvXO.jpg"
                alt="Couple smiling at camera against white wall"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_16-04-18-9HfgJElIoJt9JsAl01FWnIOOa1PW2m.jpg"
                alt="Couple at garden with fountain"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Save the Date Section - Updated background color */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Left Side - Polaroid Photo */}
            <div className="w-full lg:w-auto flex-shrink-0">
              <div className="bg-white p-4 pb-12 shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 max-w-sm mx-auto">
                <div className="aspect-[4/5] bg-muted overflow-hidden mb-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-08_21-59-37-xjhze5XAKSuaGu6A3dkpzVDX96eu2Q.jpg"
                    alt="Jomary and Naomi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-2xl text-gray-700" style={{ fontFamily: "var(--font-great-vibes)" }}>
                  Moments
                </p>
              </div>
            </div>

            {/* Right Side - Save the Date */}
            <div className="text-center lg:text-left space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-wider mb-2" style={{ color: "#371e00" }}>
                  SAVE THE DATE
                </h2>
                <p className="text-lg tracking-wide" style={{ color: "#371e00" }}>
                  December 2025
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="inline-block">
                <div className="grid grid-cols-7 gap-3 mb-6">
                  {/* Day headers */}
                  {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((day) => (
                    <div key={day} className="text-xs uppercase text-center w-10" style={{ color: "#371e00" }}>
                      {day}
                    </div>
                  ))}

                  {/* Calendar days for December 2025 */}
                  {/* Week 1 */}
                  <div className="text-center w-10 h-10 flex items-center justify-center"></div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    1
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    2
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    3
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    4
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    5
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    6
                  </div>

                  {/* Week 2 */}
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    7
                  </div>
                  <div className="relative text-center w-10 h-10 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: "#371e00" }}></div>
                    <span className="relative z-10 font-bold" style={{ color: "#371e00" }}>
                      8
                    </span>
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    9
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    10
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    11
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    12
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    13
                  </div>

                  {/* Week 3 */}
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    14
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    15
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    16
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    17
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    18
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    19
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    20
                  </div>

                  {/* Week 4 */}
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    21
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    22
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    23
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    24
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    25
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    26
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    27
                  </div>

                  {/* Week 5 */}
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    28
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    29
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    30
                  </div>
                  <div className="text-center w-10 h-10 flex items-center justify-center" style={{ color: "#371e00" }}>
                    31
                  </div>
                </div>

                {/* Add to Calendar Button */}
                <button
                  onClick={() => {
                    const event = {
                      title: "Jomary & Naomi's Wedding",
                      description: "Join us for our special day!",
                      location: "LOLA Cafe Mabini, 189 A. Mabini, San Juan City",
                      start: "20251208T160000",
                      end: "20251208T230000",
                    }
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`
                    window.open(googleCalendarUrl, "_blank")
                  }}
                  className="w-full border-2 px-8 py-3 hover:bg-white/10 transition-colors duration-300 text-sm tracking-widest uppercase"
                  style={{ borderColor: "#371e00", color: "#371e00" }}
                >
                  ADD TO CALENDAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reception" className="py-20 px-4 relative overflow-hidden" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-20 min-h-[600px]">
            {/* Left Side - Reception Details */}
            <div className="space-y-8 order-2 lg:order-1 flex-1 flex flex-col justify-center pl-0 lg:pl-8">
              <div>
                <h2
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00" }}
                >
                  RECEPTION
                </h2>
                <p className="text-lg md:text-xl" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  LOLA Cafe Mabini
                </p>
              </div>

              {/* Address */}
              <div>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#371e00",
                  }}
                >
                  189 A. Mabini, San Juan City
                  <br />
                  1500 Kalakhang Maynila
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                {/* VIEW MAP Button */}
                <button
                  onClick={() => {
                    window.open("https://maps.app.goo.gl/LHA78tD1FvT8Wdti8", "_blank")
                  }}
                  className="flex-1 px-8 py-4 font-semibold tracking-wider uppercase transition-all duration-300 border-2"
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    borderColor: "#371e00",
                    color: "#371e00",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#371e00"
                    e.currentTarget.style.color = "#cbbfb1"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "#371e00"
                  }}
                >
                  VIEW MAP
                </button>
              </div>
            </div>

            <div
              className="w-full lg:w-auto flex-shrink-0 relative order-1 lg:order-2 flex items-center justify-center lg:justify-end pr-0 lg:pr-8"
              style={{ perspective: "1200px", minHeight: "auto", md: { minHeight: "600px" } }}
            >
              <div
                className="relative w-full md:w-auto"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "auto",
                  minHeight: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 1rem",
                }}
              >
                {/* Back card - Reception interior */}
                <div
                  className="absolute bg-white shadow-2xl transform hover:shadow-3xl transition-shadow duration-300"
                  style={{
                    width: "200px",
                    height: "280px",
                    padding: "12px",
                    paddingBottom: "40px",
                    borderRadius: "2px",
                    transform: "rotate(-8deg) translateX(-40px) translateY(20px)",
                    zIndex: 1,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="aspect-[3/4] bg-muted overflow-hidden mb-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/488655180_1081920880643145_8708183092394641054_n-2RX5h0Q1S0r8CnxhrVO1yuVkIK48LJ.jpg"
                      alt="Reception venue interior with hanging greenery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-xs text-gray-600 font-sans">Reception</p>
                </div>

                {/* Front card - LOLA Cafe exterior */}
                <div
                  className="absolute bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  style={{
                    width: "200px",
                    height: "280px",
                    padding: "12px",
                    paddingBottom: "40px",
                    borderRadius: "2px",
                    transform: "rotate(8deg) translateX(30px) translateY(-20px)",
                    zIndex: 2,
                    boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
                  }}
                >
                  <div className="aspect-[3/4] bg-muted overflow-hidden mb-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp_Image_2024-08-03_at_08.30.44_23bab2c1-HVcMpPSDkYjFuRFjwKYa9xioPSLnCW.jpg"
                      alt="LOLA Cafe Mabini exterior at night"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-xs text-gray-600 font-sans">LOLA Cafe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="dress-code" className="py-24 px-4" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-y-12">
            {/* Main Title */}
            <h2
              className="text-6xl md:text-7xl text-center"
              style={{
                fontFamily: "var(--font-playfair-display)",
                letterSpacing: "0.05em",
                color: "#371e00",
                fontWeight: "bold",
              }}
            >
              Dress Code
            </h2>

            {/* Clothing Illustrations - Side by side with actual images */}
            <div className="flex justify-center items-end gap-12 md:gap-20 max-w-2xl mx-auto">
              {/* Left: Woman in Dress */}
              <div className="w-32 md:w-40">
                <img
                  src="/dress-woman.png"
                  alt="Woman in lavender semi-formal dress"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right: Man in Suit */}
              <div className="w-32 md:w-40">
                <img
                  src="/dress-man.png"
                  alt="Man in light blue semi-formal suit"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Dress Code Description */}
            <div className="text-center space-y-4">
              <h3
                className="text-2xl md:text-3xl font-light tracking-widest"
                style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00" }}
              >
                SEMI-FORMAL ATTIRE
              </h3>
              <p className="text-lg italic" style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00" }}>
                THE COLORS
              </p>
            </div>

            {/* Color Swatches - Pastel Lilac Dreamer Palette */}
            <div className="flex justify-center items-center gap-4 flex-wrap max-w-2xl">
              <button
                aria-label="Light blue swatch #C8CEEE"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-0 cursor-default transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#C8CEEE" }}
              />
              <button
                aria-label="Light pink swatch #E8DAF0"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-0 cursor-default transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#E8DAF0" }}
              />
              {/* <button
                aria-label="Very light pink swatch #F3E4F5"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-0 cursor-default transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#F3E4F5" }}
              /> */}
              <button
                aria-label="Pale pink swatch #FCDCE1"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-0 cursor-default transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#FCDCE1" }}
              />
              <button
                aria-label="Light lavender swatch #D8BEE5"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-0 cursor-default transition-transform hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#D8BEE5" }}
              />
            </div>

            {/* Footnote */}
            <div className="text-center max-w-xl">
              <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                For those part of the entourage, the bride and groom will reach out to you separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gifts" className="py-24 px-4" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-12">
            {/* Title */}
            <h2
              className="text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-playfair-display)", fontWeight: "bold", color: "#371e00" }}
            >
              Gifts
            </h2>

            {/* Descriptive paragraphs */}
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-base md:text-lg leading-relaxed font-sans tracking-wide" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                As love is what this day is all about, your presence is one we can't celebrate without. But should you
                still believe that a gift is worth giving, a monetary gift for our future would be a delightful
                blessing.
              </p>
            </div>

            {/* QR Codes Section - Minimal design with elegant frames */}
            <div className="flex flex-col md:flex-row gap-12 max-w-3xl mx-auto mt-16 justify-center items-center">
              {/* BPI QR Code - Minimal frame design */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 border-8 rounded-lg"
                    style={{ transform: "scale(1.08)", borderColor: "#371e00" }}
                  ></div>
                  <div className="bg-white p-6 rounded-lg shadow-xl border" style={{ borderColor: "#371e00" }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/200d4ca0-3fa4-48fd-83c0-cab3e3f6dd93-d1qezdVmj1Qchy7kcX7TF93zhkckOw.jpg"
                      alt="BPI InstaPay QR Code"
                      className="w-56 h-56 object-contain"
                    />
                  </div>
                </div>
                <p
                  className="text-sm mt-4 tracking-widest uppercase font-sans"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  BPI Account
                </p>
                <p
                  className="text-sm mt-2 italic font-sans"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  Naomi Loria
                </p>
              </div>

              {/* Second QR Code - Minimal frame design */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 border-8 rounded-lg"
                    style={{ transform: "scale(1.08)", borderColor: "#371e00" }}
                  ></div>
                  <div className="bg-white p-6 rounded-lg shadow-xl border" style={{ borderColor: "#371e00" }}>
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/f4d74d15-e630-4997-a3fe-6e5936883024-jo4cPvcpDzJWiFaggFysHop0ULPHim.jpg"
                      alt="InstaPay QR Code"
                      className="w-56 h-56 object-contain"
                    />
                  </div>
                </div>
                <p
                  className="text-sm mt-4 tracking-widest uppercase font-sans"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  GCash Account
                </p>
                <p
                  className="text-sm mt-2 italic font-sans"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  Jomary Portuguez
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reminders" className="py-24 px-4" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-8">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center"
              style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
            >
              Reminders
            </h2>

            <div className="p-8 rounded-lg" style={{ backgroundColor: "#e8dcc8", borderLeft: "6px solid #5c3d2e" }}>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
              >
                <span style={{ fontWeight: "bold" }}>This event is strictly by invitation only.</span>
              </p>
              <p className="text-base leading-relaxed" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                As much as we want to celebrate our special day with everyone that has touched our lives, please be
                advised that we only accommodate a limited number of guests in our wedding. Children are limited only.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="entourage" className="py-24 px-4" style={{ backgroundColor: "#cbbfb1" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-12">
            {/* Title */}
            <h2
              className="text-4xl md:text-6xl lg:text-7xl text-center break-words line-clamp-2"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: "#371e00",
                letterSpacing: "0.05em",
                fontWeight: "bold",
              }}
            >
              PORTUGUEZ – LORIA
            </h2>
            <p
              className="text-center text-base tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter)", color: "#371e00", fontWeight: "bold", fontSize: "1.125rem" }}
            >
              NUPTIALS
            </p>

            {/* Wedding Officiant */}
            <div className="text-center space-y-2 pb-8">
              <p
                className="text-sm tracking-widest uppercase"
                style={{ fontFamily: "var(--font-inter)", color: "#371e00", fontWeight: "bold" }}
              >
                WEDDING OFFICIANT
              </p>
              <p className="text-base italic" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                Pastor Robert P. Mortel
              </p>
            </div>

            {/* Parents Section */}
            <div className="grid grid-cols-2 gap-8 text-center pb-8">
              <div>
                <p
                  className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00", fontWeight: "bold" }}
                >
                  PARENTS OF THE GROOM
                </p>
                <p className="text-base italic" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Alberto Portuguez
                </p>
                <p className="text-base italic" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Marilyn Portuguez
                </p>
              </div>
              <div>
                <p
                  className="text-sm tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00", fontWeight: "bold" }}
                >
                  PARENTS OF THE BRIDE
                </p>
                <p className="text-base italic" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Joel Loria
                </p>
                <p className="text-base italic" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Wilma Loria
                </p>
              </div>
            </div>

            {/* Principal Sponsors */}
            <div className="text-center space-y-6 pb-8">
              <h3
                className="text-4xl font-light tracking-wide"
                style={{ fontFamily: "var(--font-great-vibes)", color: "#371e00" }}
              >
                Principal Sponsors
              </h3>
              <p
                className="text-xs italic tracking-wide text-gray-600"
                style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
              >
                To stand as a witness as we exchange our vows
              </p>
              <div className="space-y-1">
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Ptr. Elmer Baladjay & Ptra. Emily Baladjay
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Rustico Camangian & Mrs. Winnie Mae Camangian
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Leodel Roque & Mrs. Analyn Roque
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Graham David Arnold & Mrs. Gladys De Torres Arnold
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Flaviano Lucas Jr. & Ms. Juliet Vera
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Ronald Cadion & Mrs. Mary Lynne Cadion
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Michael Avilla & Mrs. Almarie Olermo
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Cielito Herrera & Ms. Leoniwil Torres
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Romeo Torres & Mrs. Dubhe Lynn Corpuz
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Ptr. Carlos Dado-acon & Ptra. Russel Dado-acon
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Eddie Glenn Zagada Jr. & Ptra. Jamyla Zagada
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Ptr. Alvin Silva & Ptra. Laila Silva
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Ptr. Joseph Fabon & Ptra. Eden Fabon
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Mr. Esteban Concina & Mrs. Merriam Concina
                </p>
              </div>
            </div>

            {/* Secondary Sponsors */}
            <div className="text-center space-y-6 pb-8">
              <h3
                className="text-4xl font-light tracking-wide"
                style={{ fontFamily: "var(--font-great-vibes)", color: "#371e00" }}
              >
                Secondary Sponsors
              </h3>

              {/* Cord */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  CORD SPONSORS
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To bind us together in unity
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Lambert Jeremiah Torres & Hanna Eunice Respondo
                </p>
              </div>

              {/* Veil */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  VEIL SPONSORS
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To clothe us in love
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Albert Yeshua Torres & Jennelyn Portuguez
                </p>
              </div>

              {/* Candle */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  CANDLE SPONSORS
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To light our path to righteousness
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  John Ray Portuguez & Angel Leona
                </p>
              </div>
            </div>

            {/* Best Man and Matron of Honor */}
            <div className="grid grid-cols-2 gap-8 text-center pb-8">
              <div>
                <p
                  className="text-lg font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  BEST MAN
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Miko Emmanuel Miraflores
                </p>
              </div>
              <div>
                <p
                  className="text-lg font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  MATRON OF HONOR
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Deborah Maningas
                </p>
              </div>
            </div>

            {/* Groomsmen and Bridesmaids */}
            <div className="grid grid-cols-2 gap-8 text-center pb-8">
              <div>
                <p
                  className="text-lg font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  GROOMSMEN
                </p>
                <p
                  className="text-xs italic text-gray-600 mb-2"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To guide us on our way
                </p>
                <div className="space-y-1">
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    John Albert Portuguez
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Kevin Daniel Miraflores
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Ezekiel Godwin Torres
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Michael Angelo Medina
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Marc David Portuguez
                  </p>
                </div>
              </div>
              <div>
                <p
                  className="text-lg font-light tracking-wide mb-2"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  BRIDESMAIDS
                </p>
                <p
                  className="text-xs italic text-gray-600 mb-2"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To guide us on our way
                </p>
                <div className="space-y-1">
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Glecy Mae Pichay
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Jheanel Estrada
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Alma Diaz
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Jedidiah Magbanua
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Nathania Rose Cristobal
                  </p>
                </div>
              </div>
            </div>

            {/* Special Roles */}
            <div className="text-center space-y-6">
              {/* Ring Bearer */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  RING BEARER
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To carry the symbol of Love
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Elijah Neil Portuguez
                </p>
              </div>

              {/* Bible Bearer */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  BIBLE BEARER
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To carry the symbol of Faith
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Zion Yurie Louis Respondo
                </p>
              </div>

              {/* Coin Bearer */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  COIN BEARER
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To carry our symbol of Treasure
                </p>
                <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                  Max Yule Cedrick Portuguez
                </p>
              </div>

              {/* Banner Bearers */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  BANNER BEARERS
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To carry the banner
                </p>
                <div className="space-y-1">
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Jann Kyzinetray Portuguez
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Akiro John Portuguez
                  </p>
                </div>
              </div>

              {/* Flower Girls */}
              <div className="space-y-2">
                <p
                  className="text-lg font-light tracking-wide"
                  style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontWeight: "bold" }}
                >
                  FLOWER GIRLS
                </p>
                <p
                  className="text-xs italic text-gray-600"
                  style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}
                >
                  To shower our path with flowers
                </p>
                <div className="space-y-1">
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Stella Maxene Maningas
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Rynkah Malia Betita
                  </p>
                  <p className="text-sm" style={{ fontFamily: "var(--font-inter)", color: "#371e00" }}>
                    Riona Feline Bautista
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        style={{ backgroundColor: "#cbbfb1" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-great-vibes)", color: "#371e00" }}
            >
              Forever begins, by His grace.
            </h2>
            {/* <p
              className="text-3xl md:text-4xl lg:text-5xl italic"
              style={{ fontFamily: "var(--font-playfair-display)", color: "#371e00", fontSize: "1.875rem" }}
            >
              ready for a lifetime of love and faith.
            </p> */}
          </div>

          <div className="flex flex-col md:flex-row md:relative md:h-[600px] md:lg:h-[700px] items-center justify-center gap-8 md:gap-0">
            {/* Left photo card - positioned top-left on desktop, stacked on mobile */}
            <div
              className="w-full md:absolute bg-white p-4 shadow-2xl"
              style={{
                width: "100%",
                maxWidth: "280px",
                ...(typeof window !== "undefined" && window.innerWidth >= 768
                  ? {
                      left: "5%",
                      top: "10%",
                      zIndex: 3,
                    }
                  : {
                      // Mobile: use relative positioning
                      position: "relative",
                      left: "auto",
                      top: "auto",
                      zIndex: "auto",
                    }),
              }}
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden mb-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_15-15-20-9KViKN8Rc0TDY7mUSLM6GZE8Zl13my.jpg"
                  alt="Couple posing together at night"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center photo card - now properly centered */}
            <div
              className="w-full md:absolute bg-white p-4 shadow-2xl"
              style={{
                width: "100%",
                maxWidth: "280px",
                ...(typeof window !== "undefined" && window.innerWidth >= 768
                  ? {
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 5,
                    }
                  : {
                      // Mobile: use relative positioning without transform
                      position: "relative",
                      left: "auto",
                      top: "auto",
                      transform: "none",
                      zIndex: "auto",
                    }),
              }}
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden mb-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-19_15-15-18-lZ1SY8V82eTxVp41RzcqxejZLN9yQ6.jpg"
                  alt="Couple intimate moment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right photo card - positioned top-right on desktop, stacked on mobile */}
            <div
              className="w-full md:absolute bg-white p-4 shadow-2xl"
              style={{
                width: "100%",
                maxWidth: "280px",
                ...(typeof window !== "undefined" && window.innerWidth >= 768
                  ? {
                      right: "5%",
                      top: "10%",
                      zIndex: 3,
                    }
                  : {
                      // Mobile: use relative positioning
                      position: "relative",
                      right: "auto",
                      top: "auto",
                      zIndex: "auto",
                    }),
              }}
            >
              <div className="aspect-[3/4] bg-muted overflow-hidden mb-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-10-11_11-09-27-ozd8wCAvmT0Bz60yp1B0MMrjxrHTyQ.jpg"
                  alt="Couple on beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section - moved to footer area */}
      <section
        id="our-big-day"
        className="py-20 px-4"
        style={{
          // backgroundImage:
          //   "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9c6bdcfd-bad9-43c2-a7c8-d545f4911ac3-0s55L9RlgOpmheSftp4ndmQKlE1tW6.jpg')",
          backgroundImage: `url(${bgUrl.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          // backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto max-w-3xl">
          {/* "Our Big Day Awaits" heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl text-center mb-12"
            style={{
              fontFamily: "var(--font-great-vibes)",
              color: "#FFFFFF",
            }}
          >
            Our Big Day Awaits
          </h2>

          {/* Countdown timer - numbers row */}
          <div className="flex justify-center items-center gap-2 mb-2">
            {/* Days */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-serif tabular-nums"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  color: "#FFFFFF",
                }}
              >
                {String(timeLeft.days).padStart(2, "0")}
              </span>
            </div>
            {/* Colon */}
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-serif"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: "#FFFFFF",
                width: "20px",
                textAlign: "center",
              }}
            >
              :
            </span>
            {/* Hours */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-serif tabular-nums"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  color: "#FFFFFF",
                }}
              >
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
            </div>
            {/* Colon */}
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-serif"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: "#FFFFFF",
                width: "20px",
                textAlign: "center",
              }}
            >
              :
            </span>
            {/* Minutes */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-serif tabular-nums"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  color: "#FFFFFF",
                }}
              >
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
            </div>
            {/* Colon */}
            <span
              className="text-4xl md:text-5xl lg:text-6xl font-serif"
              style={{
                fontFamily: "var(--font-playfair-display)",
                color: "#FFFFFF",
                width: "20px",
                textAlign: "center",
              }}
            >
              :
            </span>
            {/* Seconds */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-4xl md:text-5xl lg:text-6xl font-serif tabular-nums"
                style={{
                  fontFamily: "var(--font-playfair-display)",
                  color: "#FFFFFF",
                }}
              >
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Labels row - matching structure */}
          <div className="flex justify-center items-center gap-2">
            {/* Days label */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#FFFFFF",
                }}
              >
                DAYS
              </span>
            </div>
            {/* Spacer for colon */}
            <div style={{ width: "20px" }} />
            {/* Hours label */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#FFFFFF",
                }}
              >
                HOURS
              </span>
            </div>
            {/* Spacer for colon */}
            <div style={{ width: "20px" }} />
            {/* Minutes label */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#FFFFFF",
                }}
              >
                MINS
              </span>
            </div>
            {/* Spacer for colon */}
            <div style={{ width: "20px" }} />
            {/* Seconds label */}
            <div className="text-center" style={{ width: "90px" }}>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "#FFFFFF",
                }}
              >
                SECS
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center mt-6">
          <p className="text-2xl mb-2 text-white" style={{ fontFamily: "var(--font-great-vibes)" }}>
            Jomary & &nbsp;Naomi
          </p>
          <p className="text-primary-foreground/80">December 8th, 2025</p>
        </div>
                
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        

        
      </section>

      {/* Footer */}
      {/* <footer
        className="text-primary-foreground py-12 px-4 min-h-[200px] md:min-h-auto flex items-center justify-center"
        style={{
          // backgroundImage:
          //   "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9c6bdcfd-bad9-43c2-a7c8-d545f4911ac3-0s55L9RlgOpmheSftp4ndmQKlE1tW6.jpg')",
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center left",
          backgroundAttachment: "fixed",
        }}
      >
        
      </footer> */}
    </div>
  )
}
