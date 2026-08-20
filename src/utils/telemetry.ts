// Privacy-first telemetry beacon and download counter helper

interface TelemetryEvent {
  format: string;
  url: string;
  timestamp: number;
}

const STORAGE_KEY = 'hwm_telemetry_stats';

export interface DownloadStats {
  pdf: number;
  epub: number;
  docx: number;
  html: number;
  kindle_cover: number;
  paperback_wrap: number;
  total: number;
  lastDownloaded?: string;
  lastFormat?: string;
}

export function getLocalTelemetryStats(): DownloadStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { pdf: 0, epub: 0, docx: 0, html: 0, kindle_cover: 0, paperback_wrap: 0, total: 0 };
    }
    return JSON.parse(raw);
  } catch {
    return { pdf: 0, epub: 0, docx: 0, html: 0, kindle_cover: 0, paperback_wrap: 0, total: 0 };
  }
}

export function recordDownloadEvent(format: string, url: string): DownloadStats {
  const current = getLocalTelemetryStats();
  const key = format.toLowerCase().replace(/[^a-z_]/g, '') as keyof DownloadStats;
  
  if (key in current && typeof current[key] === 'number') {
    (current[key] as number) += 1;
  }
  current.total += 1;
  current.lastDownloaded = new Date().toISOString();
  current.lastFormat = format.toUpperCase();

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Telemetry storage note:', e);
  }

  // Send non-blocking beacon to Cloudflare / analytics endpoint if supported
  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const payload = JSON.stringify({
        event: 'download',
        format,
        path: url,
        referrer: document.referrer || 'direct',
        timestamp: Date.now()
      });
      const blob = new Blob([payload], { type: 'application/json' });
      // Non-blocking ping
      navigator.sendBeacon('/api/telemetry', blob);
    }
  } catch {
    // Graceful silent fallback
  }

  return current;
}
