DROP TABLE IF EXISTS review, shop_cart, order_detail, order_table, payment_method, shipping_address, cpu, graphic_card, product, "user" CASCADE;

CREATE TABLE "user" (
  user_id VARCHAR(200) PRIMARY KEY,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  username VARCHAR(45) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  email VARCHAR(45) UNIQUE NOT NULL,
  phone VARCHAR(45) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  role BOOLEAN NOT NULL
);

CREATE TABLE product (
  product_id CHAR(32) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description VARCHAR(1024) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  stock_quantity INT NOT NULL,
  rating DOUBLE PRECISION NOT NULL,
  image_url TEXT NOT NULL,
  brand VARCHAR(255) NOT NULL
);

CREATE TABLE cpu (
  product_id CHAR(32) PRIMARY KEY,
  base_clock VARCHAR(50) NOT NULL,
  cache_memory VARCHAR(50) NOT NULL,
  fragile BOOLEAN NOT NULL,
  frecuency VARCHAR(50) NOT NULL,
  has_integrated_graphics BOOLEAN NOT NULL,
  high DOUBLE PRECISION NOT NULL,
  length DOUBLE PRECISION NOT NULL,
  lithography VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  number_threads INT NOT NULL,
  processor_core INT NOT NULL,
  socket VARCHAR(50) NOT NULL,
  tdp VARCHAR(50) NOT NULL,
  weight DOUBLE PRECISION NOT NULL,
  width DOUBLE PRECISION NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE graphic_card (
  product_id CHAR(32) PRIMARY KEY,
  color VARCHAR(50) NOT NULL,
  memory INT NOT NULL,
  memory_type VARCHAR(50) NOT NULL,
  recommended_power_supply INT NOT NULL,
  core_clock DOUBLE PRECISION NOT NULL,
  boost_clock DOUBLE PRECISION NOT NULL,
  tdp INT NOT NULL,
  interface_connection VARCHAR(150) NOT NULL,
  fragile BOOLEAN NOT NULL,
  high DOUBLE PRECISION NOT NULL,
  length DOUBLE PRECISION NOT NULL,
  width DOUBLE PRECISION NOT NULL,
  weight DOUBLE PRECISION NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE payment_method (
  payment_id VARCHAR(255) PRIMARY KEY,
  payment_method VARCHAR(50) NOT NULL,
  card_number VARCHAR(20) NOT NULL,
  card_expiry VARCHAR(10) NOT NULL,
  card_cvv VARCHAR(4) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id VARCHAR(200),
  card_holder VARCHAR(10) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

CREATE TABLE shipping_address (
  address_id SERIAL PRIMARY KEY,
  user_id VARCHAR(200) NOT NULL,
  address VARCHAR(200) NOT NULL,
  zip_code VARCHAR(200) NOT NULL,
  city VARCHAR(200) NOT NULL,
  state VARCHAR(200) NOT NULL,
  country VARCHAR(200) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

CREATE TABLE order_table (
  order_id VARCHAR(32) PRIMARY KEY,
  order_date TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL,
  user_id VARCHAR(200) NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  total_price DOUBLE PRECISION NOT NULL,
  address_id INT,
  FOREIGN KEY (user_id) REFERENCES "user" (user_id),
  FOREIGN KEY (payment_id) REFERENCES payment_method (payment_id),
  FOREIGN KEY (address_id) REFERENCES shipping_address (address_id)
);

CREATE TABLE order_detail (
  order_detail_id VARCHAR(32) PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price NUMERIC(12,2) NOT NULL CHECK (price > 0),
  FOREIGN KEY (order_id) REFERENCES order_table (order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT
);

CREATE TABLE shop_cart (
  cart_id SERIAL PRIMARY KEY,
  user_id VARCHAR(200) NOT NULL,
  product_id CHAR(32) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (user_id),
  FOREIGN KEY (product_id) REFERENCES product (product_id)
);

CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  product_id CHAR(32) NOT NULL,
  user_id VARCHAR(200) NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  FOREIGN KEY (product_id) REFERENCES product (product_id),
  FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);