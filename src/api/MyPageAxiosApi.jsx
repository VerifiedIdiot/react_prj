import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const MyPageAxiosApi = {
  //회원정보 조회
  memberGet: async (id) => {
    return await axios.get(KH_DOMAIN + `/users/member/?id=${id}`);
  },

  // 정보 수정을 위해서 입력 받은 정보들이 존재하는지 확인
  memberCheck: async (name, id, pw, email) => {
    console.log("체크를 위한 정보" + name, id, pw, email);
    return await axios.get(
      KH_DOMAIN +
        `/users/checkInfo/?name=${name}&id=${id}&pw=${pw}&email=${email}`
    );
  },
  // 정보 변경 전 정보 중복 체크
  checkedId: async (NewId) => {
    try {
      const checkId = {
        id: NewId,
      };
      console.log("중복성 체크 아이디:" + NewId);
      return await axios.post(KH_DOMAIN + "/users/checkId", checkId);
    } catch (error) {
      throw error;
    }
  },

  // 아이디 비밀번호 변경
  modifyID: async (currentId, newId) => {
    try {
      const updateId = {
        currentId: currentId,
        newId: newId,
      };
      console.log("현제 아이디" + currentId);
      console.log("새로운 아이디" + newId);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/users/updateId", updateId);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },

  modifyPW: async (currentPw, newPw) => {
    try {
      const updatePw = {
        // 백엔드의 @RequestBody의 맵 객체의 키값과 동일할 것
        currentPw: currentPw,
        newPw: newPw,
      };
      console.log("현제 아이디" + currentPw);
      console.log("새로운 아이디" + newPw);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/users/updatePw", updatePw);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyName: async (currentName, newName) => {
    try {
      const updateName = {
        // 백엔드의 @RequestBody의 맵 객체의 키값과 동일할 것
        currentName: currentName,
        newName: newName,
      };
      console.log("현제 이름" + currentName);
      console.log("새로운 이름" + newName);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/users/updateName", updateName);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },

  // 회원 탈퇴
  memberDel: async (delId) => {
    console.log("Axios : " + delId);
    const del = {
      delId: delId,
    };
    console.log("회원 탈퇴를 위한 del 값이 잘 들어갔는지" + del.data);
    return await axios.post(KH_DOMAIN + "/users/delete", del);
  },

  // 금액 충전
  chargeAmout: async (id, cash) => {
    const IntCash = parseInt(cash);
    console.log(cash);
    const charge = {
      id: id,
      cash: IntCash,
    };
    console.log(charge.data);
    return await axios.post(KH_DOMAIN + "/users/charge", charge);
  },

  setImageUrl: async (id, url) => {
    const setImageUrl = {
      id: id,
      url: url,
    };
    console.log("axios url : " + url);
    return await axios.post(KH_DOMAIN + "/users/setImage", setImageUrl);
  },
};
export default MyPageAxiosApi;
