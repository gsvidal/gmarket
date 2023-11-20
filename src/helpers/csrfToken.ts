export function getCSRFToken(): string | undefined {
  const cookie = document.cookie;
  if (!cookie) {
      console.error('Document cookie is undefined or empty.');
      return undefined;
  }

  const csrfCookie = cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='));

  if (!csrfCookie) {
      console.error('CSRF token cookie not found.');
      return undefined;
  }

  const csrfToken = csrfCookie.split('=')[1];
  if (!csrfToken) {
      console.error('CSRF token value not found.');
      return undefined;
  }

  return csrfToken;
}