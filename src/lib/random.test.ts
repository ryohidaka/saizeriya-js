import { describe, it, expect } from "vitest";

import { Menu } from "@/types";
import { getRandomMenus } from "./random";

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
    isEast: true,
    isWest: true,
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
    isEast: true,
    isWest: true,
  },
  {
    calorie: 295,
    category: "グランド",
    categoryEn: "Grand Menu",
    categoryZh: "主",
    genre: "前菜・おつまみ",
    id: 1401,
    isAlcohol: false,
    name: "辛味チキン",
    nameEn: "Spicy Grilled Chicken",
    nameZh: "香辣鸡翅",
    price: 273,
    priceWithTax: 300,
    salt: 1.8,
    icon: "🥤",
    isEast: true,
    isWest: true,
  },
];

describe("getRandomMenus", () => {
  it("ランダムなメニューの組み合わせが正しく取得できるか", () => {
    const maxSum = 1500;
    const allowDuplicates = false;
    const result = getRandomMenus(mockMenus, maxSum, allowDuplicates);

    expect(result.totalPriceWithTax).toBeLessThanOrEqual(maxSum);
    expect(result.menus.length).toBeGreaterThan(0);
    expect(result.totalCalorie).toBeGreaterThan(0);
    expect(result.totalSalt).toBeGreaterThan(0);
  });

  it("空のメニュー配列を渡した場合、結果が空か", () => {
    const result = getRandomMenus([], 1000, false);

    expect(result.menus).toEqual([]);
    expect(result.totalPriceWithTax).toBe(0);
    expect(result.totalCalorie).toBe(0);
    expect(result.totalSalt).toBe(0);
  });

  it("重複を許容した場合、正しく動作するか", () => {
    const maxSum = 1500;
    const allowDuplicates = true;
    const result = getRandomMenus(mockMenus, maxSum, allowDuplicates);

    expect(result.totalPriceWithTax).toBeLessThanOrEqual(maxSum);
    expect(result.menus.length).toBeGreaterThan(0);
  });
});
