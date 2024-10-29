import { promises as fs } from "fs";

import { NextResponse } from "next/server";

import { IData, IUser } from "@interfaces/interfaces";

const filePath = `${process.cwd()}/public/data.json`;

async function readData(): Promise<IData> {
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData) as IData;
}

const writeData = async (data: IData) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await readData();
    const userId = params.id;
    const users = data.data.find((user: IUser) => user.id === userId);

    return NextResponse.json(users || {}, { status: users ? 200 : 404 });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong : ${error as string}` },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await readData();
    const userIndex = data.data.findIndex(
      (user: IUser) => user.id === params.id,
    );

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = {
      ...data.data[userIndex],
      ...((await req.json()) as IUser),
    };
    data.data[userIndex] = updatedUser;
    await writeData(data);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong : ${error as string}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await readData();
    const userIndex = data.data.findIndex(
      (user: IUser) => user.id === params.id,
    );

    if (userIndex === -1) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const deletedUser = data.data.splice(userIndex, 1)[0];
    await writeData(data);
    return NextResponse.json(deletedUser);
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong : ${error as string}` },
      { status: 500 },
    );
  }
}
