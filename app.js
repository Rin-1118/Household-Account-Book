const STORAGE_KEY = "dual-account-budget.v1";
const AUTH_CREDENTIAL_KEY = "household-face-auth-credential.v1";

const DEFAULT_EXPENSE_CATEGORIES = ["食費", "日用品", "交通", "住居", "通信", "水道光熱", "医療", "娯楽", "教育", "その他"];
const DEFAULT_INCOME_CATEGORIES = ["給与", "副収入", "仕送り", "利息", "その他"];
const CHART_COLORS = ["#1b7f79", "#b94b3f", "#b7791f", "#327a4f", "#5d6f95", "#8b5e34", "#7c5a9e", "#566b5d"];
const MAIN_ACCOUNT_ID = "account-1";
const DEFAULT_ACCOUNT_NAMES = {
  "account-1": "１ヶ月分（メイン）",
  "account-2": "貯金",
};
const LEGACY_DEFAULT_ACCOUNT_NAMES = {
  "account-1": ["生活口座"],
  "account-2": ["予備口座"],
};

const elements = {
  authLock: document.querySelector("#authLock"),
  authTitle: document.querySelector("#authTitle"),
  authDescription: document.querySelector("#authDescription"),
  authPrimaryButton: document.querySelector("#authPrimaryButton"),
  authResetButton: document.querySelector("#authResetButton"),
  authMessage: document.querySelector("#authMessage"),
  pageButtons: document.querySelectorAll("[data-page-button]"),
  walletPage: document.querySelector("#walletPage"),
  assetsPage: document.querySelector("#assetsPage"),
  monthControl: document.querySelector(".month-control"),
  monthPicker: document.querySelector("#monthPicker"),
  walletHomeLabel: document.querySelector("#walletHomeLabel"),
  walletHomeBalance: document.querySelector("#walletHomeBalance"),
  captureReceiptButton: document.querySelector("#captureReceiptButton"),
  receiptCameraDialog: document.querySelector("#receiptCameraDialog"),
  receiptCameraForm: document.querySelector("#receiptCameraForm"),
  receiptCameraVideo: document.querySelector("#receiptCameraVideo"),
  receiptCameraMessage: document.querySelector("#receiptCameraMessage"),
  takeReceiptPhotoButton: document.querySelector("#takeReceiptPhotoButton"),
  receiptConfirmDialog: document.querySelector("#receiptConfirmDialog"),
  receiptConfirmForm: document.querySelector("#receiptConfirmForm"),
  receiptPreviewImage: document.querySelector("#receiptPreviewImage"),
  receiptAmountInput: document.querySelector("#receiptAmountInput"),
  receiptDateInput: document.querySelector("#receiptDateInput"),
  receiptMemoInput: document.querySelector("#receiptMemoInput"),
  receiptConfirmMessage: document.querySelector("#receiptConfirmMessage"),
  openWalletEntryButton: document.querySelector("#openWalletEntryButton"),
  totalCurrentBalance: document.querySelector("#totalCurrentBalance"),
  walletBalanceLabel: document.querySelector("#walletBalanceLabel"),
  walletBalance: document.querySelector("#walletBalance"),
  activeAccountName: document.querySelector("#activeAccountName"),
  incomeTotal: document.querySelector("#incomeTotal"),
  expenseTotal: document.querySelector("#expenseTotal"),
  balanceTotal: document.querySelector("#balanceTotal"),
  transferNetTotal: document.querySelector("#transferNetTotal"),
  fixedIncomeTotal: document.querySelector("#fixedIncomeTotal"),
  fixedExpenseTotal: document.querySelector("#fixedExpenseTotal"),
  transactionForm: document.querySelector("#transactionForm"),
  accountExpenseDestinationGroup: document.querySelector("#accountExpenseDestinationGroup"),
  accountExpenseDestinationSelect: document.querySelector("#accountExpenseDestinationSelect"),
  amountInput: document.querySelector("#amountInput"),
  categoryInput: document.querySelector("#categoryInput"),
  dateInput: document.querySelector("#dateInput"),
  memoInput: document.querySelector("#memoInput"),
  categoryOptions: document.querySelector("#categoryOptions"),
  transactionMessage: document.querySelector("#transactionMessage"),
  fixedCostForm: document.querySelector("#fixedCostForm"),
  fixedNameInput: document.querySelector("#fixedNameInput"),
  fixedCategoryInput: document.querySelector("#fixedCategoryInput"),
  fixedAmountInput: document.querySelector("#fixedAmountInput"),
  fixedDayInput: document.querySelector("#fixedDayInput"),
  fixedStartMonthSelect: document.querySelector("#fixedStartMonthSelect"),
  fixedSubmitButton: document.querySelector("#fixedSubmitButton"),
  fixedMessage: document.querySelector("#fixedMessage"),
  fixedEarlyForm: document.querySelector("#fixedEarlyForm"),
  fixedEarlyTargetMonthInput: document.querySelector("#fixedEarlyTargetMonthInput"),
  fixedEarlyDateInput: document.querySelector("#fixedEarlyDateInput"),
  fixedEarlyMessage: document.querySelector("#fixedEarlyMessage"),
  fixedCostList: document.querySelector("#fixedCostList"),
  transferForm: document.querySelector("#transferForm"),
  transferFromSelect: document.querySelector("#transferFromSelect"),
  transferToSelect: document.querySelector("#transferToSelect"),
  transferAmountInput: document.querySelector("#transferAmountInput"),
  transferDateInput: document.querySelector("#transferDateInput"),
  transferMemoInput: document.querySelector("#transferMemoInput"),
  transferMessage: document.querySelector("#transferMessage"),
  autoTransferForm: document.querySelector("#autoTransferForm"),
  autoTransferFromSelect: document.querySelector("#autoTransferFromSelect"),
  autoTransferToSelect: document.querySelector("#autoTransferToSelect"),
  autoTransferAmountInput: document.querySelector("#autoTransferAmountInput"),
  autoTransferDayInput: document.querySelector("#autoTransferDayInput"),
  autoTransferMemoInput: document.querySelector("#autoTransferMemoInput"),
  autoTransferMessage: document.querySelector("#autoTransferMessage"),
  autoTransferList: document.querySelector("#autoTransferList"),
  incomeChart: document.querySelector("#incomeChart"),
  incomeLegend: document.querySelector("#incomeLegend"),
  expenseChart: document.querySelector("#expenseChart"),
  expenseLegend: document.querySelector("#expenseLegend"),
  transactionList: document.querySelector("#transactionList"),
  monthlyMessage: document.querySelector("#monthlyMessage"),
  resetMonthButtons: document.querySelectorAll("[data-reset-month-button]"),
  reflectFixedButton: document.querySelector("#reflectFixedButton"),
  editAccountsButton: document.querySelector("#editAccountsButton"),
  editWalletButton: document.querySelector("#editWalletButton"),
  accountsDialog: document.querySelector("#accountsDialog"),
  accountsForm: document.querySelector("#accountsForm"),
  walletEntryDialog: document.querySelector("#walletEntryDialog"),
  walletEntryForm: document.querySelector("#walletEntryForm"),
  walletEntryAmountInput: document.querySelector("#walletEntryAmountInput"),
  walletEntrySourceGroup: document.querySelector("#walletEntrySourceGroup"),
  walletEntrySourceSelect: document.querySelector("#walletEntrySourceSelect"),
  walletEntryDateInput: document.querySelector("#walletEntryDateInput"),
  walletEntryMemoInput: document.querySelector("#walletEntryMemoInput"),
  walletEntryMessage: document.querySelector("#walletEntryMessage"),
  walletDialog: document.querySelector("#walletDialog"),
  walletForm: document.querySelector("#walletForm"),
  walletNameInput: document.querySelector("#walletNameInput"),
  walletDirectInput: document.querySelector("#walletDirectInput"),
  accountOneName: document.querySelector("#accountOneName"),
  accountTwoName: document.querySelector("#accountTwoName"),
  accountOneBalance: document.querySelector("#accountOneBalance"),
  accountTwoBalance: document.querySelector("#accountTwoBalance"),
  walletBalanceInput: document.querySelector("#walletBalanceInput"),
};

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

let activePage = window.location.hash === "#assets" ? "assets" : "wallet";
let state = loadState();
let dueBalanceTimerId = null;
let receiptPreviewUrl = "";
let receiptCameraStream = null;

function createDefaultState() {
  return {
    activeAccountId: MAIN_ACCOUNT_ID,
    walletName: "財布",
    walletBalance: 0,
    walletTransactions: [],
    accounts: [
      { id: "account-1", name: DEFAULT_ACCOUNT_NAMES["account-1"], currentBalance: 0, transactions: [], recurring: [] },
      { id: "account-2", name: DEFAULT_ACCOUNT_NAMES["account-2"], currentBalance: 0, transactions: [], recurring: [] },
    ],
    recurringTransfers: [],
    skippedRecurring: {},
    skippedRecurringTransfers: {},
  };
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return createDefaultState();
  }
}

function normalizeState(input) {
  const fallback = createDefaultState();
  if (!input || !Array.isArray(input.accounts)) return fallback;

  const accounts = fallback.accounts.map((base, index) => {
    const saved = input.accounts.find((account) => account.id === base.id) || input.accounts[index] || {};
    return {
      id: base.id,
      name: normalizeAccountName(base.id, saved.name, base.name),
      currentBalance: Number.isFinite(Number(saved.currentBalance)) ? Number(saved.currentBalance) : Number(base.currentBalance || 0),
      transactions: Array.isArray(saved.transactions) ? saved.transactions : [],
      recurring: Array.isArray(saved.recurring) ? saved.recurring.map(normalizeRecurringItem) : [],
    };
  });

  const activeAccountId = accounts.some((account) => account.id === input.activeAccountId)
    ? input.activeAccountId
    : accounts[0].id;

  return {
    activeAccountId,
    walletName: typeof input.walletName === "string" && input.walletName.trim() ? input.walletName.trim() : fallback.walletName,
    walletBalance: Number.isFinite(Number(input.walletBalance)) ? Number(input.walletBalance) : Number(fallback.walletBalance || 0),
    walletTransactions: Array.isArray(input.walletTransactions) ? input.walletTransactions.map(normalizeWalletTransactionItem) : [],
    accounts,
    recurringTransfers: Array.isArray(input.recurringTransfers) ? input.recurringTransfers.map(normalizeRecurringTransferItem) : [],
    skippedRecurring: input.skippedRecurring && typeof input.skippedRecurring === "object" ? input.skippedRecurring : {},
    skippedRecurringTransfers:
      input.skippedRecurringTransfers && typeof input.skippedRecurringTransfers === "object" ? input.skippedRecurringTransfers : {},
  };
}

function normalizeAccountName(accountId, savedName, fallbackName) {
  const trimmed = typeof savedName === "string" ? savedName.trim() : "";
  const defaultName = DEFAULT_ACCOUNT_NAMES[accountId] || fallbackName;
  if (!trimmed) return defaultName;
  if ((LEGACY_DEFAULT_ACCOUNT_NAMES[accountId] || []).includes(trimmed)) return defaultName;
  return trimmed;
}

function normalizeRecurringItem(item) {
  const type = item?.type === "income" ? "income" : "expense";
  return {
    id: typeof item?.id === "string" ? item.id : uid("recurring"),
    name: typeof item?.name === "string" ? item.name : "",
    category: typeof item?.category === "string" ? item.category : "その他",
    amount: Number(item?.amount) || 0,
    day: Number(item?.day) || 1,
    type,
    startMonth: typeof item?.startMonth === "string" ? item.startMonth : currentMonthKey(),
    active: item?.active !== false,
    createdAt: item?.createdAt || new Date().toISOString(),
  };
}

function normalizeWalletTransactionItem(item) {
  const type = item?.type === "income" ? "income" : "expense";
  return {
    id: typeof item?.id === "string" ? item.id : uid("wallet"),
    type,
    date: typeof item?.date === "string" ? item.date : todayIso(),
    amount: Number(item?.amount) || 0,
    category: typeof item?.category === "string" ? item.category : "",
    memo: typeof item?.memo === "string" ? item.memo : "",
    sourceType: ["account", "other", "receipt"].includes(item?.sourceType) ? item.sourceType : null,
    sourceAccountId: typeof item?.sourceAccountId === "string" ? item.sourceAccountId : null,
    transferId: typeof item?.transferId === "string" ? item.transferId : null,
    balanceImpactApplied: item?.balanceImpactApplied === true,
    createdAt: item?.createdAt || new Date().toISOString(),
  };
}

function normalizeRecurringTransferItem(item) {
  return {
    id: typeof item?.id === "string" ? item.id : uid("auto-transfer"),
    fromAccountId: typeof item?.fromAccountId === "string" ? item.fromAccountId : "account-1",
    toAccountId: typeof item?.toAccountId === "string" ? item.toAccountId : "account-2",
    amount: Number(item?.amount) || 0,
    day: Number(item?.day) || 1,
    memo: typeof item?.memo === "string" ? item.memo : "",
    startMonth: typeof item?.startMonth === "string" ? item.startMonth : currentMonthKey(),
    active: item?.active !== false,
    createdAt: item?.createdAt || new Date().toISOString(),
  };
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatYen(value) {
  return yenFormatter.format(Math.round(Number(value) || 0));
}

function todayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function currentMonthKey() {
  return todayIso().slice(0, 7);
}

function randomBytes(length = 32) {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return bytes;
}

function bytesToBase64Url(bytes) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const base64 = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = window.atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function getStoredAuthCredentialId() {
  try {
    return window.localStorage.getItem(AUTH_CREDENTIAL_KEY) || "";
  } catch {
    return "";
  }
}

function setStoredAuthCredentialId(credentialId) {
  window.localStorage.setItem(AUTH_CREDENTIAL_KEY, credentialId);
}

function clearStoredAuthCredentialId() {
  window.localStorage.removeItem(AUTH_CREDENTIAL_KEY);
}

function setAuthMessage(message, isError = false) {
  if (!elements.authMessage) return;
  elements.authMessage.textContent = message;
  elements.authMessage.classList.toggle("is-error", isError);
}

function setAuthBusy(isBusy) {
  if (!elements.authPrimaryButton || !elements.authResetButton) return;
  elements.authPrimaryButton.disabled = isBusy;
  elements.authResetButton.disabled = isBusy;
}

function updateAuthCopy() {
  const hasCredential = Boolean(getStoredAuthCredentialId());
  elements.authTitle.textContent = hasCredential ? "Face IDで開く" : "Face IDを設定";
  elements.authDescription.textContent = hasCredential
    ? "画面をタップするとiPhoneのFace ID認証に進みます。"
    : "初回だけ、この端末に家計簿用のFace ID認証を登録します。";
  elements.authPrimaryButton.textContent = hasCredential ? "Face IDで開く" : "Face IDを設定";
  elements.authResetButton.hidden = !hasCredential;
}

function isWebAuthnAvailable() {
  return Boolean(window.isSecureContext && window.PublicKeyCredential && navigator.credentials);
}

async function hasPlatformAuthenticator() {
  if (!isWebAuthnAvailable() || typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !== "function") {
    return false;
  }
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
}

async function registerFaceAuth() {
  const userId = randomBytes(16);
  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(),
      rp: { name: "家計簿" },
      user: {
        id: userId,
        name: "household-ledger",
        displayName: "家計簿",
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        residentKey: "preferred",
        userVerification: "required",
      },
      timeout: 60000,
      attestation: "none",
    },
  });

  if (!credential?.rawId) throw new Error("Face ID設定を保存できませんでした。");
  setStoredAuthCredentialId(bytesToBase64Url(new Uint8Array(credential.rawId)));
}

async function unlockWithFaceAuth() {
  const credentialId = getStoredAuthCredentialId();
  if (!credentialId) {
    await registerFaceAuth();
    return;
  }

  await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(),
      allowCredentials: [
        {
          type: "public-key",
          id: base64UrlToBytes(credentialId),
          transports: ["internal"],
        },
      ],
      userVerification: "required",
      timeout: 60000,
    },
  });
}

function revealApp() {
  document.body.classList.remove("auth-locked");
  document.body.classList.add("auth-unlocked");
  elements.authLock.hidden = true;
}

async function requireFaceAuth() {
  updateAuthCopy();

  if (!isWebAuthnAvailable()) {
    elements.authPrimaryButton.disabled = true;
    setAuthMessage("Face ID認証を使うには、HTTPSで配信し、iPhoneのSafariまたはホーム画面から開いてください。", true);
    return false;
  }

  if (!(await hasPlatformAuthenticator())) {
    elements.authPrimaryButton.disabled = true;
    setAuthMessage("この端末またはブラウザではFace ID認証を確認できません。iPhoneのSafariでFace IDを有効にして開いてください。", true);
    return false;
  }

  return new Promise((resolve) => {
    let authenticating = false;
    const authenticate = async () => {
      if (authenticating) return;
      try {
        authenticating = true;
        setAuthBusy(true);
        setAuthMessage("Face IDを確認しています。");
        await unlockWithFaceAuth();
        revealApp();
        resolve(true);
      } catch (error) {
        setAuthMessage(error?.name === "NotAllowedError" ? "Face ID認証がキャンセルされました。" : "Face ID認証に失敗しました。", true);
        updateAuthCopy();
      } finally {
        setAuthBusy(false);
        authenticating = false;
      }
    };

    elements.authPrimaryButton.addEventListener("click", authenticate);
    elements.authLock.addEventListener("click", (event) => {
      if (event.target.closest("#authResetButton")) return;
      authenticate();
    });

    elements.authResetButton.addEventListener("click", () => {
      if (!window.confirm("この端末のFace ID設定だけをやり直します。家計簿データは削除されません。")) return;
      clearStoredAuthCredentialId();
      updateAuthCopy();
      setAuthMessage("Face ID設定を解除しました。もう一度設定してください。");
    });
  });
}

function nextMonthKey(monthKey = currentMonthKey()) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function isBeforeStartMonth(monthKey, startMonth) {
  return typeof startMonth === "string" && monthKey < startMonth;
}

function getLastDayOfMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month, 0).getDate();
}

function clampDayToMonth(monthKey, day) {
  const safeDay = Math.max(1, Math.min(31, Number(day) || 1));
  return Math.min(safeDay, getLastDayOfMonth(monthKey));
}

function dateForMonth(monthKey, day) {
  return `${monthKey}-${String(clampDayToMonth(monthKey, day)).padStart(2, "0")}`;
}

function isMonthKey(value) {
  return /^\d{4}-\d{2}$/.test(String(value || ""));
}

function getTransactionMonthKey(transaction) {
  if (isMonthKey(transaction?.budgetMonth)) return transaction.budgetMonth;
  return typeof transaction?.date === "string" ? transaction.date.slice(0, 7) : "";
}

function formatMonthLabel(monthKey) {
  if (!isMonthKey(monthKey)) return monthKey || "";
  const [year, month] = monthKey.split("-");
  return `${year}/${Number(month)}`;
}

function selectedMonth() {
  return elements.monthPicker.value || currentMonthKey();
}

function getActiveAccount() {
  return state.accounts.find((account) => account.id === state.activeAccountId) || state.accounts[0];
}

function getAccountById(accountId) {
  return state.accounts.find((account) => account.id === accountId);
}

function getTransactionBalanceDelta(transaction) {
  if (transaction.type === "income" || transaction.type === "transfer-in") return Number(transaction.amount || 0);
  if (transaction.type === "expense" || transaction.type === "transfer-out") return -Number(transaction.amount || 0);
  return 0;
}

function shouldAffectCurrentBalance(date) {
  return typeof date === "string" && date <= todayIso();
}

function applyBalanceImpact(account, transaction) {
  if (!shouldAffectCurrentBalance(transaction.date) || transaction.balanceImpactApplied) return;
  account.currentBalance = Number(account.currentBalance || 0) + getTransactionBalanceDelta(transaction);
  transaction.balanceImpactApplied = true;
}

function reverseBalanceImpact(account, transaction) {
  if (!transaction.balanceImpactApplied) return;
  account.currentBalance = Number(account.currentBalance || 0) - getTransactionBalanceDelta(transaction);
  transaction.balanceImpactApplied = false;
}

function getWalletBalanceDelta(transaction) {
  return transaction.type === "income" ? Number(transaction.amount || 0) : -Number(transaction.amount || 0);
}

function applyWalletBalanceImpact(transaction) {
  if (!shouldAffectCurrentBalance(transaction.date) || transaction.balanceImpactApplied) return;
  state.walletBalance = Number(state.walletBalance || 0) + getWalletBalanceDelta(transaction);
  transaction.balanceImpactApplied = true;
}

function reverseWalletBalanceImpact(transaction) {
  if (!transaction.balanceImpactApplied) return;
  state.walletBalance = Number(state.walletBalance || 0) - getWalletBalanceDelta(transaction);
  transaction.balanceImpactApplied = false;
}

function applyDueBalanceImpacts() {
  let applied = 0;
  state.accounts.forEach((account) => {
    account.transactions.forEach((transaction) => {
      const wasApplied = transaction.balanceImpactApplied === true;
      applyBalanceImpact(account, transaction);
      if (!wasApplied && transaction.balanceImpactApplied === true) applied += 1;
    });
  });
  state.walletTransactions.forEach((transaction) => {
    const wasApplied = transaction.balanceImpactApplied === true;
    applyWalletBalanceImpact(transaction);
    if (!wasApplied && transaction.balanceImpactApplied === true) applied += 1;
  });
  return applied;
}

function getMonthlyTransactions(account, monthKey = selectedMonth()) {
  return account.transactions
    .filter((transaction) => getTransactionMonthKey(transaction) === monthKey)
    .sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
}

function getMonthlyTotals(account, monthKey = selectedMonth()) {
  const transactions = getMonthlyTransactions(account, monthKey);
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const fixedIncome = transactions
    .filter((transaction) => transaction.source === "recurring" && transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const fixedExpense = transactions
    .filter((transaction) => transaction.source === "recurring" && transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const transferIn = transactions
    .filter((transaction) => transaction.type === "transfer-in")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const transferOut = transactions
    .filter((transaction) => transaction.type === "transfer-out")
    .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);
  const transferNet = transferIn - transferOut;
  const balance = income - expense;

  return { income, expense, fixedIncome, fixedExpense, transferIn, transferOut, transferNet, balance, accountMovement: balance + transferNet };
}

function isRecurringSkipped(accountId, monthKey, recurringId) {
  return Boolean(state.skippedRecurring?.[accountId]?.[monthKey]?.[recurringId]);
}

function markRecurringSkipped(accountId, monthKey, recurringId) {
  if (!state.skippedRecurring[accountId]) state.skippedRecurring[accountId] = {};
  if (!state.skippedRecurring[accountId][monthKey]) state.skippedRecurring[accountId][monthKey] = {};
  state.skippedRecurring[accountId][monthKey][recurringId] = true;
}

function isRecurringTransferSkipped(monthKey, recurringTransferId) {
  return Boolean(state.skippedRecurringTransfers?.[monthKey]?.[recurringTransferId]);
}

function markRecurringTransferSkipped(monthKey, recurringTransferId) {
  if (!state.skippedRecurringTransfers[monthKey]) state.skippedRecurringTransfers[monthKey] = {};
  state.skippedRecurringTransfers[monthKey][recurringTransferId] = true;
}

function clearRecurringSkippedMonth(accountId, monthKey) {
  if (!state.skippedRecurring?.[accountId]?.[monthKey]) return false;
  delete state.skippedRecurring[accountId][monthKey];
  if (!Object.keys(state.skippedRecurring[accountId]).length) delete state.skippedRecurring[accountId];
  return true;
}

function clearRecurringTransferSkippedMonth(monthKey) {
  if (!state.skippedRecurringTransfers?.[monthKey]) return false;
  delete state.skippedRecurringTransfers[monthKey];
  return true;
}

function getMonthlyResetPlan(account, monthKey) {
  const accountTransactionIds = new Set();
  const transferIds = new Set();
  const walletTransferIds = new Set();

  account.transactions.forEach((transaction) => {
    if (getTransactionMonthKey(transaction) !== monthKey) return;
    accountTransactionIds.add(transaction.id);
    if ((transaction.source === "transfer" || transaction.source === "auto-transfer") && transaction.transferId) {
      transferIds.add(transaction.transferId);
    }
    if (transaction.source === "wallet-transfer" && transaction.transferId) {
      walletTransferIds.add(transaction.transferId);
    }
  });

  const pairedTransferCount = state.accounts.reduce((count, targetAccount) => {
    if (targetAccount.id === account.id) return count;
    return count + targetAccount.transactions.filter((transaction) => transaction.transferId && transferIds.has(transaction.transferId)).length;
  }, 0);
  const walletTransactionCount = state.walletTransactions.filter(
    (transaction) => transaction.transferId && walletTransferIds.has(transaction.transferId),
  ).length;
  const clearsFixedSkips = Boolean(state.skippedRecurring?.[account.id]?.[monthKey]);
  const clearsTransferSkips = Boolean(state.skippedRecurringTransfers?.[monthKey]);

  return {
    accountTransactionIds,
    transferIds,
    walletTransferIds,
    accountTransactionCount: accountTransactionIds.size,
    pairedTransferCount,
    walletTransactionCount,
    clearsFixedSkips,
    clearsTransferSkips,
  };
}

function formatMonthlyResetConfirm(account, monthKey, plan) {
  const monthLabel = formatMonthLabel(monthKey);
  return [
    `${account.name}の${monthLabel}の記録をリセットします。`,
    "",
    "削除・解除される対象:",
    `- この口座のこの月の取引: ${plan.accountTransactionCount}件`,
    `- 振込ペアの相手側記録: ${plan.pairedTransferCount}件`,
    `- 財布入金と連動する財布側記録: ${plan.walletTransactionCount}件`,
    `- 固定収支の再入力フラグ解除: ${plan.clearsFixedSkips ? "あり" : "なし"}`,
    `- 自動振込の再入力フラグ解除: ${plan.clearsTransferSkips ? "あり" : "なし"}`,
    "",
    "残高に反映済みの記録は、削除と同時に残高も戻します。",
    "この操作は元に戻せません。実行しますか？",
  ].join("\n");
}

function generateFixedCostsForMonth(account, monthKey, options = {}) {
  let inserted = 0;
  const dateOverride = typeof options.dateOverride === "string" ? options.dateOverride : "";

  account.recurring
    .filter((item) => item.active !== false)
    .forEach((item) => {
      if (isBeforeStartMonth(monthKey, item.startMonth)) return;
      if (isRecurringSkipped(account.id, monthKey, item.id)) return;

      const exists = account.transactions.some(
        (transaction) =>
          transaction.source === "recurring" &&
          transaction.recurringId === item.id &&
          getTransactionMonthKey(transaction) === monthKey,
      );

      if (exists) return;

      const date = dateOverride || dateForMonth(monthKey, item.day);
      const isEarlyEntry = Boolean(dateOverride) && date.slice(0, 7) !== monthKey;

      const transaction = {
        id: uid("tx"),
        type: item.type === "income" ? "income" : "expense",
        source: "recurring",
        recurringId: item.id,
        date,
        budgetMonth: monthKey,
        earlyEntry: isEarlyEntry,
        amount: Number(item.amount),
        category: item.category,
        memo: item.name,
        createdAt: new Date().toISOString(),
      };
      applyBalanceImpact(account, transaction);
      account.transactions.push(transaction);
      inserted += 1;
    });

  return inserted;
}

function createTransferPair({ fromAccount, toAccount, amount, date, memo, source = "transfer", recurringTransferId = null }) {
  const transferId = uid("transfer");
  const createdAt = new Date().toISOString();
  const common = {
    source,
    transferId,
    recurringTransferId,
    date,
    amount,
    category: "口座振替",
    memo,
    createdAt,
  };

  const outgoing = {
    ...common,
    id: uid("tx"),
    type: "transfer-out",
    transferPeerAccountId: toAccount.id,
  };

  const incoming = {
    ...common,
    id: uid("tx"),
    type: "transfer-in",
    transferPeerAccountId: fromAccount.id,
  };

  applyBalanceImpact(fromAccount, outgoing);
  applyBalanceImpact(toAccount, incoming);
  fromAccount.transactions.push(outgoing);
  toAccount.transactions.push(incoming);

  return transferId;
}

function generateAutoTransfersForMonth(monthKey) {
  let inserted = 0;

  state.recurringTransfers
    .filter((item) => item.active !== false)
    .forEach((item) => {
      if (isBeforeStartMonth(monthKey, item.startMonth)) return;
      if (isRecurringTransferSkipped(monthKey, item.id)) return;

      const fromAccount = getAccountById(item.fromAccountId);
      const toAccount = getAccountById(item.toAccountId);
      if (!fromAccount || !toAccount || fromAccount.id === toAccount.id) return;

      const exists = state.accounts.some((account) =>
        account.transactions.some(
          (transaction) =>
            transaction.source === "auto-transfer" &&
            transaction.recurringTransferId === item.id &&
            typeof transaction.date === "string" &&
            transaction.date.startsWith(monthKey),
        ),
      );
      if (exists) return;

      createTransferPair({
        fromAccount,
        toAccount,
        amount: Number(item.amount),
        date: dateForMonth(monthKey, item.day),
        memo: item.memo,
        source: "auto-transfer",
        recurringTransferId: item.id,
      });
      inserted += 1;
    });

  return inserted;
}

function generateScheduledForMonth(monthKey) {
  const fixedInserted = state.accounts.reduce((sum, account) => sum + generateFixedCostsForMonth(account, monthKey), 0);
  const transfersInserted = generateAutoTransfersForMonth(monthKey);
  return fixedInserted + transfersInserted;
}

function setDefaultInputDate() {
  const monthKey = selectedMonth();
  const today = todayIso();
  elements.dateInput.value = today.startsWith(monthKey) ? today : `${monthKey}-01`;
}

function setDefaultTransferDate() {
  const monthKey = selectedMonth();
  const today = todayIso();
  elements.transferDateInput.value = today.startsWith(monthKey) ? today : `${monthKey}-01`;
}

function setDefaultWalletEntryDate() {
  elements.walletEntryDateInput.value = todayIso();
}

function setMessage(element, message) {
  element.textContent = message;
  if (!message) return;
  window.setTimeout(() => {
    if (element.textContent === message) element.textContent = "";
  }, 3200);
}

function syncDueBalanceImpacts({ announce = false } = {}) {
  const inserted = generateScheduledForMonth(currentMonthKey());
  const applied = applyDueBalanceImpacts();
  if (!inserted && !applied) return { inserted, applied };

  saveState();
  if (announce && elements.monthlyMessage) {
    setMessage(elements.monthlyMessage, "指定日になった固定収支を残高へ反映しました。");
  }
  render();
  return { inserted, applied };
}

function millisecondsUntilNextDateCheck() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1, 0, 0);
  return Math.max(1000, next.getTime() - now.getTime());
}

function scheduleDueBalanceCheck() {
  if (dueBalanceTimerId) window.clearTimeout(dueBalanceTimerId);
  dueBalanceTimerId = window.setTimeout(() => {
    syncDueBalanceImpacts({ announce: true });
    scheduleDueBalanceCheck();
  }, millisecondsUntilNextDateCheck());
}

function getSelectedTransactionType() {
  return new FormData(elements.transactionForm).get("transactionType") || "expense";
}

function getSelectedWalletEntryType() {
  return new FormData(elements.walletEntryForm).get("walletEntryType") || "expense";
}

function getSelectedFixedType() {
  return new FormData(elements.fixedCostForm).get("fixedType") || "expense";
}

function updateFixedSubmitButton() {
  const type = getSelectedFixedType();
  elements.fixedSubmitButton.textContent = type === "income" ? "固定収入を追加" : "固定支出を追加";
}

function isMainAccount(account = getActiveAccount()) {
  return account?.id === MAIN_ACCOUNT_ID;
}

function isExpenseToWalletSelected(account = getActiveAccount()) {
  return (
    getSelectedTransactionType() === "expense" &&
    (isMainAccount(account) || elements.accountExpenseDestinationSelect?.value === "wallet")
  );
}

function updateAccountExpenseDestinationVisibility() {
  const isExpense = getSelectedTransactionType() === "expense";
  const isMainExpense = isExpense && isMainAccount();
  if (isMainExpense) elements.accountExpenseDestinationSelect.value = "wallet";
  elements.accountExpenseDestinationSelect.disabled = isMainExpense;
  const sendToWallet = isExpenseToWalletSelected();
  elements.accountExpenseDestinationGroup.hidden = !isExpense;
  elements.categoryInput.required = !sendToWallet;
  elements.categoryInput.closest("label").hidden = sendToWallet;
  if (sendToWallet) elements.categoryInput.value = "";
}

function setDefaultFixedEarlyInputs() {
  if (!elements.fixedEarlyTargetMonthInput || !elements.fixedEarlyDateInput) return;
  if (!elements.fixedEarlyTargetMonthInput.value) {
    elements.fixedEarlyTargetMonthInput.value = nextMonthKey(selectedMonth());
  }
  if (!elements.fixedEarlyDateInput.value) {
    elements.fixedEarlyDateInput.value = todayIso();
  }
}

function handleTransactionTypeChange(event) {
  if (event.target.name !== "transactionType" || !event.target.checked) return;
  if (event.target.value === "expense") {
    elements.categoryInput.value = "";
    elements.accountExpenseDestinationSelect.value = isMainAccount() ? "wallet" : "expense";
  }
  updateAccountExpenseDestinationVisibility();
}

function bindTransactionTypeReset() {
  document.querySelectorAll('input[name="transactionType"]').forEach((input) => {
    input.addEventListener("click", handleTransactionTypeChange);
    input.addEventListener("change", handleTransactionTypeChange);
  });
}

function createWalletTransferFromAccount({ account, amount, date, memo }) {
  const transferId = uid("wallet-transfer");
  const createdAt = new Date().toISOString();
  const walletTransaction = {
    id: uid("wallet"),
    type: "income",
    date,
    amount,
    category: "財布入金",
    memo,
    sourceType: "account",
    sourceAccountId: account.id,
    transferId,
    balanceImpactApplied: false,
    createdAt,
  };
  const accountTransaction = {
    id: uid("tx"),
    type: "transfer-out",
    source: "wallet-transfer",
    transferId,
    transferPeerAccountId: "wallet",
    date,
    amount,
    category: "財布入金",
    memo: memo || `${state.walletName}へ入金`,
    createdAt,
  };

  applyWalletBalanceImpact(walletTransaction);
  state.walletTransactions.push(walletTransaction);
  applyBalanceImpact(account, accountTransaction);
  account.transactions.push(accountTransaction);
  return transferId;
}

function getSelectedFixedStartMonth() {
  return elements.fixedStartMonthSelect.value === "current" ? currentMonthKey() : nextMonthKey();
}

function addTransaction(event) {
  event.preventDefault();

  const amount = Number(elements.amountInput.value);
  const category = elements.categoryInput.value.trim();
  const date = elements.dateInput.value;
  const memo = elements.memoInput.value.trim();
  const type = getSelectedTransactionType();
  const account = getActiveAccount();
  const sendExpenseToWallet = isExpenseToWalletSelected(account);

  if (!Number.isFinite(amount) || amount <= 0 || !date || (!sendExpenseToWallet && !category)) {
    setMessage(elements.transactionMessage, sendExpenseToWallet ? "金額と日付を確認してください。" : "金額、カテゴリ、日付を確認してください。");
    return;
  }

  if (sendExpenseToWallet) {
    createWalletTransferFromAccount({ account, amount, date, memo });
    saveState();
    elements.amountInput.value = "";
    elements.categoryInput.value = "";
    elements.memoInput.value = "";
    setMessage(elements.transactionMessage, `${account.name}から${state.walletName}へ入金しました。`);
    render();
    return;
  }

  const transaction = {
    id: uid("tx"),
    type,
    source: "manual",
    date,
    amount,
    category,
    memo,
    createdAt: new Date().toISOString(),
  };

  applyBalanceImpact(account, transaction);
  account.transactions.push(transaction);

  saveState();
  elements.amountInput.value = "";
  if (type === "expense") elements.categoryInput.value = "";
  elements.memoInput.value = "";
  setMessage(elements.transactionMessage, `${type === "income" ? "収入" : "支出"}を追加しました。`);
  render();
}

function addWalletTransaction(event) {
  if (event.submitter?.id !== "saveWalletEntryButton") return;
  event.preventDefault();

  const amount = Number(elements.walletEntryAmountInput.value);
  const date = elements.walletEntryDateInput.value;
  const memo = elements.walletEntryMemoInput.value.trim();
  const type = getSelectedWalletEntryType();
  const sourceValue = elements.walletEntrySourceSelect.value || "other";
  const sourceAccount = type === "income" && sourceValue !== "other" ? getAccountById(sourceValue) : null;
  const category = type === "income" ? "財布収入" : "財布支出";

  if (!Number.isFinite(amount) || amount <= 0 || !date) {
    setMessage(elements.walletEntryMessage, "金額と日付を確認してください。");
    return;
  }

  if (type === "income" && sourceValue !== "other" && !sourceAccount) {
    setMessage(elements.walletEntryMessage, "入金元を確認してください。");
    return;
  }

  const createdAt = new Date().toISOString();

  if (sourceAccount) {
    createWalletTransferFromAccount({ account: sourceAccount, amount, date, memo });
    saveState();
    elements.walletEntryAmountInput.value = "";
    elements.walletEntryMemoInput.value = "";
    elements.walletEntryDialog.close();
    render();
    return;
  }

  const transaction = {
    id: uid("wallet"),
    type,
    date,
    amount,
    category,
    memo,
    sourceType: type === "income" ? "other" : null,
    sourceAccountId: null,
    transferId: null,
    balanceImpactApplied: false,
    createdAt,
  };

  applyWalletBalanceImpact(transaction);
  state.walletTransactions.push(transaction);

  saveState();
  elements.walletEntryAmountInput.value = "";
  elements.walletEntryMemoInput.value = "";
  elements.walletEntryDialog.close();
  render();
}

function clearReceiptPreview() {
  if (receiptPreviewUrl) {
    URL.revokeObjectURL(receiptPreviewUrl);
    receiptPreviewUrl = "";
  }
  if (elements.receiptPreviewImage) elements.receiptPreviewImage.removeAttribute("src");
}

function stopReceiptCamera() {
  if (receiptCameraStream) {
    receiptCameraStream.getTracks().forEach((track) => track.stop());
    receiptCameraStream = null;
  }
  if (elements.receiptCameraVideo) elements.receiptCameraVideo.srcObject = null;
}

async function openReceiptCamera() {
  elements.receiptCameraMessage.textContent = "";
  if (!elements.receiptCameraDialog.open) elements.receiptCameraDialog.showModal();

  if (!navigator.mediaDevices?.getUserMedia) {
    setMessage(elements.receiptCameraMessage, "このブラウザではアプリ内カメラを使えません。");
    return;
  }

  try {
    stopReceiptCamera();
    receiptCameraStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: { ideal: "environment" } },
    });
    elements.receiptCameraVideo.srcObject = receiptCameraStream;
  } catch {
    setMessage(elements.receiptCameraMessage, "カメラを起動できませんでした。ブラウザのカメラ許可を確認してください。");
  }
}

function openReceiptConfirmDialog(imageBlob) {
  clearReceiptPreview();
  receiptPreviewUrl = URL.createObjectURL(imageBlob);
  elements.receiptConfirmForm.reset();
  elements.receiptPreviewImage.src = receiptPreviewUrl;
  elements.receiptAmountInput.value = "";
  elements.receiptDateInput.value = todayIso();
  elements.receiptMemoInput.value = "";
  elements.receiptConfirmMessage.textContent = "";
  elements.receiptConfirmDialog.showModal();
  suggestReceiptDetails(imageBlob);
}

function captureReceiptPhoto() {
  const video = elements.receiptCameraVideo;
  const width = video.videoWidth;
  const height = video.videoHeight;
  if (!width || !height) {
    setMessage(elements.receiptCameraMessage, "カメラ映像が表示されてから撮影してください。");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, width, height);
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        setMessage(elements.receiptCameraMessage, "撮影画像を作成できませんでした。");
        return;
      }
      stopReceiptCamera();
      elements.receiptCameraDialog.close();
      openReceiptConfirmDialog(blob);
    },
    "image/jpeg",
    0.92,
  );
}

function extractReceiptAmount(text) {
  const lines = String(text || "")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const amountPattern = /(?:¥\s*)?([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{2,6})\s*円?/g;
  const readAmounts = (line) =>
    [...line.matchAll(amountPattern)]
      .map((match) => Number(match[1].replaceAll(",", "")))
      .filter((amount) => Number.isFinite(amount) && amount > 0 && amount < 1000000);

  const totalLines = lines.filter((line) => /合計|お支払|税込|total/i.test(line) && !/小計|お預|預り|お釣|釣銭/.test(line));
  const totalCandidates = totalLines.flatMap(readAmounts);
  if (totalCandidates.length) return Math.max(...totalCandidates);

  const yenLines = lines.filter((line) => /¥|円/.test(line));
  const yenCandidates = yenLines.flatMap(readAmounts);
  return yenCandidates.length ? Math.max(...yenCandidates) : 0;
}

function toIsoDate(year, month, day) {
  const fullYear = year < 100 ? 2000 + year : year;
  const date = new Date(fullYear, month - 1, day);
  if (date.getFullYear() !== fullYear || date.getMonth() !== month - 1 || date.getDate() !== day) return "";
  return `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function extractReceiptDate(text) {
  const normalized = String(text || "").replace(/\s+/g, " ");
  const fullDatePatterns = [
    /((?:20)?\d{2})[年\/.\-]\s*(\d{1,2})[月\/.\-]\s*(\d{1,2})日?/g,
    /(\d{4})(\d{2})(\d{2})/g,
  ];

  for (const pattern of fullDatePatterns) {
    for (const match of normalized.matchAll(pattern)) {
      const isoDate = toIsoDate(Number(match[1]), Number(match[2]), Number(match[3]));
      if (isoDate) return isoDate;
    }
  }

  const currentYear = Number(todayIso().slice(0, 4));
  const monthDayPattern = /(?:日付|発行|購入|取引|利用|領収)?[^\d]{0,8}(\d{1,2})[月\/.\-]\s*(\d{1,2})日?/g;
  for (const match of normalized.matchAll(monthDayPattern)) {
    const month = Number(match[1]);
    const day = Number(match[2]);
    if (month < 1 || month > 12 || day < 1 || day > 31) continue;
    const isoDate = toIsoDate(currentYear, month, day);
    if (isoDate) return isoDate;
  }

  return "";
}

async function suggestReceiptDetails(imageBlob) {
  elements.receiptDateInput.value = todayIso();

  if (!("TextDetector" in window) || !window.createImageBitmap) {
    setMessage(elements.receiptConfirmMessage, "AI判定を使えませんでした。金額と日付を確認して入力してください。");
    return;
  }

  let imageBitmap = null;
  try {
    imageBitmap = await createImageBitmap(imageBlob);
    const detector = new window.TextDetector();
    const detectedText = (await detector.detect(imageBitmap)).map((item) => item.rawValue || "").join("\n");
    const amount = extractReceiptAmount(detectedText);
    const date = extractReceiptDate(detectedText);
    if (amount) elements.receiptAmountInput.value = String(amount);
    if (date) elements.receiptDateInput.value = date;

    if (amount && date) {
      setMessage(elements.receiptConfirmMessage, "AI判定した金額と日付を入力しました。必ず確認してください。");
    } else if (amount) {
      setMessage(elements.receiptConfirmMessage, "AI判定した金額を入力しました。日付も必ず確認してください。");
    } else if (date) {
      setMessage(elements.receiptConfirmMessage, "AI判定した日付を入力しました。金額を入力して、必ず確認してください。");
    } else {
      setMessage(elements.receiptConfirmMessage, "AI判定できませんでした。金額と日付を入力してください。");
    }
  } catch {
    setMessage(elements.receiptConfirmMessage, "AI判定できませんでした。金額と日付を入力してください。");
  } finally {
    imageBitmap?.close?.();
  }
}

function addReceiptExpense(event) {
  if (event.submitter?.id !== "saveReceiptExpenseButton") return;
  event.preventDefault();

  const amount = Number(elements.receiptAmountInput.value);
  const date = elements.receiptDateInput.value;
  const memo = elements.receiptMemoInput.value.trim();

  if (!Number.isFinite(amount) || amount <= 0 || !date) {
    setMessage(elements.receiptConfirmMessage, "金額と日付を確認してください。");
    return;
  }

  const transaction = {
    id: uid("wallet"),
    type: "expense",
    date,
    amount,
    category: "レシート支出",
    memo,
    sourceType: "receipt",
    sourceAccountId: null,
    transferId: null,
    balanceImpactApplied: false,
    createdAt: new Date().toISOString(),
  };

  applyWalletBalanceImpact(transaction);
  state.walletTransactions.push(transaction);
  saveState();
  clearReceiptPreview();
  elements.receiptConfirmDialog.close();
  render();
}

function addFixedCost(event) {
  event.preventDefault();

  const name = elements.fixedNameInput.value.trim();
  const category = elements.fixedCategoryInput.value.trim();
  const amount = Number(elements.fixedAmountInput.value);
  const day = Number(elements.fixedDayInput.value);
  const type = getSelectedFixedType();
  const startMonth = getSelectedFixedStartMonth();

  if (!name || !category || !Number.isFinite(amount) || amount <= 0 || !Number.isInteger(day) || day < 1 || day > 31) {
    setMessage(elements.fixedMessage, "項目名、カテゴリ、金額、毎月の日を確認してください。");
    return;
  }

  const account = getActiveAccount();
  account.recurring.push({
    id: uid("recurring"),
    name,
    category,
    amount,
    day,
    type,
    startMonth,
    active: true,
    createdAt: new Date().toISOString(),
  });

  const inserted = generateFixedCostsForMonth(account, selectedMonth());
  saveState();

  elements.fixedNameInput.value = "";
  elements.fixedAmountInput.value = "";
  elements.fixedDayInput.value = "1";
  elements.fixedStartMonthSelect.value = "next";
  setMessage(
    elements.fixedMessage,
    inserted
      ? `${type === "income" ? "固定収入" : "固定支出"}を追加し、この月にも自動入力しました。`
      : `${type === "income" ? "固定収入" : "固定支出"}を追加しました。${startMonth}から自動入力します。`,
  );
  render();
}

function applyFixedCostsEarly(event) {
  event.preventDefault();

  const account = getActiveAccount();
  const targetMonth = elements.fixedEarlyTargetMonthInput.value;
  const paymentDate = elements.fixedEarlyDateInput.value;

  if (!isMonthKey(targetMonth) || !paymentDate) {
    setMessage(elements.fixedEarlyMessage, "対象月と入出金日を確認してください。");
    return;
  }

  if (!account.recurring.length) {
    setMessage(elements.fixedEarlyMessage, "前倒し入力できる固定収支がありません。");
    return;
  }

  const inserted = generateFixedCostsForMonth(account, targetMonth, { dateOverride: paymentDate });
  saveState();
  setMessage(
    elements.fixedEarlyMessage,
    inserted
      ? `${formatMonthLabel(targetMonth)}分の固定収支を${formatShortDate(paymentDate)}で前倒し入力しました。`
      : `${formatMonthLabel(targetMonth)}分の固定収支はすでに入力済みです。`,
  );
  render();
}

function addTransfer(event) {
  event.preventDefault();

  const fromAccount = getAccountById(elements.transferFromSelect.value);
  const toAccount = getAccountById(elements.transferToSelect.value);
  const amount = Number(elements.transferAmountInput.value);
  const date = elements.transferDateInput.value;
  const memo = elements.transferMemoInput.value.trim();

  if (!fromAccount || !toAccount || fromAccount.id === toAccount.id) {
    setMessage(elements.transferMessage, "振込元と振込先を別の口座にしてください。");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0 || !date) {
    setMessage(elements.transferMessage, "金額と日付を確認してください。");
    return;
  }

  createTransferPair({ fromAccount, toAccount, amount, date, memo });

  saveState();
  elements.transferAmountInput.value = "";
  elements.transferMemoInput.value = "";
  setMessage(elements.transferMessage, `${fromAccount.name}から${toAccount.name}へ振込を追加しました。`);
  render();
}

function addAutoTransfer(event) {
  event.preventDefault();

  const fromAccount = getAccountById(elements.autoTransferFromSelect.value);
  const toAccount = getAccountById(elements.autoTransferToSelect.value);
  const amount = Number(elements.autoTransferAmountInput.value);
  const day = Number(elements.autoTransferDayInput.value);
  const memo = elements.autoTransferMemoInput.value.trim();
  const startMonth = nextMonthKey();

  if (!fromAccount || !toAccount || fromAccount.id === toAccount.id) {
    setMessage(elements.autoTransferMessage, "振込元と振込先を別の口座にしてください。");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0 || !Number.isInteger(day) || day < 1 || day > 31) {
    setMessage(elements.autoTransferMessage, "金額と毎月の日を確認してください。");
    return;
  }

  state.recurringTransfers.push({
    id: uid("auto-transfer"),
    fromAccountId: fromAccount.id,
    toAccountId: toAccount.id,
    amount,
    day,
    memo,
    startMonth,
    active: true,
    createdAt: new Date().toISOString(),
  });

  const inserted = generateAutoTransfersForMonth(selectedMonth());
  saveState();
  elements.autoTransferAmountInput.value = "";
  elements.autoTransferMemoInput.value = "";
  elements.autoTransferDayInput.value = "1";
  setMessage(
    elements.autoTransferMessage,
    inserted ? "自動振込を追加し、この月にも自動入力しました。" : `自動振込を追加しました。${startMonth}から実施します。`,
  );
  render();
}

function resetSelectedMonth() {
  const account = getActiveAccount();
  const monthKey = selectedMonth();
  const monthLabel = formatMonthLabel(monthKey);
  const plan = getMonthlyResetPlan(account, monthKey);
  if (!window.confirm(formatMonthlyResetConfirm(account, monthKey, plan))) return;

  let removed = 0;
  state.accounts.forEach((targetAccount) => {
    targetAccount.transactions = targetAccount.transactions.filter((transaction) => {
      const isSelectedAccountTransaction = targetAccount.id === account.id && plan.accountTransactionIds.has(transaction.id);
      const isPairedTransfer = transaction.transferId && plan.transferIds.has(transaction.transferId);
      if (!isSelectedAccountTransaction && !isPairedTransfer) return true;
      reverseBalanceImpact(targetAccount, transaction);
      if (isSelectedAccountTransaction) removed += 1;
      return false;
    });
  });

  state.walletTransactions = state.walletTransactions.filter((transaction) => {
    if (!transaction.transferId || !plan.walletTransferIds.has(transaction.transferId)) return true;
    reverseWalletBalanceImpact(transaction);
    return false;
  });

  const clearedFixedSkips = clearRecurringSkippedMonth(account.id, monthKey);
  const clearedTransferSkips = clearRecurringTransferSkippedMonth(monthKey);

  saveState();
  setMessage(
    elements.monthlyMessage,
    removed || clearedFixedSkips || clearedTransferSkips
      ? `${monthLabel}の記録をリセットしました。`
      : `${monthLabel}にはリセットする記録がありません。`,
  );
  render();
}

function deleteTransaction(transactionId) {
  const account = getActiveAccount();
  const transaction = account.transactions.find((item) => item.id === transactionId);
  if (!transaction) return;

  if (transaction.source === "wallet-transfer" && transaction.transferId) {
    reverseBalanceImpact(account, transaction);
    const walletTransaction = state.walletTransactions.find((item) => item.transferId === transaction.transferId);
    if (walletTransaction) {
      reverseWalletBalanceImpact(walletTransaction);
      state.walletTransactions = state.walletTransactions.filter((item) => item.transferId !== transaction.transferId);
    }
    account.transactions = account.transactions.filter((item) => item.id !== transactionId);
    saveState();
    render();
    return;
  }

  if ((transaction.source === "transfer" || transaction.source === "auto-transfer") && transaction.transferId) {
    if (transaction.source === "auto-transfer" && transaction.recurringTransferId && transaction.date) {
      markRecurringTransferSkipped(transaction.date.slice(0, 7), transaction.recurringTransferId);
    }
    state.accounts.forEach((targetAccount) => {
      targetAccount.transactions = targetAccount.transactions.filter((item) => {
        if (item.transferId !== transaction.transferId) return true;
        reverseBalanceImpact(targetAccount, item);
        return false;
      });
    });
    saveState();
    render();
    return;
  }

  if (transaction.source === "recurring" && transaction.recurringId && transaction.date) {
    markRecurringSkipped(account.id, getTransactionMonthKey(transaction), transaction.recurringId);
  }

  reverseBalanceImpact(account, transaction);
  account.transactions = account.transactions.filter((item) => item.id !== transactionId);
  saveState();
  render();
}

function deleteRecurring(recurringId) {
  const account = getActiveAccount();
  const monthKey = selectedMonth();
  account.recurring = account.recurring.filter((item) => item.id !== recurringId);
  account.transactions = account.transactions.filter((transaction) => {
    const shouldDelete =
      transaction.source === "recurring" &&
      transaction.recurringId === recurringId &&
      getTransactionMonthKey(transaction) === monthKey;
    if (shouldDelete) reverseBalanceImpact(account, transaction);
    return !shouldDelete;
  });
  saveState();
  setMessage(elements.fixedMessage, "固定収支を削除しました。この月の自動入力分も削除しました。");
  render();
}

function deleteAutoTransfer(recurringTransferId) {
  const monthKey = selectedMonth();
  state.recurringTransfers = state.recurringTransfers.filter((item) => item.id !== recurringTransferId);
  state.accounts.forEach((account) => {
    account.transactions = account.transactions.filter((transaction) => {
      const shouldDelete =
        transaction.source === "auto-transfer" &&
        transaction.recurringTransferId === recurringTransferId &&
        typeof transaction.date === "string" &&
        transaction.date.startsWith(monthKey);
      if (shouldDelete) reverseBalanceImpact(account, transaction);
      return !shouldDelete;
    });
  });
  saveState();
  setMessage(elements.autoTransferMessage, "自動振込を削除しました。この月の自動入力分も削除しました。");
  render();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatShortDate(date) {
  const [, month, day] = String(date).split("-");
  return month && day ? `${Number(month)}/${Number(day)}` : date;
}

function updatePageVisibility() {
  const isAssetsPage = activePage === "assets";
  elements.walletPage.hidden = isAssetsPage;
  elements.assetsPage.hidden = !isAssetsPage;
  elements.walletPage.classList.toggle("is-active", !isAssetsPage);
  elements.assetsPage.classList.toggle("is-active", isAssetsPage);
  elements.pageButtons.forEach((button) => {
    const isActive = button.dataset.pageButton === activePage;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function setActivePage(page) {
  activePage = page === "assets" ? "assets" : "wallet";
  window.location.hash = activePage === "assets" ? "assets" : "";
  updatePageVisibility();
  renderCharts(getActiveAccount());
}

function updateCurrentBalances() {
  const accountTotal = state.accounts.reduce((sum, account) => sum + Number(account.currentBalance || 0), 0);
  const total = accountTotal + Number(state.walletBalance || 0);
  elements.totalCurrentBalance.textContent = formatYen(total);
  elements.walletHomeLabel.textContent = `${state.walletName}の残金`;
  elements.walletHomeBalance.textContent = formatYen(state.walletBalance);
  elements.walletHomeBalance.classList.toggle("is-positive", Number(state.walletBalance || 0) > 0);
  elements.walletHomeBalance.classList.toggle("is-negative", Number(state.walletBalance || 0) < 0);
  elements.walletBalanceLabel.textContent = `${state.walletName}の残金`;
  elements.walletBalance.textContent = formatYen(state.walletBalance);
  elements.walletBalance.classList.toggle("is-positive", Number(state.walletBalance || 0) > 0);
  elements.walletBalance.classList.toggle("is-negative", Number(state.walletBalance || 0) < 0);

  state.accounts.forEach((account) => {
    const label = document.querySelector(`[data-current-balance-label="${account.id}"]`);
    const balance = document.querySelector(`[data-current-balance="${account.id}"]`);
    if (!label || !balance) return;
    label.textContent = `${account.name}の現在残高`;
    balance.textContent = formatYen(account.currentBalance);
    balance.classList.toggle("is-positive", Number(account.currentBalance || 0) > 0);
    balance.classList.toggle("is-negative", Number(account.currentBalance || 0) < 0);
  });
}

function updateActiveAccountBanner(account) {
  elements.activeAccountName.textContent = account.name.replaceAll("講座", "口座");
}

function updateAccountTheme(account) {
  document.body.dataset.accountTheme = account.id === "account-2" ? "savings" : "main";
}

function updateAccountStrip() {
  state.accounts.forEach((account) => {
    const label = document.querySelector(`[data-account-label="${account.id}"]`);
    const button = document.querySelector(`[data-account-button="${account.id}"]`);

    label.textContent = account.name;
    button.classList.toggle("is-active", account.id === state.activeAccountId);
  });
}

function updateSummary(account) {
  const totals = getMonthlyTotals(account);
  elements.incomeTotal.textContent = formatYen(totals.income);
  elements.expenseTotal.textContent = formatYen(totals.expense);
  elements.transferNetTotal.textContent = formatYen(totals.transferNet);
  elements.fixedIncomeTotal.textContent = formatYen(totals.fixedIncome);
  elements.fixedExpenseTotal.textContent = formatYen(totals.fixedExpense);
  elements.balanceTotal.textContent = formatYen(totals.balance);
  elements.transferNetTotal.classList.toggle("is-positive", totals.transferNet > 0);
  elements.transferNetTotal.classList.toggle("is-negative", totals.transferNet < 0);
  elements.fixedIncomeTotal.classList.toggle("is-positive", totals.fixedIncome > 0);
  elements.fixedExpenseTotal.classList.toggle("is-negative", totals.fixedExpense > 0);
  elements.balanceTotal.classList.toggle("is-positive", totals.balance > 0);
  elements.balanceTotal.classList.toggle("is-negative", totals.balance < 0);
}

function collectCategoryOptions() {
  const categories = new Set([...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES]);
  state.walletTransactions.forEach((transaction) => {
    if (transaction.category) categories.add(transaction.category);
  });
  state.accounts.forEach((account) => {
    account.transactions.forEach((transaction) => {
      if (transaction.category) categories.add(transaction.category);
    });
    account.recurring.forEach((item) => {
      if (item.category) categories.add(item.category);
    });
  });
  return [...categories].sort((a, b) => a.localeCompare(b, "ja"));
}

function renderCategoryOptions() {
  elements.categoryOptions.innerHTML = collectCategoryOptions()
    .map((category) => `<option value="${escapeHtml(category)}"></option>`)
    .join("");
}

function renderTransferControls() {
  renderTransferSelectPair(elements.transferFromSelect, elements.transferToSelect, state.activeAccountId);
  renderTransferSelectPair(elements.autoTransferFromSelect, elements.autoTransferToSelect, state.activeAccountId);
}

function renderWalletEntrySourceOptions() {
  const currentValue = elements.walletEntrySourceSelect.value;
  elements.walletEntrySourceSelect.innerHTML = [
    ...state.accounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(account.name)}</option>`),
    '<option value="other">その他</option>',
  ].join("");

  elements.walletEntrySourceSelect.value =
    currentValue && (currentValue === "other" || getAccountById(currentValue)) ? currentValue : state.accounts[0]?.id || "other";
}

function updateWalletEntrySourceVisibility() {
  const isIncome = getSelectedWalletEntryType() === "income";
  elements.walletEntrySourceGroup.hidden = !isIncome;
}

function renderTransferSelectPair(fromSelect, toSelect, fallbackFromId) {
  const currentFrom = getAccountById(fromSelect.value) ? fromSelect.value : fallbackFromId;
  const fromValue = getAccountById(currentFrom) ? currentFrom : state.accounts[0]?.id;

  fromSelect.innerHTML = state.accounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(account.name)}</option>`).join("");
  fromSelect.value = fromValue;

  const destinationAccounts = state.accounts.filter((account) => account.id !== fromValue);
  const currentTo = toSelect.value;
  const toValue = destinationAccounts.some((account) => account.id === currentTo) ? currentTo : destinationAccounts[0]?.id;

  toSelect.innerHTML = destinationAccounts.map((account) => `<option value="${escapeHtml(account.id)}">${escapeHtml(account.name)}</option>`).join("");
  toSelect.value = toValue || "";
}

function renderFixedCosts(account) {
  if (!account.recurring.length) {
    elements.fixedCostList.innerHTML = '<div class="empty-state">固定収支はまだ設定されていません。</div>';
    return;
  }

  const renderGroup = (type, title) => {
    const items = account.recurring.filter((item) => (item.type === "income" ? "income" : "expense") === type);
    const body = items.length
      ? items
          .map(
            (item) => `
              <div class="fixed-item">
                <div class="item-main">
                  <span class="item-title">${escapeHtml(item.name)}</span>
                  <span class="item-meta">${escapeHtml(item.category)} / ${formatYen(item.amount)} / 毎月${Number(item.day)}日 / ${escapeHtml(item.startMonth)}開始</span>
                </div>
                <button class="danger-button" type="button" data-delete-recurring="${escapeHtml(item.id)}">削除</button>
              </div>
            `,
          )
          .join("")
      : '<div class="empty-state">未設定です。</div>';

    return `
      <section class="fixed-section">
        <div class="fixed-section-title">${title}</div>
        ${body}
      </section>
    `;
  };

  elements.fixedCostList.innerHTML = `${renderGroup("income", "固定収入")}${renderGroup("expense", "固定支出")}`;
}

function renderAutoTransfers() {
  if (!state.recurringTransfers.length) {
    elements.autoTransferList.innerHTML = '<div class="empty-state">自動振込はまだ設定されていません。</div>';
    return;
  }

  elements.autoTransferList.innerHTML = state.recurringTransfers
    .map((item) => {
      const fromAccount = getAccountById(item.fromAccountId);
      const toAccount = getAccountById(item.toAccountId);
      const memo = item.memo ? ` / ${escapeHtml(item.memo)}` : "";
      return `
        <div class="auto-transfer-item">
          <div class="item-main">
            <span class="item-title">${escapeHtml(fromAccount?.name || "不明")} -> ${escapeHtml(toAccount?.name || "不明")}</span>
            <span class="item-meta">${formatYen(item.amount)} / 毎月${Number(item.day)}日 / ${escapeHtml(item.startMonth)}開始${memo}</span>
          </div>
          <button class="danger-button" type="button" data-delete-auto-transfer="${escapeHtml(item.id)}">削除</button>
        </div>
      `;
    })
    .join("");
}

function groupTransactionsByCategory(account, type) {
  const grouped = new Map();
  getMonthlyTransactions(account).forEach((transaction) => {
    if (transaction.type !== type) return;
    const category = transaction.category || "未分類";
    grouped.set(category, (grouped.get(category) || 0) + Number(transaction.amount || 0));
  });

  return [...grouped.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function drawPieChart(canvas, legendElement, data, emptyText) {
  const size = Math.max(220, Math.min(260, canvas.clientWidth || 260));
  const ratio = window.devicePixelRatio || 1;
  canvas.width = size * ratio;
  canvas.height = size * ratio;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;

  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, size, size);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = center - 12;

  if (!total) {
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle = "#ded4c5";
    context.lineWidth = 18;
    context.stroke();
    context.fillStyle = "#6f685f";
    context.font = "700 14px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(emptyText, center, center);
    legendElement.innerHTML = '<div class="empty-state">データがありません。</div>';
    return;
  }

  let start = -Math.PI / 2;
  data.forEach((item, index) => {
    const slice = (item.value / total) * Math.PI * 2;
    context.beginPath();
    context.moveTo(center, center);
    context.arc(center, center, radius, start, start + slice);
    context.closePath();
    context.fillStyle = CHART_COLORS[index % CHART_COLORS.length];
    context.fill();
    start += slice;
  });

  context.beginPath();
  context.arc(center, center, radius * 0.48, 0, Math.PI * 2);
  context.fillStyle = "#fffaf2";
  context.fill();
  context.fillStyle = "#25231f";
  context.font = "800 15px sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(formatYen(total), center, center);

  legendElement.innerHTML = data
    .map((item, index) => {
      const percent = Math.round((item.value / total) * 100);
      return `
        <div class="legend-row">
          <span class="legend-chip" style="background:${CHART_COLORS[index % CHART_COLORS.length]}"></span>
          <span class="legend-label">${escapeHtml(item.label)}</span>
          <span>${formatYen(item.value)} / ${percent}%</span>
        </div>
      `;
    })
    .join("");
}

function renderCharts(account) {
  drawPieChart(elements.incomeChart, elements.incomeLegend, groupTransactionsByCategory(account, "income"), "収入なし");
  drawPieChart(elements.expenseChart, elements.expenseLegend, groupTransactionsByCategory(account, "expense"), "支出なし");
}

function renderTransactions(account) {
  const transactions = getMonthlyTransactions(account);

  if (!transactions.length) {
    elements.transactionList.innerHTML = '<div class="empty-state">この月の記録はまだありません。</div>';
    return;
  }

  elements.transactionList.innerHTML = transactions
    .map((transaction) => {
      const isIncome = transaction.type === "income";
      const isTransferIn = transaction.type === "transfer-in";
      const isTransferOut = transaction.type === "transfer-out";
      const isWalletTransfer = transaction.source === "wallet-transfer";
      const isPositive = isIncome || isTransferIn;
      const sign = isPositive ? "+" : "-";
      const peerAccount = transaction.transferPeerAccountId ? getAccountById(transaction.transferPeerAccountId) : null;
      const transferLabel = isWalletTransfer
        ? `${state.walletName}へ入金`
        : isTransferIn
          ? `振込元: ${peerAccount?.name || "不明"}`
          : `振込先: ${peerAccount?.name || "不明"}`;
      const categoryLabel = isTransferIn || isTransferOut ? transferLabel : transaction.category || "未分類";
      const transactionMonth = getTransactionMonthKey(transaction);
      const earlyNote =
        transaction.source === "recurring" && transaction.date?.slice(0, 7) !== transactionMonth
          ? `<span class="transaction-note">対象月: ${escapeHtml(formatMonthLabel(transactionMonth))}</span>`
          : "";
      const memoNote = transaction.memo ? `<span class="transaction-note">${escapeHtml(transaction.memo)}</span>` : "";
      let badge = "";
      if (transaction.source === "recurring") {
        badge = `<span class="badge ${isIncome ? "income" : "expense"}">${isIncome ? "固定収入" : "固定支出"}</span>`;
      }
      if (transaction.source === "transfer" || transaction.source === "auto-transfer") {
        const prefix = transaction.source === "auto-transfer" ? "自動" : "";
        badge = `<span class="badge transfer">${prefix}${isTransferIn ? "振込入金" : "振込出金"}</span>`;
      }
      if (isWalletTransfer) {
        badge = '<span class="badge transfer">財布入金</span>';
      }
      const kindClass = isTransferIn || isTransferOut ? "transfer" : isIncome ? "income" : "expense";
      const kindText = isWalletTransfer ? "財布入金" : isTransferIn ? "振込入金" : isTransferOut ? "振込出金" : isIncome ? "収入" : "支出";
      const amountClass = isTransferIn || isTransferOut ? "transfer" : isIncome ? "income" : "expense";

      return `
        <article class="transaction-row">
          <span class="transaction-date">${formatShortDate(transaction.date)}</span>
          <span class="transaction-kind ${kindClass}">${kindText}</span>
          <div class="transaction-main">
            <div class="item-title">${escapeHtml(categoryLabel)}</div>
            ${memoNote}
            ${earlyNote}
          </div>
          ${badge}
          <span class="transaction-amount ${amountClass}">${sign}${formatYen(transaction.amount)}</span>
          <button class="danger-button" type="button" data-delete-transaction="${escapeHtml(transaction.id)}">削除</button>
        </article>
      `;
    })
    .join("");
}

function render() {
  const account = getActiveAccount();
  updateAccountTheme(account);
  updatePageVisibility();
  updateCurrentBalances();
  updateAccountStrip();
  updateActiveAccountBanner(account);
  updateSummary(account);
  updateFixedSubmitButton();
  updateAccountExpenseDestinationVisibility();
  renderCategoryOptions();
  renderTransferControls();
  renderWalletEntrySourceOptions();
  updateWalletEntrySourceVisibility();
  setDefaultFixedEarlyInputs();
  renderFixedCosts(account);
  renderAutoTransfers();
  renderCharts(account);
  renderTransactions(account);

  if (!elements.dateInput.value || !elements.dateInput.value.startsWith(selectedMonth())) {
    setDefaultInputDate();
  }
  if (!elements.transferDateInput.value || !elements.transferDateInput.value.startsWith(selectedMonth())) {
    setDefaultTransferDate();
  }
}

function handleAccountChange(event) {
  const button = event.target.closest("[data-account-button]");
  if (!button) return;

  state.activeAccountId = button.dataset.accountButton;
  elements.transferFromSelect.value = state.activeAccountId;
  elements.autoTransferFromSelect.value = state.activeAccountId;
  if (getSelectedTransactionType() === "expense") {
    elements.accountExpenseDestinationSelect.value = state.activeAccountId === MAIN_ACCOUNT_ID ? "wallet" : "expense";
  }
  const inserted = generateScheduledForMonth(selectedMonth());
  saveState();
  if (inserted) setMessage(elements.fixedMessage, "この月の自動入力を反映しました。");
  render();
}

function handlePageChange(event) {
  const button = event.target.closest("[data-page-button]");
  if (!button) return;
  setActivePage(button.dataset.pageButton);
}

function handleFixedCostListClick(event) {
  const button = event.target.closest("[data-delete-recurring]");
  if (!button) return;
  deleteRecurring(button.dataset.deleteRecurring);
}

function handleAutoTransferListClick(event) {
  const button = event.target.closest("[data-delete-auto-transfer]");
  if (!button) return;
  deleteAutoTransfer(button.dataset.deleteAutoTransfer);
}

function handleTransactionListClick(event) {
  const button = event.target.closest("[data-delete-transaction]");
  if (!button) return;
  deleteTransaction(button.dataset.deleteTransaction);
}

function openAccountsDialog() {
  const [first, second] = state.accounts;
  elements.accountOneName.value = first.name;
  elements.accountTwoName.value = second.name;
  elements.accountOneBalance.value = Math.round(Number(first.currentBalance || 0));
  elements.accountTwoBalance.value = Math.round(Number(second.currentBalance || 0));
  elements.walletBalanceInput.value = Math.round(Number(state.walletBalance || 0));
  elements.accountsDialog.showModal();
}

function openWalletEntryDialog() {
  elements.walletEntryForm.reset();
  elements.walletEntryAmountInput.value = "";
  elements.walletEntryMemoInput.value = "";
  elements.walletEntryMessage.textContent = "";
  renderWalletEntrySourceOptions();
  updateWalletEntrySourceVisibility();
  setDefaultWalletEntryDate();
  elements.walletEntryDialog.showModal();
}

function openWalletDialog() {
  elements.walletNameInput.value = state.walletName;
  elements.walletDirectInput.value = Math.round(Number(state.walletBalance || 0));
  elements.walletDialog.showModal();
}

function saveAccountNames(event) {
  if (event.submitter?.id !== "saveAccountsButton") return;
  event.preventDefault();

  const firstName = elements.accountOneName.value.trim();
  const secondName = elements.accountTwoName.value.trim();
  const firstBalance = Number(elements.accountOneBalance.value);
  const secondBalance = Number(elements.accountTwoBalance.value);
  const walletBalance = Number(elements.walletBalanceInput.value);
  if (!firstName || !secondName || !Number.isFinite(firstBalance) || !Number.isFinite(secondBalance) || !Number.isFinite(walletBalance)) {
    return;
  }

  state.accounts[0].name = firstName;
  state.accounts[1].name = secondName;
  state.accounts[0].currentBalance = firstBalance;
  state.accounts[1].currentBalance = secondBalance;
  state.walletBalance = walletBalance;
  saveState();
  elements.accountsDialog.close();
  render();
}

function saveWalletBalance(event) {
  if (event.submitter?.id !== "saveWalletButton") return;
  event.preventDefault();

  const walletName = elements.walletNameInput.value.trim();
  const walletBalance = Number(elements.walletDirectInput.value);
  if (!walletName || !Number.isFinite(walletBalance)) return;

  state.walletName = walletName;
  state.walletBalance = walletBalance;
  saveState();
  elements.walletDialog.close();
  render();
}

function openMonthPicker(event) {
  if (event.target === elements.monthPicker) return;

  elements.monthPicker.focus();
  if (typeof elements.monthPicker.showPicker === "function") {
    try {
      elements.monthPicker.showPicker();
    } catch {
      // The browser may block programmatic picker opening outside a direct gesture.
    }
  }
}

function init() {
  window.__householdSupportsMonthlyReset = true;
  window.__householdSupportsDueDateSync = true;
  elements.monthPicker.value = currentMonthKey();
  setDefaultInputDate();
  setDefaultTransferDate();
  setDefaultWalletEntryDate();
  generateScheduledForMonth(selectedMonth());
  applyDueBalanceImpacts();
  saveState();
  render();

  document.querySelector(".page-nav").addEventListener("click", handlePageChange);
  document.querySelector(".account-strip").addEventListener("click", handleAccountChange);
  elements.monthControl.addEventListener("click", openMonthPicker);
  elements.transactionForm.addEventListener("submit", addTransaction);
  bindTransactionTypeReset();
  elements.accountExpenseDestinationSelect.addEventListener("change", updateAccountExpenseDestinationVisibility);
  elements.walletEntryForm.addEventListener("submit", addWalletTransaction);
  elements.walletEntryForm.addEventListener("change", updateWalletEntrySourceVisibility);
  elements.captureReceiptButton.addEventListener("click", openReceiptCamera);
  elements.takeReceiptPhotoButton.addEventListener("click", captureReceiptPhoto);
  elements.receiptCameraDialog.addEventListener("close", stopReceiptCamera);
  elements.receiptConfirmForm.addEventListener("submit", addReceiptExpense);
  elements.receiptConfirmDialog.addEventListener("close", clearReceiptPreview);
  elements.transferForm.addEventListener("submit", addTransfer);
  elements.autoTransferForm.addEventListener("submit", addAutoTransfer);
  elements.transferFromSelect.addEventListener("change", renderTransferControls);
  elements.autoTransferFromSelect.addEventListener("change", renderTransferControls);
  elements.fixedCostForm.addEventListener("submit", addFixedCost);
  elements.fixedCostForm.addEventListener("change", updateFixedSubmitButton);
  elements.fixedEarlyForm.addEventListener("submit", applyFixedCostsEarly);
  elements.fixedCostList.addEventListener("click", handleFixedCostListClick);
  elements.autoTransferList.addEventListener("click", handleAutoTransferListClick);
  elements.transactionList.addEventListener("click", handleTransactionListClick);
  elements.resetMonthButtons.forEach((button) => button.addEventListener("click", resetSelectedMonth));
  elements.monthPicker.addEventListener("change", () => {
    const inserted = generateScheduledForMonth(selectedMonth());
    saveState();
    setDefaultInputDate();
    setDefaultTransferDate();
    if (inserted) setMessage(elements.fixedMessage, "この月の自動入力を反映しました。");
    render();
  });
  elements.reflectFixedButton.addEventListener("click", () => {
    const inserted = generateScheduledForMonth(selectedMonth());
    saveState();
    setMessage(elements.monthlyMessage, inserted ? "未入力だった自動入力を反映しました。" : "自動入力はすでに反映済みです。");
    render();
  });
  elements.editAccountsButton.addEventListener("click", openAccountsDialog);
  elements.openWalletEntryButton.addEventListener("click", openWalletEntryDialog);
  elements.editWalletButton.addEventListener("click", openWalletDialog);
  elements.accountsForm.addEventListener("submit", saveAccountNames);
  elements.walletForm.addEventListener("submit", saveWalletBalance);
  window.addEventListener("hashchange", () => {
    activePage = window.location.hash === "#assets" ? "assets" : "wallet";
    render();
  });
  window.addEventListener("focus", () => syncDueBalanceImpacts({ announce: true }));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) syncDueBalanceImpacts({ announce: true });
  });
  window.addEventListener("resize", () => renderCharts(getActiveAccount()));
  scheduleDueBalanceCheck();
}

requireFaceAuth().then((authenticated) => {
  if (authenticated) init();
});
