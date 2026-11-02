export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/media': 'media' });
  eleventyConfig.addPassthroughCopy({ 'src/files': 'files' });
  eleventyConfig.addPassthroughCopy({ 'src/css': 'css' });
  eleventyConfig.addPassthroughCopy({ 'src/js': 'js' });
  eleventyConfig.addPassthroughCopy({ 'src/CNAME': 'CNAME' });
  eleventyConfig.addCollection('projects', (api) =>
    api
      .getFilteredByGlob('src/work/*.md')
      .sort((a, b) => (b.data.sortYear ?? 0) - (a.data.sortYear ?? 0) || (a.data.order ?? 0) - (b.data.order ?? 0))
  );

  const attr = (s = '') => String(s).replace(/"/g, '&quot;');
  const caption = (c) => (c ? `<figcaption>${c}</figcaption>` : '');

  eleventyConfig.addShortcode('fig', (src, cap = '', cls = '') =>
    `<figure class="${cls}"><img src="/media/${src}" alt="${attr(cap.replace(/<[^>]+>/g, ''))}" loading="lazy" decoding="async">${caption(cap)}</figure>`
  );

  eleventyConfig.addShortcode('vid', (src, cap = '', cls = '') =>
    `<figure class="${cls}"><video src="/media/${src}.mp4" poster="/media/${src}.poster.webp" muted loop playsinline preload="none" data-autoplay></video>${caption(cap)}</figure>`
  );

  eleventyConfig.addShortcode('youtube', (id, title = '') =>
    `<figure class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${attr(title)}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>${caption(title)}</figure>`
  );

  eleventyConfig.addShortcode('vimeo', (id, title = '', ratio = '16 / 9') => {
    const [w, h] = ratio.split('/').map(Number);
    return `<figure class="embed${h > w ? ' tall' : ''}" style="--ratio: ${ratio}"><iframe src="https://player.vimeo.com/video/${id}" title="${attr(title)}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>${caption(title)}</figure>`;
  });

  eleventyConfig.addFilter('year', () => new Date().getFullYear());
  eleventyConfig.addFilter('byKind', (items, kind) => items.filter((p) => (p.data.kinds || []).includes(kind)));
  eleventyConfig.addFilter('featured', (items) =>
    items.filter((p) => p.data.featured).sort((a, b) => a.data.featured - b.data.featured)
  );

  return {
    dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
