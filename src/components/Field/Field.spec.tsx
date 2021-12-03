import React from "react";
import Field from "./Field";
import { render, screen } from "@testing-library/react";
import { mockCma, mockSdk } from "../../../test/mocks";

describe("Field component", () => {
  it("Component text exists", () => {
    render(<Field cma={mockCma} sdk={mockSdk} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
