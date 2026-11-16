document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
  }

  // Busca local nos artigos publicados das quatro categorias
  const searchForm = document.getElementById("siteSearch");
  const searchInput = document.getElementById("searchInput");
  const resultsBox = document.getElementById("searchResults");
  const indexElement = document.getElementById("search-index");

  if (!searchForm || !searchInput || !resultsBox || !indexElement) return;

  let articles = [];
  try {
    articles = JSON.parse(indexElement.textContent || "[]");
  } catch (error) {
    console.error("Não foi possível carregar o índice de busca.", error);
  }

  const normalize = (value) => (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();

  const categoryNames = {
    negocios: "Negócios",
    tecnologia: "Tecnologia",
    trabalho: "Trabalho",
    educacao: "Educação"
  };

  const renderResults = (matches, query) => {
    resultsBox.replaceChildren();

    if (!query) {
      resultsBox.hidden = true;
      return;
    }

    resultsBox.hidden = false;

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "Nenhum artigo encontrado. Tente outras palavras.";
      resultsBox.appendChild(empty);
      return;
    }

    const count = document.createElement("p");
    count.className = "search-count";
    count.textContent = matches.length === 1
      ? "1 artigo encontrado"
      : `${matches.length} artigos encontrados`;
    resultsBox.appendChild(count);

    matches.slice(0, 8).forEach((article) => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = article.url;

      const title = document.createElement("strong");
      title.textContent = article.title;

      const category = document.createElement("span");
      category.textContent = categoryNames[article.section] || article.section;

      link.append(title, category);
      resultsBox.appendChild(link);
    });

    if (matches.length > 8) {
      const more = document.createElement("p");
      more.className = "search-count";
      more.textContent = `Mostrando os 8 primeiros de ${matches.length} resultados.`;
      resultsBox.appendChild(more);
    }
  };

  const search = () => {
    const query = normalize(searchInput.value);
    if (query.length < 2) {
      renderResults([], "");
      return [];
    }

    const terms = query.split(/\\s+/).filter(Boolean);
    const matches = articles.map((article) => {
      const title = normalize(article.title);
      const summary = normalize(article.summary);
      const content = normalize(article.content);
      const section = normalize(categoryNames[article.section] || article.section);
      const searchable = `${title} ${summary} ${content} ${section}`;
      const allTermsMatch = terms.every((term) => searchable.includes(term));
      if (!allTermsMatch) return null;

      let score = 0;
      terms.forEach((term) => {
        if (title.includes(term)) score += 5;
        if (summary.includes(term)) score += 2;
        if (section.includes(term)) score += 2;
      });
      return { article, score };
    }).filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.article);

    renderResults(matches, query);
    return matches;
  };

  searchInput.addEventListener("input", search);

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const matches = search();
    if (matches.length === 1) {
      window.location.href = matches[0].url;
    } else if (matches.length > 1) {
      resultsBox.scrollIntoView({ block: "nearest" });
    }
  });

  document.addEventListener("click", (event) => {
    if (!searchForm.contains(event.target)) {
      resultsBox.hidden = true;
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length >= 2) search();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resultsBox.hidden = true;
      searchInput.blur();
    }
  });
});
