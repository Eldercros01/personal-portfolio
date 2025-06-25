const GITHUB_USERNAME = "Eric-Montero"; // Tu usuario GitHub
const REPO_COUNT = 6; // Cantidad máxima de repos

// Formatear fecha a un formato legible (ejemplo: 23 Mar 2025)
function formatDate(dateStr) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
}

async function fetchRepos() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );
    if (!response.ok) throw new Error("GitHub API error");
    const data = await response.json();

    const container = document.getElementById("repos-container");
    container.innerHTML = "";

    const filteredRepos = data
      .filter((repo) => !repo.fork)
      .slice(0, REPO_COUNT);

    filteredRepos.forEach((repo) => {
      const div = document.createElement("div");
      div.className = "project-tile";

      // Lenguaje puede ser null, ponemos 'N/A' si es null
      const language = repo.language ? repo.language : "N/A";
      const updated = formatDate(repo.updated_at);

      div.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <p class="repo-language"><strong>Language:</strong> ${language}</p>
          <p class="repo-updated"><strong>Last updated:</strong> ${updated}</p>
        </a>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

// Toggle dark/light mode
function toggleTheme() {
  const body = document.body;
  const btnIcon = document.querySelector("#theme-toggle i");

  if (body.classList.contains("dark-mode")) {
    body.classList.replace("dark-mode", "light-mode");
    btnIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    body.classList.replace("light-mode", "dark-mode");
    btnIcon.classList.replace("fa-sun", "fa-moon");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchRepos();

  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", toggleTheme);
});
