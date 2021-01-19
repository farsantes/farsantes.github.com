import _window from '@/libraries/window';

const navigator = _window.navigator;
const userAgent = (navigator && navigator.userAgent) || "";

export const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
export const isApple = isIOS || !!userAgent.match(/Version\/[\d\.]+.*Safari/);
export const appGallery = userAgent.toLowerCase().includes("appgallery");

let IS_CRAWLER: boolean;
export function isCrawler() {
  return IS_CRAWLER ? IS_CRAWLER : IS_CRAWLER = isCrawlerAgent();
}

export function isMobile(): boolean {
  const location = _window.location;
  if (location && location.search.indexOf("mobile=") > 0) return true;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

export function getPlatform(): "ios" | "android" | "" {

  // USER AGENT
  const device = getDevice();

  if (-1 != ["iPhone", "iPad", "iPod"].indexOf(device)) {
    return "ios";
  }
  if ("Android" == device) {
    return "android";
  }
  return "";
}

export function getDevice(): string {
  if (/iPhone/i.test(userAgent)) {
    return "iPhone";
  }
  if (/iPad/i.test(userAgent)) {
    return "iPad";
  }
  if (/iPod/i.test(userAgent)) {
    return "iPod";
  }

  if (/Android/i.test(userAgent)) {
    return "Android";
  }

  return "";
}

export function getDeviceData(): string {
  return userAgent;
}

////////////////////////////////////////////////////////////////////////////////

function isCrawlerAgent(): boolean {
  const botPattern = "(Prerender|googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
  const re = new RegExp(botPattern, "i");

  if (re.test(userAgent)) {
    console.log("isCrawlerAgent");
    return true;
  }

  // MANUAL TESTING
  const location = _window.location;
  if (location && location.href.includes("_escaped_fragment_")) {
    console.log("isCrawlerAgent _escaped_fragment_");
    return true;
  }

  // CHROME Lighthouse
  if (userAgent.includes("Chrome-Lighthouse")) {
    return true;
  }

  return false;
}