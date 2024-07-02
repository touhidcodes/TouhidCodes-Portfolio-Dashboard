"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../MenuBar/MenuBar";
import { useEffect } from "react";

type TContentProps = {
  postContent: (content: string) => void;
};

const TipTap = ({ postContent }: TContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
  });

  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        const content = editor.getHTML();
        postContent(content);
      };

      editor.on("update", handleUpdate);

      return () => {
        editor.off("update", handleUpdate);
      };
    }
  }, [editor, postContent]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
};

export default TipTap;
