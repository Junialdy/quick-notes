"use client";

import React from "react";
import { Form, Input, Textarea, Button } from "@heroui/react";

export default function FormInput() {
  const [action, setAction] = React.useState<string | null>(null);

  return (
    <Form
      className="w-full max-w-sm flex flex-col gap-4"
      onReset={() => setAction("Reset")}
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid Title"
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
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
}
