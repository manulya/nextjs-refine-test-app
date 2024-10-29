import { promises as fs } from "fs";

import { NextResponse } from "next/server";

import { IData, IUser } from "@interfaces/interfaces";

function generateUniqueId(length = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function readData(): Promise<IData> {
  const jsonData = await fs.readFile(
    `${process.cwd()}/public/data.json`,
    "utf-8",
  );
  return JSON.parse(jsonData) as IData;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const start = parseInt(searchParams.get("_start") || "0", 10);
    const end = parseInt(searchParams.get("_end") || "10", 10);

    const data = await readData();

    const users = data.data.slice(start, end);

    const response = NextResponse.json(users);
    response.headers.set("X-Total-Count", String(data.data.length));

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error as string}` },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await readData();

    const newUser = (await request.json()) as IUser;

    newUser.id = generateUniqueId();
    data.data.push(newUser);

    await fs.writeFile(
      `${process.cwd()}/public/data.json`,
      JSON.stringify(data, null, 2),
    );

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong: ${error as string}` },
      { status: 500 },
    );
  }
}
