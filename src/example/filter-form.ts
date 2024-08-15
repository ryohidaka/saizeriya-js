import { Saizeriya, SaizeriyaMenuParams } from "..";

type FilterFormProps = {
  onFilter: (params: SaizeriyaMenuParams) => void;
};

export async function FilterForm({
  onFilter,
}: FilterFormProps): Promise<string> {
  const saizeriya = new Saizeriya();
  const menus = await saizeriya.all();
  const menuNames = menus.map((menu) => menu.name);
  const categories = await saizeriya.categories();
  const genres = await saizeriya.genres();

  const formHtml = `
    <div class="mb-3">
      <div class="row mb-3">
        <div class="col">
          <label for="name" class="form-label">メニュー名</label>
          <input type="text" class="form-control" id="name" placeholder="小エビのサラダ" list="nameOptions">
          <datalist id="nameOptions">
            ${menuNames.map(
              (name) => `
              <option>${name}</option>
            `,
            )}
          </datalist>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <label for="categories" class="form-label">カテゴリー</label>
          <input type="text" class="form-control" id="categories" placeholder="グランド" list="categoryOptions">
          <datalist id="categoryOptions">
            ${categories.map(
              (category) => `
              <option>${category.category}</option>
            `,
            )}
          </datalist>
        </div>
        
        <div class="col">
          <label for="genres" class="form-label">ジャンル</label>
          <input type="text" class="form-control" id="genres" placeholder="サラダ" list="genreOptions">
          <datalist id="genreOptions">
            ${genres.map(
              (genre) => `
              <option>${genre}</option>
            `,
            )}
          </datalist>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <label for="priceMin" class="form-label">価格最小</label>
          <div class="input-group mb-3">
            <span class="input-group-text">¥</span>
            <input type="number" class="form-control" id="priceMin" placeholder="1000">
          </div>
        </div>

        <div class="col">
          <label for="priceMax" class="form-label">価格最大</label>
          <div class="input-group mb-3">
            <span class="input-group-text">¥</span>
            <input type="number" class="form-control" id="priceMax" placeholder="1000">
          </div>
        </div>

        <div class="col">
          <label for="calorieMin" class="form-label">カロリー最小</label>
          <div class="input-group mb-3">
            <input id="calorieMin" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">kcal</span>
          </div>
        </div>

        <div class="col">
          <label for="calorieMax" class="form-label">カロリー最大</label>
          <div class="input-group mb-3">
            <input id="calorieMax" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">kcal</span>
          </div>
        </div>

         <div class="col">
          <label for="saltMin" class="form-label">塩分最小</label>
          <div class="input-group mb-3">
            <input id="saltMin" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">g</span>
          </div>
        </div>

        <div class="col">
          <label for="saltMax" class="form-label">塩分最大</label>
          <div class="input-group mb-3">
            <input id="saltMax" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">g</span>
          </div>
        </div>
      </div>

      <div class="row">
        <button id="filter" type="button" class="btn btn-primary">フィルターを適用</button>
      </div>
    </div>
  `;

  // フィルターボタンのイベントリスナーを設定するコードは後で実行
  setTimeout(() => {
    const filterButton = document.querySelector("#filter");
    if (filterButton) {
      filterButton.addEventListener("click", handleFilter);
    }
  }, 0);

  function handleFilter() {
    const priceMin =
      document.querySelector<HTMLInputElement>("#priceMin")?.valueAsNumber ||
      undefined;
    const priceMax =
      document.querySelector<HTMLInputElement>("#priceMax")?.valueAsNumber ||
      undefined;

    // Handle empty categories and genres
    const categoriesInput = document
      .querySelector<HTMLInputElement>("#categories")
      ?.value.trim();
    const categories =
      categoriesInput && categoriesInput.length > 0
        ? categoriesInput
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0)
        : undefined;

    const name =
      document.querySelector<HTMLInputElement>("#name")?.value || undefined;
    const calorieMin =
      document.querySelector<HTMLInputElement>("#calorieMin")?.valueAsNumber ||
      undefined;
    const calorieMax =
      document.querySelector<HTMLInputElement>("#calorieMax")?.valueAsNumber ||
      undefined;
    const saltMin =
      document.querySelector<HTMLInputElement>("#saltMin")?.valueAsNumber ||
      undefined;
    const saltMax =
      document.querySelector<HTMLInputElement>("#saltMax")?.valueAsNumber ||
      undefined;

    const genresInput = document
      .querySelector<HTMLInputElement>("#genres")
      ?.value.trim();
    const genres =
      genresInput && genresInput.length > 0
        ? genresInput
            .split(",")
            .map((gen) => gen.trim())
            .filter((gen) => gen.length > 0)
        : undefined;

    const params: SaizeriyaMenuParams = {
      priceMin,
      priceMax,
      categories,
      name,
      calorieMin,
      calorieMax,
      saltMin,
      saltMax,
      genres,
    };
    onFilter(params);
  }

  return formHtml;
}
