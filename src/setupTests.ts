import * as matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest';
import "@testing-library/jest-dom"; // Import this to extend Jest matchers

expect.extend(matchers);