<!-- É o que o usuário poderá fazer na aplicação -->
** Requisitos Funcionais **

<!-- É o que não tem ligação com a regra de negócio, exemplo: Será usado TYPEORM para queries... -->
** Requisitos Não Funcionais **

<!-- São as regras que irão complementar os requisitos funcionais -->
** Regra de Negócio **

# Cadastro de carro

** Requisito Funcional **
Deve ser possível cadastrar um novo carro.

** Regra de Negócio **
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado como disponível para locação por padrão.
* Somente poderá cadastrar um novo carro um usuário administrador.

# Listagem de carros

** Requisíto Funcional **
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

** Regra de Negócio **
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

** Requisíto Funcional **
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
Deve ser possível listar todos os carros.

** Regra de Negócio **
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Somente poderá cadastrar um novo carro um usuário administrador.

# Cadastro de imagens do carro

** Requisíto Funcional **
Deve ser possível cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

** Requisíto não Funcional **
Ultilizar o multer para upload dos arquivos.

** Regra de Negócio **
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Somente poderá cadastrar uma imagem ao carro um usuário administrador.


# Aluguel de carro

** Requisíto Funcional **
Deve ser possível cadastrar um aluguel.

** Regra de Negócio **
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O Usuário deve estar logado na aplicação.