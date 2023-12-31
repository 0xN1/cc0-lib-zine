"use server";

import { COLLECTION_ADDRESS } from "../constants";

const chain = "ZORA_MAINNET";
const collectionAddress = COLLECTION_ADDRESS;

const checkOwner = async (address: string) => {
  try {
    const response = await fetch(`https://api.zora.co/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            tokens(
                networks: {network: ZORA, chain: ${chain}}
                where: {collectionAddresses: "${collectionAddress}", ownerAddresses: "${address}"}
              ) {
                nodes {
                  token {
                    tokenId
                    owner
                    name
                  }
                }
              }
          }
          `,
      }),
      next: {
        revalidate: 60,
      },
    });
    const data = await response.json();
    const tokens: Token[] = data.data.tokens.nodes;
    const token = tokens[0].token;

    const ownerToken = {
      isOwner: true,
      tokenId: token.tokenId,
      owner: token.owner,
      name: token.name,
    };
    return ownerToken;
  } catch (error) {
    // console.log(error);
    return {
      isOwner: false,
      tokenId: "",
      owner: "",
      name: "",
    };
  }
};

type Token = {
  token: {
    tokenId: string;
    owner: string;
    name: string;
  };
};

export default checkOwner;
