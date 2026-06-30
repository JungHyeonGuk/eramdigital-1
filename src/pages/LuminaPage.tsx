import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';

const LuminaLogo = () => (
  <div className="flex items-center gap-3">
    <motion.span
      className="w-[10px] h-[10px] rounded-full bg-[#d8a657] shadow-[0_0_12px_#d8a657]"
      animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <span className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[26px] tracking-[0.18em] font-medium text-[#f4eee2]">
      LUMINA
    </span>
  </div>
);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b border-[rgba(216,166,87,0.08)] ${
        scrolled
          ? 'py-[14px] bg-[rgba(8,8,10,0.85)] backdrop-blur-[20px]'
          : 'py-5 bg-[rgba(8,8,10,0.6)] backdrop-blur-[20px]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
        <a href="#top" className="no-underline text-inherit">
          <LuminaLogo />
        </a>
        <div className="hidden md:flex items-center gap-10">
          {['비전', '5대 전략', '프로세스', '보안'].map((label, i) => {
            const href = ['#vision', '#features', '#process', '#security'][i];
            return (
              <a
                key={label}
                href={href}
                className="text-[13px] tracking-[0.12em] uppercase text-[#c9c1ad] font-medium no-underline transition-colors duration-300 hover:text-[#d8a657]"
              >
                {label}
              </a>
            );
          })}
          <a
            href="#join"
            className="px-[22px] py-[10px] border border-[#d8a657] text-[#d8a657] text-[12px] tracking-[0.18em] uppercase no-underline transition-all duration-300 hover:bg-[#d8a657] hover:text-[#08080a]"
          >
            웨이트리스트
          </a>
        </div>
        <button
          className="md:hidden text-[#c9c1ad]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d10] border-t border-[rgba(216,166,87,0.08)] px-8 py-6 space-y-4"
          >
            {['비전', '5대 전략', '프로세스', '보안'].map((label, i) => {
              const href = ['#vision', '#features', '#process', '#security'][i];
              return (
                <a
                  key={label}
                  href={href}
                  className="block text-[#c9c1ad] hover:text-[#d8a657] text-lg no-underline"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
            <a
              href="#join"
              className="block text-center px-[22px] py-[10px] border border-[#d8a657] text-[#d8a657] text-sm tracking-[0.18em] uppercase no-underline mt-4"
              onClick={() => setMenuOpen(false)}
            >
              웨이트리스트
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Reveal = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionNum = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-[14px] text-[13px] tracking-[0.3em] text-[#d8a657] font-['Cormorant_Garamond','Noto_Serif_KR',serif] mb-5">
    {children}
    <span className="flex-1 max-w-[60px] h-px bg-[#d8a657]" />
  </div>
);

export const LuminaPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[#08080a] text-[#f4eee2] font-['Inter','Noto_Sans_KR',-apple-system,sans-serif] antialiased overflow-x-hidden">
      {/* film grain */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* ambient light */}
      <div
        className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(216,166,87,0.10) 0%, transparent 60%)',
        }}
      />

      <NavBar />

      {/* Back to Aram link */}
      <div className="fixed top-24 left-8 z-[60]">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-[rgba(216,166,87,0.18)] text-[#c9c1ad] bg-[rgba(8,8,10,0.6)] backdrop-blur-[10px] transition-all duration-300 hover:border-[#d8a657] hover:text-[#d8a657]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          이람재단
        </button>
      </div>

      {/* ============ HERO ============ */}
      <header
        id="top"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 pt-[140px] pb-20"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,8,10,0.4) 0%, rgba(8,8,10,0.95) 100%), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 1600 900'><defs><linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%231a1a20'/><stop offset='100%25' stop-color='%2308080a'/></linearGradient><radialGradient id='g2' cx='0.3' cy='0.4' r='0.5'><stop offset='0%25' stop-color='%23d8a657' stop-opacity='0.18'/><stop offset='100%25' stop-color='%2308080a' stop-opacity='0'/></radialGradient></defs><rect fill='url(%23g1)' width='1600' height='900'/><rect fill='url(%23g2)' width='1600' height='900'/><g opacity='0.15' stroke='%23d8a657' stroke-width='0.5' fill='none'><circle cx='200' cy='200' r='100'/><circle cx='1400' cy='700' r='180'/><circle cx='800' cy='450' r='250'/></g></svg>\")",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        {/* frame corners */}
        <div className="absolute inset-[60px_32px] border border-[rgba(216,166,87,0.08)] pointer-events-none hidden md:block">
          <span className="absolute -top-px -left-px w-[30px] h-[30px] border-t border-l border-[#d8a657]" />
          <span className="absolute -bottom-px -right-px w-[30px] h-[30px] border-b border-r border-[#d8a657]" />
        </div>
        <div className="relative z-[2] max-w-[1100px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="inline-flex items-center gap-[14px] text-[12px] tracking-[0.3em] uppercase text-[#d8a657] font-medium mb-8"
          >
            <span className="w-[40px] h-px bg-[#d8a657]" />
            Life Narrative Platform · 2026
            <span className="w-[40px] h-px bg-[#d8a657]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(48px,8vw,110px)] font-normal leading-[1.05] tracking-[-0.02em] text-[#f4eee2] mb-8"
          >
            Your life, <em className="italic text-[#d8a657] not-italic font-medium">reimagined</em>
            <span className="block font-['Noto_Serif_KR',serif] font-light text-[0.42em] text-[#c9c1ad] tracking-[0.04em] mt-5">
              — 당신의 일상이 하나의 서사가 됩니다
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-[clamp(15px,1.4vw,18px)] leading-[1.8] text-[#c9c1ad] max-w-[720px] mx-auto mb-12 font-light"
          >
            단순한 기록을 넘어, AI가 당신의 일생에서 의미 있는 순간을 발굴하고 아카이빙하여
            <br />
            평생 보존되는{' '}
            <strong style={{ color: '#d8a657' }}>개인 맞춤형 라이프 시네마</strong>로 재탄생시킵니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex gap-5 justify-center flex-wrap"
          >
            <a
              href="#join"
              className="px-[38px] py-[18px] text-[13px] tracking-[0.2em] uppercase font-medium bg-[#d8a657] text-[#08080a] no-underline transition-all duration-400 hover:bg-[#f1c987] hover:-translate-y-[2px] inline-flex items-center gap-3"
            >
              사전 예약하기
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#vision"
              className="px-[38px] py-[18px] text-[13px] tracking-[0.2em] uppercase font-medium border border-[#4a4640] text-[#f4eee2] no-underline transition-all duration-300 hover:border-[#d8a657] hover:text-[#d8a657] inline-flex items-center gap-3"
            >
              비전 살펴보기
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-[50px] items-center text-[11px] tracking-[0.25em] uppercase text-[#4a4640]"
        >
          <span className="flex items-center gap-2">
            <span className="w-[4px] h-[4px] rounded-full bg-[#d8a657]" />
            AI-Driven
          </span>
          <span className="flex items-center gap-2">
            <span className="w-[4px] h-[4px] rounded-full bg-[#d8a657]" />
            End-to-End Archiving
          </span>
          <span className="flex items-center gap-2">
            <span className="w-[4px] h-[4px] rounded-full bg-[#d8a657]" />
            Privacy First
          </span>
        </motion.div>
      </header>

      {/* ============ VISION ============ */}
      <section id="vision" className="relative z-[2] py-[140px]">
        <div className="max-w-[980px] mx-auto px-8 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-[14px] text-[13px] tracking-[0.3em] text-[#d8a657] font-['Cormorant_Garamond','Noto_Serif_KR',serif] mb-5">
              <span className="w-[40px] h-px bg-[#d8a657]" />
              — Manifesto —
              <span className="w-[40px] h-px bg-[#d8a657]" />
            </div>
            <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-[#f4eee2] mb-5">
              기억은 <em className="not-italic italic text-[#d8a657]">보존</em>되는 것이 아니라,
              <br />
              <em className="not-italic italic text-[#d8a657]">서사</em>로 살아남습니다
            </h2>
            <p className="text-base leading-[1.8] text-[#c9c1ad] max-w-[640px] mx-auto font-light mt-6">
              인간의 일생은 약 4만 시간의 깨어 있는 시간으로 채워집니다.
              <br />
              LUMINA는 그 모든 시간의 파편들을 AI가 읽어내어, 단 한 편의 영화처럼 다듬습니다.
            </p>
            <p className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(22px,2.6vw,32px)] leading-[1.6] text-[#f4eee2] max-w-[820px] mx-auto mt-[60px] font-light italic">
              <span className="text-[#d8a657] text-[1.4em] align-[-0.1em] mx-[6px]">"</span>나는 나의 삶을 회상하고 싶을 때, 내 손 안에서 영화를 재생한다.
              <span className="text-[#d8a657] text-[1.4em] align-[-0.1em] mx-[6px]">"</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section
        id="features"
        className="relative z-[2] py-[140px]"
        style={{ background: 'linear-gradient(180deg, #08080a 0%, #0d0d10 50%, #08080a 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <Reveal>
            <SectionNum>— 01 / 05 —</SectionNum>
            <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-[#f4eee2] mb-5">
              다섯 개의 엔진이 만드는 <em className="not-italic italic text-[#d8a657]">당신의 서사</em>
            </h2>
            <p className="text-base leading-[1.8] text-[#c9c1ad] max-w-[640px] font-light">
              라이프로깅부터 AI 복원, 보안까지 — 단절 없는 5단계 기술 파이프라인이 당신의 삶을 다층적으로 기록하고 재구성합니다.
            </p>
          </Reveal>

          {[
            {
              num: 'STRATEGY 01',
              title: '다각적 ',
              em: '라이프 로깅',
              desc: '단순한 텍스트 일기를 넘어, AI가 사용자의 입체적 데이터를 자동으로 수집·해석하여 일상 하나하나를 맥락 있는 기록으로 변환합니다.',
              list: [
                { tag: 'Auto', text: <><strong>스마트폰 자동 수집</strong> — 메시지, 이메일, 일정, 위치 정보를 AI가 종합 분석하여 사용자의 행동을 자연어로 구조화</> },
                { tag: 'Bio', text: <><strong>감정 & 생체 정보</strong> — 감정 키워드와 센서 데이터를 결합해 당시의 맥락을 풍부하게 보존</> },
                { tag: 'Recall', text: <><strong>시각적 재구성의 토대</strong> — 추후 콘텐츠 제작 시 가장 생생한 회상을 가능하게 하는 1차 원천 데이터</> },
              ],
              reverse: false,
              label: 'F.01 · Logging',
            },
            {
              num: 'STRATEGY 02',
              title: '평생 보존을 위한 ',
              em: '아카이빙 인프라',
              desc: '수십 년에 걸친 대용량 데이터를 잃지 않기 위해, 계층형 스토리지와 무결성 검증으로 데이터의 영속성을 보장합니다.',
              list: [
                { tag: 'Hot', text: <><strong>SSD 고속 티어</strong> — 자주 사용되는 활성 데이터는 초저지연으로 즉시 접근</> },
                { tag: 'Warm', text: <><strong>HDD 대용량 티어</strong> — 원본 파일과 백업본을 비용 효율적으로 보관</> },
                { tag: 'Cold', text: <><strong>LTO 테이프 티어</strong> — 최종 영구 보존본은 가장 안정적인 오프라인 미디어에 격리</> },
                { tag: 'Fixity', text: <><strong>체크섬 정기 검증</strong> — AI가 비트 단위 무결성을 자동 모니터링하여 손상·변조를 조기 탐지</> },
              ],
              reverse: true,
              label: 'F.02 · Archive',
            },
            {
              num: 'STRATEGY 03',
              title: 'AI 기반 ',
              em: '서사 구조화',
              desc: '축적된 데이터의 의미를 AI가 해석하여, 사용자가 직접 찾아볼 때도 그 자체로 하나의 이야기가 되도록 설계합니다.',
              list: [
                { tag: 'OCR/STT', text: <><strong>멀티모달 메타데이터 추출</strong> — 이미지·영상·음성에서 텍스트와 키워드를 자동 태깅하여 '인생의 목차'를 구성</> },
                { tag: '4D UI', text: <><strong>시간축 스토리텔링 GUI</strong> — 4차원적 인터페이스로 데이터를 탐색하는 것 자체가 하나의 영화를 감상하는 경험으로 전환</> },
                { tag: 'Context', text: <><strong>맥락 기반 클러스터링</strong> — 사람, 장소, 감정, 사건 단위로 데이터가 자동으로 묶이며 의미가 드러남</> },
              ],
              reverse: false,
              label: 'F.03 · Narrative AI',
            },
            {
              num: 'STRATEGY 04',
              title: '개인 맞춤형 ',
              em: '서사물 콘텐츠 제작',
              desc: '아카이브는 \'보관함\'에서 멈추지 않습니다. AI가 사용자 취향에 맞는 영화·다큐멘터리급 결과물을 자동 생성합니다.',
              list: [
                { tag: 'Gen', text: <><strong>멀티모달 요약 & 생성</strong> — 텍스트·이미지·영상을 통합 분석하여 취향 기반 서사 구조로 재구성</> },
                { tag: 'Restore', text: <><strong>AI 디지털 복원</strong> — 오래된 사진, 저화질 영상, 노이즈 심한 음원을 초해상화하여 영화 퀄리티로 재탄생</> },
                { tag: 'Style', text: <><strong>장르 & 톤 선택</strong> — 다큐멘터리, 시네마, 다이어리 등 사용자가 원하는 형식으로 자동 연출</> },
              ],
              reverse: true,
              label: 'F.04 · Production',
            },
            {
              num: 'STRATEGY 05',
              title: '데이터 보안 & ',
              em: '프라이버시 전주기 보호',
              desc: '가장 민감한 개인정보를 다루는 서비스이므로, 모든 단계에서 \'감시가 아닌 도움\'이 되는 보안 철학을 구현합니다.',
              list: [
                { tag: 'Privacy', text: <><strong>프라이버시 중심 설계</strong> — 수집·저장·활용·파기 전 과정에 걸친 R&D 로드맵 준수</> },
                { tag: 'User', text: <><strong>이용자 자율성 보장</strong> — 무엇이 언제 기록되는지 사용자가 명확히 인지하고 통제</> },
                { tag: 'Boundary', text: <><strong>사생활 경계 존중</strong> — '무분별한 감시'가 아닌 '삶에 도움되는 정보 축적'으로 엄격히 구분</> },
              ],
              reverse: false,
              label: 'F.05 · Security',
            },
          ].map((feat, i) => (
            <Reveal key={i}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center mb-[140px] last:mb-0 ${
                  feat.reverse ? 'lg:direction-rtl' : ''
                }`}
              >
                <div
                  className={`relative aspect-[4/3] border border-[rgba(216,166,87,0.18)] bg-[#141418] overflow-hidden ${
                    feat.reverse ? 'lg:order-last' : ''
                  }`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 30%, rgba(216,166,87,0.15), transparent 60%)',
                    }}
                  />
                  <span className="absolute top-3 left-3 w-[18px] h-[18px] border-t border-l border-[#d8a657]" />
                  <span className="absolute bottom-3 right-3 w-[18px] h-[18px] border-b border-r border-[#d8a657]" />
                  <span className="absolute top-5 right-5 font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[11px] tracking-[0.3em] text-[#d8a657] uppercase">
                    {feat.label}
                  </span>
                  {/* SVG illustration */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {i === 0 && (
                      <svg viewBox="0 0 200 200" fill="none" className="w-[70%] h-[70%]">
                        <circle cx="100" cy="100" r="80" stroke="#d8a657" strokeWidth="0.5" opacity="0.3" />
                        <circle cx="100" cy="100" r="55" stroke="#d8a657" strokeWidth="0.5" opacity="0.5" />
                        <circle cx="100" cy="100" r="30" stroke="#d8a657" strokeWidth="0.8" />
                        <circle cx="100" cy="100" r="3" fill="#d8a657" />
                        <g stroke="#d8a657" strokeWidth="0.5" opacity="0.6">
                          <line x1="100" y1="20" x2="100" y2="40" />
                          <line x1="100" y1="160" x2="100" y2="180" />
                          <line x1="20" y1="100" x2="40" y2="100" />
                          <line x1="160" y1="100" x2="180" y2="100" />
                          <line x1="44" y1="44" x2="58" y2="58" />
                          <line x1="142" y1="142" x2="156" y2="156" />
                          <line x1="156" y1="44" x2="142" y2="58" />
                          <line x1="58" y1="142" x2="44" y2="156" />
                        </g>
                        <g fill="#d8a657" opacity="0.7">
                          <circle cx="100" cy="45" r="2" />
                          <circle cx="155" cy="100" r="2" />
                          <circle cx="100" cy="155" r="2" />
                          <circle cx="45" cy="100" r="2" />
                          <circle cx="60" cy="60" r="1.5" />
                          <circle cx="140" cy="60" r="1.5" />
                          <circle cx="60" cy="140" r="1.5" />
                          <circle cx="140" cy="140" r="1.5" />
                        </g>
                      </svg>
                    )}
                    {i === 1 && (
                      <svg viewBox="0 0 200 200" fill="none" className="w-[70%] h-[70%]">
                        <g stroke="#d8a657" fill="none" strokeWidth="0.5">
                          <ellipse cx="100" cy="50" rx="40" ry="10" opacity="0.9" />
                          <line x1="60" y1="50" x2="60" y2="80" opacity="0.4" />
                          <line x1="140" y1="50" x2="140" y2="80" opacity="0.4" />
                          <ellipse cx="100" cy="80" rx="40" ry="10" opacity="0.4" />
                          <ellipse cx="100" cy="105" rx="55" ry="14" opacity="0.7" />
                          <line x1="45" y1="105" x2="45" y2="140" opacity="0.5" />
                          <line x1="155" y1="105" x2="155" y2="140" opacity="0.5" />
                          <ellipse cx="100" cy="140" rx="55" ry="14" opacity="0.5" />
                          <ellipse cx="100" cy="160" rx="70" ry="18" opacity="0.8" />
                          <line x1="30" y1="160" x2="30" y2="185" opacity="0.6" />
                          <line x1="170" y1="160" x2="170" y2="185" opacity="0.6" />
                        </g>
                        <g fill="#d8a657" opacity="0.8">
                          <circle cx="100" cy="50" r="2" />
                          <circle cx="100" cy="105" r="2" />
                          <circle cx="100" cy="160" r="2" />
                        </g>
                      </svg>
                    )}
                    {i === 2 && (
                      <svg viewBox="0 0 200 200" fill="none" className="w-[70%] h-[70%]">
                        <g fill="none" stroke="#d8a657" strokeWidth="0.5">
                          <rect x="20" y="40" width="20" height="14" opacity="0.5" />
                          <rect x="50" y="40" width="20" height="14" opacity="0.7" />
                          <rect x="80" y="40" width="20" height="14" opacity="0.9" />
                          <rect x="110" y="40" width="20" height="14" opacity="0.7" />
                          <rect x="140" y="40" width="20" height="14" opacity="0.5" />
                          <rect x="35" y="65" width="20" height="14" opacity="0.6" />
                          <rect x="65" y="65" width="20" height="14" opacity="0.85" />
                          <rect x="95" y="65" width="20" height="14" opacity="0.6" />
                          <rect x="125" y="65" width="20" height="14" opacity="0.85" />
                          <rect x="20" y="90" width="20" height="14" opacity="0.5" />
                          <rect x="50" y="90" width="20" height="14" opacity="0.7" />
                          <rect x="80" y="90" width="20" height="14" opacity="0.5" />
                          <rect x="110" y="90" width="20" height="14" opacity="0.7" />
                          <rect x="140" y="90" width="20" height="14" opacity="0.5" />
                        </g>
                        <g stroke="#d8a657" strokeWidth="0.6" fill="none" opacity="0.8">
                          <path d="M 30 130 Q 60 115, 80 130 T 130 130 T 170 130" />
                        </g>
                        <g fill="#d8a657" opacity="0.9">
                          <circle cx="30" cy="130" r="2" />
                          <circle cx="80" cy="130" r="2" />
                          <circle cx="130" cy="130" r="2" />
                          <circle cx="170" cy="130" r="2" />
                        </g>
                        <g stroke="#d8a657" strokeWidth="0.3" fill="none" opacity="0.4">
                          <line x1="30" y1="130" x2="30" y2="160" />
                          <line x1="80" y1="130" x2="80" y2="160" />
                          <line x1="130" y1="130" x2="130" y2="160" />
                          <line x1="170" y1="130" x2="170" y2="160" />
                        </g>
                        <g fill="#f4eee2" opacity="0.7" fontFamily="serif" fontSize="7">
                          <text x="30" y="175" textAnchor="middle">2021</text>
                          <text x="80" y="175" textAnchor="middle">2022</text>
                          <text x="130" y="175" textAnchor="middle">2023</text>
                          <text x="170" y="175" textAnchor="middle">2024</text>
                        </g>
                      </svg>
                    )}
                    {i === 3 && (
                      <svg viewBox="0 0 200 200" fill="none" className="w-[70%] h-[70%]">
                        <g fill="none" stroke="#d8a657" strokeWidth="0.6">
                          <rect x="30" y="60" width="140" height="80" />
                          <line x1="30" y1="60" x2="40" y2="50" />
                          <line x1="170" y1="60" x2="180" y2="50" />
                          <line x1="30" y1="140" x2="40" y2="150" />
                          <line x1="170" y1="140" x2="180" y2="150" />
                        </g>
                        <g fill="#d8a657" opacity="0.3">
                          <rect x="50" y="78" width="100" height="44" />
                        </g>
                        <g stroke="#d8a657" strokeWidth="0.4" opacity="0.6">
                          <line x1="50" y1="78" x2="150" y2="78" />
                          <line x1="50" y1="89" x2="150" y2="89" />
                          <line x1="50" y1="100" x2="150" y2="100" />
                          <line x1="50" y1="111" x2="150" y2="111" />
                          <line x1="50" y1="122" x2="150" y2="122" />
                        </g>
                        <g fill="#d8a657" opacity="0.9">
                          <polygon points="92,90 92,110 112,100" />
                        </g>
                        <g stroke="#d8a657" strokeWidth="0.4" fill="none" opacity="0.5">
                          <circle cx="40" cy="100" r="4" />
                          <circle cx="160" cy="100" r="4" />
                        </g>
                        <g fill="#d8a657" opacity="0.7">
                          <circle cx="40" cy="100" r="1.5" />
                          <circle cx="160" cy="100" r="1.5" />
                        </g>
                      </svg>
                    )}
                    {i === 4 && (
                      <svg viewBox="0 0 200 200" fill="none" className="w-[70%] h-[70%]">
                        <g fill="none" stroke="#d8a657">
                          <path d="M 100 40 L 160 60 L 160 100 Q 160 140 100 170 Q 40 140 40 100 L 40 60 Z" strokeWidth="0.8" opacity="0.8" />
                          <path d="M 100 50 L 150 67 L 150 100 Q 150 134 100 159 Q 50 134 50 100 L 50 67 Z" strokeWidth="0.4" opacity="0.4" />
                        </g>
                        <g fill="none" stroke="#d8a657" strokeWidth="1" opacity="0.9">
                          <path d="M 80 105 L 95 120 L 125 90" />
                        </g>
                        <g fill="#d8a657" opacity="0.6">
                          <circle cx="100" cy="40" r="2" />
                          <circle cx="160" cy="60" r="2" />
                          <circle cx="40" cy="60" r="2" />
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
                <div className={feat.reverse ? 'lg:order-first' : ''}>
                  <div className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[14px] tracking-[0.3em] text-[#d8a657] mb-4">
                    {feat.num}
                  </div>
                  <h3 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.2] text-[#f4eee2] mb-6">
                    {feat.title}<em className="not-italic italic text-[#d8a657]">{feat.em}</em>
                  </h3>
                  <p className="text-[15.5px] leading-[1.85] text-[#c9c1ad] mb-5 font-light">{feat.desc}</p>
                  <ul className="list-none mt-8 border-t border-[rgba(216,166,87,0.08)]">
                    {feat.list.map((item, j) => (
                      <li key={j} className="py-5 border-b border-[rgba(216,166,87,0.08)] flex gap-5 items-start text-[14.5px] text-[#c9c1ad] leading-[1.7]">
                        <span className="flex-shrink-0 font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[11px] tracking-[0.2em] text-[#d8a657] uppercase pt-1 min-w-[80px]">
                          {item.tag}
                        </span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ STORAGE TIERS + PROCESS ============ */}
      <section
        id="process"
        className="relative z-[2] py-[140px] bg-[#0d0d10] border-t border-b border-[rgba(216,166,87,0.08)]"
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <Reveal>
            <div className="text-center">
              <div className="flex items-center justify-center gap-[14px] text-[13px] tracking-[0.3em] text-[#d8a657] font-['Cormorant_Garamond','Noto_Serif_KR',serif] mb-5">
                <span className="w-[40px] h-px bg-[#d8a657]" />
                — 02 / 05 —
                <span className="w-[40px] h-px bg-[#d8a657]" />
              </div>
              <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-[#f4eee2] mb-5">
                평생을 지탱하는 <em className="not-italic italic text-[#d8a657]">3계층 아카이빙</em>
              </h2>
              <p className="text-base leading-[1.8] text-[#c9c1ad] max-w-[640px] mx-auto font-light">
                당신의 데이터는 한 곳이 아니라, 세 개의 다른 매체에 안전하게 분산되어 영속성을 보장합니다.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-[60px]">
            {[
              { name: 'Hot Tier', tag: 'SSD · Active', desc: '최근 1년 내 생성된 활성 데이터. AI 분석과 실시간 콘텐츠 생성에 즉각 활용됩니다.', bar: 'w-[30%]', metric: 'ms-level' },
              { name: 'Warm Tier', tag: 'HDD · Recent', desc: '수 년간 축적된 원본 파일과 백업본. 비용 효율적으로 대용량을 보존합니다.', bar: 'w-[60%]', metric: 'PB-scale' },
              { name: 'Cold Tier', tag: 'LTO · Permanent', desc: '수십 년을 건전하게 보존할 최종본. 오프라인 미디어로 외부 위협으로부터 격리됩니다.', bar: 'w-full', metric: '30+ years' },
            ].map((tier, i) => (
              <Reveal key={i}>
                <div className="border border-[rgba(216,166,87,0.18)] p-10 bg-[rgba(20,20,24,0.55)] backdrop-blur-[20px] transition-all duration-400 hover:border-[#d8a657] hover:-translate-y-1">
                  <h4 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-2xl text-[#f4eee2] mb-2">{tier.name}</h4>
                  <div className="text-[11px] tracking-[0.25em] uppercase text-[#d8a657] mb-6">{tier.tag}</div>
                  <p className="text-[14px] leading-[1.7] text-[#c9c1ad] font-light">{tier.desc}</p>
                  <div className="h-1 bg-[#141418] my-6 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 bg-[#d8a657] ${tier.bar}`} />
                  </div>
                  <div className="flex justify-between text-[12px] text-[#4a4640] tracking-[0.1em] uppercase">
                    <span>Latency</span>
                    <span className="text-[#d8a657]">{tier.metric}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="text-center mt-[160px]">
              <div className="flex items-center justify-center gap-[14px] text-[13px] tracking-[0.3em] text-[#d8a657] font-['Cormorant_Garamond','Noto_Serif_KR',serif] mb-5">
                <span className="w-[40px] h-px bg-[#d8a657]" />
                — Process —
                <span className="w-[40px] h-px bg-[#d8a657]" />
              </div>
              <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(36px,4.5vw,64px)] font-normal leading-[1.15] tracking-[-0.01em] text-[#f4eee2] mb-5">
                4단계 <em className="not-italic italic text-[#d8a657]">라이프 시네마</em> 파이프라인
              </h2>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-[50px_20px] mt-[60px]">
            <div className="hidden md:block absolute top-[30px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#d8a657] to-transparent opacity-40" />
            {[
              { num: 'I', title: 'Collect', desc: '스마트폰과 센서로부터 일상의 모든 단서를 자동 수집합니다.' },
              { num: 'II', title: 'Archive', desc: '3계층 스토리지에 안전하게 분산 저장하고 무결성을 검증합니다.' },
              { num: 'III', title: 'Narrate', desc: 'AI가 의미 있는 순간을 발굴하여 서사 구조로 재구성합니다.' },
              { num: 'IV', title: 'Produce', desc: '당신만의 영화·다큐멘터리·다이어리가 자동 생성됩니다.' },
            ].map((step, i) => (
              <Reveal key={i}>
                <div className="text-center px-5 relative">
                  <div className="w-[60px] h-[60px] rounded-full border border-[#d8a657] bg-[#0d0d10] text-[#d8a657] flex items-center justify-center font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[22px] mx-auto mb-[30px] relative z-[2]">
                    {step.num}
                  </div>
                  <h4 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[22px] text-[#f4eee2] font-medium mb-[14px]">{step.title}</h4>
                  <p className="text-[14px] text-[#c9c1ad] leading-[1.7] font-light">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECURITY ============ */}
      <section id="security" className="relative z-[2] py-[140px] text-center">
        <div className="max-w-[980px] mx-auto px-8">
          <Reveal>
            <div className="w-[100px] h-[100px] mx-auto mb-10 border border-[#d8a657] rounded-full flex items-center justify-center relative">
              <div className="absolute inset-[-10px] border border-[rgba(216,166,87,0.18)] rounded-full animate-[spin_20s_linear_infinite]" />
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#d8a657" strokeWidth="1.2">
                <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(36px,4.5vw,56px)] text-[#f4eee2] font-normal leading-[1.2] mb-6">
              감시가 아닌, <em className="not-italic italic text-[#d8a657]">도움</em>이 되는 기록
            </h2>
            <p className="text-base text-[#c9c1ad] max-w-[640px] mx-auto mb-[60px] leading-[1.8] font-light">
              라이프로깅은 사용자의 신뢰 위에서만 의미가 있습니다. LUMINA는 프라이버시를 제품의 첫 번째 기능으로 설계합니다.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'End-to-End 암호화', desc: '수집 단계에서 사용자의 키로 암호화되며, LUMINA조차 평문 데이터를 볼 수 없습니다.' },
              { title: '온디바이스 처리', desc: '민감한 1차 분석은 단말기 내에서 처리되어 외부 전송을 최소화합니다.' },
              { title: '사용자 통제권', desc: '기록 항목별 on/off, 영역별 사생활 경계, 데이터 파기 시점을 사용자가 결정합니다.' },
              { title: '투명한 로그', desc: '누가, 언제, 어떤 데이터에 접근했는지 모든 접근 기록을 사용자에게 공개합니다.' },
            ].map((card, i) => (
              <Reveal key={i}>
                <div className="text-left p-7 border border-[rgba(216,166,87,0.08)] bg-[#0d0d10] transition-all duration-400 hover:border-[#d8a657] hover:bg-[#141418]">
                  <h5 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-lg text-[#f4eee2] mb-[10px] font-medium">{card.title}</h5>
                  <p className="text-[13.5px] leading-[1.7] text-[#c9c1ad] font-light">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section
        id="join"
        className="relative z-[2] py-[180px] px-8 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(216,166,87,0.08),transparent_60%)]" />
        <div className="max-w-[980px] mx-auto relative">
          <Reveal>
            <div className="inline-flex items-center gap-[14px] text-[12px] tracking-[0.3em] uppercase text-[#d8a657] font-medium mb-6">
              <span className="w-[40px] h-px bg-[#d8a657]" />
              — Early Access —
              <span className="w-[40px] h-px bg-[#d8a657]" />
            </div>
            <h2 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[clamp(40px,5.5vw,76px)] text-[#f4eee2] font-normal leading-[1.1] mb-8">
              당신의 <em className="not-italic italic text-[#d8a657]">첫 회</em>을 찍을 준비가
              <br />
              되셨나요?
            </h2>
            <p className="text-[17px] text-[#c9c1ad] max-w-[600px] mx-auto mb-[50px] leading-[1.8] font-light">
              2026년 한정, 파일럿 프로그램 참가자를 모집합니다.
              <br />
              여러분의 일상이 어떻게 영화가 되는지 직접 경험해 보세요.
            </p>
            <form
              className="max-w-[520px] mx-auto flex flex-col sm:flex-row border border-[#d8a657]"
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector('button');
                if (btn) btn.textContent = '등록 완료 ✓';
                const input = e.currentTarget.querySelector('input');
                if (input) input.value = '';
              }}
            >
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                required
                className="flex-1 bg-transparent border-none px-[22px] py-[18px] text-[14px] text-[#f4eee2] font-['Inter','Noto_Sans_KR',sans-serif] outline-none placeholder:text-[#4a4640]"
              />
              <button
                type="submit"
                className="px-8 py-[18px] bg-[#d8a657] text-[#08080a] text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300 hover:bg-[#f1c987]"
              >
                웨이트리스트 등록
              </button>
            </form>
            <p className="mt-6 text-[12px] text-[#4a4640] tracking-[0.1em] relative">
              * 등록 시점부터 베타 버전 우선 접근 권한이 부여됩니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative z-[2] border-t border-[rgba(216,166,87,0.08)] py-[60px_32px_40px] bg-[#0d0d10]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[60px]">
            <div>
              <LuminaLogo />
              <p className="text-[13px] leading-[1.7] text-[#4a4640] max-w-[320px] font-light mt-5">
                당신의 삶을 하나의 서사로. AI 기반 라이프 로깅 & 디지털 레거시 플랫폼.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['5대 전략', '파이프라인', '보안', '웨이트리스트'],
                hrefs: ['#features', '#process', '#security', '#join'],
              },
              {
                title: 'Company',
                links: ['비전', '팀', '커리어', '프레스킷'],
                hrefs: ['#vision', '#', '#', '#'],
              },
              {
                title: 'Resources',
                links: ['연구 백서', '윤리 가이드', '개발자 문서', '고객 지원'],
                hrefs: ['#', '#', '#', '#'],
              },
            ].map((col, i) => (
              <div key={i}>
                <h6 className="font-['Cormorant_Garamond','Noto_Serif_KR',serif] text-[12px] tracking-[0.25em] uppercase text-[#d8a657] mb-5">
                  {col.title}
                </h6>
                <ul className="list-none space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={col.hrefs[j]}
                        className="text-[13px] text-[#c9c1ad] font-light no-underline transition-colors duration-300 hover:text-[#d8a657]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-[1280px] mx-auto mt-[60px] pt-[30px] border-t border-[rgba(216,166,87,0.08)] flex flex-col md:flex-row justify-between items-center text-[12px] text-[#4a4640] tracking-[0.05em] gap-4">
            <div>© 2026 LUMINA Inc. All rights reserved.</div>
            <div>Privacy · Terms · Cookies</div>
          </div>
          {/* Back to Aram link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(216,166,87,0.18)] text-[#c9c1ad] text-[13px] tracking-[0.12em] uppercase font-medium no-underline transition-all duration-300 hover:border-[#d8a657] hover:text-[#d8a657]"
            >
              <ArrowLeft className="w-4 h-4" />
              이람재단으로 돌아가기
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LuminaPage;
