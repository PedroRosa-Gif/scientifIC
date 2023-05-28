# ScientifIC

## Sobre o projeto
### Projeto criando na disciplina MC426 (Engenharia de Software) na UNICAMP

### Autores

- Gabriel Augusto B. Gomes
- Paulo Victor de Souza Santos
- Pedro Lucas Lopes Rosa


## Sobre a arquitetura

Primeiramente, abaixo temos o diagrama C4 da nossa aplicação:
![C4 - Nível 1](https://github.com/PedroRosa-Gif/scientifIC/blob/develop/docs/C4%20Nivel%201.png)
![C4 - Nível 2](https://github.com/PedroRosa-Gif/scientifIC/blob/develop/docs/C4%20Nivel%202.png)
![C4 - Nível 3 (API)](https://github.com/PedroRosa-Gif/scientifIC/blob/develop/docs/C4%20Nivel%203%20API.png)
![C4 - Nível 3 (WEB)](https://github.com/PedroRosa-Gif/scientifIC/blob/develop/docs/C4%20Nivel%203%20Web.png)

Sobre os estilos arquiteturais que utilizamos em nossa aplicação, ela é baseada primeiramente no Cliente-Servidor, onde temos na parte do cliente a aplicação web e na parte do servidor uma aplicação em Node. Para a comunicação entre essas duas partes, utilizamos o RESTful APIs baseadas em HTTP, para que a parte cliente consiga chamar o servidor.

Com relação aos principais componentes de nosso sistema, existe uma relação entre o front e o back, então o componente que tivermos no front, com suas telas, tem o seu "equivalente" no backend com as funções e chamadas para o banco de dados. Dentre os principais componentes temos:
- Gerenciamento de ICs: Principal componente para o professor, onde ele consegue cadastrar/alterar ICs, além de aprovar algum aluno que tenha se candidatado e atualizar o status do desenvolvimento dessas ICs;
- Listagem de ICs: Onde todos os usuários conseguem visualizar as ICs criadas, acompanhando o status de cada uma delas e filtrando de acordo com suas preferências;
- Candidatura a uma IC: Principal componente para o Aluno, onde ele consegue visualizar as ICs de seu interesse para se candidatar-se a elas e possivelmente ser escolhido;
