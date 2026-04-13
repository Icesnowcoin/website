CREATE TABLE `analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`userId` int,
	`pageUrl` varchar(512) NOT NULL,
	`referrer` varchar(512),
	`userAgent` text,
	`ipAddress` varchar(45),
	`country` varchar(64),
	`city` varchar(64),
	`deviceType` enum('desktop','mobile','tablet') NOT NULL,
	`duration` int,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`totalVisits` int NOT NULL DEFAULT 0,
	`uniqueVisitors` int NOT NULL DEFAULT 0,
	`totalTrades` int NOT NULL DEFAULT 0,
	`totalVolume` text,
	`totalLiquidity` text,
	`avgSessionDuration` int,
	`topCountries` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `daily_stats_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
CREATE TABLE `liquidity_pools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`poolAddress` varchar(66) NOT NULL,
	`dexName` varchar(64) NOT NULL,
	`token0` varchar(66) NOT NULL,
	`token1` varchar(66) NOT NULL,
	`token0Symbol` varchar(20) NOT NULL,
	`token1Symbol` varchar(20) NOT NULL,
	`chainId` int NOT NULL,
	`liquidity` text,
	`volume24h` text,
	`fees24h` text,
	`apr` varchar(20),
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `liquidity_pools_id` PRIMARY KEY(`id`),
	CONSTRAINT `liquidity_pools_poolAddress_unique` UNIQUE(`poolAddress`)
);
--> statement-breakpoint
CREATE TABLE `trades` (
	`id` int AUTO_INCREMENT NOT NULL,
	`poolId` int NOT NULL,
	`txHash` varchar(66) NOT NULL,
	`tradeType` enum('swap','add_liquidity','remove_liquidity') NOT NULL,
	`trader` varchar(66) NOT NULL,
	`token0Amount` text NOT NULL,
	`token1Amount` text NOT NULL,
	`usdValue` varchar(30),
	`gasUsed` text,
	`gasPrice` text,
	`blockNumber` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trades_id` PRIMARY KEY(`id`),
	CONSTRAINT `trades_txHash_unique` UNIQUE(`txHash`)
);
