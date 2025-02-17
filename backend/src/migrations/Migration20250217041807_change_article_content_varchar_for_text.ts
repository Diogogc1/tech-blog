import { Migration } from '@mikro-orm/migrations';

export class Migration20250217041807_change_article_content_varchar_for_text extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-17T04:18:06.203Z';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-17T04:18:06.149Z';`);

    this.addSql(`alter table "article" alter column "content" type text using ("content"::text);`);
    this.addSql(`alter table "article" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-17T04:18:06.160Z';`);

    this.addSql(`alter table "article_tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article_tag" alter column "created_at" set default '2025-02-17T04:18:06.206Z';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "tag" alter column "created_at" set default '2025-02-16T23:04:18.321Z';`);

    this.addSql(`alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "user" alter column "created_at" set default '2025-02-16T23:04:18.239Z';`);

    this.addSql(`alter table "article" alter column "content" type varchar(255) using ("content"::varchar(255));`);
    this.addSql(`alter table "article" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article" alter column "created_at" set default '2025-02-16T23:04:18.247Z';`);

    this.addSql(`alter table "article_tag" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "article_tag" alter column "created_at" set default '2025-02-16T23:04:18.325Z';`);
  }

}
