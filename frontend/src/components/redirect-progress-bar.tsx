"use client";
import React, { useState } from "react";
import { Progress } from "./ui/progress";

function RedirectProgressBar() {
  const [progress, setProgress] = useState(0);
  React.useEffect(() => {
    const timer = setInterval(
      () => setProgress((progress) => Math.min(progress + 7, 100)),
      100,
    );
    return () => clearInterval(timer);
  }, []);
  return <Progress value={progress} />;
}

export default RedirectProgressBar;
