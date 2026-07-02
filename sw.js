const CACHE_NAME = "household-ledger-pwa-v25";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

const RESET_HOTFIX_SCRIPT = `<script>
(() => {
  if (window.__householdResetHotfixLoaded) return;
  window.__householdResetHotfixLoaded = true;
  const STORAGE_KEY = "dual-account-budget.v1";
  const MESSAGE_KEY = "household-month-reset-message";
  const THEME_STYLE_ID = "household-account-theme-hotfix";
  const THEME_CSS =
    "body[data-account-theme='savings']{background:#fff;}" +
    "body[data-account-theme='savings'] .page-tab.is-active{color:#294f83;box-shadow:0 10px 24px rgba(66,109,168,.13),inset 0 1px 0 rgba(255,255,255,.76);}" +
    "body[data-account-theme='savings'] input:focus,body[data-account-theme='savings'] select:focus{border-color:rgba(66,109,168,.68);box-shadow:0 0 0 3px rgba(66,109,168,.14),inset 0 1px 0 rgba(255,255,255,.76);}" +
    "body[data-account-theme='savings'] .balance-card{border-color:rgba(255,255,255,.58);background:#fff;}" +
    "body[data-account-theme='savings'] .balance-card::before{background:rgba(66,109,168,.2);}" +
    "body[data-account-theme='savings'] .balance-card--total{background:#fff;border-color:rgba(255,255,255,.58);}" +
    "body[data-account-theme='savings'] .account-tab::before{background:rgba(66,109,168,.42);box-shadow:0 0 0 4px rgba(66,109,168,.08);}" +
    "body[data-account-theme='savings'] .account-tab::after{background:rgba(66,109,168,.1);color:#294f83;}" +
    "body[data-account-theme='savings'] .account-tab.is-active{background:linear-gradient(135deg,#426da8,#294f83);box-shadow:0 12px 28px rgba(66,109,168,.24),inset 0 1px 0 rgba(255,255,255,.76);}" +
    "body[data-account-theme='savings'] .account-tab.is-active::after{background:rgba(255,255,255,.18);color:#fff;}" +
    "body[data-account-theme='savings'] .primary-button{border-color:rgba(66,109,168,.74);background:linear-gradient(135deg,#426da8,#294f83);box-shadow:0 14px 34px rgba(66,109,168,.22);}" +
    "body[data-account-theme='savings'] .primary-button:hover{background:linear-gradient(135deg,#4a76b5,#244777);}" +
    "body[data-account-theme='savings'] .active-account-banner__label{background:#426da8;}" +
    "body[data-account-theme='savings'] .segmented-control input:checked+label{border-color:rgba(66,109,168,.62);background:rgba(66,109,168,.13);color:#294f83;}" +
    "body[data-account-theme='savings'] .transaction-kind.transfer,body[data-account-theme='savings'] .transaction-amount.transfer,body[data-account-theme='savings'] .badge.transfer{color:#294f83;}" +
    "body[data-account-theme='savings'] .badge.transfer{background:rgba(66,109,168,.13);}";
  const installThemeStyle = () => {
    if (document.querySelector("#" + THEME_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = THEME_STYLE_ID;
    style.textContent = THEME_CSS;
    document.head.append(style);
  };
  const applyTheme = () => {
    installThemeStyle();
    let activeAccountId = "account-1";
    try {
      const state = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
      activeAccountId = state.activeAccountId || activeAccountId;
    } catch {}
    document.body.dataset.accountTheme = activeAccountId === "account-2" ? "savings" : "main";
  };
  const ensureButton = (container, className = "") => {
    if (!container || container.querySelector("[data-reset-month-button]")) return;
    const button = document.createElement("button");
    button.className = ("danger-button " + className).trim();
    button.type = "button";
    button.dataset.resetMonthButton = "";
    button.textContent = "この月をリセット";
    container.append(button);
  };
  const setup = () => {
    applyTheme();
    ensureButton(document.querySelector(".asset-topbar"), "reset-month-button");
    ensureButton(document.querySelector(".transactions-actions") || document.querySelector(".transactions-header"));
    const message = window.sessionStorage.getItem(MESSAGE_KEY);
    const target = document.querySelector("#monthlyMessage") || document.querySelector("#fixedMessage");
    if (message && target) target.textContent = message;
    if (message) window.sessionStorage.removeItem(MESSAGE_KEY);
  };
  const selectedMonth = () => document.querySelector("#monthPicker")?.value || new Date().toISOString().slice(0, 7);
  const txMonth = (transaction) => transaction?.budgetMonth || String(transaction?.date || "").slice(0, 7);
  const balanceDelta = (transaction) => {
    if (transaction.type === "income" || transaction.type === "transfer-in") return Number(transaction.amount || 0);
    if (transaction.type === "expense" || transaction.type === "transfer-out") return -Number(transaction.amount || 0);
    return 0;
  };
  const walletDelta = (transaction) => (transaction.type === "income" ? Number(transaction.amount || 0) : -Number(transaction.amount || 0));
  const monthLabel = (monthKey) => {
    const [year, month] = String(monthKey).split("-");
    return year && month ? year + "/" + Number(month) : monthKey;
  };
  const getResetPlan = (state, account, monthKey) => {
    const accountTransactionIds = new Set();
    const transferIds = new Set();
    const walletTransferIds = new Set();
    account.transactions.forEach((transaction) => {
      if (txMonth(transaction) !== monthKey) return;
      accountTransactionIds.add(transaction.id);
      if ((transaction.source === "transfer" || transaction.source === "auto-transfer") && transaction.transferId) transferIds.add(transaction.transferId);
      if (transaction.source === "wallet-transfer" && transaction.transferId) walletTransferIds.add(transaction.transferId);
    });
    const pairedTransferCount = state.accounts.reduce((count, targetAccount) => {
      if (targetAccount.id === account.id) return count;
      return count + targetAccount.transactions.filter((transaction) => transaction.transferId && transferIds.has(transaction.transferId)).length;
    }, 0);
    const walletTransactionCount = (state.walletTransactions || []).filter((transaction) => transaction.transferId && walletTransferIds.has(transaction.transferId)).length;
    return {
      accountTransactionIds,
      transferIds,
      walletTransferIds,
      accountTransactionCount: accountTransactionIds.size,
      pairedTransferCount,
      walletTransactionCount,
      clearsFixedSkips: Boolean(state.skippedRecurring?.[account.id]?.[monthKey]),
      clearsTransferSkips: Boolean(state.skippedRecurringTransfers?.[monthKey]),
    };
  };
  const resetConfirmMessage = (account, monthKey, plan) => [
    account.name + "の" + monthLabel(monthKey) + "の記録をリセットします。",
    "",
    "削除・解除される対象:",
    "- この口座のこの月の取引: " + plan.accountTransactionCount + "件",
    "- 振込ペアの相手側記録: " + plan.pairedTransferCount + "件",
    "- 財布入金と連動する財布側記録: " + plan.walletTransactionCount + "件",
    "- 固定収支の再入力フラグ解除: " + (plan.clearsFixedSkips ? "あり" : "なし"),
    "- 自動振込の再入力フラグ解除: " + (plan.clearsTransferSkips ? "あり" : "なし"),
    "",
    "残高に反映済みの記録は、削除と同時に残高も戻します。",
    "この操作は元に戻せません。実行しますか？",
  ].join("\\n");
  const resetMonth = () => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    const account = state.accounts?.find((item) => item.id === state.activeAccountId) || state.accounts?.[0];
    const monthKey = selectedMonth();
    if (!account || !monthKey) return;
    const plan = getResetPlan(state, account, monthKey);
    if (!window.confirm(resetConfirmMessage(account, monthKey, plan))) return;
    let removed = 0;
    state.accounts.forEach((targetAccount) => {
      targetAccount.transactions = targetAccount.transactions.filter((transaction) => {
        const selected = targetAccount.id === account.id && plan.accountTransactionIds.has(transaction.id);
        const paired = transaction.transferId && plan.transferIds.has(transaction.transferId);
        if (!selected && !paired) return true;
        if (transaction.balanceImpactApplied) targetAccount.currentBalance = Number(targetAccount.currentBalance || 0) - balanceDelta(transaction);
        if (selected) removed += 1;
        return false;
      });
    });
    state.walletTransactions = (state.walletTransactions || []).filter((transaction) => {
      if (!transaction.transferId || !plan.walletTransferIds.has(transaction.transferId)) return true;
      if (transaction.balanceImpactApplied) state.walletBalance = Number(state.walletBalance || 0) - walletDelta(transaction);
      return false;
    });
    if (state.skippedRecurring?.[account.id]?.[monthKey]) {
      delete state.skippedRecurring[account.id][monthKey];
      if (!Object.keys(state.skippedRecurring[account.id]).length) delete state.skippedRecurring[account.id];
    }
    if (state.skippedRecurringTransfers?.[monthKey]) delete state.skippedRecurringTransfers[monthKey];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.sessionStorage.setItem(MESSAGE_KEY, removed ? monthLabel(monthKey) + "の記録をリセットしました。" : monthLabel(monthKey) + "にはリセットする記録がありません。");
    window.location.reload();
  };
  document.addEventListener("DOMContentLoaded", setup);
  window.addEventListener("load", setup);
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-account-button]")) return;
    window.setTimeout(applyTheme, 0);
  });
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-reset-month-button]");
    if (!button || window.__householdSupportsMonthlyReset) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    resetMonth();
  }, true);
})();
</script>`;

function injectResetHotfix(html) {
  if (html.includes("household-month-reset-message") || html.includes("__householdResetHotfixLoaded")) return html;
  return html.replace("</body>", `${RESET_HOTFIX_SCRIPT}</body>`);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then((clients) => {
        clients.forEach((client) => {
          if (client.url) client.navigate(client.url);
        });
      }),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          const contentType = response.headers.get("content-type") || "";
          if (!contentType.includes("text/html")) return response;
          const headers = new Headers(response.headers);
          headers.delete("content-length");
          return new Response(injectResetHotfix(await response.text()), {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch(async () => {
          const cached = await caches.match("./index.html");
          if (!cached) return cached;
          const headers = new Headers(cached.headers);
          headers.delete("content-length");
          return new Response(injectResetHotfix(await cached.text()), { headers });
        }),
    );
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
