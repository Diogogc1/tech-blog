import { Migration } from '@mikro-orm/migrations';

export class Migration20250216230419_add_status_and_created_at_in_article_tag extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-16T23:04:18.321Z';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-16T23:04:18.239Z';`);

    this.addSql(`alter table "article" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-16T23:04:18.247Z';`);

    this.addSql(`alter table "article_tag" add column "status" boolean not null default true, add column "created_at" timestamptz not null default '2025-02-16T23:04:18.325Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-16T14:51:32.396Z';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-16T14:51:32.344Z';`);

    this.addSql(`alter table "article" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-16T14:51:32.355Z';`);

    this.addSql(`alter table "article_tag" drop column "status", drop column "created_at";`);
  }

}
