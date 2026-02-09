const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../src");
const packageJsonPath = path.resolve(__dirname, "../package.json");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Base exports (always present)
const packageExports = {
  ".": {
    import: "./dist/index.js",
    types: "./dist/index.d.ts",
  },
  "./style.css": "./dist/style.css",
  "./tailwind.config": "./tailwind.config.js",
};

const typesVersions = {
  "*": {},
};

/**
 * Convert folder name to PascalCase export name
 * button -> Button
 * globalSearch -> GlobalSearch
 * getAddressTypeInitials -> GetAddressTypeInitials
 */
function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check if directory has an index file (index.ts or index.tsx)
 */
function hasIndexFile(dirPath) {
  return (
    fs.existsSync(path.join(dirPath, "index.tsx")) ||
    fs.existsSync(path.join(dirPath, "index.ts"))
  );
}

/**
 * Process a directory and add exports for each subdirectory with index file
 */
function processDirectory(category, subPath = "") {
  const dirPath = path.join(srcDir, category, subPath);

  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return;
  }

  fs.readdirSync(dirPath).forEach(name => {
    const itemPath = path.join(dirPath, name);

    // Skip non-directories and special files
    if (!fs.statSync(itemPath).isDirectory()) {
      return;
    }

    // Skip if no index file
    if (!hasIndexFile(itemPath)) {
      // Check for nested directories (e.g., utils/address, utils/asset)
      const nestedItems = fs.readdirSync(itemPath);
      nestedItems.forEach(nestedName => {
        const nestedPath = path.join(itemPath, nestedName);
        if (fs.statSync(nestedPath).isDirectory() && hasIndexFile(nestedPath)) {
          const exportName = toPascalCase(nestedName);
          const relativePath = `${category}/${name}/${nestedName}`;

          packageExports[`./${exportName}`] = {
            import: `./dist/${relativePath}/index.js`,
            types: `./dist/${relativePath}/index.d.ts`,
          };

          typesVersions["*"][exportName] = [`dist/${relativePath}/index.d.ts`];

          console.log(`  + ${exportName} (${relativePath})`);
        }
      });
      return;
    }

    const exportName = toPascalCase(name);
    const relativePath = subPath
      ? `${category}/${subPath}/${name}`
      : `${category}/${name}`;

    packageExports[`./${exportName}`] = {
      import: `./dist/${relativePath}/index.js`,
      types: `./dist/${relativePath}/index.d.ts`,
    };

    typesVersions["*"][exportName] = [`dist/${relativePath}/index.d.ts`];

    console.log(`  + ${exportName} (${relativePath})`);

    // Process nested subdirectories inside UI components (e.g., globalTable/components)
    if (category === "ui") {
      fs.readdirSync(itemPath).forEach(subName => {
        const subItemPath = path.join(itemPath, subName);
        if (fs.statSync(subItemPath).isDirectory() && hasIndexFile(subItemPath)) {
          // Export as ComponentName/SubName (e.g., GlobalTable/Components)
          const subExportName = `${exportName}/${toPascalCase(subName)}`;
          const subRelativePath = `${relativePath}/${subName}`;

          packageExports[`./${subExportName}`] = {
            import: `./dist/${subRelativePath}/index.js`,
            types: `./dist/${subRelativePath}/index.d.ts`,
          };

          typesVersions["*"][subExportName] = [`dist/${subRelativePath}/index.d.ts`];

          console.log(`  + ${subExportName} (${subRelativePath})`);
        }
      });
    }
  });
}

/**
 * Check if file is a TypeScript source file (.ts or .tsx)
 */
function isTypeScriptFile(name) {
  return (name.endsWith(".ts") || name.endsWith(".tsx")) &&
         name !== "index.ts" &&
         name !== "index.tsx";
}

/**
 * Get base name without extension
 */
function getBaseName(name) {
  return name.replace(/\.tsx?$/, "");
}

/**
 * Process single-file modules (not in subdirectories)
 * @param {string} category - The category to process
 * @param {boolean} skipExisting - If true, skip exports that already exist (avoid overwriting UI components)
 */
function processSingleFileModules(category, skipExisting = false) {
  const dirPath = path.join(srcDir, category);

  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    return;
  }

  fs.readdirSync(dirPath).forEach(name => {
    const itemPath = path.join(dirPath, name);

    // Process .ts and .tsx files (not index.ts/tsx)
    if (fs.statSync(itemPath).isFile() && isTypeScriptFile(name)) {
      const baseName = getBaseName(name);
      const exportName = toPascalCase(baseName);
      const exportKey = `./${exportName}`;

      // Skip if export already exists (UI components have priority)
      if (skipExisting && packageExports[exportKey]) {
        console.log(`  ~ ${exportName} (skipped - already exists from ui)`);
        return;
      }

      packageExports[exportKey] = {
        import: `./dist/${category}/${baseName}.js`,
        types: `./dist/${category}/${baseName}.d.ts`,
      };

      typesVersions["*"][exportName] = [`dist/${category}/${baseName}.d.ts`];

      console.log(`  + ${exportName} (${category}/${baseName})`);
    }
  });
}

console.log("\nGenerating exports...\n");

// Process UI components
console.log("UI Components:");
processDirectory("ui");

// Process constants (skip if UI component with same name exists)
console.log("\nConstants:");
processSingleFileModules("constants", true);

// Process utils (has nested structure like utils/address, utils/asset, utils/gov, utils/search)
console.log("\nUtils:");
const utilsDir = path.join(srcDir, "utils");
if (fs.existsSync(utilsDir)) {
  fs.readdirSync(utilsDir).forEach(name => {
    const itemPath = path.join(utilsDir, name);

    if (fs.statSync(itemPath).isDirectory()) {
      // Nested util directories (address, asset, gov, search)
      fs.readdirSync(itemPath).forEach(subName => {
        const subPath = path.join(itemPath, subName);
        if (fs.statSync(subPath).isDirectory() && hasIndexFile(subPath)) {
          const exportName = toPascalCase(subName);
          const relativePath = `utils/${name}/${subName}`;

          packageExports[`./${exportName}`] = {
            import: `./dist/${relativePath}/index.js`,
            types: `./dist/${relativePath}/index.d.ts`,
          };
          typesVersions["*"][exportName] = [`dist/${relativePath}/index.d.ts`];
          console.log(`  + ${exportName} (${relativePath})`);
        } else if (fs.statSync(subPath).isFile() && isTypeScriptFile(subName)) {
          const baseName = getBaseName(subName);
          const exportName = toPascalCase(baseName);
          const relativePath = `utils/${name}`;

          packageExports[`./${exportName}`] = {
            import: `./dist/${relativePath}/${baseName}.js`,
            types: `./dist/${relativePath}/${baseName}.d.ts`,
          };
          typesVersions["*"][exportName] = [
            `dist/${relativePath}/${baseName}.d.ts`,
          ];
          console.log(`  + ${exportName} (${relativePath}/${baseName})`);
        }
      });
    } else if (isTypeScriptFile(name)) {
      // Single file utils (.ts and .tsx)
      const baseName = getBaseName(name);
      const exportName = toPascalCase(baseName);

      packageExports[`./${exportName}`] = {
        import: `./dist/utils/${baseName}.js`,
        types: `./dist/utils/${baseName}.d.ts`,
      };
      typesVersions["*"][exportName] = [`dist/utils/${baseName}.d.ts`];
      console.log(`  + ${exportName} (utils/${baseName})`);
    }
  });
}

// Process hooks
console.log("\nHooks:");
processSingleFileModules("hooks");
processDirectory("hooks");

// Process stores
console.log("\nStores:");
processSingleFileModules("stores");
processDirectory("stores");

// Process providers
console.log("\nProviders:");
processSingleFileModules("providers");
processDirectory("providers");

// Process lib
console.log("\nLib:");
processSingleFileModules("lib");
processDirectory("lib");

// Process types
console.log("\nTypes:");
processSingleFileModules("types");

// Add wildcard fallback
typesVersions["*"]["*"] = ["dist/index.d.ts"];

// Update package.json
packageJson.exports = packageExports;
packageJson.typesVersions = typesVersions;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

const componentCount = Object.keys(packageExports).length - 3; // minus base exports
console.log(`\n✓ Generated ${componentCount} subpath exports`);
console.log("✓ Updated package.json with exports and typesVersions\n");
