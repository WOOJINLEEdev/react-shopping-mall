import { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DOMPurify from "dompurify";
import { getToken } from "utils/token";

interface MyToken {
  user: {
    user_id: string;
  };
  exp: number;
}

const BoardEditor = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);
  const [inputTitle, setInputTitle] = useState("");
  const history = useHistory();

  const token = getToken();
  const boardLocalStorage = localStorage.getItem("board");
  const decoded = jwt_decode<MyToken>(token);
  const userId = decoded.user.user_id;
  let isFocusTitle = false;

  useEffect(() => {
    inputRef?.current?.focus();
  });

  const eventHandler = {
    focus: () => {
      if (!isFocusTitle) {
        inputRef?.current?.focus();
        isFocusTitle = true;
      }
    },
  };

  const moveBoard = () => {
    history.goBack();
  };

  const handleEditorSave = async () => {
    const inputBody = DOMPurify.sanitize(
      editorRef?.current?.getInstance().getEditorElements().wwEditor.innerText
    );

    console.log("inputBody", inputBody);

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: userId,
          id: "101",
          title: inputTitle,
          body: inputBody,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditorTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleAlert = () => {
    alert(
      "현재 서비스 준비 중입니다. Board Second에서는 저장하기 버튼 클릭 시 console 창에서 확인 가능합니다. "
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
              onClick={moveBoard}
            >
              목록
            </button>
            <button
              type="button"
              className="editor_save_btn"
              onClick={
                boardLocalStorage === "second" ? handleEditorSave : handleAlert
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
          onChange={handleEditorTitle}
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
        events={eventHandler}
      />
    </EditorWrap>
  );
};

export default BoardEditor;

const EditorWrap = styled.div`
  padding: 50px;
  height: 100vh;

  & .editor_user_id {
    color: #333;
    font-weight: bold;
  }
`;
