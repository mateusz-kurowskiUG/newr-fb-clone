import React from "react";
import ILoginMessage from "../models/ILoginMessages";

function ErrorBoxMessage({ message }: { message: ILoginMessage }) {
  return (
    <div className={`bg-${message.type} rounded-md m-4`}>
      <p className={`text-center py-2 text-${message.type}-foreground`}>
        {message.messageText}
      </p>
    </div>
  );
}

export default ErrorBoxMessage;
