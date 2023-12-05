import React, { useEffect, useState } from "react";
import { Th } from "../globalStyle/StyledTable";
import { Td } from "../globalStyle/StyledTable";
import { Table } from "../globalStyle/StyledTable";
import { MiddleOrderBox } from "../globalStyle/MiddleOrderBox";
import { Input } from "../globalStyle/StyledTable";
import { TableBox } from "../globalStyle/StyledTable";
import { storage } from "../api/firebase";
import { StyledTd } from "../globalStyle/StyledTable";
import { StyledButton } from "../globalStyle/StyledButton";
import { BookAxiosApi } from "../api/BookAxiosApi";
import { StyledTitle } from "../globalStyle/StyledTitle";

export const BookAdminPage = () => {
  const [bookList, setBookList] = useState([]);
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    publisher: "",
    genre: "",
    imageUrl: "",
    contentUrl: "",
    summary: "",
    price: "",
    publishYear: "",
    entryTime: "",
    purchaseCount: "",
  });

  const [fileForImage, setFileForImage] = useState(null);
  const [fileForContent, setFileForContent] = useState(null);
  const [urlForImage, setUrlForImage] = useState("");
  const [urlForContent, setUrlForContent] = useState("");

  // 책 전체 목록 가져오기
  useEffect(() => {
    const fetchBookList = async () => {
      try {
        const response = await BookAxiosApi.getBooks();
        setBookList(response.data);
      } catch (error) {
        console.error("서버에 데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchBookList();
  }, []);

  // 추가 (1)
  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };
  // 추가 (2)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${date}`;
    const bookToSave = {
      // newBook의 모든 속성과 imageUrl 속성을 가진 새로운 객체를 bookToSave에 할당
      ...newBook, // 객체 리터럴 : newBook과 동일한 속성을 가진 새로운 객체 반환
      imageUrl: urlForImage,
      contentUrl: urlForContent,
      entryTime: dateString, // 현재 시간 추가
    };
    try {
      const response = await BookAxiosApi.addBook(bookToSave);
      setBookList([...bookList, response.data]);
    } catch (error) {
      console.error("서버에 책을 추가하는 데 실패했습니다.", error);
    } finally {
      // 입력창 초기화
      setNewBook({
        id: "",
        title: "",
        author: "",
        publisher: "",
        genre: "",
        imageUrl: "",
        contentUrl: "",
        summary: "",
        price: "",
        publishYear: "",
        entryTime: "",
        purchaseCount: "",
      });
    }
  };

  // 삭제
  const deleteBook = async (id) => {
    if (window.confirm("정말로 이 행을 삭제하시겠습니까?")) {
      try {
        // await 는 .delete에게만 적용
        await BookAxiosApi.deleteBook(id);
        setBookList(bookList.filter((book) => book.id !== id));
      } catch (error) {
        console.error("서버에서 책을 삭제하는 데 실패했습니다.", error);
      }
    }
  };

  // 수정
  const selectBook = (book) => {
    // 수정할 행을 클릭하면, 해당 행의 정보가 호출되고
    // console.log(book); // selectBook 함수 작동 확인
    setNewBook(book);
  };

  // 수정
  const updateBook = async (e) => {
    e.preventDefault();
    try {
      // 수정된 행의 정보를 스프링 서버에 전송
      // 해당 작업 완료 전까지 함수 내의 다른 작업 모두 대기
      const response = await BookAxiosApi.updateBook(newBook.id, newBook);
      if (response.status === 200 || response.status === 201) {
        setBookList(
          bookList.map((book) =>
            book.id === newBook.id ? response.data : book
          )
        );
      } else {
        console.error(
          "서버에서 책을 수정하는 데 실패했습니다.",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("서버에서 책을 수정하는 데 실패했습니다.", error);
    } finally {
      setNewBook({
        id: "",
        title: "",
        author: "",
        publisher: "",
        genre: "",
        imageUrl: "",
        contentUrl: "",
        summary: "",
        price: "",
        publishYear: "",
        entryTime: "",
        purchaseCount: "",
      });
    }
  };

  // 파이어 베이스
  // 파일 입력 처리 함수
  const handleFileInputForImage = (e) => {
    setFileForImage(e.target.files[0]);
  };
  const handleFileInputForContent = (e) => {
    setFileForContent(e.target.files[0]);
  };

  // 파일 업로드 처리 함수 (파이어베이스 스토리지에 파일 업로드)
  const handleUploadForImage = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(fileForImage.name);
    try {
      await fileRef.put(fileForImage); // 파일 업로드
      const url = await fileRef.getDownloadURL(); // 파일 업로드 후 URL 가져오기
      console.log("저장 경로 확인 : " + url);
      setUrlForImage(url); // URL을 상태에 설정
    } catch (error) {
      console.error("파일 업로드에 실패했습니다.", error);
    }
  };

  const handleUploadForContent = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(fileForContent.name);
    try {
      await fileRef.put(fileForContent); // 파일 업로드
      const url = await fileRef.getDownloadURL(); // 파일 업로드 후 URL 가져오기
      console.log("저장 경로 확인 : " + url);
      setUrlForContent(url); // URL을 상태에 설정
    } catch (error) {
      console.error("파일 업로드에 실패했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MiddleOrderBox>
          <TableBox>
            <StyledTitle>책 관리 페이지</StyledTitle>
            <Table>
              <thead>
                <tr>
                  <Th>ID</Th>
                  <Th>TITLE</Th>
                  <Th>AUTHOR</Th>
                  <Th>PUBLISHER</Th>
                  <Th>GENRE</Th>
                  <Th>IMAGE_URL</Th>
                  <Th>CONTENT_URL</Th>
                  <Th>SUMMARY</Th>
                  <Th>PRICE</Th>
                  <Th>PUBLISH_YEAR</Th>
                  <Th>ENTRY_TIME</Th>
                  <Th>PURCHASE_COUNT</Th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, index) => (
                  <tr
                    key={index}
                    onClick={() => selectBook(book)}
                    onDoubleClick={() => deleteBook(book.id)}
                  >
                    <Td>{book.id}</Td>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                    <Td>{book.genre}</Td>
                    <Td>{book.imageUrl}</Td>
                    <Td>{book.contentUrl}</Td>
                    <Td>{book.summary}</Td>
                    <Td>{book.price}</Td>
                    <Td>{book.publishYear}</Td>
                    <Td>{book.entryTime}</Td>
                    <Td>{book.purchaseCount}</Td>
                  </tr>
                ))}
                <tr>
                  <StyledTd>
                    <Input
                      type="text"
                      name="id"
                      disabled={true}
                      placeholder="자동 입력"
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="publisher"
                      value={newBook.publisher}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="genre"
                      value={newBook.genre}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <div>
                      <input type="file" onChange={handleFileInputForImage} />
                      <button type="button" onClick={handleUploadForImage}>
                        Upload
                      </button>
                    </div>

                    {urlForImage && <img src={urlForImage} alt="uploaded" />}
                    <p>{urlForImage}</p>
                  </StyledTd>

                  <StyledTd>
                    <div>
                      <input type="file" onChange={handleFileInputForContent} />
                      <button type="button" onClick={handleUploadForContent}>
                        Upload
                      </button>
                    </div>

                    {urlForContent && (
                      <img src={urlForContent} alt="uploaded" />
                    )}
                    <p>{urlForContent}</p>
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="summary"
                      value={newBook.summary}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="number"
                      name="price"
                      value={newBook.price}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="date"
                      name="publishYear"
                      value={newBook.publishYear}
                      onChange={handleInputChange}
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="entryTime"
                      disabled={true}
                      placeholder="자동 입력"
                    />
                  </StyledTd>

                  <StyledTd>
                    <Input
                      type="text"
                      name="purchaseCount"
                      disabled={true}
                      placeholder="자동 입력"
                    />
                  </StyledTd>
                </tr>
              </tbody>
            </Table>
          </TableBox>
        </MiddleOrderBox>
        <br />
        <br />
        <MiddleOrderBox>
          <StyledButton
            type="submit"
            value="추가"
            width="100px"
            height="50px"
          ></StyledButton>
          <StyledButton
            onClick={updateBook}
            value="수정"
            width="100px"
            height="50px"
          ></StyledButton>
        </MiddleOrderBox>
      </form>
      <br />
      <br />
    </>
  );
};
