export const notes = [
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

let idCount = 5;

export async function GET() {
  return Response.json(notes);
}

export async function POST(request: Request) {
  const note = await request.json();
  const newNote = {
    id: ++idCount,
    title: note.title,
    desc: note.desc,
  };

  notes.push(newNote);

  return new Response(JSON.stringify(newNote), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}

// export async function PUT(request: Request) {}
export async function DELETE(request: Request) {
  const note = await request.json();
  const noteId = Number(note.id);

  const index = notes.findIndex((n) => n.id === noteId);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  const [deletedNote] = notes.splice(index, 1);

  return new Response(JSON.stringify(deletedNote), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PUT(request: Request) {
  const { id, title, desc } = await request.json();

  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Task not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  const updatedNote = { id, title, desc };

  notes[index] = updatedNote;

  return new Response(JSON.stringify(updatedNote), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
