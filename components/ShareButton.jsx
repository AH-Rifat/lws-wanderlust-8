"use client";

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShareButton() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
    console.log("Current URL from window.location.href:", window.location.href);
  }, []);

  const shareOnFacebook = () => {
    if (window.FB) {
      window.FB.ui(
        {
          method: "share",
          href: window.location.href,
        },
        function (response) {
          console.log(response);
        },
      );
    }
  };

  return (
    <button
      onClick={shareOnFacebook}
      className="bg-white text-emerald-950 text-sm font-medium px-5 py-2 rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-2"
    >
      <Share2 className="w-4 h-4" />
      Share
    </button>
  );
}
