const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Please provide a component name.');
  process.exit(1);
}

const componentName = process.argv[2];
const folderPath = path.join(__dirname, componentName);

// Create the folder
fs.mkdirSync(folderPath);

// Create Component.tsx
const componentContent = `import './${componentName}.scss';

type ${componentName}Props = {
   
}

export const ${componentName} = ({}: ${componentName}Props): React.ReactNode => {
    return <div></div>;
}`;

fs.writeFileSync(path.join(folderPath, `${componentName}.tsx`), componentContent);

// Create Component.scss
fs.writeFileSync(path.join(folderPath, `${componentName}.scss`), '');

// Create Component.test.tsx
const testContent = `import React from 'react';
import { render } from 'vitest';
import { ${componentName} } from './${componentName}';

test('renders ${componentName}', () => {
  const { container } = render(<${componentName} />);
  expect(container.firstChild).toBeInTheDocument();
});`;

fs.writeFileSync(path.join(folderPath, `${componentName}.test.tsx`), testContent);

console.log(`${componentName} folder and files created successfully.`);
