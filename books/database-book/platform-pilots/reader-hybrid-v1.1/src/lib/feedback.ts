const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdRI953rN5Vr4HozZ36xVNPnngiU4YfRx8THAa1ut7xqPKH9A/viewform";

const FORM_FIELDS = {
  fullPageUrl: "entry.181320410",
  readerScope: "entry.1660258834",
  chapterId: "entry.1858402013",
  readerSection: "entry.2020264049",
  pageNumber: "entry.1101982669",
  currentHeading: "entry.387659526",
  browserDevice: "entry.1910882756",
  screenSize: "entry.1418577056",
  viewportSize: "entry.1979254209",
  environment: "entry.1813629986",
};

function getReaderRouteContext() {
  const parts = window.location.pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  const [readerScope, chapterId, readerSection, pageNumber] = parts;

  return {
    readerScope: readerScope ?? "",
    chapterId: chapterId ?? "",
    readerSection: readerSection ?? "",
    pageNumber: pageNumber ?? "",
  };
}

function getCurrentHeading() {
  const headings = Array.from(
    document.querySelectorAll("article h2, article h3")
  ) as HTMLElement[];

  if (!headings.length) return "";

  let current = headings[0];

  for (const heading of headings) {
    const rect = heading.getBoundingClientRect();

    if (rect.top <= 140) {
      current = heading;
    }
  }

  return current.textContent?.trim() ?? "";
}

function getEnvironment() {
  const hostname = window.location.hostname;

  if (hostname.includes("localhost")) return "local";
  if (hostname.includes("staging")) return "staging";
  if (hostname.includes("vercel.app")) return "preview";
  return "production";
}

export function buildFeedbackUrl() {
  const route = getReaderRouteContext();

  const params = new URLSearchParams();

  params.set("usp", "pp_url");
  params.set(FORM_FIELDS.fullPageUrl, window.location.href);
  params.set(FORM_FIELDS.readerScope, route.readerScope);
  params.set(FORM_FIELDS.chapterId, route.chapterId);
  params.set(FORM_FIELDS.readerSection, route.readerSection);
  params.set(FORM_FIELDS.pageNumber, route.pageNumber);
  params.set(FORM_FIELDS.currentHeading, getCurrentHeading());
  params.set(FORM_FIELDS.browserDevice, navigator.userAgent);
  params.set(
    FORM_FIELDS.screenSize,
    `${window.screen.width}x${window.screen.height}`
  );
  params.set(
    FORM_FIELDS.viewportSize,
    `${window.innerWidth}x${window.innerHeight}`
  );
  params.set(FORM_FIELDS.environment, getEnvironment());

  return `${GOOGLE_FORM_BASE_URL}?${params.toString()}`;
}
