// const COLLECTION_ADDRESS = "0xb43e886c7d7d4b3eda65e016b5bcef56548aeb7b";
const COLLECTION_ADDRESS = "0xa219da25a9c147e29f825a75fab7d0e4faf4c692";
const TEST_COLLECTION_ADDRESS = "0x909de919f43fc3454c2efb863446450247c0097a";
const ZORA_URL = "https://zora.co/collect/zora:" + COLLECTION_ADDRESS;
const TEST_ZORA_URL =
  "https://testnet.zora.co/collect/zgor:" + TEST_COLLECTION_ADDRESS;
const GAS_FEES = 0.001;
const MINT_PRICE = 0.03 + GAS_FEES;
const MINT_STATE: MintState = "live";
const DEMO_SOLD = 50;
const CHAIN: ChainType = "TESTNET"; // MAINNET or TESTNET

export {
  COLLECTION_ADDRESS,
  TEST_COLLECTION_ADDRESS,
  MINT_PRICE,
  MINT_STATE,
  DEMO_SOLD,
  ZORA_URL,
  TEST_ZORA_URL,
  CHAIN,
};
