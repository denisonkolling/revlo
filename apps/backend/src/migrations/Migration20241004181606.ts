import { Migration } from '@mikro-orm/migrations';

export class Migration20241004181606 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tab_users" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "account_status" varchar(255) not null);`);
    this.addSql(`alter table "tab_users" add constraint "tab_users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "tab_users" cascade;`);
  }

}
