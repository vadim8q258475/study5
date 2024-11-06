const BASE_URL = "http://127.0.0.1:8000";

const PRODUCTS_URL = `${BASE_URL}/products`;
const TYPES_URL = `${BASE_URL}/types`;
const BRANDS_URL = `${BASE_URL}/brands`;
const PRODUCT_IDS_URL = `${BASE_URL}/product_slugs`;
const MIN_MAX_URL = `${BASE_URL}/min_max`;

const ACCOUNTS_URL = `${BASE_URL}/accounts`;

const DELIVERY_TYPES_URL = `${ACCOUNTS_URL}/delivery_types`;
const ORDERS_URL = `${ACCOUNTS_URL}/orders`;
const CART_URL = `${ACCOUNTS_URL}/cart`;
const WISH_LIST_URL = `${ACCOUNTS_URL}/wish_list`;

const REGISTRATION_URL = `${ACCOUNTS_URL}/api/v1/auth/users/`;
const AUTH_URL = `${ACCOUNTS_URL}/accounts/auth/token/login/`;

const TOKEN = localStorage.getItem("token");
const SORT_TYPES = [
  { name: "price", id: 0 },
  { name: "-price", id: 1 },
  { name: "name", id: 2 },
  { name: "-name", id: 3 },
];

const SETTINGS = {
  BASE_URL: BASE_URL,
  MIN_MAX_URL: MIN_MAX_URL,
  PRODUCTS_URL: PRODUCTS_URL,
  TYPES_URL: TYPES_URL,
  BRANDS_URL: BRANDS_URL,
  PRODUCT_IDS_URL: PRODUCT_IDS_URL,
  ACCOUNTS_URL: ACCOUNTS_URL,
  DELIVERY_TYPES_URL: DELIVERY_TYPES_URL,
  ORDERS_URL: ORDERS_URL,
  CART_URL: CART_URL,
  WISH_LIST_URL: WISH_LIST_URL,
  REGISTRATION_URL: REGISTRATION_URL,
  AUTH_URL: AUTH_URL,
  TOKEN: TOKEN,
  SORT_TYPES: SORT_TYPES,
};

export default SETTINGS;
