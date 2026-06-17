import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const appsDir = path.join(root, "apps");

const categories = new Set([
  "Games",
  "Finance",
  "Bridges",
  "Social",
  "ID",
  "Supply Chain",
  "Healthcare",
  "Education",
  "Prediction Markets",
  "AI",
  "Tools",
]);
const networks = new Set(["mainnet", "testnet", "mainnet-and-testnet"]);
const walletCompat = new Set(["compatible", "planned", "not-compatible", "unknown"]);
const listingStatuses = new Set(["official", "foundation-maintained", "community", "experimental", "deprecated"]);
const required = [
  "id",
  "productName",
  "category",
  "network",
  "creator",
  "openSource",
  "browserWalletCompatibility",
  "listingStatus",
  "tagline",
  "description",
  "lastReviewedAt",
];
const allowed = new Set([
  ...required,
  "browserWalletNotes",
  "websiteUrl",
  "sourceUrl",
  "docsUrl",
  "contactUrl",
]);

function fail(file, message) {
  throw new Error(`${file}: ${message}`);
}

function assertString(file, entry, key, min, max) {
  if (typeof entry[key] !== "string") fail(file, `${key} must be a string`);
  const value = entry[key].trim();
  if (value.length < min || value.length > max) fail(file, `${key} must be ${min}-${max} chars`);
  if (value !== entry[key]) fail(file, `${key} must not have leading/trailing whitespace`);
}

function assertHttpsUrl(file, entry, key) {
  if (entry[key] === undefined) return;
  assertString(file, entry, key, 12, 500);
  let url;
  try {
    url = new URL(entry[key]);
  } catch {
    fail(file, `${key} must be a valid URL`);
  }
  if (url.protocol !== "https:") fail(file, `${key} must use https`);
}

function validateEntry(file, entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) fail(file, "entry must be an object");
  for (const key of required) {
    if (!(key in entry)) fail(file, `missing required field ${key}`);
  }
  for (const key of Object.keys(entry)) {
    if (!allowed.has(key)) fail(file, `unknown field ${key}`);
  }
  assertString(file, entry, "id", 3, 64);
  if (!/^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(entry.id)) fail(file, "id must be a lowercase slug");
  assertString(file, entry, "productName", 2, 80);
  if (!categories.has(entry.category)) fail(file, `category must be one of: ${[...categories].join(", ")}`);
  if (!networks.has(entry.network)) fail(file, "network must be mainnet, testnet, or mainnet-and-testnet");
  assertString(file, entry, "creator", 2, 80);
  if (typeof entry.openSource !== "boolean") fail(file, "openSource must be boolean");
  if (!walletCompat.has(entry.browserWalletCompatibility)) fail(file, "browserWalletCompatibility has an invalid value");
  if (!listingStatuses.has(entry.listingStatus)) fail(file, "listingStatus has an invalid value");
  assertString(file, entry, "tagline", 12, 180);
  assertString(file, entry, "description", 40, 1200);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastReviewedAt)) fail(file, "lastReviewedAt must be YYYY-MM-DD");
  if (entry.browserWalletNotes !== undefined) assertString(file, entry, "browserWalletNotes", 1, 360);
  for (const key of ["websiteUrl", "sourceUrl", "docsUrl", "contactUrl"]) assertHttpsUrl(file, entry, key);
  if (!entry.websiteUrl && !entry.sourceUrl && !entry.docsUrl) {
    fail(file, "at least one of websiteUrl, sourceUrl, or docsUrl is required");
  }
}

const files = fs.readdirSync(appsDir).filter((file) => file.endsWith(".json")).sort();
if (!files.length) throw new Error("apps/ must contain at least one JSON listing");

const ids = new Set();
const names = new Set();
for (const file of files) {
  const full = path.join(appsDir, file);
  const entry = JSON.parse(fs.readFileSync(full, "utf8"));
  validateEntry(file, entry);
  if (file !== `${entry.id}.json`) fail(file, `filename must be ${entry.id}.json`);
  const lowerName = entry.productName.toLowerCase();
  if (ids.has(entry.id)) fail(file, `duplicate id ${entry.id}`);
  if (names.has(lowerName)) fail(file, `duplicate productName ${entry.productName}`);
  ids.add(entry.id);
  names.add(lowerName);
}

console.log(`validated ${files.length} dApp listing${files.length === 1 ? "" : "s"}`);
