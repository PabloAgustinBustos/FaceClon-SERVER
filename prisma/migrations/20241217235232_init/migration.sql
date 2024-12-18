-- CreateTable
CREATE TABLE "accounts" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "password" VARCHAR(8) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "photo_url" VARCHAR(50),
    "username" VARCHAR(20) NOT NULL,
    "account_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" INTEGER NOT NULL,
    "firstname" VARCHAR(10) NOT NULL,
    "lastname" VARCHAR(10) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "friends_amount" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friendships" (
    "first_friend_id" INTEGER NOT NULL,
    "second_friend_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("first_friend_id","second_friend_id")
);

-- CreateTable
CREATE TABLE "friend_requests" (
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("sender_id","receiver_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_account_id_key" ON "users"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_first_friend_id_fkey" FOREIGN KEY ("first_friend_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_second_friend_id_fkey" FOREIGN KEY ("second_friend_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_requests" ADD CONSTRAINT "friend_requests_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
