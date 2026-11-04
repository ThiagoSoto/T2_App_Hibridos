# Diário de pesquisa

## Contexto do TCC
O OphidIA é um aplicativo focado em identificar espécies brasileiras de serpentes a partir de fotos enviadas pelo usuário: o app envia a imagem a uma API FastAPI com um classificador ConvNeXt-Tiny de 246 espécies, e mostra a espécie mais provável em destaque junto com as outras duas candidatas do top 3. Nos nossos resultados, a acurácia é de 98,1% quando a confiança passa de 80%, mas o app hoje não faz nada diferente quando a confiança fica abaixo disso.

## Pergunta de pesquisa
Como a FlatList com renderização condicional mostra, na tela de resultado do app OphidIA, a mensagem "Resultado incerto" na condição de a IA ter menos de 80% de confiança na espécie mais provável?

Definições: confiança é a porcentagem de certeza que a IA dá a cada espécie; confiança baixa é quando a primeira espécie tem menos de 80%; aviso é o texto "Resultado incerto. Tente outra foto." na tela de resultado. A PoC é só essa tela, com dados de exemplo (sem a IA e sem câmera).

Revisão do colega: entendeu que eu ia construir a IA que identifica a cobra, e não a tela de resultado; disse que "banner de aviso" e "confiança baixa" não ficaram claros. Ajustei: encurtei a pergunta, defini os termos acima e deixei explícito que a PoC é só a tela de resultado.



Trilha (Tabela 1 da apostila): Listas + Estado e efeitos, ambas vistas em aula. O TCC é um app Flutter, então a PoC reproduz em Expo uma tela do app, com dados fixos.

## Alternativas consideradas

Alternativas para avisar a baixa confiança, mapeadas pelo Claude e pelo ChatGPT (exercício 3). A coluna "Expo Go" veio da IA. Conferi na documentação o expo-notifications (local funciona; push remoto não no Android). As demais são componentes do próprio React Native.

| Opção (quem citou) | Serve para | Expo Go | Decisão |
|--------------------|------------|---------|---------|
| Renderização condicional com `View` e `Text` (Claude e ChatGPT) | Mostrar o aviso junto do resultado, sem biblioteca | Sim  | Sim, porque o aviso fica visível junto da espécie e não usa módulo nativo |
| Componente de alerta próprio, como `ConfidenceWarning` (ChatGPT) | Reutilizar o aviso em várias telas | Sim  | Não, o objetivo é realizar o PoC que é uma tela apenas|
| `Alert` nativo (Claude e ChatGPT) | Diálogo rápido do sistema, com confirmação | Sim | Não, some ao toque, e o aviso precisa ficar na tela para o usuário continuar vendo |
| `Modal` do React Native (Claude e ChatGPT) | Aviso estilizado que bloqueia o fluxo | Sim  | Não, bloqueia a tela e exige mais estado para uma frase curta |
| Rota modal do Expo Router (Claude) | Aviso com mais conteúdo, em app que já usa Expo Router | Sim, se o app usa Expo Router| Não, difere do objetivo da PoC que não tem navegação |
| Toast ou snackbar de biblioteca (Claude) | Avisos leves e passageiros | Depende da biblioteca  | Não, isso some sozinho, e a desconfiança precisa continuar na tela |
| `expo-notifications` (ChatGPT) | Notificação fora da tela do resultado | Local sim; push remoto não no Android  | Não, não fica junto do resultado e pede permissão |
| Acessibilidade: `accessibilityLiveRegion` e `announceForAccessibility` (Claude e ChatGPT) | Leitores de tela anunciarem o aviso | Sim  |  Não, vai ficar como próximo passo, não substitui o aviso visual |
| `expo-haptics` (Claude) | Vibração como reforço do aviso | Sim  | Não, é só complemento, o foco principal é o reforço visual |

### Para exibir as candidatas

| Opção | Serve para | Decisão |
|-------|------------|---------|
| `FlatList` | Listas com `renderItem` (que recebe `item` e `index`), `keyExtractor` e `ListEmptyComponent` | Sim, é o que a disciplina cobre e a documentação confirma as três propriedades |
| `ScrollView` + `.map()` | Poucos itens fixos, renderizados todos de uma vez | Não, pq a documentação confirma que renderiza todos os filhos de uma vez e não tem ListEmptyComponent pronto, então a lista vazia teria que ser tratada à mão |
| `SectionList` | Listas agrupadas em seções | Não, não há seções |
| `useState` + `useEffect` para guardar "confiança baixa" | Guardar em estado um valor calculado | Não, o que dá para calcular a partir do estado se calcula durante a renderização |

## Fontes oficiais lidas
- FlatList (https://reactnative.dev/docs/flatlist)
- Conditional Rendering (https://react.dev/learn/conditional-rendering)
- You Might Not Need an Effect (https://react.dev/learn/you-might-not-need-an-effect)
- ScrollView (https://reactnative.dev/docs/scrollview)
- Expo Notifications (https://docs.expo.dev/versions/latest/sdk/notifications/)
- Expo Haptics (https://docs.expo.dev/versions/latest/sdk/haptics/)

## Divergências entre as IAs (exercício 3)
- Concordam: renderização condicional como base do aviso; `Alert`, `Modal` e acessibilidade aparecem nas duas respostas.
- Só o Claude citou: rota modal do Expo Router, toast e `expo-haptics`.
- Só o ChatGPT citou: componente de alerta próprio e `expo-notifications`.
- Acessibilidade: o ChatGPT a trata como alternativa e o Claude como reforço.
- O que a documentação confirmou ou desmentiu:
  - Claude: o Taptic Engine do iOS não vibra no Modo de Baixo Consumo. Confirmado na página do `expo-haptics`.
  - Tabela comparativa: o push remoto não funciona no Expo Go do Android desde o SDK 53, e o local sim. Confirmado na página do `expo-notifications`.
  - Claude: explicou que a `FlatList` só redesenha quando `data` muda e que por isso o valor `low` vai em `extraData`. Foi desmentido, na página da `FlatList` e vi que ela redesenha quando qualquer propriedade muda, com `renderItem` inline, que é recriado a cada renderização, ela se atualiza mesmo sem `extraData`.

## Onde a IA errou

### Erro 1

Pedido: implementar a PoC e explicar, antes de alterar arquivos, por que cada função da FlatList seria usada.

O que veio: o Copilot disse que usaria extraData "para atualizar a renderização ao trocar de cenário".

Como percebi: na documentação da FlatList (seção extraData), ele serve para dados que mudam fora do data. Trocar de cenário já troca o data, e a FlatList é um PureComponent, que re-renderiza quando uma propriedade muda.

O que estava certo: nesta tela o extraData não é necessário para isso; a explicação do agente estava errada.


### Erro 2

Pedido: implementar a PoC seguindo o AGENTS.md.

O que veio: o Copilot guardou o destaque em um campo highlighted fixo nos dados de cada cenário, enquanto o aviso era calculado pela regra dos 80%.

Como percebi: lendo o código antes de aceitar o diff. Dava para mudar a confiança e o aviso aparecer com a primeira linha ainda em destaque.

O que estava certo: o destaque deve ser calculado na renderização, com index === 0 e a mesma condição do aviso, e não ficar armazenado nos dados.

## Alteração pequena com o agente (exercício 9)
Pedido: trocar o 0.8 do aviso por uma constante com nome.
Diff: Mudou apenas no App.tsx, excluindo uma linha e adicionando quatro linhas.
O diff mudou só o necessário? Sim, só mudou o necessário.


## Resultado e próximos passos no TCC
- Resultado: PoC passou nos 5 critérios do CRITERIOS.md, verificados no aparelho físico (Android, Expo Go, SDK 58), cada um com seu commit: Alta, Baixa, Limite, Vazio e Inválido. Respondendo à pergunta: com a FlatList, o aviso e o destaque saem da mesma condição, calculada durante a renderização (confiança da primeira candidata menor que 0,80), sem estado extra; o ListEmptyComponent cobre a lista vazia; e uma regra única de validade cobre a confiança fora de 0 a 1. O extraData não foi necessário e nenhum pacote foi instalado. Limite observado: a tela mostra a confiança arredondada em uma casa, mas o aviso usa o valor real, então 0,7996 apareceria como 80,0% com aviso.
- Próximo passo: levar o aviso de baixa confiança (limiar de 80%) para o app Flutter e ligar a tela à resposta real da API. O limiar vem dos resultados do TCC.
