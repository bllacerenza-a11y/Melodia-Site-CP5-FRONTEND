const cabecalho = document.querySelector('#cabecalho');
const botaoMenu = document.querySelector('#botao-menu');
const menu = document.querySelector('#menu-principal');
const formulario = document.querySelector('#formulario-contato');
const mensagem = document.querySelector('#mensagem-formulario');

function fecharMenu() {
  menu.classList.remove('aberto');
  botaoMenu.setAttribute('aria-expanded', 'false');
}

botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));

window.addEventListener('scroll', () => {
  const rolou = window.scrollY > 20;
  cabecalho.classList.toggle('bg-[#f3f0e8]/95', rolou);
  cabecalho.classList.toggle('backdrop-blur-md', rolou);
  cabecalho.classList.toggle('border-[#10100f]/20', rolou);
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  mensagem.textContent = 'Cadastro realizado! Em breve você receberá novidades.';
  formulario.reset();
});
