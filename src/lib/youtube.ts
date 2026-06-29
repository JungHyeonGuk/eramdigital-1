export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  description?: string;
}

const CACHE_KEY = 'aram_hometown_videos_v1';
export const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;
const DEFAULT_MAX_RESULTS = 10;

const DEFAULT_SEARCH_QUERY =
  '고향의 향수 그리운 고향 시골 풍경 한국';

const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: '3RXLbtaEvg4',
    title: '정겨운 고향, 그리운 시골 풍경',
    channelTitle: '추억여행',
    thumbnail: 'https://i.ytimg.com/vi/3RXLbtaEvg4/hqdefault.jpg',
    publishedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'nULYPA_HbhU',
    title: '향수 그리운 옛시골 고향',
    channelTitle: 'SokSong Land',
    thumbnail: 'https://i.ytimg.com/vi/nULYPA_HbhU/hqdefault.jpg',
    publishedAt: '2023-08-20T00:00:00Z',
  },
  {
    id: 'A2rQOkgLrFg',
    title: '늘 그리운 내 고향 풍경 - 정겨운 시골의 하루',
    channelTitle: 'EBS 한국기행',
    thumbnail: 'https://i.ytimg.com/vi/A2rQOkgLrFg/hqdefault.jpg',
    publishedAt: '2023-06-12T00:00:00Z',
  },
  {
    id: 'lZOloGcjpnA',
    title: '그리운 고향 - 이제는 꿈속에만 남은 그 풍경들',
    channelTitle: 'Nostalgic Ballad',
    thumbnail: 'https://i.ytimg.com/vi/lZOloGcjpnA/hqdefault.jpg',
    publishedAt: '2024-03-05T00:00:00Z',
  },
  {
    id: 'c9UyFkPXWBE',
    title: '내 고향 하늘에서 내려다본 전경 - 드론 풍경 (4K)',
    channelTitle: 'KOREA 4K',
    thumbnail: 'https://i.ytimg.com/vi/c9UyFkPXWBE/hqdefault.jpg',
    publishedAt: '2024-02-18T00:00:00Z',
  },
  {
    id: 'hxhGUV9Kl50',
    title: '그 시절, 우리가 사랑했던 고향의 소리',
    channelTitle: '시골풍경 ASMR',
    thumbnail: 'https://i.ytimg.com/vi/hxhGUV9Kl50/hqdefault.jpg',
    publishedAt: '2023-11-25T00:00:00Z',
  },
  {
    id: '8Z5bWzdzrtY',
    title: '산골에서 가재잡고 대추따던 그 시절 - 나의 살던 고향은',
    channelTitle: 'EBS 한국기행',
    thumbnail: 'https://i.ytimg.com/vi/8Z5bWzdzrtY/hqdefault.jpg',
    publishedAt: '2023-04-08T00:00:00Z',
  },
  {
    id: '3bGq-Wmeumc',
    title: '과거여행 - 1990년대 서울 풍경',
    channelTitle: '추억의 타임머신',
    thumbnail: 'https://i.ytimg.com/vi/3bGq-Wmeumc/hqdefault.jpg',
    publishedAt: '2022-09-30T00:00:00Z',
  },
  {
    id: 'K0hORMteO-o',
    title: '고요하고 평화로운 시골의 아침과 밤 (ASMR)',
    channelTitle: '시골풍경 ASMR',
    thumbnail: 'https://i.ytimg.com/vi/K0hORMteO-o/hqdefault.jpg',
    publishedAt: '2024-05-10T00:00:00Z',
  },
  {
    id: '7IUd8_l6hCo',
    title: '비 오는 한국 농가마을 골목길 - 초가집과 기와집',
    channelTitle: '한국풍경 힐링',
    thumbnail: 'https://i.ytimg.com/vi/7IUd8_l6hCo/hqdefault.jpg',
    publishedAt: '2024-04-22T00:00:00Z',
  },
];

export interface HometownCacheInfo {
  fetchedAt: number;
  nextRefreshAt: number;
  isStale: boolean;
  videoCount: number;
  fromApi: boolean;
}

export interface HometownFetchResult {
  videos: YouTubeVideo[];
  fromApi: boolean;
  fromCache: boolean;
  fetchedAt: number;
}

interface CachedPayload {
  videos: YouTubeVideo[];
  fromApi: boolean;
  fetchedAt: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readCache(): CachedPayload | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CachedPayload;
    if (
      !data ||
      !Array.isArray(data.videos) ||
      typeof data.fetchedAt !== 'number' ||
      Date.now() - data.fetchedAt > CACHE_DURATION_MS
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function writeCache(videos: YouTubeVideo[], fromApi: boolean): CachedPayload {
  const data: CachedPayload = {
    videos,
    fromApi,
    fetchedAt: Date.now(),
  };
  if (isBrowser()) {
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota / private mode errors
    }
  }
  return data;
}

export function hasYouTubeApiKey(): boolean {
  return Boolean(import.meta.env.VITE_YOUTUBE_API_KEY);
}

export function getHometownCacheInfo(): HometownCacheInfo | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CachedPayload;
    if (!data || typeof data.fetchedAt !== 'number') return null;
    return {
      fetchedAt: data.fetchedAt,
      nextRefreshAt: data.fetchedAt + CACHE_DURATION_MS,
      isStale: Date.now() - data.fetchedAt > CACHE_DURATION_MS,
      videoCount: data.videos?.length || 0,
      fromApi: Boolean(data.fromApi),
    };
  } catch {
    return null;
  }
}

export function clearHometownCache(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(CACHE_KEY);
  } catch {
    // ignore
  }
}

export async function fetchHometownVideos(
  options: { force?: boolean; maxResults?: number; query?: string } = {}
): Promise<HometownFetchResult> {
  const {
    force = false,
    maxResults = DEFAULT_MAX_RESULTS,
    query = DEFAULT_SEARCH_QUERY,
  } = options;

  if (!force) {
    const cached = readCache();
    if (cached && cached.videos.length > 0) {
      return {
        videos: cached.videos.slice(0, maxResults),
        fromApi: cached.fromApi,
        fromCache: true,
        fetchedAt: cached.fetchedAt,
      };
    }
  }

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
  let videos: YouTubeVideo[] = [];
  let fromApi = false;

  if (apiKey) {
    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: String(maxResults),
        key: apiKey,
        relevanceLanguage: 'ko',
        regionCode: 'KR',
        videoEmbeddable: 'true',
        safeSearch: 'moderate',
        order: 'relevance',
      });

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        videos = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
        }));
        fromApi = true;
      }
    } catch (error) {
      console.warn('YouTube API request failed, using fallback list:', error);
    }
  }

  if (videos.length === 0) {
    videos = FALLBACK_VIDEOS.slice(0, maxResults);
  }

  const persisted = writeCache(videos, fromApi);

  return {
    videos,
    fromApi,
    fromCache: false,
    fetchedAt: persisted.fetchedAt,
  };
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function formatRelativeTime(timestamp: number, now: number = Date.now()): string {
  const diff = Math.max(0, now - timestamp);
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}시간 ${minutes}분 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
}

export function formatCountdown(targetTimestamp: number, now: number = Date.now()): string {
  const diff = Math.max(0, targetTimestamp - now);
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  if (minutes > 0) return `${minutes}분`;
  return '곧';
}
