# Revisão de qualidade

Data: 2026-11-04. Testes locais com Playwright e Chromium headless. Ferramentas de QA instaladas apenas em `/tmp`, sem dependências para o site.

## Resultados

- Layout validado em **360, 390, 768, 1024, 1440 e 1920px**: largura do documento igual à viewport, sem rolagem horizontal.
- Todas as imagens decodificadas após rolar até cada elemento com lazy loading; nenhum arquivo ausente.
- Âncoras internas conferidas: todos os destinos existem.
- Menu mobile: abre, fecha, acompanha o estado `aria-expanded`, fecha ao navegar e com Escape.
- Filtros: Todos = 6, Descansar = 2 e Trabalhar = 1; cards ocultos saem do layout e da navegação por teclado.
- Lightbox: abre por Enter e clique; fecha por Escape e botão visível; retorna foco ao card. Modal nativo mantém o foco dentro do diálogo.
- Formulário: bloqueia campos vazios e nomes apenas com espaços; prévia preserva acentos e separa os campos; mudanças invalidam a prévia anterior.
- WhatsApp: botão desativado na configuração entregue; nenhum pedido externo de envio foi realizado.
- Fluxo configurado testado exclusivamente com substituição de configuração em memória e interceptação de `window.open`: URL com `encodeURIComponent()` correta para acentos e `&`. O número de teste nunca foi gravado no projeto nem contatado.
- Sem JavaScript: prévia e envio permanecem desativados; conteúdo continua disponível.
- Sem erros JavaScript ou mensagens de erro no console durante o roteiro funcional.
- `node --check` aprovado em ambos os arquivos JavaScript; `git diff --check` sem problemas.
- Revisão visual de capturas de desktop e celular de 360px.
- Preferência de movimento reduzido aplicada durante testes; CSS remove transições/animações e preserva conteúdo revelado.

## Acessibilidade

Axe-core nos critérios automatizados `wcag2a`, `wcag2aa` e `wcag21aa`: **zero violações detectadas** na página em 360 e 1440px, no menu mobile aberto e no lightbox aberto. Os contrastes de textos secundários foram corrigidos durante a revisão.

Conferidos labels, nome acessível dos controles, foco visível, link de pular conteúdo, `lang=pt-BR`, alt text, hierarquia das seções e avisos de demonstração. A auditoria automatizada e os testes de teclado são uma revisão básica; não equivalem a certificação de acessibilidade ou testes com todos os leitores de tela.

## Recursos e publicação

Sete imagens WebP locais, com autoria e licença comercial verificadas, documentadas em `IMAGE_LICENSES.md`. Símbolos originais e fontes de sistema. Sem scripts de terceiros no site. O projeto inteiro usa menos de 1 MB em recursos estáticos.

Nenhum push, publicação em GitHub ou deploy foi realizado. A adaptação para atendimento real exige número autorizado e revisão dos textos de demonstração. O domínio definitivo permite finalizar URLs absolutas de Open Graph e canonical.

## Limites da verificação

Verificado em Chromium no ambiente de desenvolvimento; Safari e Firefox e aparelhos físicos não foram testados. Não foi realizado envio real pelo WhatsApp, cadastro de domínio, teste de hospedagem ou auditoria Lighthouse. Não se afirma performance constante de 60 FPS em todo dispositivo.
