export abstract class Entity<TProps> {
  protected constructor(
    protected readonly props: TProps,
    protected readonly id?: string,
  ) {}

  public getId(): string | undefined {
    return this.id;
  }
}
