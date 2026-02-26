import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // เปลี่ยนตรงนี้
import { ChevronLeft, ChevronRight, Leaf, Mail, Phone, MapPin, Facebook, Instagram, Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/support', label: 'Support & Objectives' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/contact', label: 'Contact' },
  ];

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Leaf className="w-8 h-8 text-emerald-700" />
            </div>
            <span className="font-bold text-2xl text-stone-900 tracking-tight">Green Exterminator</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  activePath === link.path
                    ? 'text-emerald-700 border-b-2 border-emerald-600 pb-1'
                    : 'text-stone-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-3 rounded-lg font-medium ${
                    activePath === link.path
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const slides = [
  {
    id: 1,
    image: "https://picsum.photos/seed/herb1/1920/1080",
    title: "พลังแห่งธรรมชาติ",
    subtitle: "น้ำหมักสมุนไพรเพื่อการเกษตรที่ยั่งยืน ปลอดภัย ไร้สารเคมี",
    color: "from-emerald-900/90 to-stone-900/80"
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/herb2/1920/1080",
    title: "นวัตกรรมสีเขียว",
    subtitle: "ปกป้องพืชผลของคุณด้วยภูมิปัญญาชาวบ้านผสานเทคโนโลยีสมัยใหม่",
    color: "from-orange-900/90 to-stone-900/80"
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/herb3/1920/1080",
    title: "ผลผลิตที่ปลอดภัย",
    subtitle: "เพื่อสุขภาพที่ดีของผู้ปลูกและผู้บริโภค",
    color: "from-yellow-900/90 to-stone-900/80"
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[current].color}`} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl z-10">
          <motion.h1 
            key={`title-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
          >
            {slides[current].title}
          </motion.h1>
          <motion.p 
            key={`subtitle-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-stone-200 mb-10 drop-shadow-md font-light"
          >
            {slides[current].subtitle}
          </motion.p>
          <motion.div
            key={`btn-${current}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link
              to="/about"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-1"
            >
              เรียนรู้เพิ่มเติม
            </Link>
          </motion.div>
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all z-20 border border-white/20"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full text-white transition-all z-20 border border-white/20"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              current === index ? 'bg-yellow-400 w-10 shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'bg-white/50 hover:bg-white/80 w-3'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 py-20 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-800">
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">Green Exterminator</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              นวัตกรรมน้ำหมักสมุนไพรเพื่อการเกษตรที่ยั่งยืน ปลอดภัย ไร้สารเคมี คืนความสมดุลสู่ธรรมชาติ
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-stone-800 p-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all hover:-translate-y-1">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-stone-800 p-3 rounded-full hover:bg-orange-600 hover:text-white transition-all hover:-translate-y-1">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:ml-auto">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-1 bg-yellow-500 rounded-full"></span>
              เมนูหลัก
            </h3>
            <ul className="space-y-4">
              <li><Link to="/support" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> Support & Objectives</Link></li>
              <li><Link to="/" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> Home</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> About</Link></li>
              <li><Link to="/products" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> Products</Link></li>
            </ul>
          </div>

          <div className="lg:ml-auto">
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-1 bg-orange-500 rounded-full"></span>
              ข้อมูลอื่นๆ
            </h3>
            <ul className="space-y-4">
              <li><Link to="/reviews" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> Reviews</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> คำถามที่พบบ่อย (FAQ)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> เงื่อนไขการให้บริการ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              ช่องทางการติดต่อ
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="bg-stone-800 p-2 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-stone-400 mt-1">-</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-stone-800 p-2 rounded-lg shrink-0">
                  <Phone className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="text-stone-400">-</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-stone-800 p-2 rounded-lg shrink-0">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-stone-400">greenexterminator521@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800/60 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Green Exterminator. All rights reserved.</p>
          <p>Designed with <span className="text-emerald-500">♥</span> for Nature</p>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <section className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">ยินดีต้อนรับสู่ <span className="text-emerald-600">Green Exterminator</span></h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
              นวัตกรรมน้ำหมักสมุนไพรเพื่อการเกษตรที่ยั่งยืน ปลอดภัย ไร้สารเคมี คืนความสมดุลสู่ธรรมชาติ
            </p>
            <Link to="/about" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              ทำความรู้จักเราเพิ่มเติม
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const SupportPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white border-b border-stone-100 min-h-[70vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-stone-900 mb-6">Support & <span className="text-emerald-600">Objectives</span></h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-12">
              โครงการของเราได้รับการสนับสนุนจากหลายภาคส่วน เพื่อบรรลุวัตถุประสงค์ในการสร้างการเกษตรที่ยั่งยืนและปลอดภัย
            </p>
            <div className="w-full max-w-4xl mx-auto h-64 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200 flex items-center justify-center">
              <span className="text-stone-400 font-medium">[ Template Content: รายละเอียดการสนับสนุนและวัตถุประสงค์ ]</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 md:py-32 bg-stone-100 min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-emerald-500 transform -translate-x-4 translate-y-4 md:-translate-x-6 md:translate-y-6 rounded-3xl" />
              <img 
                src="https://picsum.photos/seed/herb-extract/800/800" 
                alt="Herbal Extract" 
                className="relative z-10 w-full aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute -bottom-10 -right-10 bg-yellow-400 w-32 h-32 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0 animate-pulse" />
              <div className="absolute -top-10 -left-10 bg-orange-400 w-32 h-32 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0 animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 tracking-tight leading-tight">
                <span className="text-emerald-600">น้ำหมักสมุนไพร</span><br/>คืออะไร?
              </h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  โครงงานน้ำหมักสมุนไพร (Green Exterminator) มุ่งเน้นการนำภูมิปัญญาชาวบ้านมาประยุกต์ใช้ร่วมกับกระบวนการทางวิทยาศาสตร์ เพื่อสกัดสารสำคัญจากพืชสมุนไพรในท้องถิ่น
                </p>
                <p>
                  ผลิตภัณฑ์ของเราช่วยในการกำจัดและป้องกันแมลงศัตรูพืช โดยไม่ทิ้งสารตกค้างที่เป็นอันตรายต่อสิ่งแวดล้อม เกษตรกร และผู้บริโภค เป็นทางเลือกใหม่สำหรับการเกษตรอินทรีย์ที่ยั่งยืน
                </p>
                
                <div className="pt-6">
                  <ul className="space-y-5">
                    <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                      <div className="bg-yellow-100 p-3 rounded-xl">
                        <Leaf className="w-6 h-6 text-yellow-600" />
                      </div>
                      <span className="font-semibold text-stone-800 text-xl">ปลอดภัยจากสารเคมี 100%</span>
                    </li>
                    <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                      <div className="bg-orange-100 p-3 rounded-xl">
                        <Leaf className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="font-semibold text-stone-800 text-xl">เป็นมิตรต่อสิ่งแวดล้อม</span>
                    </li>
                    <li className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                      <div className="bg-emerald-100 p-3 rounded-xl">
                        <Leaf className="w-6 h-6 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-stone-800 text-xl">ลดต้นทุนการผลิตให้เกษตรกร</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-6">Our <span className="text-orange-600">Products</span></h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-16">
              ผลิตภัณฑ์น้ำหมักสมุนไพรสูตรต่างๆ ที่คิดค้นมาเพื่อตอบโจทย์ปัญหาการเกษตรอย่างตรงจุด
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-stone-50 rounded-3xl p-8 border border-stone-100 hover:shadow-xl transition-shadow flex flex-col items-center">
                  <div className="w-full aspect-square bg-stone-200 rounded-2xl mb-6 overflow-hidden flex items-center justify-center border-2 border-dashed border-stone-300">
                    <span className="text-stone-400 font-medium">[ Product Image {item} ]</span>
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">สูตรที่ {item}</h3>
                  <p className="text-stone-600 mb-6">รายละเอียดผลิตภัณฑ์สูตรที่ {item} (Template Content)</p>
                  <button className="mt-auto px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-emerald-600 transition-colors">
                    ดูรายละเอียด
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ReviewsPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-emerald-900 text-white min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Customer <span className="text-yellow-400">Reviews</span></h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-16">
              เสียงตอบรับจากเกษตรกรผู้ใช้งานจริง ที่เห็นผลลัพธ์การเปลี่ยนแปลงอย่างชัดเจน
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700/50 backdrop-blur-sm text-left">
                  <div className="flex text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-emerald-50 mb-6 italic">"[ Template Review Content ]"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-700 rounded-full overflow-hidden flex items-center justify-center">
                      <span className="text-xs">User</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">เกษตรกรท่านที่ {item}</h4>
                      <p className="text-sm text-emerald-300">จ.เชียงใหม่</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-stone-900 mb-8 text-center">ติดต่อ<span className="text-emerald-600">เรา</span></h2>
            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 shadow-sm">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">ชื่อ - นามสกุล</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="กรอกชื่อของคุณ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">อีเมล</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="example@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">ข้อความ</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="พิมพ์ข้อความของคุณที่นี่..."></textarea>
                </div>
                <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-colors">
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
