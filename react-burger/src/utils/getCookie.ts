export function getCookie(name: string) {
  const matches: any = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches && decodeURIComponent(matches[1]);
}