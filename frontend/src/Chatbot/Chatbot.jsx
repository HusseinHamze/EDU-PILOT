import { useEffect, useRef } from "react";

const Chatbot = () => {
  const initialized = useRef(false);
  const cleanupTimeout = useRef(null);

  useEffect(() => {
    // Prevent double initialization in development (Strict Mode)
    if (initialized.current) return;
    initialized.current = true;

    const loadChatbot = () => {
      // Cleanup any previous instances
      const botContainer = document.getElementById("chatling-inline-bot");
      if (botContainer) botContainer.innerHTML = "";

      const oldScript = document.getElementById("chatling-embed-script");
      if (oldScript) oldScript.remove();

      // Initialize configuration
      window.chtlConfig = {
        chatbotId: "8853811975",
        display: "page_inline"
      };

      // Create and append script
      const script = document.createElement("script");
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;
      script.id = "chatling-embed-script";
      document.body.appendChild(script);
    };

    // Add slight delay to ensure proper cleanup
    cleanupTimeout.current = setTimeout(loadChatbot, 50);

    return () => {
      clearTimeout(cleanupTimeout.current);
      
      // Aggressive cleanup
      const botContainer = document.getElementById("chatling-inline-bot");
      if (botContainer) {
        // Remove any iframes or chatbot-generated content
        botContainer.querySelectorAll('iframe').forEach(iframe => iframe.remove());
        botContainer.innerHTML = "";
      }

      const existingScript = document.getElementById("chatling-embed-script");
      if (existingScript) existingScript.remove();

      // Cleanup chatbot styles
      document.querySelectorAll('style').forEach(style => {
        if (style.innerText.includes('chatling')) style.remove();
      });

      delete window.chtlConfig;
      initialized.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4 text-[#0E1C36]">Chat with Edu-Pilot</h1>
        {/* Add unique key to force DOM recreation */}
        <div 
          id="chatling-inline-bot" 
          className="w-full h-[80vh]"
          key={Date.now()} 
        />
      </main>
    </div>
  );
};

export default Chatbot;