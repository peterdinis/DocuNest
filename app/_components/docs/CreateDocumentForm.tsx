"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import Header from "../shared/Header";

interface CreateDocumentFormProps {
  onChange: (value: string) => void;
  value: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ font: [] }],
    ["clean"],
    [{ align: [] }],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const CreateDocumentForm = ({ onChange, value }: CreateDocumentFormProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div>
      <h2 className="flex justify-center align-top mt-5 text-4xl prose prose-h2:">New document</h2>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="h-[100vh] mt-10 mb-6 whitespace-pre-wrap"
        modules={modules}
        formats={formats}
       />
    </div>
  );
};

export default CreateDocumentForm;