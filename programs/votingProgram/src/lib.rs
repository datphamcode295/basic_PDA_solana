use anchor_lang::prelude::*;

declare_id!("8acGAcHVyVZPoK7uAAofcLiMhJZX2K2VVMLJNHPfEU3U");

#[program]
pub mod demo_spl {
   use super::*;

   pub fn initialize(ctx: Context<Initialize>, vote_account_bump: u8) -> Result<()> {
       ctx.accounts.vote_account.bump = vote_account_bump;
       Ok(())
   }

   pub fn vote_pizza(ctx: Context<Vote>) -> Result<()> {
       ctx.accounts.vote_account.pizza += 1;
       Ok(())
   }

   pub fn vote_hamburger(ctx: Context<Vote>) -> Result<()> {
       ctx.accounts.vote_account.hamburger += 1;
       Ok(())
   }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
   #[account(init, seeds = [b"seed".as_ref()], bump, payer = user, space = 8 + 16 + 1)]
   pub vote_account: Account<'info, VotingState>,
   #[account(mut)]
   pub user: Signer<'info>,
   pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
   #[account(mut, seeds = [b"seed".as_ref()], bump = vote_account.bump)]
   vote_account: Account<'info, VotingState>,
}

#[account]
pub struct VotingState {
   pub pizza: u64,
pub hamburger: u64,
   pub bump: u8,
}