import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchResultPage } from "./pages/SearchResultPage";
import { SalesGraph } from "./utils/SalesGraph";
import Login from "./pages/LoginPage";
import { BookAdminPage } from "./pages/BookAdminPage";
import { MainPage } from "./pages/MainPage";
import { UserProvider } from "./contexts/Context";
import { MemberAdminPage } from "./pages/MemberAdminPage";
import BuyReviewPg from "./pages/BuyReviewPage";
import AboutBookPage from "./pages/AboutBookPage";
import CartPage from "./pages/CartPage";
import MyPage from "./pages/MyPage";
import { BooksProvider } from "./contexts/BookInfoContext";
import { ViewerPageEpub } from "./pages/ViewerPageEpub";
import { ViewerPagePdf } from "./pages/ViewerPagePdf";
import { ViewerPageTxt } from "./pages/ViewerPageTxt";
import DoNotShowInLogIn from "./components/mainPageComp/smallComps/DoNotShowInLogIn";
import GlobalStyle from "./globalStyle/GlobalStyle";
import { WhatIBoughtPage } from "./pages/WhatIBoughtPage";


function App() {
  return (
    <>
      <GlobalStyle />
      <BooksProvider>
        <UserProvider>
          <BrowserRouter>
            <DoNotShowInLogIn />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/AboutBookPage/:id"
                element={<AboutBookPage></AboutBookPage>}
              ></Route>
              <Route
                path="/ViewerPage"
                element={<ViewerPageEpub></ViewerPageEpub>}
              ></Route>
              <Route
                path="/SearchResultPage"
                element={<SearchResultPage></SearchResultPage>}
              ></Route>
              <Route
                path="/SalesGraph"
                element={<SalesGraph></SalesGraph>}
              ></Route>
              <Route path="/" element={<Login />} />

              <Route path="/PurchasePage" element={<BuyReviewPg />} />
              <Route
                path="/BookAdminPage"
                element={<BookAdminPage></BookAdminPage>}
              ></Route>
              <Route
                path="/MemberAdminPage"
                element={<MemberAdminPage></MemberAdminPage>}
              ></Route>
              <Route path="/CartPage" element={<CartPage />} />
              <Route path="/MyPage" element={<MyPage />} />
              <Route path="/ViewerPagePdf" element={<ViewerPagePdf />} />
              <Route path="/ViewerPageTxt" element={<ViewerPageTxt />} />
              <Route path="/WhatIBoughtPage" element={<WhatIBoughtPage />} />
            </Routes>
            
          </BrowserRouter>
        </UserProvider>
      </BooksProvider>
    </>
  );
}

export default App;
