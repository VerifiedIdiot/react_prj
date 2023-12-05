import axios from "axios";

const BACK_DOMAIN = "http://localhost:8111";

export const MemberAdminApi = {
  // 회원 전체 목록 가져오기
  getMember: async () => {
    const response = await axios.get(BACK_DOMAIN + "/member/admin");
    return response;
  },

  // 회원 추가
  addMember: async (memberToSave) => {
    // memberToSave : 매개변수, 추가할 회원의 데이터
    const response = await axios.post(
      BACK_DOMAIN + "/member/admin",
      memberToSave
    );
    return response; // 백 엔드 서버로부터 받은 응답
  },

  // 회원 삭제
  deleteMember: async (id) => {
    const response = await axios.delete(BACK_DOMAIN + `/member/admin/${id}`);
    return response;
  },

  // 회원 수정
  updateMember: async (id, member) => {
    const response = await axios.put(
      BACK_DOMAIN + `/member/admin/${id}`,
      member
    );
    return response;
  },
};
