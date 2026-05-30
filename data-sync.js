(() => {
  const STORAGE_KEY = "dual-account-budget.v1";
  const SYNC_MESSAGE_KEY = "household-data-sync-message";
  const DATA_FILE_NAME = "household-data";
  const GITHUB_API_URL = "https://api.github.com/repos/Rin-1118/Household-Account-Book/contents/data/household-data.json";
  const GITHUB_BRANCH = "main";
  const DATA_SCHEMA_VERSION = 1;

  function installStyles() {
    if (document.querySelector("#dataSyncStyles")) return;
    const style = document.createElement("style");
    style.id = "dataSyncStyles";
    style.textContent = `
      .data-sync-panel { margin-bottom: 24px; }
      .data-sync-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .data-sync-card {
        display: grid;
        gap: 12px;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface-soft);
        box-shadow: var(--inner-light);
        padding: 14px;
      }
      .data-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .data-sync-warning {
        margin: 0;
        color: var(--expense);
        font-size: 0.84rem;
        font-weight: 900;
      }
      .form-message.is-error { color: var(--expense); }
      @media (max-width: 900px) {
        .data-sync-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .data-actions { grid-template-columns: 1fr; }
      }
    `;
    document.head.append(style);
  }

  function installPanel() {
    if (document.querySelector("#dataSyncPanel")) return true;
    const transactionsPanel = document.querySelector(".transactions-panel");
    if (!transactionsPanel) return false;

    transactionsPanel.insertAdjacentHTML(
      "afterend",
      `
        <section class="panel data-sync-panel" id="dataSyncPanel" aria-labelledby="dataSyncTitle">
          <div class="panel-header">
            <div>
              <p class="section-kicker">Data management</p>
              <h2 id="dataSyncTitle">データ管理</h2>
            </div>
          </div>
          <div class="data-sync-grid">
            <section class="data-sync-card" aria-labelledby="localDataTitle">
              <h3 id="localDataTitle">ファイル</h3>
              <div class="data-actions">
                <button class="ghost-button" id="exportDataButton" type="button">JSONを書き出し</button>
                <button class="primary-button" id="importDataButton" type="button">JSONを読み込み</button>
                <input id="importDataInput" type="file" accept="application/json,.json" hidden>
              </div>
            </section>
            <section class="data-sync-card" aria-labelledby="githubDataTitle">
              <h3 id="githubDataTitle">GitHub</h3>
              <label>
                <span>保存先</span>
                <input id="githubDataPathInput" type="text" value="data/household-data.json" readonly>
              </label>
              <label>
                <span>GitHub token</span>
                <input id="githubTokenInput" type="password" autocomplete="off" placeholder="ghp_...">
              </label>
              <div class="data-actions">
                <button class="ghost-button" id="loadGithubDataButton" type="button">GitHubから読み込み</button>
                <button class="secondary-button" id="saveGithubDataButton" type="button">GitHubへ保存</button>
              </div>
              <p class="data-sync-warning">公開リポジトリでは保存した家計データも公開されます。</p>
            </section>
          </div>
          <p class="form-message" id="dataSyncMessage" role="status" aria-live="polite"></p>
        </section>
      `,
    );
    return true;
  }

  function bindDataSync() {
    const exportButton = document.querySelector("#exportDataButton");
    const importButton = document.querySelector("#importDataButton");
    const importInput = document.querySelector("#importDataInput");
    const githubTokenInput = document.querySelector("#githubTokenInput");
    const loadGithubButton = document.querySelector("#loadGithubDataButton");
    const saveGithubButton = document.querySelector("#saveGithubDataButton");
    const message = document.querySelector("#dataSyncMessage");
    if (!exportButton || !importButton || !importInput || !message) return;

    const showMessage = (text, isError = false) => {
      message.textContent = text;
      message.classList.toggle("is-error", isError);
    };

    const pendingMessage = window.sessionStorage.getItem(SYNC_MESSAGE_KEY);
    if (pendingMessage) {
      showMessage(pendingMessage);
      window.sessionStorage.removeItem(SYNC_MESSAGE_KEY);
    }

    const storedState = () => {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) throw new Error("保存済みデータがありません。");
      return JSON.parse(raw);
    };

    const exportPayload = () => ({
      app: "家計簿",
      schemaVersion: DATA_SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      data: storedState(),
    });

    const extractState = (payload) => {
      if (payload?.data === null) throw new Error("保存済みデータがありません。");
      const candidate = payload?.data && typeof payload.data === "object" ? payload.data : payload;
      if (!candidate || !Array.isArray(candidate.accounts)) {
        throw new Error("家計簿データとして読み込めません。");
      }
      return candidate;
    };

    const replaceState = (payload, successMessage) => {
      const nextState = extractState(payload);
      if (!window.confirm("現在の家計簿データを読み込んだデータで置き換えます。")) return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      window.sessionStorage.setItem(SYNC_MESSAGE_KEY, successMessage);
      window.location.reload();
    };

    const encodeBase64 = (text) => {
      const bytes = new TextEncoder().encode(text);
      let binary = "";
      const chunkSize = 0x8000;
      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode(...bytes.slice(index, index + chunkSize));
      }
      return window.btoa(binary);
    };

    const decodeBase64 = (text) => {
      const binary = window.atob(text.replace(/\s/g, ""));
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    };

    const githubHeaders = (token = "") => {
      const headers = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (token) headers.Authorization = `Bearer ${token}`;
      return headers;
    };

    const fetchGithubFile = async (token = "") => {
      const response = await fetch(`${GITHUB_API_URL}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, {
        headers: githubHeaders(token),
      });
      if (response.status === 404) return null;
      if (!response.ok) throw new Error("GitHub上のデータを確認できませんでした。");
      return response.json();
    };

    exportButton.addEventListener("click", () => {
      try {
        const content = `${JSON.stringify(exportPayload(), null, 2)}\n`;
        const blob = new Blob([content], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${DATA_FILE_NAME}-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showMessage("JSONを書き出しました。");
      } catch (error) {
        showMessage(error.message, true);
      }
    });

    importButton.addEventListener("click", () => {
      importInput.click();
    });

    importInput.addEventListener("change", async () => {
      const [file] = importInput.files;
      if (!file) return;
      try {
        replaceState(JSON.parse(await file.text()), "JSONを読み込みました。");
      } catch (error) {
        showMessage(error.message, true);
      } finally {
        importInput.value = "";
      }
    });

    loadGithubButton?.addEventListener("click", async () => {
      try {
        loadGithubButton.disabled = true;
        const file = await fetchGithubFile(githubTokenInput?.value.trim() || "");
        if (!file?.content) throw new Error("GitHub上に保存済みデータがありません。");
        replaceState(JSON.parse(decodeBase64(file.content)), "GitHubから読み込みました。");
      } catch (error) {
        showMessage(error.message, true);
      } finally {
        loadGithubButton.disabled = false;
      }
    });

    saveGithubButton?.addEventListener("click", async () => {
      const token = githubTokenInput?.value.trim() || "";
      if (!token) {
        showMessage("GitHubへ保存するにはtokenが必要です。", true);
        return;
      }

      try {
        saveGithubButton.disabled = true;
        const existing = await fetchGithubFile(token);
        const body = {
          branch: GITHUB_BRANCH,
          message: "Update household ledger data",
          content: encodeBase64(`${JSON.stringify(exportPayload(), null, 2)}\n`),
        };
        if (existing?.sha) body.sha = existing.sha;

        const response = await fetch(GITHUB_API_URL, {
          method: "PUT",
          headers: { ...githubHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error("GitHubへ保存できませんでした。");
        showMessage("GitHubへ保存しました。");
      } catch (error) {
        showMessage(error.message, true);
      } finally {
        saveGithubButton.disabled = false;
      }
    });
  }

  installStyles();
  if (installPanel()) bindDataSync();
})();
