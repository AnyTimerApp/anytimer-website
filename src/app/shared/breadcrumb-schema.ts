export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export function injectBreadcrumbSchema(document: Document, id: string, items: BreadcrumbItem[]) {
  if (document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': item.label,
      ...(item.url ? { item: `https://anytimer.app${item.url}` } : {})
    }))
  });
  document.head.appendChild(script);
}
