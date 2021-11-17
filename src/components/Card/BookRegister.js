import React, { useState } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import useCurrentBook from "Hooks/useCurrentBook";
import useContent from "Hooks/useContent";
import "components/Card/BookRegister.scss";
import { useEffect } from "react";
import api from "api/api";
const BookRegister = ({ match }) => {
  const { currentContent, setCurrentContent } = useContent();
  const { currentUser } = useCurrentUser();
  const { currentBook } = useCurrentBook();
  const { title, author, publisher, pubdate, isbn, image, description } =
    currentBook;
  // console.log(currentBook);

  const handleChange = (e) => {
    setCurrentContent(e.target.value);
  };
  //하나하나 내용 칠때마다 set되는게 아니라 서브밋 누르면 한번에 되고 싶은데 그러면 한번 실행을 했다가 해야함...
  const handleSubmit = async () => {
    await api
      .post("transciption/click", null, {
        params: { isbn },
      })
      .then((response) => {
        console.log("있나없나");
        console.log(response);
      });
    await api
      .post("transcription/register", null, {
        params: {
          userId: currentUser.id,
          title: title,
          author: author,
          publisher: publisher,
          pubdate: pubdate,
          isbn: isbn,
          image: image,
          description: description,
          transcriptionContent: currentContent,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };
  // const bookRegister = async () => {
  //   console.log(currentContent);
  //   await api.post("transcription/register", null, {
  //     params: {
  //       userId: currentUser,
  //       title,
  //       author,
  //       publisher,
  //       pubdate,
  //       isbn,
  //       image,
  //       transcriptionContent: currentContent,
  //     },
  //   });
  // };
  // useEffect(() => {
  //   effect;
  //   return () => {
  //     cleanup;
  //   };
  // }, [input]);
  return (
    <div className="bookDetail">
      <div className="bookDetail__wrapper">
        <img src={image} alt="" />
        <div>
          제목:{title ? title.replace(/<b>/gi, "").replace(/<\/b>/gi, "") : ""}
        </div>
        <div>저자:{author}</div>
        <div> 출판사:{publisher}</div>
        <div>
          필사:
          <textarea
            className="bookDatail__input"
            cols="40"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <button onClick={handleSubmit}>저장</button>
        {currentContent}
      </div>
    </div>
  );
};

export default BookRegister;
