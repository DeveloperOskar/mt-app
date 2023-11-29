import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
  serial,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";
import { FoodUnits } from "~/types/_coaching/data/foods/system-foods";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `mt-app_${name}`);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const systemFoods = mysqlTable("system-foods", {
  id: serial("id").notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  unit: varchar("unit", { length: 255 })
    .default("g")
    .notNull()
    .$type<FoodUnits>(),
  protein: int("protein"),
  carbs: int("carbs"),
  fat: int("fat"),
  kcal: int("kcal"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const systemFoodsRelations = relations(systemFoods, ({ many }) => ({
  likes: many(systemFoodLikes),
}));

export const userSystemFoodRelations = relations(users, ({ many }) => ({
  likes: many(systemFoodLikes),
}));

export const systemFoodLikes = mysqlTable("system-food-likes", {
  id: serial("id").primaryKey().notNull(),
  systemFoodId: varchar("systemFoodId", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  liked: boolean("liked").default(false),
});

export const coachingFoods = mysqlTable(
  "coaching-foods",
  {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    brand: varchar("brand", { length: 255 }).default(""),
    unit: varchar("unit", { length: 255 })
      .default("g")
      .notNull()
      .$type<FoodUnits>(),
    amount: int("amount").notNull(),
    protein: int("protein").notNull(),
    carbs: int("carbs").notNull(),
    fat: int("fat").notNull(),
    kcal: int("kcal").notNull(),
    liked: boolean("liked").default(false),
    userId: varchar("userId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userIIndex: index("userIdIndex").on(table.userId),
    };
  },
);

export const coachingClients = mysqlTable(
  "coaching-clients",
  {
    id: serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    protein: int("protein").notNull(),
    carbs: int("carbs").notNull(),
    fat: int("fat").notNull(),
    kcal: int("kcal").notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => {
    return {
      userIIndex: index("userIdIndex").on(table.userId),
    };
  },
);
