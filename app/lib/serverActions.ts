"use server";

export async function addNote(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const desc = formData.get("desc")?.toString().trim();

  if (!title || !desc) return;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notes`, {
    method: "POST",
    body: JSON.stringify({ title, desc }),
  });

  if (!res.ok) throw new Error("Gagal menambahkan catatan");

  return await res.json();
}

export async function deleteNote(noteId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notes`, {
    method: "DELETE",
    body: JSON.stringify({ id: noteId }),
  });

  if (!res.ok) throw new Error("Gagal menghapus catatan");

  return await res.json();
}

export async function updateNote(
  id: number,
  updatedNote: { title: string; desc: string }
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/notes`, {
    method: "PUT",
    body: JSON.stringify({ id, ...updatedNote }),
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return res.json();
}
