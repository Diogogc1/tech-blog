import { Migration } from '@mikro-orm/migrations';

export class Migration20250216145139_add_status_and_created_at extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-16T14:51:32.396Z';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-16T14:51:32.344Z';`);

    this.addSql(`alter table "article" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-16T14:51:32.355Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "article" alter column "created_at" type timestamptz(6) using ("created_at"::timestamptz(6));`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-16 14:39:15.174+00';`);

    this.addSql(`alter table "tag" alter column "created_at" type timestamptz(6) using ("created_at"::timestamptz(6));`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-16 14:39:15.231+00';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz(6) using ("created_at"::timestamptz(6));`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-16 14:39:15.166+00';`);
  }

}
