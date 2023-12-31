"use server";

import { COLLECTION_ADDRESS } from "../constants";

const chain = "ZORA_MAINNET"; // ZORA_MAINNET or ZORA_GOERLI
const collectionAddress = COLLECTION_ADDRESS;

const oldQ = `
  query {
    collections(
        networks: {network: ZORA, chain: ${chain}}
        where: {collectionAddresses: "${collectionAddress}"}
      ) {
        nodes {
          totalSupply
        }
      }
  }
  `;
const checkSupply = async () => {
  try {
    const response = await fetch(`https://api.zora.co/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query TotalSupply {
            aggregateStat {
              nftCount(
                where: {collectionAddresses: "${collectionAddress}"}
                networks: {network: ZORA, chain: ${chain}}
              )
            }
          }`,
        // query: oldQ,
      }),
      next: {
        revalidate: 1,
      },
    });
    const data = await response.json();
    return data.data.aggregateStat.nftCount;
    // return data.data.collections.nodes[0].totalSupply;
  } catch (error) {
    console.log(error);
  }
};

export default checkSupply;
