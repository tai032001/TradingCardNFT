import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();
(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY,
    "avalanche-fuji"
  );
  const packAddress = "0x1bE11d568c8DcB08DD560C644CB994595d03A34D";
  const cardAddress = "0xA148fD997B2aCF8479EfCf0e0c272a1D0f6EFd34";

  const pack = await sdk.getContract(packAddress, "pack");
  const card = await sdk.getContract(cardAddress, "edition");

  (await card).setApprovalForAll(packAddress, true);

  const packImage =
    "ipfs://QmRwA2oGNqsAGtA9QBqNTU1MfHqmx4ENZCdFNMn4db95RX/Ha0903d1f8341444d95c2d076027f3c7at.png";

  console.log("Creating Pack");
  const createPack = (await pack).create({
    packMetadata: {
      name: "Pack 2",
      description: "This is another pack",
      image: packImage,
    },
    erc1155Rewards: [
      {
        contractAddress: cardAddress,
        tokenId: 2,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 3,
        quantityPerReward: 1,
        totalRewards: 25,
      },
    ],
    rewardsPerPack: 5,
  });
  console.log("Pack created");
})();
