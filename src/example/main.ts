import { Saizeriya } from "@/Saizeriya.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    
  </div>
`;

const saizeriya = new Saizeriya();

// カテゴリ一覧
const categories = saizeriya.categories();
console.log(categories);

// ジャンル一覧
const genres = await saizeriya.genres();
console.log(genres);
