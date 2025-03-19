// "use client";
// import { useRef, useState } from "react";
// import { ChatMessage } from "../types";
// import { transcribeAudio } from "../utils/asr_translate"; // Import function

// interface AudioRecorderProps {
//   onAddAudioMessage: (audioMsg: ChatMessage) => void;
// }

// export default function AudioRecorder({ onAddAudioMessage }: AudioRecorderProps) {
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioChunks = useRef<Blob[]>([]);
//   const [isRecording, setIsRecording] = useState(false);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunks.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
//         const userAudioUrl = URL.createObjectURL(audioBlob);

//         // Transcribe the audio
//         const transcribedText = await transcribeAudio(audioBlob);

//         // Create an audio message object with a timestamp
//         const newAudioMessage: ChatMessage = {
//           id: crypto.randomUUID(),
//           role: "user",
//           userAudioUrl,
//           content: transcribedText,
//           timestamp: Date.now(),
//         };

//         onAddAudioMessage(newAudioMessage);
//         audioChunks.current = [];
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//     </div>
//   );
// }
