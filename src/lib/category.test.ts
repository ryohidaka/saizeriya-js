import { describe, it, expect } from "vitest";

import { Menu } from "@/types";
import { getCategories } from "./category";

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
  },
  {
    calorie: undefined,
    category: "キッズ",
    categoryEn: "Kids",
    categoryZh: "孩子们",
    genre: "ドリンクバー",
    id: 5102,
    isAlcohol: false,
    name: "キッズドリンクバー",
    nameEn: "Drink Bar",
    nameZh: "畅饮吧",
    price: 91,
    priceWithTax: 100,
    salt: undefined,
    icon: "🥤",
  },
];

describe("getCategories", () => {
  it("カテゴリを正しく取得できるか", () => {
    const categories = getCategories(mockMenus);
    expect(categories).toEqual([
      { category: "グランド", categoryEn: "Grand Menu", categoryZh: "主" },
      { category: "キッズ", categoryEn: "Kids", categoryZh: "孩子们" },
    ]);
  });

  it("空の配列を渡した場合、空の配列が返るか", () => {
    const categories = getCategories([]);
    expect(categories).toEqual([]);
  });
});
