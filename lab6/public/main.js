function collectSystemInfo() {
  const ua = navigator.userAgent;

  let os = "Невідома ОС";
  if (/Windows NT 10/.test(ua)) os = "Windows 10/11";
  else if (/Windows NT 6.3/.test(ua)) os = "Windows 8.1";
  else if (/Windows NT 6.1/.test(ua)) os = "Windows 7";
  else if (/Mac OS X/.test(ua))
    os =
        "macOS " +
        (ua.match(/Mac OS X ([\d_]+)/) || ["", ""])[1].replace(/_/g, ".");
  else if (/Android/.test(ua))
    os = "Android " + (ua.match(/Android ([\d.]+)/) || ["", ""])[1];
  else if (/iPhone|iPad/.test(ua)) os = "iOS";
  else if (/Linux/.test(ua)) os = "Linux";

  let browser = "Невідомий браузер";
  let browserVersion = "";
  if (/Edg\//.test(ua)) {
    browser = "Microsoft Edge";
    browserVersion = (ua.match(/Edg\/([\d.]+)/) || ["", ""])[1];
  } else if (/OPR\//.test(ua)) {
    browser = "Opera";
    browserVersion = (ua.match(/OPR\/([\d.]+)/) || ["", ""])[1];
  } else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) {
    browser = "Google Chrome";
    browserVersion = (ua.match(/Chrome\/([\d.]+)/) || ["", ""])[1];
  } else if (/Firefox\//.test(ua)) {
    browser = "Mozilla Firefox";
    browserVersion = (ua.match(/Firefox\/([\d.]+)/) || ["", ""])[1];
  } else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) {
    browser = "Safari";
    browserVersion = (ua.match(/Version\/([\d.]+)/) || ["", ""])[1];
  }

  const info = {
    "Операційна система": os,
    Браузер: browser + (browserVersion ? " " + browserVersion : ""),
    "User Agent": ua,
    "Мова браузера": navigator.language || "невідома",
    "Роздільна здатність": `${screen.width}×${screen.height}`,
    "Доступна область": `${screen.availWidth}×${screen.availHeight}`,
    "Глибина кольору": screen.colorDepth + " bit",
    "Розмір вікна": `${window.innerWidth}×${window.innerHeight}`,
    Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    "Cookies увімкнено": navigator.cookieEnabled ? "Так" : "Ні",
    Онлайн: navigator.onLine ? "Так" : "Ні",
    Платформа: navigator.platform || "невідома",
    "Кількість ядер CPU": navigator.hardwareConcurrency || "невідома",
    "Дата відвідування": new Date().toLocaleString("uk-UA"),
  };

  Object.entries(info).forEach(([key, value]) => {
    localStorage.setItem("sysinfo_" + key, value);
  });

  return info;
}

function displaySystemInfo(info) {
  const container = document.getElementById("systemInfo");
  if (!container) return;
  container.innerHTML = "";

  Object.entries(info).forEach(([key, value]) => {
    const item = document.createElement("div");
    item.className = "sys-item";
    item.innerHTML = `<div class="sys-key">${key}</div><div class="sys-val">${value}</div>`;
    container.appendChild(item);
  });
}

const VARIANT_NUMBER = 7;

async function loadComments() {
  const container = document.getElementById("commentsContainer");
  if (!container) return;

  try {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${VARIANT_NUMBER}/comments`
    );

    if (!response.ok) {
      throw new Error(`HTTP помилка: ${response.status}`);
    }

    const comments = await response.json();
    renderComments(comments, container);
  } catch (error) {
    container.innerHTML = `<p style="color:var(--accent); padding:2rem; grid-column:1/-1;">
      Помилка завантаження: ${error.message}
    </p>`;
    console.error("Помилка завантаження коментарів:", error);
  }
}

function renderComments(comments, container) {
  container.innerHTML = "";

  if (!comments.length) {
    container.innerHTML =
        '<p style="grid-column:1/-1; color:var(--text-muted);">Коментарі не знайдено.</p>';
    return;
  }

  comments.forEach((comment, index) => {
    const card = document.createElement("div");
    card.className = "comment-card";
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <div class="commenter-name">${escapeHtml(comment.name)}</div>
      <div class="commenter-email">${escapeHtml(comment.email)}</div>
      <div class="comment-body">${escapeHtml(comment.body)}</div>
    `;

    container.appendChild(card);
  });
}

function escapeHtml(str) {
  return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
}


function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("contactForm");

  if (!overlay || !closeBtn || !form) return;

  setTimeout(() => {
    overlay.classList.remove("hidden");
  }, 60 * 1000);

  closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = "Відправляємо...";
    submitBtn.disabled = true;

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        submitBtn.textContent = "✓ Надіслано!";
        form.reset();
        setTimeout(() => {
          overlay.classList.add("hidden");
          submitBtn.textContent = "Відправити";
          submitBtn.disabled = false;
        }, 2000);
      } else {
        submitBtn.textContent = "Помилка. Спробуйте ще.";
        submitBtn.disabled = false;
        console.error("Помилка:", result.error);
      }
    } catch (err) {
      submitBtn.textContent = "Помилка мережі. Спробуйте ще.";
      submitBtn.disabled = false;
      console.error("Помилка відправки форми:", err);
    }
  });
}

const THEME_KEY = "site_theme";

function isDayTime() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 21;
}

function applyTheme(isDark) {
  const body = document.body;
  const toggleIcon = document.querySelector(".toggle-icon");

  if (isDark) {
    body.classList.add("dark");
    if (toggleIcon) toggleIcon.textContent = "🌙";
    localStorage.setItem(THEME_KEY, "dark");
  } else {
    body.classList.remove("dark");
    if (toggleIcon) toggleIcon.textContent = "☀️";
    localStorage.setItem(THEME_KEY, "light");
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else {
    applyTheme(!isDayTime());
  }

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(!isDark);
    });
  }

  setInterval(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const shouldBeDark = !isDayTime();
    const currentlyDark = document.body.classList.contains("dark");

    if (saved === null && shouldBeDark !== currentlyDark) {
      applyTheme(shouldBeDark);
    }
  }, 60 * 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  const sysInfo = collectSystemInfo();
  displaySystemInfo(sysInfo);

  loadComments();

  initModal();

  initTheme();
});