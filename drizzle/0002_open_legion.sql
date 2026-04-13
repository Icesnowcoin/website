ALTER TABLE `trades` ADD `direction` enum('buy','sell') DEFAULT 'buy' NOT NULL;--> statement-breakpoint
ALTER TABLE `trades` ADD `iscAmount` text;--> statement-breakpoint
ALTER TABLE `trades` ADD `otherTokenAmount` text;--> statement-breakpoint
ALTER TABLE `trades` ADD `otherTokenSymbol` varchar(20);