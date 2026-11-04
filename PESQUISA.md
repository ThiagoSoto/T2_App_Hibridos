# Diário de pesquisa

## Contexto do TCC
O OphidIA e um aplicativo focado em indentificar espécies brasileiras de serpentes a partir de fotos enviadas pelo usuário: o app envia a imagem a uma API FastAPI com um classificador ConvNeXt-Tiny de 246 espécies, e mostra a espécie mais provável em destaque junto com as outras duas candidatas do top 3. Nos nossos resultados, a acurácia é de 98,1% quando a confiança passa de 80%, mas o app hoje não faz nada diferente quando a confiança fica abaixo disso.

## Pergunta de pesquisa
O meu aplicativo do TCC, quando a confiança da IA é baixa, não deixa essa informação diferente de quando a confiança é alta. Por isso, como a FlatList com renderização condicional avisa o usuário do OphidIA quando a confiança da primeira candidata fica abaixo de 80%, inclusive quando vale exatamente 80% ou quando não há resultado?


Trilha (Tabela 1 da apostila): Listas + Estado e efeitos, ambas vistas em aula. O TCC é um app Flutter, então a PoC reproduz em Expo uma tela do app, com dados fixos.

## Alternativas consideradas
| Opção | Serve para | Decisão |
|-------|------------|---------|
| `FlatList` | Listas com `renderItem` (que recebe `item` e `index`), `keyExtractor` e `ListEmptyComponent` | Sim: é o que a disciplina cobre e a documentação confirma as três propriedades |
| `ScrollView` + `.map()` | Poucos itens fixos, renderizados todos de uma vez | A confirmar na documentação; funcionaria para 3 itens, mas não cobre `ListEmptyComponent` e não cresce se o top-N aumentar |
| `SectionList` | Listas agrupadas em seções | Não: não há seções; a documentação da `FlatList` indica a `SectionList` para esse caso |
| Renderização condicional (`&&`, `? :`) | Mostrar ou esconder o aviso conforme uma condição | Sim: é o mecanismo do aviso; a condição precisa ser um booleano para o `&&` não imprimir valores como `0` |
| `useState` + `useEffect` para guardar "confiança baixa" | Guardar em estado um valor calculado | Não: a documentação do React manda calcular durante a renderização o que dá para calcular a partir do estado |

## Fontes oficiais lidas
- FlatList (https://reactnative.dev/docs/flatlist): `renderItem` recebe `item` e `index`; `ListEmptyComponent`; `keyExtractor`; é um `PureComponent`, então valores usados no `renderItem` que não vêm de `data` devem ir em `extraData` [abrir e conferir]
- Conditional Rendering (https://react.dev/learn/conditional-rendering): `if`, `? :` e `&&` [abrir e conferir]
- You Might Not Need an Effect (https://react.dev/learn/you-might-not-need-an-effect): o que pode ser calculado a partir do estado não vai para o estado [abrir e conferir]
- [acrescentar: página do `ScrollView`, para fechar a linha da tabela]

## Onde a IA errou
[Preencher com erros reais encontrados ao construir e testar. A apostila exige pelo menos um, no formato abaixo.]
- Pedido: [o que foi pedido]
- O que veio: [a resposta errada]
- Como percebi: [erro de compilação, documentação, teste no aparelho]
- O certo: [o que a documentação confirma]

## Resultado e próximos passos no TCC
- Resultado: [preencher depois de rodar os critérios no aparelho]
- Próximo passo: levar o aviso de baixa confiança (limiar de 80%) para o app Flutter e ligar a tela à resposta real da API. O limiar vem dos resultados do TCC; a PoC só demonstra o comportamento da tela.
