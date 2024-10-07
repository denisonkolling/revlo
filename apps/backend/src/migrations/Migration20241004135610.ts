import { Migration } from '@mikro-orm/migrations';

export class Migration20241004135610 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_reviews" add column "language" varchar null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_reviews" drop column "language";`);
  }

}
