import { render, screen, within } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import { api, DataProvider } from "../../contexts/DataContext";
import Page from "../../pages/Home/index.jsx";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2024-03-12T20:28:45.744Z",
      title: "Conférence test1 #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "12-13-14 Mars",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2025-04-27T20:28:45.744Z",
      title: "Forum test2 #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "27-28-29 Avril",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ]
};

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = vi.fn().mockResolvedValue(data);
      render(
        <DataProvider>
          <Page />
        </DataProvider>
      );
   
    // Vérifie le titre principal
    const eventsTitle = await screen.findByRole("heading", { name: "Nos réalisations" });
    expect(eventsTitle).toBeInTheDocument();

    // Limite la recherche au container des événements
    const eventsContainer = await screen.findByTestId("events-container");
    const containerQueries = within(eventsContainer);

    // Vérifie que les deux titres sont bien présents dans le container
    const event1 = containerQueries.getByText("Conférence test1 #productCON");
    const event2 = containerQueries.getByText("Forum test2 #productCON");

    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();

    // Vérifie que le container a bien 2 enfants (2 EventCard)
    expect(eventsContainer.children.length).toBe(2);
  })

  it("a list of people is displayed", async () => {
    api.loadData = vi.fn().mockResolvedValue(data);
      render(
        <DataProvider>
          <Page />
        </DataProvider>
    );
    const peoplesContainer = await screen.findByTestId("PeoplesContainer");
    const inPeopleContainer = within(peoplesContainer);
    const title = await inPeopleContainer.findByRole("heading");

    const cardList = await inPeopleContainer.findByTestId("ListContainer");
    const lenghtCards = cardList.children.length;

    expect(lenghtCards).toBe(6);
    expect(title.textContent).toBe("Notre équipe");
  })

  it("a footer is displayed", async () => {
      render(
        <DataProvider>
          <Page />
        </DataProvider>
      );
    expect(await screen.findByTestId("footer")).toBeInTheDocument();
  })

  it("an event card, with the last event, is displayed", async () => {
     api.loadData = vi.fn().mockResolvedValue(data);
    render(
      <DataProvider>
        <Page />
      </DataProvider>
    );

    // Ici on suppose que tu as un footer avec un data-testid="footer-last-event"
    const footer = await screen.findByTestId("footer");
    const footerQueries = within(footer);
    const titleLastEvent = await footerQueries.findByText("Notre dernière prestation");
    const lastEvent = await footerQueries.findByText("Forum test2 #productCON");

    expect(titleLastEvent).toBeInTheDocument();
    expect(lastEvent).toBeInTheDocument();
  })
});
