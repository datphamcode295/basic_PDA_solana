import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { DemoSpl } from "../target/types/demo_spl";
const { SystemProgram } = anchor.web3;

describe("demo_spl", async () => {
 // Use a local provider.
 const provider = anchor.Provider.env();
  anchor.setProvider(provider);

 const program = anchor.workspace.DemoSpl as Program<DemoSpl>;


 //Client muốn read/write account vote
 //Bằng cách sử dụng findProgramAddress, bạn không cần phải lưu trữ Public key
 //thay vào đó, bạn có thể dễ dàng tìm được một địa chỉ PDA nhờ vào seed, programId để thuê nó 
 //hoặc đọc và cập nhật dữ liệu
 const [account, accountBump] = await anchor.web3.PublicKey.findProgramAddress(
   [Buffer.from("seed")],
   program.programId
 );

 it("Is initialized!", async () => {
   await program.rpc.initialize(new anchor.BN(accountBump), {
     accounts: {
       voteAccount: account,
       user: provider.wallet.publicKey,
       systemProgram: SystemProgram.programId
     }
   });
   const accountInfo = await program.account.votingState.fetch(account);
   console.log(
     "accountInfo:",
     Number(accountInfo.bump),
     Number(accountInfo.pizza),
     Number(accountInfo.hamburger)
   );
 });
 it("Vote pizza!!!", async () => {
   await program.rpc.votePizza({
     accounts: {
       voteAccount: account
     }
   });
   const accountInfo = await program.account.votingState.fetch(account);
   console.log(
     "accountInfo:",
     Number(accountInfo.pizza),
     Number(accountInfo.hamburger)
 );
 });

 it("Vote hamburger!!!", async () => {
   await program.rpc.voteHamburger({
     accounts: {
       voteAccount: account
     }
   });
   const accountInfo = await program.account.votingState.fetch(account);
   console.log(
     "accountInfo:",
     Number(accountInfo.pizza),
     Number(accountInfo.hamburger)
   );
 });
});