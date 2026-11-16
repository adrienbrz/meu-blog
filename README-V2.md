# Meu Blog — versão 2

Esta versão preserva a estrutura e a identidade visual originais e inclui correções técnicas e páginas institucionais.

## O que foi atualizado
- Corrigida a referência quebrada à imagem do artigo existente; os cards usam a imagem `hero.jpg` como alternativa.
- Criadas as páginas Sobre e Contato.
- Incluídos metadados SEO: canonical, Open Graph, Twitter Cards e dados estruturados Schema.org.
- Melhorados alguns detalhes de acessibilidade do menu e do formulário.
- Adicionada uma área de newsletter preparada para integração com um provedor.\n- Implementada busca local por título, resumo, texto e categoria, sem serviço externo.
- Incluídos os 40 modelos de artigos nas quatro categorias, como rascunhos.
- Removidos arquivos HTML antigos da pasta `public/` para evitar publicar uma compilação desatualizada.

## Antes de publicar
1. Edite `hugo.toml` e troque `https://seudominio.com/` pelo domínio real, mantendo a barra final.
2. Configure `params.contactEmail` com o e-mail oficial de contato.
3. Configure `params.newsletterAction` com a URL de formulário fornecida pelo serviço de newsletter. Enquanto isso não for configurado, o site informa que as inscrições ainda não estão ativas.
4. Revise e personalize os 40 modelos de artigos. Eles permanecem com `draft: true` e não são publicados no build normal.
5. Confira direitos de uso e créditos de imagens antes de publicar.

## Testar localmente
No terminal, entre na pasta `Projeto-Web/meu-blog` e execute:

```bash
hugo server -D
```

A opção `-D` inclui rascunhos durante a prévia local. Para gerar a versão de produção, use `hugo` depois de configurar o domínio e revisar os conteúdos.

## Estrutura
- `content/negocios`, `content/tecnologia`, `content/trabalho`, `content/educacao`: artigos e páginas de categoria.
- `content/sobre.md` e `content/contato.md`: páginas institucionais.
- `layouts/partials/seo.html`: metadados e dados estruturados.
- `layouts/partials/newsletter.html`: seção preparada para integração.


## Busca de artigos
- O campo "Buscar artigos..." aparece no cabeçalho, também em telas menores.
- A busca encontra palavras no título, resumo, conteúdo e nome da categoria; ignora diferenças entre maiúsculas/minúsculas e acentos.
- Os resultados são gerados no navegador a partir de um índice JSON criado pelo Hugo.
- Apenas artigos publicados entram no índice de produção. Para testar rascunhos localmente, execute `hugo server -D`.
- Não depende de API, conta externa ou serviço pago.
