import { describe, it, expect, beforeEach } from "vitest";

import { Saizeriya } from "../src";

describe("Saizeriya", () => {
  let saizeriya: Saizeriya;

  beforeEach(() => {
    saizeriya = new Saizeriya();
  });

  it("初期化時にメニューをロードすること", async () => {
    await saizeriya.all();
  });

  it("フィルタリングされた全てのメニューを返すこと", async () => {
    const params = { genres: ["サラダ"] };
    await saizeriya.all(params);
  });

  it("全てのカテゴリを返すこと", async () => {
    await saizeriya.categories();
  });

  it("全てのジャンルを返すこと", async () => {
    await saizeriya.genres();
  });

  it("IDに対応するメニューを返すこと", async () => {
    const menu = await saizeriya.getById(1202);
    expect(menu).toEqual({
      calorie: 192,
      category: "グランド",
      categoryEn: "Grand Menu",
      categoryZh: "主",
      genre: "サラダ",
      id: 1202,
      name: "小エビのサラダ",
      nameEn: "Shrimp Salad",
      nameZh: "小甜虾沙拉",
      price: 319,
      priceWithTax: 350,
      salt: 1.5,
    });
  });

  it("存在しないIDに対してundefinedを返すこと", async () => {
    const menu = await saizeriya.getById(9999);
    expect(menu).toBeUndefined();
  });

  it("ランダムな組み合わせを返すこと", async () => {
    await saizeriya.random();
  });
});
