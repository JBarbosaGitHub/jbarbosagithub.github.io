import { useEffect } from "react";

const ELFSIGHT_SCRIPT_ID = "elfsight-platform-script";

export default function ElfsightChatbot() {
  useEffect(() => {
    // Só adiciona o script se ainda não existir
    if (!document.getElementById(ELFSIGHT_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = ELFSIGHT_SCRIPT_ID;
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="elfsight-app-b8fad7f2-b788-48dc-8bc4-535fe19a871b"
      data-elfsight-app-lazy
    ></div>
  );
}
