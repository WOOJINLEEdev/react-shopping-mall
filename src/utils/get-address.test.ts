import { getFullAddress } from "utils/get-address";

import { IAddress } from "components/mypage/types";

describe("getFullAddress", () => {
  it("건물명(buildingName)과 동이름(bname)이 있으면 기본 주소 (동이름, 빌딩명)를 반환해야 한다.", () => {
    // given
    const address: IAddress = {
      zonecode: "13529",
      address: "경기 성남시 분당구 판교역로",
      addressType: "R",
      bname: "백현동",
      buildingName: "판교역",
    };

    // when
    const fullAddress = getFullAddress(address);

    // then
    expect(fullAddress).toBe("경기 성남시 분당구 판교역로 (백현동, 판교역)");
  });

  it("건물명(buildingName)이 있고 동이름(bname)이 없으면 기본 주소 (빌딩명)를 반환해야 한다.", () => {
    // given
    const address: IAddress = {
      zonecode: "13529",
      address: "경기 성남시 분당구 판교역로",
      addressType: "R",
      bname: "",
      buildingName: "판교역",
    };

    // when
    const fullAddress = getFullAddress(address);

    // then
    expect(fullAddress).toBe("경기 성남시 분당구 판교역로 (판교역)");
  });

  it("건물명(buildingName)이 없으면 기본 주소를 반환해야 한다.", () => {
    // given
    const address: IAddress = {
      zonecode: "13529",
      address: "경기 성남시 분당구 판교역로",
      addressType: "R",
      bname: "백현동",
      buildingName: "",
    };

    // when
    const fullAddress = getFullAddress(address);

    // then
    expect(fullAddress).toBe("경기 성남시 분당구 판교역로");
  });
});
