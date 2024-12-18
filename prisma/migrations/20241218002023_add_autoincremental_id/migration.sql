-- AlterTable
CREATE SEQUENCE accounts_id_seq;
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT nextval('accounts_id_seq');
ALTER SEQUENCE accounts_id_seq OWNED BY "accounts"."id";

-- AlterTable
CREATE SEQUENCE friendships_first_friend_id_seq;
ALTER TABLE "friendships" ALTER COLUMN "first_friend_id" SET DEFAULT nextval('friendships_first_friend_id_seq');
ALTER SEQUENCE friendships_first_friend_id_seq OWNED BY "friendships"."first_friend_id";

-- AlterTable
CREATE SEQUENCE profiles_id_seq;
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT nextval('profiles_id_seq');
ALTER SEQUENCE profiles_id_seq OWNED BY "profiles"."id";

-- AlterTable
CREATE SEQUENCE users_id_seq;
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('users_id_seq');
ALTER SEQUENCE users_id_seq OWNED BY "users"."id";
