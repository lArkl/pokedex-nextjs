import { ListItemDto } from "@/app/lib/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // (
  //   params: Partial<{ name: string; ids: string[] }>
  // ): Promise<{ label: string; value: number }> {
  // const urlParams = new URLSearchParams();
  // Object.entries(params).forEach(([key, values]) => {
  //   urlParams.append(key, values as string);
  // });
  // const response = await fetch(
  //   `${process.env.API_ENDPOINT}/abilities${urlParams.toString()}`
  // );
  // const obj = await response.json();
  // return obj.data.map(({ name, id }: ListItemDto) => ({
  //   label: name,
  //   value: id,
  // }));
  const searchParams = request.nextUrl.searchParams;
  const url = new URL(`${process.env.API_ENDPOINT}/abilities`);
  url.search = searchParams.toString();
  const response = await fetch(url, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const parsedResponse = await response.json();
  const data = parsedResponse.data.items.map(({ name, id }: ListItemDto) => ({
    label: name,
    value: id,
  }));
  return Response.json(data);
}
