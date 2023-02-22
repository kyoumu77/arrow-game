import React from "react";
import { renderWithProviders } from "../../../../test/test-utils";
import { Header } from "..";

describe("Header", () => {
  it("should show app title", async () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.querySelector('.header')).toBeInTheDocument();
  });
});
