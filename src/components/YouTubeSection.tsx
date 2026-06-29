import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Youtube, Loader2, ExternalLink, RefreshCcw, Clock } from 'lucide-react';
import {
  fetchHometownVideos,
  getYouTubeEmbedUrl,
  getYouTubeWatchUrl,
  hasYouTubeApiKey,
  CACHE_DURATION_MS,
  formatRelativeTime,
  formatCountdown,
  YouTubeVideo,
} from '../lib/youtube';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const VideoCard = ({
  video,
  index,
  onSelect,
}: {
  video: YouTubeVideo;
  index: number;
  onSelect: (video: YouTubeVideo) => void;
}) => {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(video)}
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative w-full text-left rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/50 hover:border-amber-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all"
      aria-label={`${video.title} 재생`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-amber-500/90 group-hover:bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-all">
            <Play className="w-6 h-6 text-slate-900 fill-slate-900 ml-1" />
          </div>
        </div>

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-xs text-amber-300 font-medium">
          #{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 mb-2 group-hover:text-amber-300 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 truncate max-w-[60%]">
            {video.channelTitle}
          </span>
          <span className="text-amber-400/80 font-medium flex items-center gap-1">
            <Youtube className="w-3.5 h-3.5" />
            YouTube
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const VideoModal = ({
  video,
  onClose,
}: {
  video: YouTubeVideo | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!video) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-white font-semibold text-lg truncate">
                  {video.title}
                </h3>
                <p className="text-slate-400 text-sm truncate">
                  {video.channelTitle}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={getYouTubeWatchUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube에서 열기
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="닫기"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative aspect-video bg-black">
              <iframe
                key={video.id}
                src={getYouTubeEmbedUrl(video.id)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VideoCardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden bg-slate-800/40 border border-slate-700/40 animate-pulse">
    <div className="aspect-video bg-slate-700/40" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-700/50 rounded w-4/5" />
      <div className="h-3 bg-slate-700/40 rounded w-1/2" />
    </div>
  </div>
);

export interface YouTubeSectionProps {
  showHeader?: boolean;
  showFallbackNotice?: boolean;
}

export const YouTubeSection = ({
  showHeader = false,
  showFallbackNotice = false,
}: YouTubeSectionProps = {}) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [fromApi, setFromApi] = useState(false);
  const [fromCache, setFromCache] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const autoRefreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async (force = false) => {
    if (force) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const result = await fetchHometownVideos({ force });
      setVideos(result.videos);
      setFromApi(result.fromApi);
      setFromCache(result.fromCache);
      setFetchedAt(result.fetchedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : '영상을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Tick the clock every minute to update countdown / relative time
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Auto-refresh 24h after the last fetch (works even when the page stays open)
  useEffect(() => {
    if (autoRefreshTimer.current) {
      clearTimeout(autoRefreshTimer.current);
      autoRefreshTimer.current = null;
    }
    if (!fetchedAt) return;
    const msUntilRefresh = fetchedAt + CACHE_DURATION_MS - now;
    if (msUntilRefresh <= 0) {
      // Already past the refresh window — refresh on next tick
      autoRefreshTimer.current = setTimeout(() => load(true), 0);
    } else if (msUntilRefresh < CACHE_DURATION_MS) {
      autoRefreshTimer.current = setTimeout(() => load(true), msUntilRefresh);
    }
    return () => {
      if (autoRefreshTimer.current) {
        clearTimeout(autoRefreshTimer.current);
        autoRefreshTimer.current = null;
      }
    };
  }, [fetchedAt, now, load]);

  const nextRefreshAt = fetchedAt ? fetchedAt + CACHE_DURATION_MS : null;
  const isUsingFallback = videos.length > 0 && !fromApi;

  return (
    <section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {showHeader && (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold tracking-wider uppercase"
            >
              <Youtube className="w-4 h-4" />
              Scent of Hometown
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
            >
              고향의 <span className="text-amber-400">향수</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              시공간을 초월한 영상 속 풍경으로 떠나는 고향 여행.
              <br className="hidden sm:block" />
              그리운 마음이 깃든 10개의 장면을 만나보세요.
            </motion.p>
          </motion.div>
        )}

        {showFallbackNotice && !loading && isUsingFallback && hasYouTubeApiKey() === false && (
          <div className="text-center mb-8">
            <p className="inline-flex items-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
              <Youtube className="w-3.5 h-3.5" />
              VITE_YOUTUBE_API_KEY 환경변수 설정 시 실시간 검색 결과로 자동 갱신됩니다.
            </p>
          </div>
        )}

        {/* Cache status / refresh controls */}
        {!loading && videos.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 px-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-400">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                  fromCache
                    ? 'border-slate-700 bg-slate-800/60 text-slate-300'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {fetchedAt
                  ? `업데이트: ${formatRelativeTime(fetchedAt, now)}`
                  : '업데이트 정보 없음'}
                {fromCache ? ' · 캐시' : ' · 최신'}
              </span>
              {nextRefreshAt && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-700 bg-slate-800/60 text-slate-300">
                  다음 새로고침: {formatCountdown(nextRefreshAt, now)} 후
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => load(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-700 bg-slate-800/60 hover:border-amber-500/50 hover:text-amber-300 text-slate-300 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? '갱신 중...' : '지금 새로고침'}
            </button>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => load(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              다시 시도
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {videos.map((video, index) => (
              <VideoCard
                key={`${video.id}-${index}`}
                video={video}
                index={index}
                onSelect={setSelectedVideo}
              />
            ))}
          </motion.div>
        )}

        {loading && (
          <div className="flex items-center justify-center gap-2 text-slate-400 mt-10">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>고향의 풍경을 불러오는 중입니다...</span>
          </div>
        )}

        {refreshing && !loading && (
          <div className="flex items-center justify-center gap-2 text-amber-300/80 text-xs mt-6">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            24시간 주기 자동 갱신: 새 영상을 가져오고 있습니다.
          </div>
        )}
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

export default YouTubeSection;
