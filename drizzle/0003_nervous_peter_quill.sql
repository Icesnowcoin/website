CREATE TABLE `price_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(20) NOT NULL,
	`timestamp` timestamp NOT NULL,
	`price` decimal(20,8) NOT NULL,
	`high24h` decimal(20,8),
	`low24h` decimal(20,8),
	`volume24h` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `price_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `token_prices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`symbol` varchar(20) NOT NULL,
	`name` varchar(100) NOT NULL,
	`price` decimal(20,8) NOT NULL,
	`priceChange24h` decimal(10,2),
	`marketCap` text,
	`volume24h` text,
	`circulatingSupply` text,
	`totalSupply` text,
	`maxSupply` text,
	`ath` decimal(20,8),
	`atl` decimal(20,8),
	`image` varchar(512),
	`coingeckoId` varchar(100),
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `token_prices_id` PRIMARY KEY(`id`)
);
