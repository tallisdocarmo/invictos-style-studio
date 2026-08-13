# Plano: Adição de Barra de Busca e Refinamento de Filtros

Adicionar uma barra de busca direta e melhorar a experiência de filtragem na listagem de produtos da Invictos Calçados para facilitar a localização de itens por categoria e estilo.

## Mudanças do Usuário

### Componentes de UI
- **CatalogView**:
  - Implementar uma barra de busca no topo da listagem de produtos (acima da grade).
  - Integrar a busca com o estado global do catálogo, permitindo filtragem em tempo real.
  - Adicionar suporte para debounce na busca para melhorar a performance.
- **FilterSidebar**:
  - Garantir que os filtros de categoria e gênero funcionem harmoniosamente com a nova busca.
  - Refinar o layout visual para facilitar a seleção rápida.

## Detalhes Técnicos
- O componente `CatalogView` já possui um estado `query` que inclui o campo `search`.
- A barra de busca será adicionada antes da seção de resultados, dentro do `Container`.
- Utilizaremos um input controlado com estado local para o valor visual da busca e um efeito para atualizar o estado global do catálogo (`query.search`).
- Estilo: Seguir o design system premium (Preto/Dourado/Branco).

## Próximos Passos
1. Modificar `src/components/shop/CatalogView.tsx` para incluir o campo de busca.
2. Atualizar o componente `FilterSidebar` se necessário para feedback visual.
