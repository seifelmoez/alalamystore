const CACHE_NAME = 'alalamystore-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',      // إ
  './payload.js',     // elfldr.bin
  './goldhen.bin',    // GoldHEN_v2.3
  './favicon.ico'     // الأيقونة أو اللوجو
  // أضف أي ملفات JS أو صور يستخدمها الموقع هنا
];

// مرحلة التثبيت والحفظ في الذاكرة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('حفظ ملفات Alalamy Store أوفلاين...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// استدعاء الملفات أوفلاين عند عدم وجود إنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});