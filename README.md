# ATELIÊ NÓRD

Site estático demonstrativo de marcenaria sob medida. Marca fictícia, sem endereço, depoimentos ou alegações comerciais inventadas. Direção de arte editorial em linho, areia, nogueira e carvão; monograma original; imagens locais WebP com licenças documentadas.

## Visualizar localmente

Na raiz do projeto:

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080. Não há instalação de dependências nem etapa de build. Para encerrar, `Ctrl+C`.

## Estrutura

```text
index.html                 Página completa e semântica
assets/css/style.css       Layout, responsividade e animações
assets/js/config.js        Único ponto de configuração do WhatsApp
assets/js/main.js          Menu, filtros, lightbox, reveal e formulário
assets/images/             Sete imagens WebP locais e favicon SVG original
IMAGE_LICENSES.md          Autoria, URLs e licenças de todos os recursos
README.md                  Execução, configurações e publicação
QA.md                      Verificações realizadas e limites
```

## Interações

- Menu mobile com animação, fechamento ao selecionar seção, Escape e contenção do ciclo de Tab.
- Filtros reais por uso do ambiente e aviso acessível de quantidade.
- Galeria com seis referências, zoom em diálogo modal nativo, foco contido, Escape, botão de fechamento e retorno do foco ao card.
- Reveal com IntersectionObserver; conteúdo disponível sem JavaScript; preferência por movimento reduzido respeitada.
- Formulário com campos obrigatórios, limites e validação de espaços, prévia textual segura e mensagem organizada.
- Ano automático, navegação por âncoras e créditos de imagens expansíveis.

## Configurar WhatsApp

O envio está **desativado**. Não existe número fictício ou destino de fallback. O formulário não envia, armazena ou registra dados; a prévia é gerada em memória no navegador. Não há backend, coleta de leads ou armazenamento local.

Edite somente `assets/js/config.js`: informe em `whatsappNumber` um número que a empresa tenha autorizado, no formato internacional, apenas dígitos (código do país + DDD + número; sem `+`, espaços ou pontuação). O código aceita de 10 a 15 dígitos, iniciando de 1 a 9; isso valida apenas a sintaxe, não a titularidade ou existência do número. Confirme o destino real antes de publicar.

Depois de preencher os campos e clicar em **Visualizar mensagem**, o botão de WhatsApp será habilitado se houver configuração válida. A URL usa `encodeURIComponent()` para a mensagem. O WhatsApp abre em nova aba; o visitante revisa e efetua o envio lá. Qualquer alteração no formulário exige nova prévia.

Sem número autorizado, o botão permanece nativamente desativado e o aviso de demonstração continua visível. Para adaptar a uma empresa real, revisar também o texto sobre privacidade e demonstração conforme o fluxo efetivamente adotado.

## Cloudflare Pages — quando houver autorização

Nada foi publicado e nenhum push foi feito. O projeto funciona como conteúdo estático no Cloudflare Pages.

Opção de upload direto: preparar uma pasta contendo `index.html`, `assets/`, `IMAGE_LICENSES.md` e, opcionalmente, os arquivos de documentação; no painel do Pages, criar projeto por upload e carregar essa pasta. Não subir `.git`, arquivos privados ou ferramentas de teste.

Referências oficiais: [HTML estático](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) e [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), consultadas em 2026-11-04.

Opção de integração Git, somente após autorização para publicar o repositório: configurar um projeto Pages com preset **None**, sem comando de build e diretório de saída `.` (raiz). Não há variáveis de ambiente necessárias. Não requer Workers ou funções.

Antes da publicação real, configurar o número autorizado e o domínio. Atualizar `og:image` para a URL HTTPS absoluta da imagem no domínio final e acrescentar `og:url` e canonical com a URL real. A imagem atual é relativa para não inventar domínio; crawlers sociais podem não resolvê-la até essa configuração. O site não declara dados estruturados de empresa real.

## Imagens e licenças

Todas as sete fontes originais e as licenças oficiais Pexels e Unsplash foram verificadas em 2026-11-04. Consulte `IMAGE_LICENSES.md` e o painel de créditos no rodapé. Não há fontes web, imagens remotas em runtime ou recursos sem procedência documentada. Os ambientes são referências ilustrativas e não trabalhos do ATELIÊ NÓRD.

## Compatibilidade e limites

Destinado a versões atuais de Chrome, Edge, Safari e Firefox com suporte a `dialog`, CSS Grid, `clamp()` e IntersectionObserver. Sem JavaScript, o conteúdo e os links continuam disponíveis, mas filtros, menu mobile, zoom e prévia necessitam JavaScript. A entrega não inclui integração com CRM, backend, atendimento real, domínio ou hospedagem. Testes e observações em `QA.md`.
