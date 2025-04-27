/* eslint-disable prettier/prettier */
"use client";

type Note = {
  id: number;
  title: string;
  desc: string;
};

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Form,
  Input,
  Textarea,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";

import { PencilIcon, TrashIcon, CheckIcon, XIcon } from "@/components/icons";
import { addNote, updateNote, deleteNote } from "@/app/lib/serverActions";

export default function CardNotes({ initialNotes }: { initialNotes: Note[] }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; desc: string }>({
    title: "",
    desc: "",
  });

  async function handleAddNote(formdata: FormData) {
    try {
      const newNote = await addNote(formdata);

      setNotes([...notes, newNote]);
    } catch (error) {
      throw new Error(`Failed to add note: ${error}`);
    }
  }

  async function handleDeleteNote(noteId: Note["id"]) {
    try {
      const delNote = await deleteNote(noteId);

      setNotes((n) => n.filter((note) => note.id !== delNote.id));
    } catch (error) {
      throw new Error(`Failed to delete note: ${error}`);
    }
  }

  async function handleUpdateNote(
    noteId: number,
    updatedNote: { title: string; desc: string }
  ) {
    try {
      const res = await updateNote(noteId, updatedNote);

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === res.id ? res : note))
      );
      setEditNoteId(null);
    } catch (error) {
      throw new Error(`Failed to update note: ${error}`);
    }
  }

  return (
    <>
      {/* Note Form */}
      <Form
        action={handleAddNote}
        className="w-full max-w-sm flex flex-col gap-4"
        onReset={() => {}}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid title"
          label="Title"
          name="title"
          type="text"
        />
        <Textarea
          isRequired
          errorMessage="Please enter a valid description"
          label="Description"
          name="desc"
        />
        <div className="flex gap-2 w-full">
          <Button
            className="bg-gradient-to-tr from-[#FF705B] to-[#FFB457] text-white shadow-lg"
            color="primary"
            fullWidth={true}
            type="submit"
          >
            Create
          </Button>
          <Button fullWidth={true} type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>

      {/* Notes Card */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="max-w-[400px]">
            {editNoteId === note.id ? (
              <>
                <CardHeader className="flex gap-3 justify-between">
                  <Input
                    isRequired
                    defaultValue={note.title}
                    errorMessage="Please enter a valid Title"
                    label="Title"
                    name="title"
                    type="text"
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />

                  <div className="flex h-5 items-center space-x-2 text-small">
                    <Tooltip color="success" content="Save">
                      <Button
                        isIconOnly
                        aria-label="Like"
                        color="success"
                        onPress={() => {
                          handleUpdateNote(note.id, editForm);
                        }}
                      >
                        <CheckIcon />
                      </Button>
                    </Tooltip>
                    <Divider orientation="vertical" />
                    <Tooltip color="danger" content="Cancel">
                      <Button
                        isIconOnly
                        aria-label="Like"
                        color="danger"
                        onPress={() => {
                          setEditNoteId(null);
                        }}
                      >
                        <XIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Textarea
                    isRequired
                    defaultValue={note.desc}
                    errorMessage="Please enter a valid description"
                    label="Description"
                    name="desc"
                    onChange={(e) =>
                      setEditForm({ ...editForm, desc: e.target.value })
                    }
                  />
                </CardBody>
              </>
            ) : (
              <>
                <CardHeader className="flex gap-3 justify-between py-4">
                  <p className="text-md text-wrap">{note.title}</p>
                  <div className="flex h-5 items-center space-x-2 text-small">
                    <Tooltip color="default" content="Edit">
                      <Button
                        isIconOnly
                        aria-label="Like"
                        color="default"
                        onPress={() => {
                          setEditNoteId(note.id);
                          setEditForm({ title: note.title, desc: note.desc });
                        }}
                      >
                        <PencilIcon />
                      </Button>
                    </Tooltip>
                    <Divider orientation="vertical" />
                    <Tooltip color="danger" content="Delete">
                      <Button
                        isIconOnly
                        aria-label="Like"
                        color="danger"
                        onPress={() => handleDeleteNote(note.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>{note.desc}</p>
                </CardBody>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
