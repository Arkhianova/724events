import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = vi.fn();
      render(<Form onSuccess={onSuccess} />);

      // Récupérer tous les champs
      const nom = screen.getByLabelText("Nom");
      const prenom = screen.getByLabelText("Prénom");
      const email = screen.getByLabelText("Email");
      const message = screen.getByLabelText("Message");

      // Remplir les champs
      fireEvent.change(nom, { target: { value: "Dupont" } });
      fireEvent.change(prenom, { target: { value: "Jean" } });
      fireEvent.change(email, { target: { value: "jean@exemple.com" } });
      fireEvent.change(message, { target: { value: "Bonjour" } });

// Cliquer sur submit
    fireEvent.click(screen.getByTestId("button-test-id"));
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
