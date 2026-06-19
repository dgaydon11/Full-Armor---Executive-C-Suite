/**
 * Full Armor Studios - local billing and token budget monitor
 * Document ID: CFO-MON-01
 * Description: Standalone utility to audit and enforce 3-tier cost controls.
 */

const fs = require('fs');
const path = require('path');

// Configure budget limits in USD
const DAILY_BUDGET_LIMIT = 5.00; // Target daily limit
const WARNING_THRESHOLD = 0.80;  // 80% for Yellow Light

// Cost parameters for model tiers (approximate per 1M tokens)
const MODEL_COSTS = {
  'gemini-2.5-flash': { input: 0.075, output: 0.30 },
  'gemini-2.5-pro': { input: 1.25, output: 5.00 }
};

// Paths to logs
const EXECUTIVE_SUITE_DIR = 'C:\\Users\\Don1\\Desktop\\Full-Armor---Executive-C-Suite';
const CAPA_LOG_PATH = path.join(EXECUTIVE_SUITE_DIR, 'Quality - Chief-Quality_Officer', 'yellow_light_capa_log.md');
const CONFIG_LOG_PATH = path.join(EXECUTIVE_SUITE_DIR, 'Finance - Chief-Financial_Officer', 'token_usage_ledger.json');

/**
 * Reads token usage or initializes a empty ledger
 */
function getLedger() {
  try {
    if (fs.existsSync(CONFIG_LOG_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_LOG_PATH, 'utf8'));
    }
  } catch (e) {
    // Fail-safe default
  }
  return {
    date: new Date().toISOString().split('T')[0],
    totalCostUsd: 0.00,
    modelCalls: {
      'gemini-2.5-flash': 0,
      'gemini-2.5-pro': 0
    },
    attempts: {}
  };
}

/**
 * Saves ledger data
 */
function saveLedger(ledger) {
  try {
    fs.writeFileSync(CONFIG_LOG_PATH, JSON.stringify(ledger, null, 2), 'utf8');
  } catch (e) {
    console.error("❌ Failed to save token usage ledger:", e.message);
  }
}

/**
 * Appends a warning to the ISO 9001:2026 CAPA log
 */
function logCapaWarning(reason, cost, model) {
  try {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const capaRow = `| ${timestamp} | R&D / Billing | ${reason} | ${model} | Monitored usage; optimizing loop execution patterns | Open |\n`;
    fs.appendFileSync(CAPA_LOG_PATH, capaRow, 'utf8');
    console.log("🟡 [YELLOW LIGHT] CAPA Warning entry written to yellow_light_capa_log.md");
  } catch (e) {
    console.error("❌ Failed to update CAPA log:", e.message);
  }
}

/**
 * Audits the current system state
 */
function auditSystem(addInputTokens = 0, addOutputTokens = 0, modelName = 'gemini-2.5-flash', fileAttempt = null) {
  const ledger = getLedger();
  const today = new Date().toISOString().split('T')[0];

  // Reset ledger if it's a new day
  if (ledger.date !== today) {
    ledger.date = today;
    ledger.totalCostUsd = 0.00;
    ledger.modelCalls = { 'gemini-2.5-flash': 0, 'gemini-2.5-pro': 0 };
    ledger.attempts = {};
  }

  // Calculate incremental cost
  const rates = MODEL_COSTS[modelName] || MODEL_COSTS['gemini-2.5-flash'];
  const incrementalCost = ((addInputTokens / 1000000) * rates.input) + ((addOutputTokens / 1000000) * rates.output);
  
  ledger.totalCostUsd += incrementalCost;
  ledger.modelCalls[modelName] = (ledger.modelCalls[modelName] || 0) + 1;

  // Track attempts for files to prevent loops
  if (fileAttempt) {
    ledger.attempts[fileAttempt] = (ledger.attempts[fileAttempt] || 0) + 1;
  }

  saveLedger(ledger);

  const ratio = ledger.totalCostUsd / DAILY_BUDGET_LIMIT;

  console.log(`\n==================================================`);
  console.log(`📊 BILLING & BUDGET AUDIT:`);
  console.log(`   - Model Used:   ${modelName}`);
  console.log(`   - Daily Spend:  $${ledger.totalCostUsd.toFixed(5)} / $${DAILY_BUDGET_LIMIT.toFixed(2)} (${(ratio * 100).toFixed(1)}%)`);
  console.log(`==================================================`);

  // Loop check
  if (fileAttempt && ledger.attempts[fileAttempt] >= 3) {
    console.log(`\n🔴 [RED LIGHT] CIRCUIT BREAKER TRIGGERED!`);
    console.log(`❌ Maximum edit attempts (3) reached for file: ${fileAttempt}`);
    console.log(`🛑 All programming dispatches frozen. Awaiting manual override.`);
    process.exit(1);
  }

  if (fileAttempt && ledger.attempts[fileAttempt] === 2) {
    logCapaWarning(`2nd loop attempt on file: ${fileAttempt}`, ledger.totalCostUsd, modelName);
  }

  // Cost check
  if (ledger.totalCostUsd >= DAILY_BUDGET_LIMIT) {
    console.log(`\n🔴 [RED LIGHT] CIRCUIT BREAKER TRIGGERED!`);
    console.log(`❌ Daily budget limit of $${DAILY_BUDGET_LIMIT.toFixed(2)} reached.`);
    console.log(`🛑 All programming dispatches frozen. Awaiting manual override.`);
    process.exit(1);
  } else if (ratio >= WARNING_THRESHOLD) {
    logCapaWarning(`Cost exceeded 80% threshold ($${ledger.totalCostUsd.toFixed(3)})`, ledger.totalCostUsd, modelName);
  } else {
    console.log(`🟢 [GREEN LIGHT] System within budget parameters. Operation approved.`);
  }
}

// Check if run in CLI directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--test-green')) {
    auditSystem(10000, 5000, 'gemini-2.5-flash');
  } else if (args.includes('--test-yellow')) {
    auditSystem(50000000, 10000000, 'gemini-2.5-flash', 'test_file.js'); // Simulating 2nd attempt
  } else if (args.includes('--test-red')) {
    auditSystem(50000000, 10000000, 'gemini-2.5-flash', 'test_file.js');
    auditSystem(50000000, 10000000, 'gemini-2.5-flash', 'test_file.js'); // Simulating 3rd attempt -> RED
  } else {
    auditSystem(0, 0, 'gemini-2.5-flash');
  }
}

module.exports = { auditSystem, getLedger };
