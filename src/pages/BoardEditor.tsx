import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import DOMPurify from "dompurify";
import { Editor } from "@toast-ui/react-editor";
import * as Sentry from "@sentry/react";
import { useRecoilValue } from "recoil";
import "@toast-ui/editor/dist/toastui-editor.css";

import { SentryError } from "utils/error";

import { tokenState } from "App";

interface IMyToken {
  user: {
    user_id: string;
  };
  exp: number;
}

const BoardEditor = () => {
  const navigate = useNavigate();

  const [inputTitle, setInputTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor>(null);

  const token = useRecoilValue(tokenState);
  const boardLocalStorage = localStorage.getItem("board");
  const decoded = jwt_decode<IMyToken>(token);
  const userId = decoded.user.user_id;

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleMoveBoardBtnClick = () => {
    navigate(-1);
  };

  const handleEditorSaveBtnClick = async () => {
    if (!editorRef.current) return;

    const inputBody = DOMPurify.sanitize(
      editorRef?.current?.getInstance().getHTML(),
    );

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        userId: userId,
        id: "101",
        title: inputTitle,
        body: inputBody,
      });
    } catch (err) {
      Sentry.captureException(new SentryError(err as Error));
    }
  };

  const handleEditorTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value);
  };

  const handleEditorSaveBtnAlertClick = () => {
    alert(
      "현재 서비스 준비 중입니다. Board Second에서는 저장하기 버튼 클릭 시 console 창에서 확인 가능합니다. ",
    );
  };

  return (
    <EditorWrap>
      <div className="board_editor_top">
        <div className="editor_user_btn_wrapper">
          <div className="editor_user">
            작성자: <span className="editor_user_id">{userId}</span>
          </div>
          <div className="editor_top_btn_group">
            <button
              type="button"
              className="editor_back_btn"
              onClick={handleMoveBoardBtnClick}
            >
              목록
            </button>
            <button
              type="button"
              className="editor_save_btn"
              onClick={
                boardLocalStorage === "second"
                  ? handleEditorSaveBtnClick
                  : handleEditorSaveBtnAlertClick
              }
            >
              저장하기
            </button>
          </div>
        </div>
        <input
          type="text"
          className="board_editor_input_title"
          placeholder="제목"
          onChange={handleEditorTitleChange}
          ref={inputRef}
        />
      </div>
      <Editor
        previewStyle="vertical"
        height="calc(100% - 191px)"
        initialEditType="wysiwyg"
        initialValue=""
        placeholder="말은 우리 내면을 비추는 거울입니다."
        language="ko"
        ref={editorRef}
        autofocus={false}
      />
    </EditorWrap>
  );
};

export default BoardEditor;

const EditorWrap = styled.div`
  padding: 50px;
  height: 100vh;

  .editor_user_id {
    color: #333;
    font-weight: bold;
  }
`;
