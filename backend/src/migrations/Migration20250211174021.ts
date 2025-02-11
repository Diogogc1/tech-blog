import { Migration } from '@mikro-orm/migrations';

export class Migration20250211174021 extends Migration {
  override up(): void {
    this.addSql(
      `create table "tag" ("id" serial primary key, "name" varchar(255) not null);`,
    );

    this.addSql(
      `create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "senha" varchar(255) not null, "created_at" timestamptz not null default '2025-02-11T17:40:19.844Z');`,
    );
    this.addSql(
      `alter table "user" add constraint "user_email_unique" unique ("email");`,
    );
    this.addSql(
      `alter table "user" add constraint "user_senha_unique" unique ("senha");`,
    );

    this.addSql(
      `create table "article" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "authorId" int not null);`,
    );

    this.addSql(
      `create table "article_tag" ("id" serial primary key, "tag_id" int not null, "article_id" int not null);`,
    );
    this.addSql(
      `alter table "article_tag" add constraint "article_tag_tag_id_unique" unique ("tag_id");`,
    );
    this.addSql(
      `alter table "article_tag" add constraint "article_tag_article_id_unique" unique ("article_id");`,
    );

    this.addSql(
      `alter table "article" add constraint "article_authorId_foreign" foreign key ("authorId") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "article_tag" add constraint "article_tag_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "article_tag" add constraint "article_tag_article_id_foreign" foreign key ("article_id") references "article" ("id") on update cascade;`,
    );
  }
}
