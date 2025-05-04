import CardNotes from "@/components/card-notes";
import { title, subtitle } from "@/components/primitives";

export default async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notes`);
  const notes = await response.json();

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
