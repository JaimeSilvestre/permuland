import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const perfumes = sqliteTable("perfumes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  price: real("price"),
  rating: integer("rating"),
  imageUrl: text("image_url"),
  description: text("description"),
  sotd: integer("sotd", { mode: 'boolean' }).default(false),
  createdAt: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});
