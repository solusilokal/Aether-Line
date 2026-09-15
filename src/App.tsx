import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  MapPin, 
  MessageCircle, 
  X, 
  ArrowDown, 
  Facebook,
  Share,
  Copy,
  Check,
  Twitter,
  Clock,
  Star,
  Quote,
  ShoppingBag,
  Info,
  History,
  Tag,
  HelpCircle,
  Sparkles,
  Heart,
  CalendarDays
} from 'lucide-react';

interface CatalogItem {
  name: string;
  img: string;
  price: string;
}

interface PricingItem {
  category: string;
  duration: string;
  price: string;
  items: string[];
}

interface FaqItem {
  q: string;
  a: string;
}

interface TestimonialItem {
  name: string;
  rating: number;
  text: string;
}

interface HistoryItem {
  year: string;
  title: string;
  desc: string;
}

const pageData = {
  name: "Aether Line",
  phone: "6289529605601",
  address: "Palangka Raya, Kalimantan Tengah",
  title: "Sewa Busana Premium & Gaun Pesta",
  description: "Tampil memukau di setiap momen spesial. Aether Line menyediakan koleksi gaun, kebaya, dan jas premium untuk disewa dengan kualitas terbaik dan fitting yang sempurna.",
  profileImg: "./profile.png", 
  heroImg: "./hero-bg.jpg",
  links: {
    instagram: "https://www.instagram.com/solusilokal.id",
    maps: "https://www.google.com/maps/search/?api=1&query=Palangka+Raya", 
    facebook: "https://facebook.com/", 
    tiktok: "https://www.tiktok.com/@solusilokal.id" 
  },
  highlights: [
    { text: "Koleksi Premium", icon: "Sparkles" },
    { text: "Bebas Biaya Laundry", icon: "Heart" },
    { text: "Fitting Langsung", icon: "Tag" }
  ],
  about: "Aether Line didirikan dengan satu tujuan: membuat setiap orang bisa tampil elegan dan percaya diri tanpa harus mengeluarkan biaya mahal untuk membeli gaun atau jas yang mungkin hanya dipakai sekali. Kami mengkurasi koleksi busana dari desainer ternama dan merawatnya dengan standar butik.",
  history: [
    { year: "2021", title: "Awal Berdiri", desc: "Dimulai dari koleksi pribadi berisi 20 gaun pesta yang disewakan untuk teman terdekat." },
    { year: "2022", title: "Ekspansi Butik", desc: "Membuka studio fitting pertama di Jakarta Selatan dan menambah koleksi kebaya modern." },
    { year: "2023", title: "Koleksi Pria & Premium", desc: "Menghadirkan lini jas pria eksklusif dan mencapai 1000+ pelanggan setia." }
  ] as HistoryItem[],
  catalog: [
    { name: "Kebaya Modern", img: "./catalog-1.webp", price: "Mulai Rp 250.000" },
    { name: "Evening Dress", img: "./catalog-2.webp", price: "Mulai Rp 350.000" },
    { name: "Premium Suit", img: "./catalog-3.webp", price: "Mulai Rp 250.000" },
    { name: "Bridesmaid Set", img: "./catalog-4.webp", price: "Mulai Rp 150.000" },
    { name: "Wedding Gown", img: "./catalog-5.webp", price: "Mulai Rp 1.500.000" },
  ] as CatalogItem[],
  pricing: [
    { category: "Regular Dress", duration: "3 Hari", price: "Rp 150.000", items: ["Gaun standar", "Gratis laundry", "Tas gaun"] },
    { category: "Gentleman Suit", duration: "3 Hari", price: "Rp 250.000", items: ["Jas & Celana", "Kemeja dalam", "Dasi/Bowtie"] },
    { category: "Premium Kebaya / Gown", duration: "3 Hari", price: "Rp 350.000", items: ["Kebaya payet/gaun premium", "Bustier/Manset", "Gratis dry clean"] },
    { category: "Exclusive Wedding Gown", duration: "3 Hari", price: "Rp 1.500.000", items: ["Gaun pengantin mewah", "Veil & Petticoat", "Free fitting & dry clean"] }
  ] as PricingItem[],
  faqs: [
    { q: "Berapa lama durasi standar penyewaan?", a: "Durasi standar sewa adalah 3 hari. (H-1 Ambil, Hari H Pakai, H+1 Kembali)." },
    { q: "Apakah perlu membayar uang jaminan (deposit)?", a: "Ya, kami memberlakukan deposit sebesar Rp 100.000 - Rp 500.000 tergantung jenis busana. Deposit akan dikembalikan 100% jika baju kembali dalam kondisi baik." },
    { q: "Apakah harus dicuci sebelum dikembalikan?", a: "Tidak perlu. Biaya sewa sudah termasuk layanan laundry dan dry cleaning dari kami." },
    { q: "Bolehkah mengecilkan atau membesarkan baju?", a: "Perubahan minor (peniti/jelujur sementara yang tidak merusak kain) diperbolehkan. Pemotongan kain sangat dilarang." }
  ] as FaqItem[],
  testimonials: [
    { name: "Sarah Amelia", rating: 5, text: "Gaunnya wangi banget dan kualitasnya premium. Fitting di studionya juga nyaman, adminnya sangat membantu cari ukuran yang pas." },
    { name: "Nadia Putri", rating: 5, text: "Sewa kebaya untuk wisuda di Aether Line bener-bener anti ribet. Koleksinya up-to-date dan harganya masih masuk akal." },
    { name: "Dion W.", rating: 4, text: "Jasnya fit di badan, bahannya bagus gak bikin gerah. Proses sewa dan pengembalian deposit juga cepat." }
  ] as TestimonialItem[]
};

export default function App() {
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string | null }>({ isOpen: false, image: null });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (imgSrc: string) => {
    setLightbox({ isOpen: true, image: imgSrc });
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, image: null });
    document.body.style.overflow = 'unset';
  };

  const scrollToForm = () => {
    const el = document.getElementById('booking-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const rentDate = formData.get('rentDate');
    const outfitType = formData.get('outfitType');
    const notes = formData.get('notes');
    const waUrl = `https://wa.me/${pageData.phone}?text=Halo%20Admin%20${encodeURIComponent(pageData.name)},%20saya%20${encodeURIComponent(name as string)}.%20Saya%20ingin%20bertanya%20ketersediaan%20untuk%20sewa%20*${encodeURIComponent(outfitType as string)}*%20pada%20tanggal%20*${encodeURIComponent(rentDate as string)}*.%0A%0ACatatan%20Tambahan:%20${encodeURIComponent((notes as string) || '-')}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = async () => {
    try {
      const isHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
      if (isHttp && typeof navigator.share === 'function') {
        const shareData = { title: pageData.name, text: pageData.title, url: window.location.href };
        let canShare = false;
        try {
          canShare = typeof (navigator as any).canShare === 'function' ? (navigator as any).canShare(shareData) : true;
        } catch {
          canShare = false;
        }
        if (canShare) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (err) {
      // User cancelled share dialog or native share failed
    }
    setShowShareModal(true);
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const tempInput = document.createElement('input');
    tempInput.value = window.location.href;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(pageData.title + ' ' + window.location.href)}`, '_blank'),
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank'),
    twitter: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pageData.name)}`, '_blank')
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        body {
          background-color: #F8F9FA;
          color: #1a1a1a;
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>
      
      <main className="w-full max-w-[480px] mx-auto relative shadow-[0_0_50px_rgba(212,175,55,0.12)] bg-white min-h-screen overflow-hidden pb-32">
        
        {/* Header / Hero Section */}
        <section className="relative w-full min-h-[90dvh] flex flex-col justify-end pb-12 px-6 bg-white">
          <button
            onClick={handleShare}
            aria-label="Share this page"
            className="absolute top-6 right-6 z-20 p-3 bg-white/40 backdrop-blur-md rounded-full border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-white/70 transition-all shadow-sm active:scale-95"
          >
            <Share size={20} />
          </button>

          <div className="absolute inset-0 z-0">
            <img 
              src={pageData.heroImg} 
              alt={pageData.name} 
              className="w-full h-full object-cover object-top opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-white/10"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center mt-32">
            <div className="w-24 h-24 rounded-full p-2 bg-white mb-6 shadow-xl border border-[#D4AF37]/50 flex items-center justify-center overflow-hidden">
              <img 
                src={pageData.profileImg} 
                alt="Profile" 
                className="w-full h-full object-contain"
              />
            </div>

            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-3 leading-tight tracking-wide font-serif">
              {pageData.name}
            </h1>
            <p className="text-stone-600 font-light text-sm leading-relaxed mb-6 max-w-[95%]">
              {pageData.description}
            </p>

            <div className="flex flex-col gap-3 w-full max-w-sm mb-8">
              <div className="grid grid-cols-2 gap-3">
                <a href={pageData.links.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] transition-all text-[#D4AF37] shadow-sm text-[14px] font-bold border border-[#D4AF37]/50 active:scale-98">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg> Instagram
                </a>
                <a href={pageData.links.tiktok} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] transition-all text-[#D4AF37] shadow-sm text-[14px] font-bold border border-[#D4AF37]/50 active:scale-98">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg> TikTok
                </a>
              </div>
              <a href="#lokasi" className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] transition-all text-[#D4AF37] shadow-sm text-[14px] font-bold w-full border border-[#D4AF37]/50 active:scale-98">
                <MapPin size={18} /> Lokasi
              </a>
            </div>

            <button 
              onClick={scrollToForm}
              className="group relative flex items-center justify-center gap-3 w-full max-w-sm py-4 bg-gradient-to-r from-[#D4AF37] to-[#B78628] text-white rounded-xl font-bold text-[13px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#D4AF37]/20 active:scale-98"
            >
              Sewa Sekarang
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Highlights Banner */}
        <section className="py-6 px-6 bg-gradient-to-r from-[#D4AF37] to-[#B78628] shadow-inner">
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-md mx-auto">
            {pageData.highlights.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2 px-3 py-1.5 text-xs text-white font-medium">
                {item.icon === 'Sparkles' && <Sparkles size={14} />}
                {item.icon === 'Heart' && <Heart size={14} />}
                {item.icon === 'Tag' && <Tag size={14} />}
                {item.text}
              </span>
            ))}
          </div>
        </section>

        {/* Tentang Kami */}
        <section className="py-12 px-6 bg-white border-b border-[#FAF7F2]">
          <div className="mb-6 flex flex-col items-center text-center">
            <Info className="text-[#D4AF37] mb-3" strokeWidth={1.5} size={28} />
            <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif mb-4">Tentang Kami</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
          </div>
          <p className="text-[#4a4a4a] text-[14px] leading-[1.8] text-justify mx-auto mb-10">
            {pageData.about}
          </p>

          <div className="mb-6 flex flex-col items-start gap-2">
            <h3 className="text-xl font-bold text-[#1a1a1a] font-serif flex items-center gap-2">
              <History className="text-[#D4AF37]" size={20} /> Perjalanan Kami
            </h3>
          </div>
          
          <div className="pl-4 border-l-2 border-[#D4AF37]/30 flex flex-col gap-6 relative">
            {pageData.history.map((hist, idx) => (
              <div key={idx} className="relative pl-4">
                <div className="absolute w-3 h-3 bg-[#D4AF37] rounded-full -left-[23px] top-1.5 border-4 border-white shadow-sm"></div>
                <span className="text-[#D4AF37] font-bold text-xs tracking-wider">{hist.year}</span>
                <h4 className="text-[#1a1a1a] font-semibold text-[15px] mt-0.5">{hist.title}</h4>
                <p className="text-stone-500 text-xs mt-1 leading-relaxed">{hist.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Katalog Busana */}
        <section id="katalog" className="pt-12 pb-8 bg-[#FAF7F2] border-b border-stone-100">
          <div className="px-6 mb-6 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif">Katalog Busana</h2>
              <ShoppingBag className="text-[#D4AF37]" size={20} />
            </div>
            <p className="text-stone-500 text-xs">Pilih koleksi terbaik untuk momen spesialmu.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 no-scrollbar">
            {pageData.catalog.map((item, idx) => (
              <div 
                key={idx}
                className="snap-center shrink-0 w-[220px] rounded-2xl overflow-hidden cursor-pointer group bg-white border border-[#D4AF37]/20 shadow-sm flex flex-col"
              >
                <div 
                  className="w-full aspect-[3/4] relative overflow-hidden"
                  onClick={() => openLightbox(item.img)}
                >
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 backdrop-blur text-[#1a1a1a] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-[#D4AF37]/30">Perbesar</span>
                  </div>
                </div>
                <div className="p-4 text-center border-t border-[#D4AF37]/10">
                  <h3 className="font-semibold text-[#1a1a1a] text-sm">{item.name}</h3>
                  <p className="text-[#D4AF37] font-bold text-[13px] mt-1">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daftar Harga Sewa */}
        <section className="py-12 px-6 bg-white border-b border-[#FAF7F2]">
          <div className="mb-8 flex flex-col items-center text-center gap-2">
            <Tag className="text-[#D4AF37] mb-1" size={24} />
            <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif">Daftar Harga Sewa</h2>
            <p className="text-stone-500 text-xs mt-1">Transparan tanpa biaya tersembunyi.</p>
          </div>

          <div className="flex flex-col gap-4">
            {pageData.pricing.map((pkg, idx) => (
              <div key={idx} className="bg-white border border-[#D4AF37]/30 p-5 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#B78628] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                  {pkg.duration}
                </div>
                <h3 className="text-base font-bold text-[#1a1a1a] mb-1">{pkg.category}</h3>
                <div className="text-xl font-bold text-[#D4AF37] mb-4 font-serif">{pkg.price} <span className="text-xs font-normal text-stone-400">/ sewa</span></div>
                
                <ul className="flex flex-col gap-2">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-stone-600 text-xs">
                      <Check size={14} className="text-[#D4AF37] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-6 bg-[#FAF7F2] border-b border-stone-100">
          <div className="mb-8 flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif flex items-center gap-2">
               <HelpCircle className="text-[#D4AF37]" size={22} /> FAQ
            </h2>
            <p className="text-stone-500 text-xs">Pertanyaan yang sering diajukan oleh pelanggan.</p>
          </div>

          <div className="flex flex-col gap-3">
            {pageData.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-sm">
                <summary className="flex items-center justify-between font-semibold text-[#1a1a1a] text-[13px] p-4 cursor-pointer select-none">
                  {faq.q}
                  <span className="transition group-open:rotate-180">
                    <ArrowDown size={16} className="text-[#D4AF37]" />
                  </span>
                </summary>
                <div className="text-stone-600 text-xs leading-relaxed px-4 pb-4 border-t border-[#D4AF37]/10 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Testimoni */}
        <section className="py-12 px-6 bg-white border-b border-[#FAF7F2]">
          <div className="mb-8 flex flex-col gap-1 text-center items-center">
            <Quote className="text-[#D4AF37] mb-2 opacity-60" size={28} />
            <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif">Kata Mereka</h2>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar">
            {pageData.testimonials.map((testi, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed italic">"{testi.text}"</p>
                <div className="mt-auto pt-4 border-t border-[#D4AF37]/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs uppercase">
                    {testi.name.charAt(0)}
                  </div>
                  <span className="text-[13px] font-bold text-[#1a1a1a]">{testi.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lokasi */}
        <section id="lokasi" className="py-12 px-6 bg-[#FAF7F2] border-b border-stone-100">
          <div className="mb-6 flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-[#1a1a1a] font-serif flex items-center gap-2">
               <MapPin className="text-[#D4AF37]" size={22} /> Lokasi Studio
            </h2>
            <p className="text-stone-500 text-xs">Kunjungi studio kami untuk melakukan fitting secara langsung.</p>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-[#D4AF37]/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#D4AF37] mt-0.5">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">{pageData.name} Studio</h4>
                <p className="text-stone-500 text-xs leading-relaxed">{pageData.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#D4AF37] mt-0.5">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a1a] mb-1">Jam Operasional</h4>
                <p className="text-stone-500 text-xs leading-relaxed">Senin - Minggu: 09:00 - 20:00<br/><span className="italic text-[#D4AF37]">*Harap reservasi sebelum fitting</span></p>
              </div>
            </div>

            <a 
              href={pageData.links.maps} 
              target="_blank" 
              rel="noreferrer"
              className="mt-2 w-full py-3 bg-white border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest rounded-xl text-center hover:bg-[#FAF7F2] transition-colors"
            >
              Buka di Google Maps
            </a>
          </div>
        </section>

        {/* Booking Form */}
        <section id="booking-form" className="py-12 px-6 bg-white">
          <div className="bg-white border border-[#D4AF37]/40 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full pointer-events-none blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full pointer-events-none blur-2xl"></div>
            
            <div className="relative z-10 mb-8 text-center">
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 font-serif">Reservasi Baju</h2>
              <p className="text-stone-500 text-xs leading-relaxed">Hubungi admin kami untuk mengecek ketersediaan busana untuk tanggal acara Anda.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest ml-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Ketik nama Anda"
                  className="w-full bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest ml-1">Tanggal Sewa (Hari H)</label>
                <input 
                  type="date" 
                  name="rentDate" 
                  required
                  className="w-full bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest ml-1">Kategori Baju</label>
                <select 
                  name="outfitType" 
                  required
                  className="w-full bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all appearance-none"
                >
                  <option value="" className="text-stone-500">Pilih kategori...</option>
                  <option value="Kebaya Modern">Kebaya Modern</option>
                  <option value="Evening Dress">Evening Dress (Gaun Malam)</option>
                  <option value="Wedding Gown">Wedding Gown (Gaun Pengantin)</option>
                  <option value="Jas Pria">Jas Pria</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest ml-1">Catatan Tambahan</label>
                <textarea 
                  name="notes" 
                  rows={2}
                  placeholder="Cth: Butuh ukuran L, warna sage green..."
                  className="w-full bg-[#FAF7F2] border border-[#D4AF37]/30 rounded-xl px-4 py-3.5 text-sm text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#B78628] text-white font-bold text-[13px] uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-colors shadow-md shadow-[#D4AF37]/20 active:scale-98"
              >
                Kirim via WhatsApp
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 pb-12 text-center flex flex-col items-center justify-center mx-6 mt-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-8"></div>
          
          <div className="w-16 h-16 rounded-full p-2 bg-white mb-4 shadow-sm border border-[#D4AF37]/30 flex items-center justify-center overflow-hidden">
            <img 
              src={pageData.profileImg} 
              alt={pageData.name} 
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] mb-1.5">{pageData.name}</h2>
          <p className="text-stone-500 text-xs max-w-[250px] mb-6">{pageData.address}</p>

          <p className="text-stone-400 text-[10px]">
            © {new Date().getFullYear()} {pageData.name}. All rights reserved.
          </p>
          
          <a 
            href="https://www.solusilokal.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-stone-400 text-[10px] mt-2 tracking-wide font-medium hover:text-[#D4AF37] transition-colors"
          >
            powered by solusilokal.id
          </a>
        </footer>

        {/* Sticky CTA bar */}
        <div 
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[432px] z-40 transition-all duration-500 ease-out ${
            showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
          }`}
        >
          <button 
            onClick={scrollToForm}
            className="w-full flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl text-[#1a1a1a] shadow-[0_10px_40px_rgba(212,175,55,0.15)] hover:bg-[#FAF7F2] active:scale-[0.98] transition-all"
          >
            <span className="font-bold text-[13px] tracking-widest uppercase text-[#1a1a1a]">Sewa Sekarang</span>
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B78628] text-white p-2 rounded-xl">
              <CalendarDays size={18} className="fill-none stroke-current stroke-2" />
            </div>
          </button>
        </div>

        {/* Lightbox Modal */}
        {lightbox.isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-50"
              onClick={closeLightbox}
            >
              <X size={20} />
            </button>
            <div className="w-full max-w-4xl max-h-[100dvh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={lightbox.image!} 
                alt="Zoomed View" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center transition-opacity"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="w-full max-w-[480px] bg-white border-t sm:border border-[#D4AF37]/30 sm:rounded-3xl rounded-t-3xl p-6 relative overflow-hidden animate-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center mb-6 relative">
                <h3 className="text-[#1a1a1a] font-bold text-[15px]">Bagikan Link Katalog</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="absolute right-0 p-1 text-stone-500 hover:bg-[#FAF7F2] rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar justify-center px-1 mb-4">
                <div className="flex flex-col items-center gap-2 min-w-[76px]">
                  <button onClick={copyToClipboard} className="w-[60px] h-[60px] rounded-full bg-[#FAF7F2] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-stone-100 transition-all shadow-sm active:scale-95">
                    {copied ? <Check size={26} className="text-[#D4AF37]" /> : <Copy size={26} />}
                  </button>
                  <span className="text-[11px] font-semibold text-stone-600 text-center">{copied ? 'Tersalin' : 'Salin Tautan'}</span>
                </div>
                <div className="flex flex-col items-center gap-2 min-w-[76px]">
                  <button onClick={shareLinks.twitter} className="w-[60px] h-[60px] rounded-full bg-stone-900 flex items-center justify-center text-white hover:bg-stone-800 transition-all shadow-sm active:scale-95">
                    <Twitter size={26} />
                  </button>
                  <span className="text-[11px] font-semibold text-stone-600 text-center">X</span>
                </div>
                <div className="flex flex-col items-center gap-2 min-w-[76px]">
                  <button onClick={shareLinks.facebook} className="w-[60px] h-[60px] rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm active:scale-95">
                    <Facebook size={26} className="fill-current" />
                  </button>
                  <span className="text-[11px] font-semibold text-stone-600 text-center">Facebook</span>
                </div>
                <div className="flex flex-col items-center gap-2 min-w-[76px]">
                  <button onClick={shareLinks.whatsapp} className="w-[60px] h-[60px] rounded-full bg-[#25D366] flex items-center justify-center text-white hover:brightness-110 transition-all shadow-sm active:scale-95">
                    <MessageCircle size={26} className="fill-current" />
                  </button>
                  <span className="text-[11px] font-semibold text-stone-600 text-center">WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
