import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Star, Shield, Heart, Users, Globe,
  Clock, ChevronDown, Menu, X,
  BookOpen, Sparkles, Building2, GraduationCap,
  CheckCircle, ArrowRight, Play, Quote
} from 'lucide-react';
import { HometownPage } from './pages/HometownPage';
import { LuminaPage } from './pages/LuminaPage';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Star rating component for visual appeal
const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
    ))}
  </div>
);

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '비전', href: '/#vision' },
    { label: '서비스', href: '/#services' },
    { label: '위패 시스템', href: '/#system' },
    { label: '로드맵', href: '/#roadmap' },
    { label: '문의하기', href: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="relative">
              <Star className="w-10 h-10 text-slate-300 fill-slate-700" />
              <Sparkles className="w-5 h-5 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-slate-100">아람</span>
              <span className="block text-xs text-slate-400 tracking-wider">ARAM FOUNDATION</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
            <button className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all">
              시작하기
            </button>
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-lg border-t border-slate-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-slate-300 hover:text-amber-400 py-2 text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-semibold mt-4">
                시작하기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <Star className="w-20 h-20 text-amber-400 mx-auto fill-amber-400/20 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          불변의 <span className="text-amber-400">별자리</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 mb-4 font-light"
        >
          블록체인과 O2O가 만드는 영원한 추모의 패러다임
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          당신의 삶은 데이터가 아니라, 지워지지 않는 별자리가 됩니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2">
            <span>아람 알아보기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/hometown')}
            className="group px-8 py-4 border border-slate-600 text-slate-300 rounded-full font-semibold text-lg hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
            <span>영상 보기</span>
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </motion.div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const problems = [
    {
      icon: Users,
      title: '절손인 위기',
      description: '2대 이상 직계 비속이 없는 가구 급증. 돌볼 가족의 부재로 노후 케어와 사후 추모 영속성 단절.',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Globe,
      title: '재외동포 및 고려인',
      description: '물리적 거리가 멀어 고국에서의 노후 생활 및 오프라인 추도식 참석이 불가능한 지리적 디아스포라.',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Building2,
      title: '물리적 묘지의 한계',
      description: '장사 시설 및 묘지 공간 절대적 부족. 벌초 등 산소 관리의 번거로움과 방치되는 묘역 증가.',
      color: 'from-slate-500/20 to-slate-600/20'
    }
  ];

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            잊혀질 두려움
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            현대 인구 구조가 직면한<br />추모의 단절
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-3xl mx-auto">
           가족이라고 부를 사람이 없어 故人의 추억이 끊어지는 위기가 늘어나고 있습니다
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${problem.color} border border-slate-700/50 hover:border-amber-500/30 transition-all group`}
            >
              <div className="absolute inset-0 bg-slate-800/40 rounded-2xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <problem.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-slate-400 leading-relaxed">{problem.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Comparison Section
const ComparisonSection = () => {
  const comparisons = [
    { label: '공간 제약', traditional: '심각함 (국토 훼손)', digital: '공간 무제한', aram: '공간 무제한 (메타버스 확장)', highlight: false },
    { label: '현행 법적 분쟁 리스크', traditional: '규제 심함', digital: '리스크 낮음', aram: '유해 없는 위패 안치 (법적 자유 확보)', highlight: true },
    { label: '후손 개입 필요성', traditional: '필수 (벌초, 관리, 제사)', digital: '불필요 (미납 시 계정 삭제)', aram: '스마트 컨트랙트 자동화', highlight: false },
    { label: '데이터의 영구 보존성', traditional: '시간 지나면 훼손 방치됨', digital: '서버 종료 시 영구 삭제', aram: '블록체인 분산 원장', highlight: true },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            From ashes to memories
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            '유해'에서 '기억'으로
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            규제를 넘어선 위패 중심 아카이브 시스템
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-6 text-slate-400 font-medium">구분</th>
                <th className="text-center py-4 px-6 text-slate-500 font-medium">전통 묘지 / 일반 납골당</th>
                <th className="text-center py-4 px-6 text-slate-500 font-medium">기존 일반 디지털 추모</th>
                <th className="text-center py-4 px-6 text-amber-400 font-medium">아람 블록체인 O2O 위패</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <motion.tr
                  key={index}
                  variants={fadeInUp}
                  className={`border-b border-slate-800/50 ${row.highlight ? 'bg-amber-500/5' : ''}`}
                >
                  <td className="py-5 px-6 text-white font-medium">{row.label}</td>
                  <td className="py-5 px-6 text-center text-slate-400">{row.traditional}</td>
                  <td className="py-5 px-6 text-center text-slate-400">{row.digital}</td>
                  <td className="py-5 px-6 text-center">
                    <span className={`${row.highlight ? 'text-amber-400' : 'text-slate-300'}`}>
                      {row.aram}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

// Vision Section
const VisionSection = () => {
  return (
    <section id="vision" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">아람 트라이앵글</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              생애 복지와<br />영원한 기억의 결합
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              아람재단은 블록체인 기술과 O2O 인프라를 결합하여,<br />
              누구도 홀로 지지 않는 세상을 만들어갑니다.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">스마트 컨트랙트 신뢰</h4>
                  <p className="text-slate-400 text-sm">ARAM 코인 생태계를 통한 투명한 자산 운용. 상속자 없이도 100% 이행되는 사후 관리 자동화</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">절손인 무상복지</h4>
                  <p className="text-slate-400 text-sm">유니실버 및 리슨 파크 운영. 2대 이상 직계 비속이 없는 가구 및 재외동포를 위한 프리미엄 노후 주거·케어 무상 지원</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">O2O 위패 봉안</h4>
                  <p className="text-slate-400 text-sm">QR과 AI 기술을 결합하여 시공간 제약 없이 가족을 잇는 메타버스 추모 인프라</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50">
              {/* Triangle visualization */}
              <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Triangle lines */}
                  <line x1="200" y1="50" x2="350" y2="300" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="350" y1="300" x2="50" y2="300" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="50" y1="300" x2="200" y2="50" stroke="#d97706" strokeWidth="2" strokeDasharray="5,5" />

                  {/* Nodes */}
                  <circle cx="200" cy="50" r="40" fill="#1e293b" stroke="#d97706" strokeWidth="3" />
                  <circle cx="350" cy="300" r="40" fill="#1e293b" stroke="#d97706" strokeWidth="3" />
                  <circle cx="50" cy="300" r="40" fill="#1e293b" stroke="#d97706" strokeWidth="3" />

                  {/* Center */}
                  <circle cx="200" cy="200" r="60" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />

                  {/* Icons in nodes */}
                  <text x="200" y="55" textAnchor="middle" fill="#f59e0b" fontSize="20">⬡</text>
                  <text x="350" y="305" textAnchor="middle" fill="#f59e0b" fontSize="20">♥</text>
                  <text x="50" y="305" textAnchor="middle" fill="#f59e0b" fontSize="20">◯</text>
                  <text x="200" y="205" textAnchor="middle" fill="#f59e0b" fontSize="24">★</text>
                </svg>
              </div>
            </div>

            {/* Floating labels */}
            <div className="absolute top-8 right-8 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-amber-400 text-sm font-medium">스마트 컨트랙트</span>
            </div>
            <div className="absolute bottom-8 right-8 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-amber-400 text-sm font-medium">O2O 위패</span>
            </div>
            <div className="absolute bottom-8 left-8 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-amber-400 text-sm font-medium">무상복지</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Memorial Park Section
const MemorialParkSection = () => {
  const zones = [
    { name: '먼길지기', subtitle: '고려인 구역', description: '유랑의 역사를 마치고 마침내 당은 따뜻한 조국 산천입니다.' },
    { name: '이람누리', subtitle: '설립자 및 중심 시설', description: '제단의 중심을 잡아주는 추모관 및 오프라인 위패 봉안소.' },
    { name: '늘봄', subtitle: '절손인 구역', description: '이름 뒤에 남을 자손은 없어도, 우리가 당신의 가족이 되겠습니다.' },
    { name: '가온길', subtitle: '재외동포 구역', description: '해방의 기쁨 안고 떠난 먼 길, 고국 품에서 평안히 잠드소서.' },
    { name: '나눔샘', subtitle: '후원자 구역', description: '당신의 마음 한 줌이 영원한 안식이 되있습니다.' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            Physical Sanctuary
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            물리적 안식처
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            철학이 깃든 메모리얼 PARK 공간 매핑
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {zones.map((zone, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/30 transition-all ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{zone.name}</h4>
                  <span className="text-amber-400/70 text-xs">{zone.subtitle}</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{zone.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700/50 text-center"
        >
          <p className="text-slate-300 text-lg">
            공간의 한계를 넘는 <span className="text-amber-400 font-semibold">'메타버스 추모관'</span>과 유기적으로 연결된 하이브리드 추모 생태계
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// NFT System Section
const NFTSystemSection = () => {
  const features = [
    {
      icon: '👁️',
      title: 'Biometric & AI Assets',
      subtitle: '생체 자산',
      description: 'AI 디지털 트윈 구동을 위한 고해상도 시청각 데이터(얼굴 형태, 음성 파형)의 암호화된 해시값.'
    },
    {
      icon: '⚙️',
      title: 'Smart Contract Code',
      subtitle: '자동 실행 코드',
      description: '재단 운영 자산과 연동되어 영구적인 시스템 유지보수와 매년 메타버스 추도식을 자동으로 실행하는 스크릿트.'
    },
    {
      icon: '🆔',
      title: 'Identity Data',
      subtitle: '불변의 신원',
      description: '고인의 훼손되지 않는 고유 신원 정보 및 블록체인 상에 영구 기록된 고유 식별 지갑 주소.'
    },
    {
      icon: '📜',
      title: 'Lineage Vault',
      subtitle: '가문 기록 보관소',
      description: '대를 잇는 가문의 역사, 족보, 가업의찰학 등 철저히 암호화된 프라이빗 아카이브 기록.'
    },
  ];

  return (
    <section id="system" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            Technical Permanence
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            세계 최초 대체불가 위패<br />
            <span className="text-amber-400">NFT Memorial Tablet</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            블록체인 기술 기반의 불변의 디지털 위패 시스템
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">{feature.subtitle}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// AI Features Section
const AIFeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: '물리적 O2O 브릿지',
      subtitle: 'QR 추모 태그',
      description: '스크래치와 변색이 없는 블랙 아노다이징 알루미늄 태그. 별도 앱 설치 없이 현장에서 즉시 고인의 디지털 추모 페이지로 연결.'
    },
    {
      icon: Sparkles,
      title: '소울링크 & AI 디지털 트윈',
      subtitle: '양방향 소통',
      description: '사진 한 장과 짧은 음성 데이터로 고인의 목소리와 말투 완벽 재현. 유가족과의 실시간 채팅, 음성 통화, 편지 답장 등 양방향 소통 제공.'
    },
    {
      icon: Shield,
      title: '영구적 아카이빙 및 프라이버시',
      subtitle: '세대를 잇는 기록',
      description: '세대와 세대를 잇는 가족 관계도 보존. 세밀한 비공개 설정을 통한 철저한 데이터 주권 및 방문자 간 소통 지원.',
      link: '/lumina'
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            Cross-Generational Dialogue
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            세대를 잇는 대화
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            QR과 AI가 되살리는 양방향 소통
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-amber-500/30 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                <span className="text-xs text-amber-400/70 mb-3 block">{feature.subtitle}</span>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                {feature.link && (
                  <a
                    href={feature.link}
                    className="mt-4 inline-flex items-center gap-1 text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
                  >
                    LUMINA 알아보기
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Economy Section
const EconomySection = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Self-Sustaining Economy</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              자립형<br />
              크립토-이코노미
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              ARAM 코인 생태계의 선순환 구조를 통해<br />
              자산 가치 상승이 곧 추모 복지의 확대로 이어지는<br />
              완벽한 자립형 경제를 구축합니다.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">재단 운영 기금 순환</h4>
                  <p className="text-slate-400 text-sm">소득사업법인과 후원회를 통한 지속적 수익 창출. 수익은 절손인 무상복지와 재단 운영에 최우선 귀속.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <span className="text-xl">🎫</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">디지털 멤버십 바우처</h4>
                  <p className="text-slate-400 text-sm">상장 전 구매를 통한 선제적 가격 혜택. 재단의 모든 오프라인 시설 및 프리미엄 서비스 이용 권리 부여.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <span className="text-xl">📜</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">스마트 봉안 계약</h4>
                  <p className="text-slate-400 text-sm">오프라인 봉안 비용의 일부를 ARAM 코인으로 결제. 인간의 개입을 배제한 투명하고 확실한 사후 약속 체결.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-slate-700/50 flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-amber-500/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
                    <Star className="w-16 h-16 text-amber-400 fill-amber-400/30" />
                  </div>
                </div>
                {/* Orbiting elements */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-16 h-16 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
                    }}
                    animate={{ rotate: [angle, angle + 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="text-2xl">
                      {i === 0 ? '💰' : i === 1 ? '🎫' : '📜'}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Roadmap Section
const RoadmapSection = () => {
  const phases = [
    {
      phase: 'Step 1',
      period: '1~3년',
      title: '인프라 구축 및 권위 확보',
      items: [
        '보은 영면관 및 메모리얼 PARK 부지 조성',
        '디지털 아카이브 기초 시스템 설계',
        '비영리 공익법인 자격 획득 및 초기 기본재산 운용'
      ],
      status: 'current'
    },
    {
      phase: 'Step 2',
      period: '4~7년',
      title: '학술·콘텐츠 수익화',
      items: [
        '『이람 학술 연구지』 발간 및 생애 다큐 시리즈 제작',
        '맞춤형 프리미엄 장례 의전 및 디지털 멤버십 바우처 수익 모델 본격화'
      ],
      status: 'upcoming'
    },
    {
      phase: 'Step 3',
      period: '8년 이후',
      title: '글로벌 네트워크 및 완전 자립',
      items: [
        '전 세계 디아스포라를 잇는 O2O 메타버스 추모 네트워크 완성',
        '크립토-이코노미 기반의 100% 재정 자립형 생태계 구축'
      ],
      status: 'upcoming'
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            10-Year Master Plan
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            지속 가능한 비전
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            장기 성장 마스터플랜
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
              >
                <div className={`md:flex items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className={`p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 ${
                      phase.status === 'current' ? 'border-amber-500/30 bg-amber-500/5' : ''
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          phase.status === 'current'
                            ? 'bg-amber-500 text-slate-900'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {phase.phase}
                        </span>
                        <span className="text-slate-500 text-sm">{phase.period}</span>
                      </div>
                      <h4 className="text-white font-semibold text-xl mb-4">{phase.title}</h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                            <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline node */}
                  <div className="hidden md:flex w-8 h-8 rounded-full bg-slate-800 border-4 border-amber-500 items-center justify-center absolute left-1/2 -translate-x-1/2">
                    {phase.status === 'current' && <div className="w-3 h-3 rounded-full bg-amber-400" />}
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="md:w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Quote Section
const QuoteSection = () => {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Quote className="w-12 h-12 text-amber-400/30 mx-auto mb-8" />
          <blockquote className="font-serif text-3xl md:text-4xl text-white leading-relaxed mb-8">
            "우리는 물리적 유해의 보존이라는 과거를 넘어,<br />
            모든 인간이 존엄하게 기억되는<br />
            <span className="text-amber-400">불변의 별자리</span>를 완성할 것입니다."
          </blockquote>
          <p className="text-slate-400 text-lg">근본을 잇고 꿈을 경작하다</p>
          <p className="text-slate-500 text-sm mt-2">Connecting Roots, Cultivating Dreams</p>
        </motion.div>
      </div>
    </section>
  );
};

// Timeline Section
const TimelineSection = () => {
  const steps = [
    {
      phase: 'Phase 1',
      title: '계약 및 예치 (생전)',
      description: '회원이 ARAM 코인으로 생애 복지 및 사후 관리 계약 체결. 블록체인 상에 스마트 컨트랙트 영구 잠금(Lock).',
      icon: '📝'
    },
    {
      phase: 'Phase 2',
      title: '생애 복지 제공 (생전)',
      description: '재외동포 및 절손인 고국 귀환. 유니실버 및 리슨 파크에서 평생 안락한 주거와 무상 노후 프리미엄 케어 수혜.',
      icon: '🏠'
    },
    {
      phase: 'Phase 3',
      title: '사후 자동 트리거 (사망 시점)',
      description: '사망 공식 확인 시점, 유족이나 인간의 개입 없이 블록체인 네트워크가 자체적으로 다음 단계를 자동 실행.',
      icon: '⚡'
    },
    {
      phase: 'Phase 4',
      title: '영구 추모 실행 (사후)',
      description: '대체불가 위패(NFT) 메타버스 봉안 완료. 기금 연동을 통해 매년 디지털 추도식 영구적 개최 보장.',
      icon: '⭐'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-amber-400 text-sm font-semibold tracking-wider uppercase">
            100% Guarantee Promise
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            100% 이행의 약속
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
            생애부터 영원까지 이어지는 자동화 타임라인
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                    {step.phase}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-3">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-600" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              아람재단과<br />함께하세요
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              영원한 기억을 위한 여정을 시작합니다.<br />
              언제든지 문의해 주세요.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">웹사이트</p>
                  <a href="https://aram-global.com" className="text-white hover:text-amber-400 transition-colors">
                    contact@aram-global.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">위치</p>
                  <p className="text-white">충청북도 보은군</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6">
              <div>
                <label className="block text-slate-300 text-sm mb-2">이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="이름을 입력해 주세요"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">이메일</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                  placeholder="이메일을 입력해 주세요"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">메시지</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors resize-none"
                  placeholder="메시지를 입력해 주세요"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all"
              >
                메시지 보내기
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-slate-400" />
            <div>
              <span className="font-serif text-xl font-bold text-slate-200">아람 글로벌 재단법인</span>
              <span className="block text-xs text-slate-500 tracking-wider">ARAM GLOBAL FOUNDATION</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-amber-400 transition-colors">이용약관</a>
            <span>© 2026 Aram Foundation. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main page (all original sections, except YouTube which is on its own route)
const MainPage = () => (
  <>
    <HeroSection />
    <ProblemSection />
    <ComparisonSection />
    <VisionSection />
    <MemorialParkSection />
    <NFTSystemSection />
    <AIFeaturesSection />
    <EconomySection />
    <TimelineSection />
    <RoadmapSection />
    <QuoteSection />
    <ContactSection />
  </>
);

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans antialiased">
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hometown" element={<HometownPage />} />
        <Route path="/lumina" element={<LuminaPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
