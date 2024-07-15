export type MessageProp = {
  textContent: string;
  type: "normal" | "normal:server" | "success" | "warning" | "danger";
  created_at: number;
  user: { name: string | null; image: string | null; id: string };
};
