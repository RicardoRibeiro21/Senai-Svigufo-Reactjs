// Função que verifica se o usuário está autenticado
export const usuarioAutenticado = () => localStorage.getItem("usuario-svigufo") !==null;