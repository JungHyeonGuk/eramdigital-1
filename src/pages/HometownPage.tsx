import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Youtube, Sparkles, Star } from 'lucide-react';
import { YouTubeSection } from '../components/YouTubeSection';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const HometownPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-900">
      {/* Page hero */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle background stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.15, 0.6, 0.15] }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            type="button"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`group inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              scrolled
                ? 'border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-amber-300'
                : 'border-slate-700/70 bg-slate-900/40 backdrop-blur-sm text-slate-300 hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            메인으로 돌아가기
          </motion.button>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <div className="relative">
                <Star className="w-16 h-16 text-amber-400 fill-amber-400/20 animate-pulse" />
                <Sparkles className="w-7 h-7 text-amber-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </motion.div>

            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold tracking-wider uppercase"
            >
              <Youtube className="w-4 h-4" />
              Scent of Hometown
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4 mb-6 leading-tight"
            >
              고향의 <span className="text-amber-400">향수</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              시공간을 초월한 영상 속 풍경으로 떠나는 고향 여행.
              <br className="hidden sm:block" />
              그리운 마음이 깃든 10개의 장면을 만나보세요.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-400"
            >
              <span className="w-12 h-px bg-slate-700" />
              <span>총 10개의 카드 영상</span>
              <span className="w-12 h-px bg-slate-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video grid (reuses the section component) */}
      <YouTubeSection showFallbackNotice />

      {/* Bottom CTA - return to main */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-400 mb-6">
            더 많은 이람재단의 이야기를 만나보세요.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            이람재단 소개 보기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HometownPage;
