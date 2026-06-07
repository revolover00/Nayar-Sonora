/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from "react";
import { motion } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Coins, 
  Star, 
  Menu, 
  X, 
  Heart, 
  Utensils, 
  Sparkles,
  Flame,
  ChevronDown,
  ExternalLink
} from "lucide-react";

// Stagger and fade-in animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Custom smooth cubic bezier
    }
  }
};

const hoverScaleVariants = {
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2, ease: "easeOut" } }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});


  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navbar
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    {
      id: "asada",
      name: "Tacos de Carne Asada",
      description: "Charcoal-grilled flank steak marinated in local citrus and traditional spices, served on our famous handmade corn tortillas with fresh cilantro and sweet charred onions.",
      category: "tacos",
      badge: "Best Seller",
      secondaryBadge: "Handmade Tortilla",
      accent: true,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "al-pastor",
      name: "Tacos al Pastor",
      description: "Aromatic spit-roasted pork slow-marinated in traditional achiote and guajillo chiles, shaved fresh off the trompo with chopped cilantro, onions, and a fresh slice of sweet pineapple.",
      category: "tacos",
      badge: "Traditional",
      secondaryBadge: "Handmade Tortilla",
      accent: false,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "birria-burrito",
      name: "Birria Burrito",
      description: "Tender, slow-braised beef birria, melted gooey Oaxaca cheese, fresh cilantro, and onions wrapped securely inside a toasted flour tortilla. Served with a piping hot side of rich, spiced consomé broth for dynamic dipping.",
      category: "burritos",
      badge: "Popular Deal",
      isPopular: true,
      secondaryBadge: "Slow-Braised",
      accent: true,
      image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "bistec",
      name: "Bistec Ranchero",
      description: "Slow-simmered seasoned beef steak cuts cooked with fire-roasted red tomatoes, jalapeños, sweet caramelized onions, and aromatic Mexican garden spices. Served hot with homemade Mexican rice and rich pinto beans.",
      category: "plates",
      badge: "Recommended",
      isRecommended: true,
      secondaryBadge: "Maria's Recipe",
      accent: false,
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tortillas",
      name: "Handmade Corn Tortillas",
      description: "The golden pillar of our kitchen. Premium maize corn masa mixed, hand-pressed, and grilled to order on our piping hot iron comal. Incredibly soft, warm, and fragrant.",
      category: "sides",
      badge: "Made to Order",
      secondaryBadge: "Fresh Daily",
      accent: false,
      image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rice-beans",
      name: "Rice & Beans Side",
      description: "Fluffy local family-style Mexican red rice seasoned with tomatoes and garlic, paired with home-cooked, creamed smash pinto beans simmered slowly with family herbs.",
      category: "sides",
      badge: "Essential Side",
      secondaryBadge: "Lard-Free",
      accent: false,
      image: "https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const galleryItems = [
    {
      title: "Fresh Tortillas",
      subtitle: "Off the Comal",
      desc: "Fresh soft maize corn masa hand-pressed by Maria and grilled right in front of you.",
      color: "bg-gradient-to-br from-terracotta to-amber-700/80",
      size: "col-span-2 md:col-span-1 row-span-1",
      artType: "tortilla"
    },
    {
      title: "Carne Asada",
      subtitle: "Over Hot Coals",
      desc: "Perfectly seasoned flank steak charred on the grill with natural oakwood charcoal.",
      color: "bg-gradient-to-br from-charcoal via-amber-950 to-terracotta/90",
      size: "col-span-2 row-span-1 md:row-span-2",
      artType: "asada"
    },
    {
      title: "Birria Consomé",
      subtitle: "Slow Braised",
      desc: "Rich, deeply spiced beef broth cooked for eight hours with aromatic regional cloves and chiles.",
      color: "bg-gradient-to-br from-amber-700 to-gold",
      size: "col-span-2 md:col-span-1 row-span-1",
      artType: "birria"
    },
    {
      title: "Maria's Kitchen",
      subtitle: "Since Day One",
      desc: "No freezer, no shortcuts. Every morning starting at 4:30 AM with fresh ingredients.",
      color: "bg-gradient-to-br from-terracotta/40 via-amber-900 to-charcoal",
      size: "col-span-2 md:col-span-2 row-span-1",
      artType: "kitchen"
    }
  ];

  return (
    <div className="font-sans bg-cream text-charcoal min-h-screen selection:bg-terracotta selection:text-cream overflow-x-hidden paper-overlay">
      
      {/* 1. STICKY NAVBAR */}
      <header 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-charcoal/95 backdrop-blur-md py-3 shadow-xl border-b border-terracotta/20" 
            : "bg-charcoal/40 backdrop-blur-xs py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleScrollTo(e, "hero")}
            className="group flex flex-col focus:outline-none"
            id="nav-logo"
          >
            <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-cream group-hover:text-gold transition-colors duration-200">
              Nayar Sonora
            </span>
            <span className="text-[10px] tracking-[0.25em] font-sans text-gold font-bold uppercase -mt-1 group-hover:text-cream transition-colors duration-200">
              Taqueria · Las Vegas
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            <a 
              href="#about" 
              onClick={(e) => handleScrollTo(e, "about")}
              className="font-sans text-sm font-semibold tracking-wider text-cream/90 hover:text-gold uppercase transition-colors duration-200"
            >
              About
            </a>
            <a 
              href="#menu" 
              onClick={(e) => handleScrollTo(e, "menu")}
              className="font-sans text-sm font-semibold tracking-wider text-cream/90 hover:text-gold uppercase transition-colors duration-200"
            >
              Menu
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleScrollTo(e, "gallery")}
              className="font-sans text-sm font-semibold tracking-wider text-cream/90 hover:text-gold uppercase transition-colors duration-200"
            >
              Gallery
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, "contact")}
              className="font-sans text-sm font-semibold tracking-wider text-cream/90 hover:text-gold uppercase transition-colors duration-200"
            >
              Contact
            </a>
            
            <span className="h-5 w-[1px] bg-terracotta/40"></span>

            <span className="bg-gold text-charcoal px-3.5 py-1 text-xs font-bold uppercase rounded-sm border border-gold/40 hover:bg-transparent hover:text-gold transition-all duration-250">
              Cash Only
            </span>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            type="button"
            className="md:hidden text-cream hover:text-gold focus:outline-none p-1.5 rounded-md hover:bg-terracotta/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-charcoal border-b border-terracotta/30 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
          id="mobile-dropdown"
        >
          <div className="px-5 py-6 space-y-4 flex flex-col">
            <a 
              href="#about" 
              onClick={(e) => handleScrollTo(e, "about")}
              className="font-sans text-base font-bold tracking-wider text-cream/95 hover:text-gold uppercase transition-all"
            >
              About Our Kitchen
            </a>
            <a 
              href="#menu" 
              onClick={(e) => handleScrollTo(e, "menu")}
              className="font-sans text-base font-bold tracking-wider text-cream/95 hover:text-gold uppercase transition-all"
            >
              Our Authentic Menu
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleScrollTo(e, "gallery")}
              className="font-sans text-base font-bold tracking-wider text-cream/95 hover:text-gold uppercase transition-all"
            >
              Taste of Sonora
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, "contact")}
              className="font-sans text-base font-bold tracking-wider text-cream/95 hover:text-gold uppercase transition-all"
            >
              Location & Hours
            </a>
            <div className="pt-3 border-t border-terracotta/20 flex items-center justify-between">
              <span className="text-[11px] font-sans tracking-widest text-gold font-extrabold uppercase">
                ⚡ Mon-Sat · Opens 5:30 AM
              </span>
              <span className="bg-terracotta text-cream px-2.5 py-0.5 text-[10px] font-black uppercase rounded-sm">
                Cash Only
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-[95vh] flex items-center justify-center rustic-pattern pt-24 pb-16 z-10"
      >
        {/* Subtle decorative overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/30 z-0"></div>
        
        {/* Abstract artistic clay-glow background elements */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-terracotta/10 rounded-full filter blur-3xl z-0 pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl z-0 pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>

        {/* Content container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-terracotta/95 text-cream border border-gold/30 px-4 py-1.5 rounded-full shadow-lg mb-8 animate-bounce" 
            id="hero-badge"
          >
            <Coins size={14} className="text-gold" />
            <span className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase">
              Cash Only · Open Early
            </span>
          </motion.div>

          {/* Majestic Title */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-cream leading-[1.1] mb-6 tracking-tight" 
            id="hero-title"
          >
            Handmade Tortillas.<br />
            <span className="text-gold italic block mt-1 sm:inline sm:ml-2">Real Mexican Soul.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-lg sm:text-xl md:text-2xl text-cream/80 font-light max-w-2xl mx-auto mb-10 leading-relaxed" 
            id="hero-subtitle"
          >
            Authentic, unapologetically rustic Sonora-style tacos in the heart of Las Vegas. No shortcuts, just pure family tradition.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" 
            id="hero-ctas"
          >
            <a 
              href="#menu" 
              onClick={(e) => handleScrollTo(e, "menu")}
              className="w-full sm:w-auto bg-terracotta hover:bg-terracotta/80 text-cream px-8 py-4 font-sans text-base font-bold uppercase tracking-wider rounded-sm shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group border border-terracotta"
            >
              <Utensils size={18} className="text-gold group-hover:rotate-12 transition-transform" />
              See Our Menu
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollTo(e, "contact")}
              className="w-full sm:w-auto bg-transparent hover:bg-cream/10 text-cream px-8 py-4 font-sans text-base font-bold uppercase tracking-wider rounded-sm border-2 border-cream/30 hover:border-cream/80 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MapPin size={18} className="text-gold" />
              Find Us on Russell Rd
            </a>
          </motion.div>

          {/* Trust Rating Block */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-cream/10 max-w-lg mx-auto flex items-center justify-center gap-8 text-cream/70" 
            id="hero-rating"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gold mb-1">
                <Star size={16} fill="#D4A017" />
                <Star size={16} fill="#D4A017" />
                <Star size={16} fill="#D4A017" />
                <Star size={16} fill="#D4A017" />
                <Star size={16} className="opacity-70" fill="#D4A017" />
              </div>
              <p className="text-xs tracking-widest font-bold uppercase">4.4 Star Google Rating</p>
            </div>
            <div className="h-8 w-[1px] bg-cream/10"></div>
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-cream block -mb-1">100%</span>
              <p className="text-xs tracking-widest font-bold uppercase">Ma Masa Wheat-free</p>
            </div>
          </motion.div>

          <div className="mt-12 animate-bounce hover:opacity-150 transition-opacity">
            <a href="#about" onClick={(e) => handleScrollTo(e, "about")} className="inline-block p-2 text-gold focus:outline-none" aria-label="Scroll down">
              <ChevronDown size={28} />
            </a>
          </div>

        </motion.div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section 
        id="about" 
        className="relative py-20 sm:py-28 bg-cream border-t-8 border-terracotta z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6" 
              id="about-text-column"
            >
              
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta block">
                  Family Heritage
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-black text-charcoal tracking-tight">
                  Our Story Began over<br /> 
                  <span className="text-terracotta italic">the Fragrant Comal</span>
                </h2>
                <div className="w-20 h-1 bg-gold mt-4"></div>
              </div>

              <div className="text-charcoal/80 font-sans text-base sm:text-lg space-y-4 leading-relaxed">
                <p>
                  At <strong className="text-terracotta font-bold">Nayar Sonora Taqueria</strong>, we believe an authentic taco is a connection to the heart of Sonora, Mexico. Tucked away on Russell Road in Las Vegas, NV, our humble hole-in-the-wall is a dedicated family endeavor led by the beloved and hard-working owner, <strong>Maria</strong>.
                </p>
                <p>
                  While others take shortcuts, every morning at <strong className="text-charcoal">5:30 AM</strong>, we are fired up and ready. We craft our maize corn masa from scratch, pressing each tortilla individually onto a blazing griddle right as you order. Our seasoning profiles are simple, robust, and completely true to our home soil—no fancy pre-mixes, just freshly chopped aromatic cilantro, ripe lime wedges, and slow-seared meats.
                </p>
                <p>
                  Whether you are stopping by for an early morning beef birria burrito before work, or grabbing a quick plate of Bistec Ranchero, Maria is always there to serve you like old family. Simple, honest, and filled with real Mexican soul.
                </p>
              </div>

              {/* Focus Pillars (Image cards with elegant text overlays to replace emojis) */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6" 
                id="about-pillars"
              >
                
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="relative h-60 rounded-sm overflow-hidden shadow-lg border border-charcoal/15 group flex flex-col justify-end p-5 glow-gold transition-all duration-300 shadow-terracotta-soft"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=600&q=80" 
                    alt="Handmade Tortillas"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="font-serif text-base font-extrabold tracking-wide text-gold">Handmade Tortillas</h3>
                    <p className="text-[12px] text-cream/90 mt-1">Pressed from scratch and grilled on order daily.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="relative h-60 rounded-sm overflow-hidden shadow-lg border border-charcoal/15 group flex flex-col justify-end p-5 glow-terracotta transition-all duration-300 shadow-terracotta-soft"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80" 
                    alt="Authentic Recipes"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="font-serif text-base font-extrabold tracking-wide text-gold">Authentic Recipes</h3>
                    <p className="text-[12px] text-cream/90 mt-1">True Sonoran spices and traditional slow cooking.</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="relative h-60 rounded-sm overflow-hidden shadow-lg border border-charcoal/15 group flex flex-col justify-end p-5 glow-gold transition-all duration-300 shadow-terracotta-soft"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" 
                    alt="Family Owned"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="font-serif text-base font-extrabold tracking-wide text-gold">Family Owned</h3>
                    <p className="text-[12px] text-cream/90 mt-1">Run with love and hard work by Maria and friends.</p>
                  </div>
                </motion.div>

              </motion.div>

            </motion.div>

            {/* Decorative Graphic Element Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 h-[28rem] sm:h-[32rem] relative bg-charcoal border-8 border-terracotta p-8 flex flex-col justify-between shadow-2xl overflow-hidden rounded-xs" 
              id="about-graphic-column"
            >
              
              {/* Textured grid overlay */}
              <div className="absolute inset-0 opacity-15 rustic-pattern"></div>
              
              <div className="relative z-10">
                <span className="text-[11px] font-sans tracking-widest text-gold font-bold uppercase block mb-1">
                  EST. 2018 · LAS VEGAS
                </span>
                <p className="font-serif text-2xl text-cream leading-tight">
                  "Only fresh masa, fiery spits, and a burning love for the recipe."
                </p>
                <div className="w-12 h-[1px] bg-gold my-4"></div>
                <p className="text-xs text-cream/65 italic font-sans max-w-xs">
                  - Chef & Owner Maria, preparing our legendary Bistec Ranchero at sunrise.
                </p>
              </div>

              {/* Artistic center-logo layout */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <span className="font-serif text-8xl font-black text-gold">NAYAR</span>
              </div>

              {/* Bottom tag / info */}
              <div className="relative z-10 border-t border-cream/10 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gold/80 block uppercase tracking-widest">VISIT US TODAY</span>
                  <span className="text-xs font-bold text-cream">3380 E Russell Rd · Las Vegas</span>
                </div>
                <span className="bg-terracotta text-cream px-2 py-1 text-[10px] font-black uppercase rounded-xs tracking-wider border border-gold/20 shadow-lg">
                  ★ Authentic
                </span>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. MENU SECTION */}
      <section 
        id="menu" 
        className="relative py-20 sm:py-28 bg-charcoal text-cream z-20 shadow-inner"
      >
        <div className="absolute inset-0 opacity-5 rustic-pattern pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-4" 
            id="menu-header"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-terracotta/40 border border-terracotta text-gold text-xs font-bold tracking-widest uppercase rounded-full">
              <Sparkles size={12} /> Authentic Sonoran Flavors
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-cream">
              Our Food Menu
            </h2>
            <p className="font-sans text-cream/75 text-sm sm:text-base max-w-md mx-auto">
              We stand tall on absolute quality. Every item features deep heritage spices and our signature scratch-rolled tortillas.
            </p>
            <div className="inline-flex items-center gap-2 bg-cream/10 border border-cream/15 px-4.5 py-1.5 rounded-sm text-xs text-gold font-bold uppercase mt-2">
              <Coins size={14} /> Cash Only · Prices Reflect Market Cost
            </div>
          </motion.div>

          {/* Tab Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12" id="menu-tabs">
            {["all", "tacos", "burritos", "plates", "sides"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 cursor-pointer border ${
                  activeTab === tab 
                     ? "bg-terracotta border-terracotta text-cream shadow-md scale-105" 
                     : "bg-transparent border-cream/20 text-cream/80 hover:border-cream/50 hover:text-cream"
                }`}
              >
                {tab === "all" ? "Whole Menu" : tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <motion.div 
            key={activeTab} // Cause re-animate of items when tabs change
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            id="menu-grid"
          >
            {menuItems
              .filter(item => activeTab === "all" || item.category === activeTab)
              .map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className={`group relative flex flex-col justify-between bg-charcoal/40 backdrop-blur-sm rounded-sm overflow-hidden hover:bg-charcoal/70 transition-all duration-300 border shadow-card-elevated hover:shadow-deep-tavern ${
                    item.isPopular || item.isRecommended 
                      ? "border-gold/40 shadow-[0_0_20px_rgba(212,160,23,0.12)] glow-gold" 
                      : "border-cream/10 hover:border-terracotta/40 glow-terracotta"
                  }`}
                  id={`menu-card-${item.id}`}
                >
                  
                  {/* Top Image banner section */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-charcoal/40">
                    {failedImages[item.id] ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-amber-950 to-charcoal/90 flex flex-col items-center justify-center p-6 text-center">
                        <div className="bg-gold/10 p-3 rounded-full mb-2 text-gold">
                          <Utensils size={24} />
                        </div>
                        <span className="text-xs text-cream font-serif font-bold tracking-wide">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-gold/80 uppercase tracking-widest font-mono mt-1">
                          Nayar Sonora Sabor
                        </span>
                      </div>
                    ) : (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        onError={() => setFailedImages(prev => ({ ...prev, [item.id]: true }))}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent opacity-90"></div>
                    
                    {/* Visual Badge details inside image overlay */}
                    {(item.isPopular || item.isRecommended) && (
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 bg-gold text-charcoal text-[10px] font-black uppercase px-2.5 py-1 rounded-sm shadow-md tracking-wider z-10">
                        <Star fill="#1C1C1C" size={10} />
                        {item.isPopular ? "Popular" : "Recommended"}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      
                      {/* Item labels */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gold font-bold uppercase tracking-widest bg-gold/10 px-2 py-0.5 rounded-sm">
                          {item.secondaryBadge}
                        </span>
                        <span className="text-[10px] text-terracotta font-bold uppercase tracking-widest bg-terracotta/20 px-2 py-0.5 rounded-sm border border-terracotta/30">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold group-hover:text-gold transition-colors duration-200 text-cream">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-cream/70 text-xs sm:text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing footer details */}
                    <div className="border-t border-cream/10 pt-4 mt-6 flex items-center justify-between">
                      <span className="text-[10px] text-cream/40 uppercase tracking-widest">
                        Sonora Sabor
                      </span>
                      <span className="text-xs sm:text-sm text-gold font-bold uppercase tracking-wider flex items-center gap-1 bg-gold/5 px-2.5 py-1 rounded-xs border border-gold/10">
                        <Coins size={12} /> Cash Only
                      </span>
                    </div>
                  </div>

                </motion.div>
            ))}
          </motion.div>

          {/* Quick Notice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center max-w-xl mx-auto p-6 bg-cream/5 border border-cream/10 rounded-sm" 
            id="menu-footer-notice"
          >
            <h4 className="font-serif text-lg font-bold text-gold inline-flex items-center gap-2 mb-2">
              <Flame size={18} /> Craving it extra spicy?
            </h4>
            <p className="font-sans text-cream/80 text-xs leading-relaxed">
              Tell Maria when ordering! We make fresh red chile de árbol and chunky jalapeño-lime salsa cruda in house every single morning. Best of all—our homemade salsas are complimentary with any order.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section 
        id="gallery" 
        className="relative py-20 sm:py-28 bg-cream border-t-8 border-terracotta z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3" 
            id="gallery-header"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta block">
              Kitchen Visual Art
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-black text-charcoal tracking-tight">
              A Taste of Sonora
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-4"></div>
            <p className="font-sans text-charcoal/70 text-sm sm:text-base max-w-md mx-auto pt-2">
              Every detail is treated like art. Explore these aesthetic visualizations of our signature culinary craft.
            </p>
          </motion.div>

          {/* Bento-style Earthy Grid layout */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]" 
            id="gallery-grid"
          >
            {galleryItems.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                className={`${item.color} ${item.size} relative group overflow-hidden rounded-sm p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-charcoal/5`}
              >
                
                {/* Visual artistic texture block behind text */}
                <div className="absolute inset-0 bg-radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px) bg-[size:10px_10px] opacity-40"></div>

                {/* Aesthetic SVG outlines to act as stylized culinary illustrations */}
                <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  {item.artType === "tortilla" && (
                    <svg className="w-32 h-32 text-cream" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="5 5" />
                      <circle cx="50" cy="50" r="30" />
                    </svg>
                  )}
                  {item.artType === "asada" && (
                    <svg className="w-36 h-36 text-cream" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="20,80 50,20 80,80" />
                      <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" strokeWidth="8" />
                    </svg>
                  )}
                  {item.artType === "birria" && (
                    <svg className="w-32 h-32 text-cream" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M20,50 C20,80 80,80 80,50 L20,50 Z" />
                      <circle cx="50" cy="30" r="8" />
                    </svg>
                  )}
                  {item.artType === "kitchen" && (
                    <svg className="w-40 h-40 text-cream" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M30,30 L70,30 L60,80 L40,80 Z" />
                      <rect x="25" y="20" width="50" height="10" rx="3" />
                    </svg>
                  )}
                </div>

                {/* Top Badge text overlay */}
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase block bg-charcoal/30 inline-block px-2 py-0.5 rounded-sm">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-cream mt-1 text-shadow">
                    {item.title}
                  </h3>
                </div>

                {/* Description text overlay */}
                <div className="relative z-10 max-w-sm mt-auto">
                  <p className="font-sans text-cream/90 text-xs leading-relaxed text-shadow md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.desc}
                  </p>
                  <span className="inline-block mt-1 font-sans text-[10px] uppercase tracking-widest text-gold group-hover:underline">
                    View Kitchen Craft →
                  </span>
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 6. CONTACT & LOCATION SECTION */}
      <section 
        id="contact" 
        className="relative py-20 sm:py-28 bg-charcoal text-cream z-20 border-t-8 border-gold"
      >
        <div className="absolute inset-0 opacity-5 rustic-pattern pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Info Column (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-8" 
              id="contact-info-column"
            >
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-terracotta/40 border border-terracotta text-gold text-xs font-bold tracking-widest uppercase rounded-full">
                  📍 Where to Find Us
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-cream leading-tight">
                  Taste the Real Thing Today
                </h2>
                <p className="font-sans text-cream/70 text-sm leading-relaxed max-w-md">
                  We are conveniently located directly off East Russell Road in beautiful Las Vegas. Come experience early morning culinary heaven.
                </p>
              </div>

              {/* Direct Info List with stagger */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-5" 
                id="contact-list"
              >
                
                {/* Address Link */}
                <motion.a 
                  variants={itemVariants}
                  href="https://maps.google.com/?q=3380+E+Russell+Rd+Unit+107+Las+Vegas+NV+89120" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-sm bg-cream/5 border border-cream/10 hover:bg-cream/10 hover:border-gold/30 transition-all group block"
                >
                  <div className="bg-terracotta p-2.5 rounded-sm text-cream group-hover:scale-105 transition-transform shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold block font-bold tracking-widest uppercase">ADDRESS</span>
                    <span className="font-sans text-sm sm:text-base text-cream/95 font-medium leading-snug">
                      3380 E Russell Rd, Unit 107<br />
                      Las Vegas, NV 89120
                    </span>
                    <span className="text-[10px] text-gold group-hover:underline block mt-1.5 font-bold uppercase tracking-widest flex items-center gap-1">
                      Open in Maps <ExternalLink size={10} />
                    </span>
                  </div>
                </motion.a>

                {/* Phone Call */}
                <motion.a 
                  variants={itemVariants}
                  href="tel:+17027622868" 
                  className="flex items-start gap-4 p-4 rounded-sm bg-cream/5 border border-cream/10 hover:bg-cream/10 hover:border-gold/30 transition-all group block"
                >
                  <div className="bg-terracotta p-2.5 rounded-sm text-cream group-hover:scale-105 transition-transform shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold block font-bold tracking-widest uppercase">PHONE CALL</span>
                    <span className="font-serif text-lg sm:text-xl text-cream font-bold block group-hover:text-gold transition-colors">
                      +1 702-762-2868
                    </span>
                    <span className="text-[10px] text-cream/50 block mt-0.5">Click to call Maria directly</span>
                  </div>
                </motion.a>

                {/* Important cash warning */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-sm bg-terracotta/20 border border-terracotta/40"
                >
                  <div className="bg-gold p-2.5 rounded-sm text-charcoal shadow-md">
                    <Coins size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gold block font-bold tracking-widest uppercase">CASH POLICY</span>
                    <span className="font-sans text-sm sm:text-base text-cream/95 font-bold block">
                      We Only Accept Cash Purchases
                    </span>
                    <p className="text-[11px] text-cream/70 mt-1 leading-relaxed">
                      We keep our operational costs ultra-low so we can buy premium cut meats and keep prices fair for you. ATM available inside the shop.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              {/* Hours Table */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="bg-cream/5 border border-cream/10 p-5 rounded-sm space-y-4" 
                id="hours-table"
              >
                <h3 className="font-serif text-lg font-bold text-gold flex items-center gap-2">
                  <Clock size={18} /> Daily Kitchen Hours
                </h3>
                
                <div className="space-y-2 font-sans text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Monday</span>
                    <span className="font-bold text-cream">5:30 AM – 6:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Tuesday</span>
                    <span className="font-bold text-cream">5:30 AM – 6:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Wednesday</span>
                    <span className="font-bold text-cream">5:30 AM – 6:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Thursday</span>
                    <span className="font-bold text-cream">5:30 AM – 6:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Friday</span>
                    <span className="font-bold text-cream">5:30 AM – 6:30 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cream/10">
                    <span className="text-cream/75">Saturday</span>
                    <span className="font-bold text-cream">6:00 AM – 7:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-terracotta">
                    <span className="text-terracotta/80 font-bold uppercase">Sunday</span>
                    <span className="font-bold uppercase tracking-wider text-[11px] bg-terracotta/20 px-2.5 py-0.5 rounded-sm">Closed</span>
                  </div>
                </div>

                <p className="text-[10px] text-cream/45 italic leading-snug">
                  * Yes, we open extremely early before dawn! If you are heading out for work or ending a night shift, come wake your engine with hot, authentic breakfast tacos!
                </p>
              </motion.div>

            </motion.div>

            {/* Google Map Column (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 w-full space-y-4" 
              id="contact-map-column"
            >
              <div className="bg-cream/5 border-4 border-terracotta rounded-sm shadow-2xl p-2 md:p-3 overflow-hidden group">
                <div className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full bg-cream/10">
                  <iframe 
                    title="Nayar Sonora Taqueria Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224!2d-115.1016126!3d36.0871503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c551942838ab%3A0xa4d69386dfdb0dc!2sNayar%20Sonora%20Taqueria!5e0!3m2!1sen!2sus!4v1699999999999"
                    className="absolute inset-0 w-full h-full border-0 rounded-sm"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-cream/50 px-2 font-sans">
                <span>Map Data © Google Maps</span>
                <a 
                  href="https://maps.google.com/?q=3380+E+Russell+Rd+Unit+107+Las+Vegas+NV+89120" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold hover:underline flex items-center gap-1 font-bold"
                >
                  Direct Driving Directions <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-charcoal border-t border-cream/10 text-cream/60 py-12" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            {/* Branding / copyright block */}
            <div className="space-y-2">
              <span className="font-serif text-xl font-black tracking-wide text-cream block">
                Nayar Sonora Taqueria
              </span>
              <p className="font-sans text-xs leading-relaxed max-w-sm">
                Authentic Mexican street food in Las Vegas, NV. Built on premium corn masa, slow spits, and honest recipes.
              </p>
              <p className="font-mono text-[10px] text-cream/40 pt-1">
                © 2026 Nayar Sonora Taqueria · Las Vegas, NV · All Rights Reserved
              </p>
            </div>

            {/* Quick stats and phone shortcut */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <span className="bg-terracotta text-cream px-3 py-1 text-xs font-bold uppercase rounded-sm tracking-widest border border-gold/10">
                Cash Only Shop
              </span>
              <a 
                href="tel:+17027622868" 
                className="font-serif text-lg text-cream hover:text-gold transition-colors flex items-center gap-1.5 focus:outline-none"
              >
                <Phone size={16} className="text-gold" />
                +1 702-762-2868
              </a>
              <span className="font-sans text-xs text-cream/50">
                3380 E Russell Rd, Unit 107, Las Vegas
              </span>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
