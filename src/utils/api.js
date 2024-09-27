// Funções simuladas da API
export const login = (email, senha) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@example.com' && senha === 'password') {
        console.log(email, senha)
        const user = { id: 1, nome: 'Admin', email: 'admin@example.com' };
        localStorage.setItem('user', JSON.stringify(user));
        resolve({ data: user });
      } else {
        reject({ message: 'Credenciais inválidas' });
      }
    }, 500);
  });
};

export const obterUsuarioAtual = () => {
  return new Promise((resolve) => {
    const user = JSON.parse(localStorage.getItem('user'));
    resolve({ data: user });
  });
};