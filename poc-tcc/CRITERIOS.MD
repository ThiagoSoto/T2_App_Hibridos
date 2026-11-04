# Critérios de aceitação

A tela tem cinco botões de cenário, com dados fixos no código: Alta (93% na primeira), Baixa (41%, 38% e 12%), Limite (exatamente 80% na primeira), Vazio (lista sem itens) e Inválido (primeira com confiança de 140%). O limiar é 80%: abaixo disso, o resultado é incerto.

- [X] Em Alta, a primeira linha aparece em destaque (maior, em negrito e com cor diferente), as outras duas aparecem em estilo normal e não há aviso.
- [] Em Baixa, aparece o aviso "Resultado incerto. Tente outra foto." e nenhuma das três linhas fica em destaque.
- [ ] Em Limite, com a primeira em exatamente 80,0%, não aparece aviso e a primeira linha fica em destaque.
- [ ] Em Vazio, aparece a mensagem "Nenhuma espécie identificada." no lugar das linhas e não aparece aviso.
- [ ] Em Inválido, com confiança fora do intervalo de 0 a 100%, aparece o aviso "Resultado incerto. Tente outra foto.", a linha mostra "—" no lugar da porcentagem, nenhuma linha fica em destaque e o app não quebra.
- [ ] Ao alternar entre os cinco cenários, o aviso aparece e some e o destaque volta à primeira linha, sem recarregar o app.
- [ ] Ao abrir o app e alternar por todos os cenários, nenhum aviso de `key` aparece no terminal do Metro.

Em todas as linhas válidas, a confiança aparece em porcentagem com uma casa decimal.

Fora do escopo: câmera, envio da foto à API e o aviso no app Flutter.

**Verificado em:** ( ) aparelho físico ( ) emulador
**Resultado:** ( ) passou ( ) reprovou