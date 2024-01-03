import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom"; // Import this to extend Jest matchers
import { server } from "./mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

expect.extend(matchers);
