import { getByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { ProductList } from ".";
import { Product } from "../../models";
import { server } from "../../mocks/node";
import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL as string;

describe("ProductList", () => {
  it("", () => {
    
  });
});
