import "./Editor.css";
import * as simpleCodeEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";
import * as types from "../types";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export interface EditorProps {
  initialResume: types.Resume;
  onVisibilityChange: (open: boolean) => void;
  onUpdateResume: (resume: types.Resume) => void;
}

export function Editor({
  initialResume,
  onUpdateResume,
  onVisibilityChange,
}: EditorProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(JSON.stringify(initialResume, null, 2));

  const openEditor = useCallback(() => {
    onVisibilityChange(!open);
    setOpen(!open);
  }, [onVisibilityChange, open]);

  return (
    <div className="editor-container">
      <div className="editor-dialog">
        <div className="editor-bar">
          <button onClick={openEditor}>
            <FontAwesomeIcon className="icon" icon={faPenToSquare} /> Edit{" "}
            <FontAwesomeIcon
              className="icon"
              icon={open ? faChevronDown : faChevronUp}
            />
          </button>
        </div>

        {open && (
          <div className="editor-view">
            <simpleCodeEditor.default
              className="editor"
              value={code}
              onValueChange={(code) => {
                setCode(code);

                try {
                  const parsedResume: types.Resume = JSON.parse(code);

                  if (!types.validate(parsedResume)) {
                    throw new Error("Invalid resume JSON, not updating.");
                  }

                  onUpdateResume(parsedResume);
                } catch (e) {}
              }}
              highlight={(code) => highlight(code, languages.json, "json")}
              padding={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}
