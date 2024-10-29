// app/api/users/[id]/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'public/data.json');

const readData = () => {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

const writeData = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const data = readData();
  const user = data.users.find((user: any) => user.id === parseInt(params.id));
  return NextResponse.json(user || {}, { status: user ? 200 : 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = readData();
  const userIndex = data.users.findIndex((user: any) => user.id === parseInt(params.id));

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const updatedUser = { ...data.users[userIndex], ...(await req.json()) };
  data.users[userIndex] = updatedUser;
  writeData(data);
  return NextResponse.json(updatedUser);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const data = readData();
  const userIndex = data.users.findIndex((user: any) => user.id === parseInt(params.id));

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const deletedUser = data.users.splice(userIndex, 1)[0];
  writeData(data);
  return NextResponse.json(deletedUser);
}
