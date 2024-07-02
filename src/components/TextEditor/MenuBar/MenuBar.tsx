import React from "react";
import { Editor } from "@tiptap/react";
import { Editor as TiptapEditor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const isActive = (type: string, options?: any) => {
    if (!editor) return false;

    if (options) {
      return editor.isActive(type, options);
    }

    return editor.isActive(type);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-[#1F2544] rounded-md items-center justify-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().toggleBold()}
        className={`px-2 py-1 rounded-md ${
          isActive("bold") ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().toggleItalic()}
        className={`px-2 py-1 rounded-md ${
          isActive("italic") ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().toggleStrike()}
        className={`px-2 py-1 rounded-md ${
          isActive("strike") ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        Strike
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().toggleCode()}
        className={`px-2 py-1 rounded-md ${
          isActive("code") ? "bg-blue-500 text-white" : "bg-white text-black"
        }`}
      >
        Code
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-2 py-1 rounded-md ${
          isActive("paragraph")
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 3 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 4 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 5 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`px-2 py-1 rounded-md ${
          editor.isActive("heading", { level: 6 })
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded-md ${
          isActive("bulletList")
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded-md ${
          isActive("orderedList")
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-2 py-1 rounded-md ${
          isActive("codeBlock")
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded-md ${
          isActive("blockquote")
            ? "bg-blue-500 text-white"
            : "bg-white text-black"
        }`}
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="px-2 py-1 bg-white text-black rounded-md"
      >
        Redo
      </button>
    </div>
  );
};

export default MenuBar;
