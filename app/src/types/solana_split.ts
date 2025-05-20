export type SolanaSplit = {
  "version": "0.1.0",
  "name": "solana_split",
  "instructions": [
    {
      "name": "initializeSplit",
      "accounts": [
        {
          "name": "splitAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "splitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "split",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipient1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "SplitAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": []
};

export const IDL: SolanaSplit = {
  "version": "0.1.0",
  "name": "solana_split",
  "instructions": [
    {
      "name": "initializeSplit",
      "accounts": [
        {
          "name": "splitAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "splitAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "split",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipient1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipient2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "SplitAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": []
}; 