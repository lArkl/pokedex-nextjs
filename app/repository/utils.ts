export const parseNumber = (num?: string) => Number(num ?? "0");

export const getPageParams = (
  pageParam: string | undefined
): { page: number; pageSize: number; offset: number } => {
  const page = Number(pageParam ?? "1") - 1;
  const pageSize = parseNumber(process.env.PAGE_SIZE);
  return {
    page,
    pageSize,
    offset: page * pageSize,
  };
};

export enum SpriteCategory {
  Default,
  Shiny,
}
