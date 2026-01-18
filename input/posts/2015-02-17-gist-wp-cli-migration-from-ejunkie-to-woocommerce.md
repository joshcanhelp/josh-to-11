---
title: 'Gist: WP-CLI migration from ejunkie to WooCommerce'
excerpt: This script is used to migrate a transaction export from ejunkie into a Woocommerce-powered site. Please read the comments throughout to adjust this to your use case.
modified: 2016-10-20T16:43:59.000Z
wpid: 4399
tags:
  - WordPress
  - Open Source
link_to: 'https://gist.github.com/joshcanhelp/8a2197913b62e69906db'
---


This script is used to migrate a transaction export from ejunkie into a Woocommerce-powered site. Please read the comments throughout to adjust this to your use case. 

You'll need to create a new table and import your ejunkie data before running this. Table syntax is below, a few things to keep in mind:

- You'll export from the ejunkie transaction report as CSV. Open that in Excel or similar, then change the headers to match the database table
- Note that a few unused columns have been removed
- Make sure to format the date for MySQL, in Excel the custom format is 'yyyy-mm-dd hh:mm:ss'

```sql
CREATE TABLE `ejunkie_migrate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `purchase_date_time` datetime NOT NULL,
  `transaction_id` tinytext NOT NULL,
  `payment_processor` tinytext NOT NULL,
  `ejunkie_txn_id` tinytext NOT NULL,
  `payment_status` tinytext NOT NULL,
  `first_name` tinytext NOT NULL,
  `last_name` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `billing_info` tinytext,
  `payer_ip` tinytext NOT NULL,
  `invoice_id` tinytext NOT NULL,
  `affiliate_email` tinytext,
  `affiliate_name` tinytext,
  `affiliate_id` int(20) DEFAULT NULL,
  `currency` tinytext NOT NULL,
  `item_name` tinytext NOT NULL,
  `item_number` tinytext NOT NULL,
  `quantity` int(3) NOT NULL,
  `amount` float NOT NULL,
  `affiliate_share` float NOT NULL DEFAULT '0',
  `download_info` tinytext,
  `payment_country` tinytext NOT NULL,
  `wp_order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```
