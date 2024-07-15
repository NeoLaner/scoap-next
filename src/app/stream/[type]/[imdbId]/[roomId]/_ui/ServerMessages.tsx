import { Button } from "~/app/_components/ui/Button";

const user = { name: "Scoap", id: "0", image: "/scoap.png" };

const messageTemplates = {
  NO_SOURCE: {
    jsxContent: (
      <div>
        No source found, Please Go to the
        <Button variant={"link"}>Streams</Button> And select a link.
      </div>
    ),
    type: "warning",
  },
} as const;

export default function ServerMessages(key: keyof typeof messageTemplates) {
  const message = messageTemplates[key];
  const serverMessage = {
    user,
    created_at: Date.now(),
    jsxContent: message.jsxContent,
    type: message.type,
  };
  return serverMessage;
}
