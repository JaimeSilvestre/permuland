CREATE TABLE `perfumes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`brand` text NOT NULL,
	`price` real,
	`rating` integer,
	`image_url` text,
	`description` text,
	`sotd` integer DEFAULT false,
	`created_at` integer
);
