import { getAPi } from './api';

window.addEventListener('DOMContentLoaded', async function () {
  const $ = await import('jquery').then((exports) => exports.default);
  async function init() {
    const api = await getAPi();
    const ready = await checkReady();
    if (!ready) {
      return;
    }

    const $html = $('html');

    const $firstButton = $('button:contains("关注"):first');
    const $ul = $firstButton.closest('ul');
    const $container = $ul.parent('div');
    if (!$ul.length) {
      return;
    }
    let lastIndex = 0;
    let loops = 0;
    await run();

    async function run() {
      if (loops++ > 2) {
        return;
      }
      if ($container.find('div:contains("暂时没有更多了")').length) {
        console.log('采集完毕');
        return;
      }
      const $children = $ul
        .children(`li:eq(${lastIndex})`)
        .add($ul.children(`li:gt(${lastIndex})`));

      const arr = $.makeArray($children);

      const { length } = arr;
      if (length < 1) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        await run();
      }

      for (let i = 0; i < 1; i++) {
        const $li = $(arr[i]);
        const data = await parseData($li);
        console.log(JSON.stringify(data, null, 2));
        const res = await api
          .post('/member/create', data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(JSON.stringify(res, null, 2));
      }

      // const datas = [];
      // const $li = $(arr[0]);

      lastIndex = $children.length;

      // console.log('offset: ');
      // console.log($children.last().offset());
      // console.log(data);
      // console.log(JSON.stringify(data, null, 2));
      await new Promise((resolve) => {
        $html.animate(
          {
            scrollTop: $html.scrollTop() + 10000,
          },
          1000,
          function () {
            resolve(true);
          },
        );
      });
      await run();
    }
  }

  init();

  async function parseData($li) {
    const $a = $li.find('a');

    const $firstLine = $a.children('div:eq(0)');
    const $firstLineA = $firstLine.children('div:eq(0)');
    const imageSrc = $firstLineA.find('img').attr('src');

    const imageUrl = new URL(`${location.protocol}${imageSrc}`);
    imageUrl.search = '';
    const $firestLineB = $firstLine.children('div:eq(1)');
    const $badgeArea = $firestLineB.children('div');

    const $secondLine = $a.children('div:eq(1)');
    const $douyinhao = $secondLine.find('span:contains("抖音号")');
    const $huozan = $secondLine.find('span:contains("获赞")');
    const $fensi = $secondLine.find('span:contains("粉丝")');

    const $thirdLine = $a.children('p');

    const href = $a.attr('href');
    const url = new URL(`${location.protocol}${href}`);
    const obj = JSON.parse(url.searchParams.get('extra_params'));
    const searchParams = obj.search_params || {};
    url.search = '';

    const data = {
      kw: searchParams.search_keyword,
      badge: $badgeArea.text(),
      url: url.toString(),
      fans: $fensi.text().replace('粉丝', ''),
      liked: $huozan.text().replace('获赞', ''),
      dy_name: $firestLineB.children('p').text(),
      dy_id: $douyinhao.text().replace('抖音号', ''),
      dy_uid: parseInt(searchParams.search_result_id),
      avatar: imageUrl.toString(),
      intro: $thirdLine
        .children('span')
        .children('span')
        .children('span')
        .children('span')
        .children('span')
        .html(),
    };
    return data;
  }

  async function checkReady() {
    const time = Date.now();
    async function delay() {
      const $firstButton = $('button:contains("关注"):first');

      if ($firstButton.length) {
        await new Promise((resolve) => {
          setTimeout(resolve, 200);
        });
        return true;
      } else {
        if (Date.now() - time > 10000) {
          location.reload();
          return false;
        } else {
          await new Promise((resolve) => {
            setTimeout(resolve, 200);
          });
          return await delay();
        }
      }
    }
    return await delay();
  }
});
