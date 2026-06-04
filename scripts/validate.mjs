import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const schemaPath = path.join(repoRoot, "schema", "agent-commerce-layer.schema.json");
const exampleDir = path.join(repoRoot, "examples");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function collectTargets(argv) {
  if (argv.length > 0) {
    return argv.map((target) => path.resolve(process.cwd(), target));
  }

  return fs
    .readdirSync(exampleDir)
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => path.join(exampleDir, fileName));
}

const schema = readJson(schemaPath);
const ajv = new Ajv2020({
  allErrors: true,
  strict: true
});
addFormats(ajv);

const validate = ajv.compile(schema);
const targets = collectTargets(process.argv.slice(2));
let failed = false;

for (const target of targets) {
  const relativeTarget = path.relative(repoRoot, target);
  const data = readJson(target);
  const valid = validate(data);

  if (valid) {
    console.log(`ok ${relativeTarget}`);
    continue;
  }

  failed = true;
  console.error(`not ok ${relativeTarget}`);
  for (const error of validate.errors ?? []) {
    console.error(`  ${error.instancePath || "/"} ${error.message}`);
  }
}

if (failed) {
  process.exitCode = 1;
}
