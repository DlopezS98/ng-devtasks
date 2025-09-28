export interface PagedResult<TModel> {
  items: TModel[];
  totalCount: number;
  skip: number;
  take: number;
}