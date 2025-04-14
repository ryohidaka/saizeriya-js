import { describe, it, expect, beforeEach, vi } from "vitest";

import { Menu, Saizeriya } from "../src";

describe("Saizeriya", () => {
  let saizeriya: Saizeriya;

  beforeEach(() => {
    saizeriya = new Saizeriya();
  });

  it("初期化時にメニューをロードすること", () => {
    saizeriya.all();
  });

  it("フィルタリングされた全てのメニューを返すこと", () => {
    const params = { genres: ["サラダ"] };
    saizeriya.all(params);
  });

  it("全てのカテゴリを返すこと", () => {
    saizeriya.categories();
  });

  it("全てのジャンルを返すこと", () => {
    saizeriya.genres();
  });

  it("全ての旧ジャンルを返すこと", () => {
    saizeriya.preGenres();
  });

  it("IDに対応するメニューを返すこと", () => {
    const menu = saizeriya.getById(1202);
    expect(menu).toEqual({
      calorie: 192,
      category: "グランド",
      categoryEn: "Grand Menu",
      categoryZh: "主",
      genre: "サラダ",
      id: 1202,
      isAlcohol: false,
      name: "小エビのサラダ",
      nameEn: "Shrimp Salad",
      nameZh: "小甜虾沙拉",
      price: 319,
      priceWithTax: 350,
      salt: 1.5,
      icon: "🍤",
      preId: "SA02",
      isEast: true,
      isWest: true,
    });
  });

  it("存在しないIDに対してundefinedを返すこと", () => {
    const menu = saizeriya.getById(9999);
    expect(menu).toBeUndefined();
  });

  it("旧IDに対応するメニューを返すこと", () => {
    const menu = saizeriya.getByPreId("SA02");
    expect(menu).toEqual({
      calorie: 192,
      category: "グランド",
      categoryEn: "Grand Menu",
      categoryZh: "主",
      genre: "サラダ",
      id: 1202,
      isAlcohol: false,
      name: "小エビのサラダ",
      nameEn: "Shrimp Salad",
      nameZh: "小甜虾沙拉",
      price: 319,
      priceWithTax: 350,
      salt: 1.5,
      icon: "🍤",
      preId: "SA02",
      isEast: true,
      isWest: true,
    });
  });

  it("存在しない旧IDに対してundefinedを返すこと", () => {
    const menu = saizeriya.getByPreId("hoge");
    expect(menu).toBeUndefined();
  });

  it("ランダムな組み合わせを返すこと", () => {
    saizeriya.random();
  });
});
