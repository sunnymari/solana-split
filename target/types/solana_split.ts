/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solana_split.json`.
 */
export type SolanaSplit = {
  "address": "11111111111111111111111111111111",
  "metadata": {
    "name": "solanaSplit",
    "version": "0.1.0",
    "spec": "0.1.0"
  },
  "instructions": [
    {
      "name": "initializeSplit",
      "discriminator": [
        53,
        17,
        92,
        9,
        84,
        151,
        173,
        78
      ],
      "accounts": [
        {
          "name": "splitAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "splitAccount",
          "writable": true
        },
        {
          "name": "recipient",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "splitAccount",
      "discriminator": [
        96,
        124,
        192,
        177,
        178,
        219,
        22,
        146
      ]
    }
  ],
  "types": [
    {
      "name": "splitAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
