import type { SystemInfo } from '../types';

const STORAGE_PREFIX = 'sysinfo_';

function detectOS(ua: string): string {
  if (/Windows NT 10/.test(ua))   return 'Windows 10/11';
  if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
  if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
  if (/Mac OS X/.test(ua)) {
    const m = ua.match(/Mac OS X ([\d_]+)/);
    return 'macOS ' + (m?.[1]?.replace(/_/g, '.') ?? '');
  }
  if (/Android/.test(ua)) {
    const m = ua.match(/Android ([\d.]+)/);
    return 'Android ' + (m?.[1] ?? '');
  }
  if (/iPhone|iPad/.test(ua)) return 'iOS';
  if (/Linux/.test(ua))       return 'Linux';
  return 'Невідома ОС';
}

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua))     return 'Microsoft Edge '  + (ua.match(/Edg\/([\d.]+)/)?.[1]     ?? '');
  if (/OPR\//.test(ua))     return 'Opera '           + (ua.match(/OPR\/([\d.]+)/)?.[1]     ?? '');
  if (/Chrome\//.test(ua))  return 'Google Chrome '   + (ua.match(/Chrome\/([\d.]+)/)?.[1]  ?? '');
  if (/Firefox\//.test(ua)) return 'Mozilla Firefox ' + (ua.match(/Firefox\/([\d.]+)/)?.[1] ?? '');
  if (/Safari\//.test(ua))  return 'Safari '          + (ua.match(/Version\/([\d.]+)/)?.[1] ?? '');
  return 'Невідомий браузер';
}

export function collectAndSaveSystemInfo(): SystemInfo {
  const ua = navigator.userAgent;

  const info: SystemInfo = {
    'Операційна система':  detectOS(ua),
    'Браузер':             detectBrowser(ua),
    'Платформа':           navigator.platform || '—',
    'Мова':                navigator.language || '—',
    'Ядра CPU':            String(navigator.hardwareConcurrency ?? '—'),
    'Роздільна здатність': `${screen.width}×${screen.height}`,
    'Глибина кольору':     `${screen.colorDepth} bit`,
    'Розмір вікна':        `${window.innerWidth}×${window.innerHeight}`,
    'Timezone':            Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Cookies':             navigator.cookieEnabled ? 'Увімкнено' : 'Вимкнено',
    'Онлайн':              navigator.onLine ? 'Так' : 'Ні',
    'User Agent':          ua,
    'Дата відвідування':   new Date().toLocaleString('uk-UA'),
  };

  Object.entries(info).forEach(([key, value]) =>
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, value),
  );

  return info;
}

export function loadSystemInfoFromStorage(): SystemInfo {
  const result: SystemInfo = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      result[key.replace(STORAGE_PREFIX, '')] = localStorage.getItem(key) ?? '—';
    }
  }
  return result;
}
