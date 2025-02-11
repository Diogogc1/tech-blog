import { Migration } from '@mikro-orm/migrations';

export class Migration20250211174252 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-11T17:42:52.292Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-11T17:40:19.844Z';`);
  }

}
