use anchor_lang::prelude::*;

declare_id!("ohxsCJitxBbnfkprnk6YrXJrCU8XZSLHLUmxNyNrgyV");

#[program]
pub mod solana_split {
    use super::*;

    pub fn initialize_split(_ctx: Context<InitializeSplit>) -> Result<()> {
        msg!("Split initialized.");
        Ok(())
    }

    pub fn withdraw(_ctx: Context<Withdraw>) -> Result<()> {
        msg!("Funds withdrawn.");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeSplit<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub split_account: Account<'info, SplitAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub split_account: Account<'info, SplitAccount>,
    #[account(mut)]
    pub recipient: Signer<'info>,
}

#[account]
pub struct SplitAccount {
    pub authority: Pubkey,
    pub total_amount: u64,
}