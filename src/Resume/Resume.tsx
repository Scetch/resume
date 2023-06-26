import "./Resume.css";
import resumeJSON from "../resume.json";
import Header from "../Header/Header";
import Section from "../Section/Section";
import { Editor } from "../Editor/Editor";
import { useState } from "react";
import * as types from "../types";

function Resume() {
  const [resume, setResume] = useState<types.Resume>(resumeJSON);
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      <div className="page-container">
        <div className={`page-content ${editorOpen ? "editor-open" : ""}`}>
          <Header header={resume.header} />

          <main>
            <div className="left">
              {resume.left.map((section, i) => (
                <Section key={`left-section-element-${i}`} section={section} />
              ))}
            </div>

            <div className="right">
              {resume.right.map((section, i) => (
                <Section key={`right-section-element-${i}`} section={section} />
              ))}
            </div>
          </main>
        </div>
      </div>

      <Editor
        initialResume={resume}
        onUpdateResume={setResume}
        onVisibilityChange={setEditorOpen}
      />
    </>
  );
}

export default Resume;
