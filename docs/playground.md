Board (tabuleiro): Isso é como uma grade vazia. Quando começamos, todas as casas estão vazias, como uma folha de papel em branco onde vamos desenhar.

currentPlayer: Ele guarda quem está jogando agora, como se tivéssemos uma ficha que diz “É a vez do Jogador 1!” ou “É a vez do Jogador 2!”.

winner: Esta parte guarda quem ganhou. No começo, ninguém ganhou ainda, então deixamos em branco.

winningCells: Se alguém ganha, nós guardamos as células onde a pessoa fez a linha de 4 peças.


## Agora temos uma função chamada dropPiece, que representa o jogador soltando uma peça.

Quando alguém escolhe uma coluna para jogar, o código checa:
Se alguém já ganhou: Não deixamos soltar uma peça se o jogo acabou.
Se a coluna está cheia: É como se já tivesse blocos empilhados até o topo; não dá para colocar mais peças ali.

## A função checkWinner verifica se alguém fez uma linha de 4 peças.

Ela examina várias direções:
Horizontal (esquerda-direita)
Vertical (cima-baixo)
Diagonal (como linhas em uma escada)
Se encontra quatro peças do mesmo jogador em linha, essa função diz que ele ganhou, como se fosse um juiz que grita “Gol!” no futebol.

## A função resetGame limpa o tabuleiro para começarmos de novo.

Reseta tudo para o começo, limpando o tabuleiro, definindo o jogador 1 como o próximo a jogar e dizendo que ninguém ganhou ainda.

## No final, temos o componente Playground, que é a parte visual. Aqui ele desenha o tabuleiro na tela.