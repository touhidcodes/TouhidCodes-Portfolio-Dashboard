"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../MenuBar/MenuBar";
import { useState } from "react";

const TipTap = () => {
  const [blogContent, setBlogContent] = useState("<p>Hello World!</p>");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  const handlePost = () => {
    if (editor) {
      const html = editor.getHTML();
      console.log(html);
      setBlogContent(html);
    }
  };

  if (!editor) {
    return null;
  }

  const ShowPost = ({ content }: { content: string }) => {
    return <div>{content}</div>;
  };

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        onChange={() => setBlogContent(editor.getHTML() ?? "")}
        className="tiptap"
      />
      <button
        onClick={handlePost}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md"
      >
        Post
      </button>
      <ShowPost content={blogContent} />
    </div>
  );
};

export default TipTap;
