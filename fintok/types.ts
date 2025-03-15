export interface ChatMessage {
    role: "user" | "bot";
    content?: string;
    userAudioUrl?: string | null;
  }
  