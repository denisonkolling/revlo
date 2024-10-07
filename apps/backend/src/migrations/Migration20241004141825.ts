import { Migration } from '@mikro-orm/migrations';

export class Migration20241004141825 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tab_reviews" add column "device_type" varchar null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tab_reviews" drop column "device_type";`);
  }

}
