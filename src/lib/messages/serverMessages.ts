const user = { name: "Scoap", id: "0", image: "/scoap.png" };

const messageTemplates = {
  NO_SOURCE: { textContent: "No source found", type: "warning" },
} as const;

export default function serverMessages(key: keyof typeof messageTemplates) {
  const message = messageTemplates[key];
  const serverMessage = {
    user,
    created_at: Date.now(),
    textContent: message.textContent,
    type: message.type,
  };
  return serverMessage;
}
