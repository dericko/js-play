const randomWikiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=info&inprop=url&format=json";

const [startRes, endRes] = await Promise.all([
  fetch(randomWikiUrl),
  fetch(randomWikiUrl),
]);

const startData = await startRes.json();
const endData = await endRes.json();

const startTitle = Object.values(startData.query.pages)[0].title;
const endTitle = Object.values(endData.query.pages)[0].title;
console.log("Start:", startTitle);
console.log("Goal:", endTitle);

// const startPageUrl = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=parse&prop=links&page=${startTitle}`;
// const startPageRes = await fetch(startPageUrl);
// const startPageData = await startPageRes.json();
// const startPageLinks = startPageData.parse.links.map((link) => link["*"]);

// console.log("Initial links: ", startPageLinks);

const path = [startTitle];
const seen = new Set([startTitle]);
let currentTitle = startTitle;
let depth = 0;
while (currentTitle !== endTitle && depth < 3) {
  const nextPageUrl = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=parse&prop=links&page=${currentTitle}`;
  const nextPageRes = await fetch(nextPageUrl);
  const nextPageData = await nextPageRes.json();
  const nextPageTitles = nextPageData.parse.links.map((link) => link["*"]);
  console.log(nextPageTitles)

  if (nextPageTitles.includes(endTitle)) {
    console.log("Found goal!", path);
    break;
  }

  // find the link with the most links to other pages
  let maxLinks = 0;
  let titleWithMostLinks = nextPageTitles[0];
  // TODO: batch these calls but also avoid hitting the rate limit
  // TODO: skip titles of form: 'Module:' 'Portal:' 'Wikipedia:' 'Help:' 'Category:'
  for (let title of nextPageTitles) {
    const linkUrl = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=parse&prop=links&page=${title}`;
    await new Promise((resolve) => setTimeout(resolve, 100)); // don't hit rate limit
    const linkRes = await fetch(linkUrl);
    const linkData = await linkRes.json();
    const linkCount = linkData.parse.links.length;
    if (linkCount > maxLinks && !seen.has(title)) {
      maxLinks = linkCount;
      titleWithMostLinks = title;
    }
  }

  console.log("Next title: ", { titleWithMostLinks, depth });
  depth++;

  currentTitle = titleWithMostLinks;
  seen.add(titleWithMostLinks);
  path.push(titleWithMostLinks);
}
