export function getToken() {
  return window.$tokenStatus;
}

export function removeToken() {
  window.$tokenStatus = null;
}
