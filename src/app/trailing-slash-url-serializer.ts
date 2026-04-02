import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class TrailingSlashUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    // Strip trailing slash before matching so routes like 'contact' match '/contact/'
    const [path, ...rest] = url.split('?');
    const stripped = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
    return super.parse(rest.length ? `${stripped}?${rest.join('?')}` : stripped);
  }

  override serialize(tree: UrlTree): string {
    // Add trailing slash to all non-root paths for the address bar
    const url = super.serialize(tree);
    const [path, ...rest] = url.split('?');
    const normalized = path === '/' ? path : (path.endsWith('/') ? path : path + '/');
    return rest.length ? `${normalized}?${rest.join('?')}` : normalized;
  }
}
