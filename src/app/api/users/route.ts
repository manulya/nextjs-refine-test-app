import { IData } from "@interfaces/interfaces";

import { promises as fs } from "fs"; // Импортируем promises API

import { NextResponse } from "next/server";

async function readData(): Promise<IData> {
  const jsonData = await fs.readFile(
    `${process.cwd()}/public/data.json`,
    "utf-8",
  );
  return JSON.parse(jsonData);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const start = parseInt(searchParams.get("_start") || "0");
    const end = parseInt(searchParams.get("_end") || "10");

    const data = await readData();

    const users = data.data.slice(start, end);

    const response = NextResponse.json(users);
    response.headers.set("X-Total-Count", String(data.data.length));

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await readData();
    const newUser = await request.json();
    newUser.id = Date.now();
    data.users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2)); // Асинхронная запись данных
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Ошибка POST запроса:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
