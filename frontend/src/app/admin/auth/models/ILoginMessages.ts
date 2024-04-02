interface ILoginMessage {
  type: "success" | "error" | "warning" | "info";
  messageText: string;
}

export default ILoginMessage;
