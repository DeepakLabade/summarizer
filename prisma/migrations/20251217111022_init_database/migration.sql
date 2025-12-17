-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "full_name" VARCHAR(255),
    "customer_id" VARCHAR(255),
    "price_id" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'inactive',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdf_summaries" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "original_file_url" TEXT NOT NULL,
    "summary_text" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'completed',
    "title" TEXT,
    "file_name" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pdf_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_customer_id_key" ON "users"("customer_id");

-- AddForeignKey
ALTER TABLE "pdf_summaries" ADD CONSTRAINT "pdf_summaries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
