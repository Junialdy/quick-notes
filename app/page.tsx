import CardNotes from "@/components/card-notes";
import { title, subtitle } from "@/components/primitives";
import { BASE_API_URL } from "./lib/constants";

// Static fallback data
const staticNotes = [
  {
    id: 1,
    title: "Go to market",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, enim aliquid. Officia quas est quaerat? Architecto facilis sit voluptatibus ullam! Officia quas est quaerat? Architecto facilis sit voluptatibus ullam!",
  },
  {
    id: 2,
    title: "Learn Webdev",
    desc: "Lorem ipsum dolor sit amet,  Architecto facilis sit voluptatibus ullam!",
  },
  {
    id: 3,
    title: "Drawing a portrait",
    desc: "nsectetur adipisicing elit. Aperiam, enim aliquid. Officia quas est quaerat? Architecto facilis sit voluptatibus ullam! tur adipisicing elit. Ape tur adipisicing elit. Ape tur adipisicing elit. Ape tur adipisicing elit. Ape",
  },
  {
    id: 4,
    title: "Do homework",
    desc: "Lorem ipsumisicing elsumisicinim aliquid. Offsumisicing elit. Aperiam, enim aliquid. Offit. Aperiam, enim aliquid. Officia quas est quaerat? Architecto facilis sit voluptatibus ullam!",
  },
  {
    id: 5,
    title: "Exercise",
    desc: "Lorem ipsum dolor sit amet, consectetuipisicing elit. Aperipisicing elit. Aperr adipisicing elit. Aperiam, enim aliquid. Officia quas est quaerat? Architecto facilis sit voluptatibus ullam!",
  },
];

export default async function Page() {
  let notes = staticNotes;

  if (BASE_API_URL) {
    try {
      const response = await fetch(`${BASE_API_URL}/notes`);
      if (!response.ok) throw new Error("Failed to fetch notes");
      notes = await response.json();
    } catch (error) {
      console.warn("Using static notes fallback due to fetch error:", error);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "yellow" })}>Quick Notes</span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
          Create notes fast with minimal effort.
        </div>
      </div>
      <div className="flex flex-col gap-16 items-center">
        <CardNotes initialNotes={notes} />
      </div>
    </section>
  );
}
