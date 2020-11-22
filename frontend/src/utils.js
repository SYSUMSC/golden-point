export function makeApiPath(path) {
  return `/api/${path}`;
}

export function saveUserData(id, name) {
  localStorage.setItem('user', JSON.stringify({ id, name }));
}

export function resolveUserFromLocalStorage() {
  const data = localStorage.getItem('user');
  if (data) {
    const user = JSON.parse(data);
    return {
      id: user.id,
      name: user.name
    };
  }
  return undefined;
}
