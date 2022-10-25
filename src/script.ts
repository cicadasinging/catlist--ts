/* 定义数据类型：接口实现 */
interface CatType {
  id: string;
  url: string;
  height: number;
  width: number;
  test?: boolean;
}

class Cat implements CatType {
  id: string;
  url: string;
  height: number;
  width: number;

  constructor(id: string, url: string, height: number, width: number) {
    this.id = id;
    this.url = url;
    this.height = height;
    this.width = width;
  }
}

/* 定义逻辑类型：逻辑增删 */
const tableBody: HTMLTableElement | null = document.querySelector("#table-body");

class WebDisplay {
  public static addData(data: CatType): void {
    const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
    const tableRow: HTMLTableRowElement = document.createElement("tr");
    tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img alt="cat" src="${cat.url}"></td>
            <td>${cat.height.toString()}</td>
            <td>${cat.width.toString()}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
    tableBody?.appendChild(tableRow);
  }

  public static deleteData(deleteButton: HTMLAnchorElement): void {
    const td = deleteButton.parentElement as HTMLTableCellElement;
    const tr = td.parentElement as HTMLTableRowElement;
    tr.remove();
  }
}

/* 定义请求方法：逻辑增删 */
async function getJSON<T>(url: string): Promise<T> {
  const response: Response = await fetch(url);
  return await response.json();
}

const url: string = "https://api.thecatapi.com/v1/images/search";

async function getData(): Promise<void> {
  try {
    const json: CatType[] = await getJSON<CatType[]>(url);
    const data: CatType = json[0];
    WebDisplay.addData(data);
  } catch (error: Error | unknown) {
    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    console.log(message);
  }
}

/* 定义按钮事件：监听点击 */
const button: HTMLButtonElement | null = document.querySelector("button");
button?.addEventListener<"click">("click", getData);

/* 定义表体事件：监听点击 */
tableBody?.addEventListener<"click">("click", (ev: MouseEvent) => {
  WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
});
