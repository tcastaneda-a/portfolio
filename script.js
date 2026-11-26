if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const resetScrollPosition = () => {
  if (window.location.hash) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
  window.scrollTo(0, 0);
};

resetScrollPosition();
window.addEventListener('pageshow', resetScrollPosition);
window.addEventListener('load', resetScrollPosition);

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.video-placeholder').forEach((button) => {
  button.addEventListener('click', () => {
    const frame = button.closest('[data-video-id]');
    const videoId = frame?.dataset.videoId;
    if (!frame || !videoId) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&autoplay=1&mute=1&playsinline=1`;
    iframe.title = 'Thomas Castañeda video';
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
  });
});

document.querySelectorAll('.streaming-link').forEach((platform) => {
  const url = platform.dataset.url?.trim();
  if (!url || url.startsWith('PASTE_')) return;

  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = platform.textContent;
  platform.replaceWith(link);
});
