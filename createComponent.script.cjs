// Command:
// Creates Component.tsx, Component.scss and Component.test.tsx files with some boilerplate code within them.
// go to /cs50w-final-project/frontend
// node createComponent.script.cjs ComponentXXX

const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Please provide a component name.");
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
    return <div>${componentName}</div>;
}`;

fs.writeFileSync(
  path.join(folderPath, `${componentName}.tsx`),
  componentContent
);

// Create Component.scss
fs.writeFileSync(path.join(folderPath, `${componentName}.scss`), "");

// Create Component.test.tsx
const testContent = `
import { render, screen } from '@testing-library/react';
import { ${componentName} } from '.';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import { Provider } from 'react-redux';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <${componentName} />
      </Provider>
    </BrowserRouter>
  );
});

describe("${componentName}", () => {
  it("renders correctly", () => {
    expect(screen.getByText(/${componentName}/i)).toBeInTheDocument()
  });
});
`;

fs.writeFileSync(
  path.join(folderPath, `${componentName}.test.tsx`),
  testContent
);

console.log(`${componentName} folder and files created successfully.`);
