export function getClientId() {
  let id = localStorage.getItem("client_id_portfolio");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("client_id_portfolio", id);
  }

  return id;
}