import { Menu } from "@/types";
import { describe, it, expect } from "vitest";
import { getGenres, getPreGenres } from "./genre";

const mockMenus: Menu[] = [
  {
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
  },
  {
    calorie: 154,
    category: "グランド",
    categoryEn: "Grand Menu",
    categoryZh: "主",
    genre: "スープ",
    id: 1301,
    isAlcohol: false,
    name: "コーンクリームスープ",
    nameEn: "Creamy Corn Soup",
    nameZh: "奶油玉米浓汤",
    price: 137,
    priceWithTax: 150,
    salt: 1,
    icon: "🥣",
    preId: "SU01",
  },
];

describe("getGenres", () => {
  it("ジャンルを正しく取得できるか", () => {
    const genres = getGenres(mockMenus);
    expect(genres).toEqual(["サラダ", "スープ"]);
  });

  it("空の配列を渡した場合、空の配列が返るか", () => {
    const genres = getGenres([]);
    expect(genres).toEqual([]);
  });
});

describe("getPreGenres", () => {
  it("旧ジャンルを正しく取得できるか", () => {
    const genres = getPreGenres(mockMenus);
    expect(genres).toEqual(["SA", "SU"]);
  });

  it("空の配列を渡した場合、空の配列が返るか", () => {
    const genres = getPreGenres([]);
    expect(genres).toEqual([]);
  });
});
