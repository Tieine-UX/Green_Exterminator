import React, { useState, useEffect } from 'react';
// เพิ่ม useParams เข้าไป
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // เปลี่ยนตรงนี้
// เพิ่ม Minus, Plus, ShoppingCart, Send เข้าไป
import { ChevronLeft, ChevronRight, Leaf, Mail, Phone, MapPin, Facebook, Instagram, Menu, X, Minus, Plus, ShoppingCart, Send } from 'lucide-react';   // ตัวอย่างการนำเข้ารูปภาพ

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
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-bold text-2xl text-stone-900 tracking-tight">Green Exterminator</span>
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Leaf className="w-8 h-8 text-emerald-700" />
            </div>
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
              <span className="font-bold text-2xl text-white tracking-tight">Green Exterminator</span>
              <div className="bg-emerald-900/50 p-2 rounded-xl border border-emerald-800">
                <Leaf className="w-8 h-8 text-emerald-500" />
              </div>
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
              <li><Link to="/reviews#faq" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4 text-emerald-600" /> คำถามที่พบบ่อย (FAQ)</Link></li>
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
                <span className="text-stone-400">096-502-4810</span>
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
      <section className="py-24 bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image Template */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full aspect-square md:aspect-[4/3] bg-stone-200 rounded-3xl border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden shadow-inner"
            >
              <span className="text-stone-400 font-medium text-lg text-center px-4">[ รูปภาพโปรโมทน้ำหมัก ]</span>
            </motion.div>
            
            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                ยินดีต้อนรับสู่ <br className="hidden lg:block" /><span className="text-emerald-600">Green Exterminator</span>
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                สุดยอดนวัตกรรมน้ำหมักสมุนไพรเพื่อการเกษตรที่ยั่งยืน สกัดจากธรรมชาติ 100% ช่วยปกป้องพืชผลของคุณจากแมลงศัตรูพืชอย่างมีประสิทธิภาพ ปลอดภัย ไร้สารเคมีตกค้าง คืนความสมดุลสู่ธรรมชาติและเป็นมิตรต่อสิ่งแวดล้อม
              </p>
              <div className="pt-4">
                <Link to="/about" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  ทำความรู้จักเราเพิ่มเติม
                </Link>
              </div>
            </motion.div>
          </div>
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
                src="Logo_RBG.jpg" 
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
                  <Link to={`/products/${item}`} className="mt-auto px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-emerald-600 transition-colors">
                    ดูรายละเอียด
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="pt-20">
      <section className="py-12 md:py-24 bg-white min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/products" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2">
              <ChevronLeft className="w-5 h-5" /> กลับไปหน้าสินค้าทั้งหมด
            </Link>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Product Image */}
              <div className="bg-stone-100 p-8 md:p-12 flex items-center justify-center min-h-[400px]">
                <div className="w-full max-w-md aspect-square bg-white rounded-2xl border-2 border-dashed border-stone-300 flex items-center justify-center shadow-sm">
                  <span className="text-stone-400 font-medium text-lg">[ รูปภาพสินค้า สูตรที่ {id} ]</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-8 md:p-12 flex flex-col">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full">
                    สินค้าขายดี
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">น้ำหมักสมุนไพร สูตรที่ {id}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <span className="text-stone-500 text-sm">ขายแล้ว 0 ชิ้น</span>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-orange-600">฿50</span>
                  <span className="text-stone-400 line-through ml-3">90฿</span>
                </div>

                <div className="space-y-6 mb-8 flex-grow">
                  <div>
                    <h3 className="font-bold text-stone-900 mb-2">รายละเอียดสินค้า</h3>
                    <p className="text-stone-600 leading-relaxed">
                      น้ำหมักสมุนไพรสูตรเข้มข้น สกัดจากธรรมชาติ 100% ช่วยป้องกันและกำจัดแมลงศัตรูพืชได้อย่างมีประสิทธิภาพ ปลอดภัยต่อผู้ใช้และสิ่งแวดล้อม เหมาะสำหรับพืชผักสวนครัวและไม้ผลทุกชนิด
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-stone-900 mb-2">วิธีใช้</h3>
                    <ul className="list-disc list-inside text-stone-600 space-y-1">
                      <li>ผสมน้ำหมัก 100 ซีซี ต่อน้ำ 200 ลิตร</li>
                      <li>ฉีดพ่นทางใบทุกๆ 7-10 วัน</li>
                      <li>ควรฉีดพ่นในช่วงเช้าหรือเย็นที่แดดไม่จัด</li>
                    </ul>
                  </div>
                </div>

                {/* Order Controls */}
                <div className="border-t border-stone-200 pt-8 mt-auto">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="font-bold text-stone-900">จำนวน</span>
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                      <button 
                        onClick={decreaseQuantity}
                        className="p-3 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="w-16 text-center font-semibold text-stone-900">
                        {quantity}
                      </div>
                      <button 
                        onClick={increaseQuantity}
                        className="p-3 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-stone-500 text-sm">มีสินค้าทั้งหมด 0 ชิ้น</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 border-2 border-emerald-600 text-emerald-700 font-bold py-4 px-6 rounded-xl hover:bg-emerald-100 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                      เพิ่มลงรถเข็น
                    </button>
                    <button className="flex-1 bg-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg">
                      ซื้อสินค้า
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ReviewsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq') {
      const element = document.getElementById('faq');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const faqs = [
    { q: "น้ำหมักสมุนไพรปลอดภัยต่อผู้ใช้งานหรือไม่?", a: "ปลอดภัย 100% เนื่องจากสกัดจากสมุนไพรธรรมชาติ ไม่มีส่วนผสมของสารเคมีสังเคราะห์ที่เป็นอันตราย" },
    { q: "ต้องใช้บ่อยแค่ไหนถึงจะเห็นผล?", a: "แนะนำให้ฉีดพ่นทุกๆ 7-10 วัน หรือถี่ขึ้นในช่วงที่มีการระบาดของแมลงศัตรูพืช" },
    { q: "สามารถใช้ร่วมกับปุ๋ยเคมีได้หรือไม่?", a: "สามารถใช้ร่วมได้ แต่แนะนำให้เว้นระยะห่างจากการใส่ปุ๋ยเคมีประมาณ 3-5 วัน เพื่อประสิทธิภาพสูงสุด" },
    { q: "เก็บรักษาได้นานเท่าไหร่?", a: "สามารถเก็บรักษาในที่ร่ม อุณหภูมิปกติ ได้นานถึง 6 เดือน - 1 ปี" }
  ];

  return (
    <div className="pt-20">
      <section className="py-24 bg-emerald-900 text-white">
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

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-stone-900 mb-12 text-center">คำถามที่พบบ่อย <span className="text-emerald-600">(FAQ)</span></h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-start gap-3">
                    <span className="text-emerald-500 shrink-0">Q:</span> {faq.q}
                  </h3>
                  <p className="text-stone-600 flex items-start gap-3">
                    <span className="text-orange-500 font-bold shrink-0">A:</span> {faq.a}
                  </p>
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
  const teamMembers = [
    { id: 1, name: "กรวิชญ์ กฤษฎา", role: "หัวหน้างานวิจัย", contact: "096-502-4810" },
    { id: 2, name: "พีรพัฒน์ พุทธวีวรรณ", role: "จัดการด้านระบบและข้อมูล", contact: "091-854-5781" },
    { id: 3, name: "ภัควลัญชญ์ แสงจันทร์", role: "จัดการด้านการบัญชีและดูแลน้ำหมัก", contact: "065-983-5099" },
  ];
  
  return (
    <div className="pt-20">
      <section className="py-24 bg-white min-h-[70vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-stone-900 mb-12 text-center">ติดต่อ<span className="text-emerald-600">เรา</span></h2>
            
            <div className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={member.id} className={`bg-stone-50 p-6 rounded-3xl border border-stone-100 shadow-sm flex flex-col items-center gap-8 hover:shadow-md transition-shadow ${index === 1 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}>
                  {/* Image Template */}
                  <div className="w-40 sm:w-48 aspect-[4/5] shrink-0 bg-stone-200 rounded-2xl border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden">
                    <span className="text-stone-400 font-medium text-sm text-center px-4">[ รูปภาพ ]<br/>(4:5)</span>
                  </div>
                  
                  {/* Info */}
                  <div className={`flex-grow text-center space-y-3 ${index === 1 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div>
                      <h3 className="text-2xl font-bold text-stone-900">{member.name}</h3>
                      <p className="text-emerald-600 font-medium text-lg">{member.role}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-stone-200">
                      <p className={`text-stone-600 flex items-center justify-center gap-2 ${index === 1 ? 'sm:justify-end' : 'sm:justify-start'}`}>
                        <Phone className="w-5 h-5 text-stone-400" />
                        {member.contact}
                      </p>
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
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
