# Requisitos Funcionais

- [x] Deve ser possível registrar uma refeição feita
- [x] Deve ser possível editar uma refeição
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
    - [x] Quantidade total de refeições registradas
    - [x] Quantidade total de refeições dentro da dieta
    - [x] Quantidade total de refeições fora da dieta
    - [ ] Melhor sequência de refeições dentro da dieta
- [ ] Deve ser possível criar um usuário

# Regras de Negócio
- [ ] Deve ser possível identificar o usuário entre as requisições
- [x] Uma refeição deve ter os seguintes campos obrigatórios:
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
    - Usuário
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou
