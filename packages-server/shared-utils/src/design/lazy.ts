type LazyInitializer<T> = () => Promise<T>;

export class Lazy<T> {
  private instance: T | null;

  constructor(
    private initializer: LazyInitializer<T>
  ) { }

  public async getInstance() {
    if (this.instance == null) {
      this.instance = await this.initializer();
    }
    return this.instance;
  }
}
