DROP TABLE "SequelizeMeta";
SELECT "id",
  "first_name" AS "firstName",
  "last_name" AS "lastName",
  "email",
  "birthday",
  "is_male" AS "isMale",
  "created_at" AS "createdAt",
  "updated_at" AS "updatedAt"
FROM "users" AS "User"
LIMIT 50 OFFSET 0;