// Tập trung mọi hàm dựng URL của ứng dụng để tránh chuỗi path rải rác.
// Các path này là tương đối với BrowserRouter basename (GitHub Pages base).

export const paths = {
  home: () => "/",
  pillar: () => "/thu-mua-duoc-lieu",
  herbCatalog: () => "/duoc-lieu",
  regions: () => "/vung-trong",
  knowledge: () => "/kien-thuc",
  about: () => "/ve-toi",
  contact: () => "/lien-he",
  herb: (cay: string) => `/thu-mua-duoc-lieu/${cay}`,
  herbRegion: (cay: string, vung: string) => `/thu-mua-duoc-lieu/${cay}/${vung}`,
  hubWiki: (cay: string) => `/ky-thuat-trong/${cay}`,
  article: (topic: string) => `/kien-thuc/${topic}`,
};
