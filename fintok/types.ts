export interface ChatMessage {
    id: string; // Added ID for consistency
    role: "user" | "bot"; // Keeping "bot" since it may be used in the backend
    content?: string;
    userAudioUrl?: string | null; // Keeping it unchanged
    timestamp?: number; // Ensuring timestamp always exists
    type?:string; // Added type for consistency
  }
  
  export interface UIMessage {
    id: string;
    content: string;
    role: "user" | "assistant" | "system" | "data"; // ✅ Allow all possible roles
    timestamp?: number;
  }

  export type Messages = {
    role: string;
    content: string;
  };
  
  
  