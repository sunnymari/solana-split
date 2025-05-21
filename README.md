

 🌊 Solana Split

Solana Split is a decentralized protocol that enables real-time, programmable payments to multiple recipients with zero intermediaries. Built using [Anchor](https://book.anchor-lang.com/) and deployed on [Solana](https://solana.com/), the app allows users to create one-time or streaming payment splits that are transparent, trustless, and on-chain.

Whether you're a creator sharing revenue, a DAO distributing grants, or a team streaming payroll, Solana Split empowers you to automate value distribution at Solana speed and scale.

---
 🔧 Features

* ✅ One-time SOL payments split between multiple recipients
* ⏳ Streaming support (future-ready): distribute funds over time
* 🔐 On-chain accounting: withdraw at any time, trustlessly
* ⚡️ Ultra-fast and low-fee transactions powered by Solana
* 💼 Use cases: DAOs, creator collectives, on-chain payroll, microgrants

---

 🛠 Tech Stack

| Layer          | Tech                                          |
| -------------- | --------------------------------------------- |
| Smart Contract | Rust + Anchor                                 |
| Frontend       | React + Solana Wallet Adapter  |
| Network        | Solana Devnet                                 |

---

 🧠 How It Works

1. Initialize Split:
   A user deposits funds and defines:

   * Recipients
   * Split percentages
   * Optional: stream duration

2. Track On-Chain:
   Each recipient’s claimable amount is calculated based on time or instant share.

3. Withdraw Anytime:
   Recipients can call `withdraw()` to claim their earned portion.

---

 🚀 Getting Started

 Prerequisites

* [Anchor](https://www.anchor-lang.com/docs/installation)
* [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
* Rust & Yarn

 Install & Build

```bash
git clone https://github.com/your-username/solana-split.git
cd solana-split
anchor build
```

 Deploy to Devnet

```bash
solana config set --url https://api.devnet.solana.com
anchor deploy --provider.cluster devnet
```

---

 🧪 Example Usage

Basic account structure:

```rust
pub struct SplitAccount {
    pub authority: Pubkey,
    pub recipients: [Pubkey; 5],
    pub shares: [u8; 5], // 100 total
    pub total_amount: u64,
    pub start_time: i64,
    pub duration: i64,
    pub withdrawn: [u64; 5],
}
```

Add logic for streaming or use `withdraw()` to allow real-time access to earned funds.

---

📚 Resources

* [Anchor Book](https://book.anchor-lang.com/)
* [Solana Cookbook](https://solanacookbook.com/)
* [Solana Developer Docs](https://docs.solana.com/)
* [@solana Twitter](https://twitter.com/solana)

---

 📣 About the Creator

Built by me SunnyMari  a passionate Solana builder focused on open finance and crypto education.
Previously worked with MetricDAO, Flipside Crypto, and Solana University.


---

