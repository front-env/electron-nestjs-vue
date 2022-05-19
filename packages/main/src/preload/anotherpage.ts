window.addEventListener('DOMContentLoaded', async function () {
  const $ = await import('jquery').then((exports) => exports.default);
  console.log('$: ', $);
});
