"use client";

import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

export default function ContentWrapper({ content }) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (content) {
      setSanitizedContent(DOMPurify.sanitize(content));
    }
  }, [content]);

  return (
    <>
      {sanitizedContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className="content-wrapper"
          style={{ fontFamily: "var(--font-uncut-sans) !important" }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
