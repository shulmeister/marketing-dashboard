const fs = require('fs');
const path = require('path');

// Additional components to convert and create in the root components directory
const additionalComponents = [
  'ApiStatus.tsx',
  'ChartCard.tsx',
  'DashboardLayout.tsx',
  'Header.tsx',
  'MetricCard.tsx',
  'Sidebar.tsx'
];

// Function to convert TypeScript to JavaScript
function convertTsxToJs(inputFile, outputFile) {
  if (!fs.existsSync(inputFile)) {
    console.log(`Warning: File ${inputFile} does not exist`);
    return;
  }
  
  // Read the TypeScript file
  const content = fs.readFileSync(inputFile, 'utf-8');
  
  // Simple TypeScript to JavaScript conversion
  // Remove type annotations, interfaces, etc.
  let jsContent = content
    .replace(/import\s+type[^;]+;/g, '') // Remove type-only imports
    .replace(/:\s*React\.CSSProperties/g, '') // Remove React.CSSProperties type
    .replace(/:\s*React\.[A-Za-z]+/g, '') // Remove React.* types
    .replace(/:\s*string(\s*\|\s*undefined)?(\s*\|\s*null)?/g, '') // Remove string type annotations
    .replace(/:\s*number(\s*\|\s*undefined)?(\s*\|\s*null)?/g, '') // Remove number type annotations
    .replace(/:\s*boolean(\s*\|\s*undefined)?(\s*\|\s*null)?/g, '') // Remove boolean type annotations
    .replace(/:\s*any/g, '') // Remove any type annotations
    .replace(/:\s*\{[^}]*\}/g, '') // Remove inline object type definitions
    .replace(/:\s*[A-Za-z][A-Za-z0-9_]*(\s*\|\s*[A-Za-z][A-Za-z0-9_]*)*(\s*\|\s*undefined)?(\s*\|\s*null)?/g, '') // Remove named type annotations
    .replace(/<[A-Za-z][A-Za-z0-9_]*(\s*,\s*[A-Za-z][A-Za-z0-9_]*)*>/g, '') // Remove generic type parameters
    .replace(/interface\s+[A-Za-z][A-Za-z0-9_]*\s*\{[^}]*\}/g, '') // Remove interface declarations
    .replace(/type\s+[A-Za-z][A-Za-z0-9_]*\s*=\s*[^;]+;/g, '') // Remove type declarations
    .replace(/const\s+[A-Za-z][A-Za-z0-9_]*\s*:\s*[A-Za-z][A-Za-z0-9_<>,\s|&]*\s*=/g, 'const $1 =') // Clean up const declarations with types
    .replace(/,\s*\}/g, '}') // Clean up trailing commas in objects 
    .replace(/;\s*\}/g, '}') // Clean up trailing semicolons in objects
    .replace(/\/\/\s*@ts-ignore.*$/gm, '') // Remove ts-ignore comments
    .replace(/\/\/\s*@ts-nocheck.*$/gm, '') // Remove ts-nocheck comments
    .replace(/const\s+\{\s*([^}]+)\s*\}\s*:\s*[^=]+=/, 'const { $1 } =') // Clean up destructuring with types
    .replace(/function\s+[A-Za-z][A-Za-z0-9_]*\s*\([^)]*\)\s*:\s*[A-Za-z][A-Za-z0-9_<>,\s|&]*/g, function(match) {
      return match.replace(/:\s*[A-Za-z][A-Za-z0-9_<>,\s|&]*$/, '');
    }); // Clean up function return types

  // Ensure the destination directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JavaScript file
  fs.writeFileSync(outputFile, jsContent);
  console.log(`Converted ${inputFile} to ${outputFile}`);
}

// Copy simpler component versions
function copySimpleComponents() {
  const componentDirs = ['MDBox', 'MDTypography', 'MDButton', 'Grid'];
  componentDirs.forEach(dir => {
    const srcDir = path.join(__dirname, '..', 'components-js', dir);
    const destDir = path.join(__dirname, '..', 'components', dir);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    if (fs.existsSync(srcDir)) {
      const files = fs.readdirSync(srcDir);
      files.forEach(file => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${srcPath} to ${destPath}`);
      });
    } else {
      console.warn(`Warning: Source directory ${srcDir} does not exist`);
    }
  });
}

// Process additional standalone components
additionalComponents.forEach(componentFile => {
  const srcFilePath = path.join(__dirname, '..', 'src', 'components', componentFile);
  if (fs.existsSync(srcFilePath)) {
    const fileName = path.basename(componentFile, '.tsx');
    const destFilePath = path.join(__dirname, '..', 'components', `${fileName}.js`);
    convertTsxToJs(srcFilePath, destFilePath);
  } else {
    console.warn(`Warning: Component file ${srcFilePath} does not exist`);
  }
});

// Create clean versions of components
copySimpleComponents();

console.log('TypeScript to JavaScript conversion complete');
