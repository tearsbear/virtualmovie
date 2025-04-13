/// <reference types="@types/jest" />
import "@testing-library/jest-dom";
import * as React from "react";

// Mock the HeroIcon component since it's an SVG
jest.mock("@heroicons/react/24/outline", () => ({
  MagnifyingGlassIcon: () =>
    React.createElement("div", { "data-testid": "search-icon" }),
}));
