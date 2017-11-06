// Create a public contract and a private contract. A transfer from private to
// public fails because private contracts can't modify public state. Can you
// transfer from public to private?

var pubAcct = null;
var privAcct = null;

function createAccounts() {
  var pubOpts = {
    from: gethAcct,
    data: accountBytecode,
    gas: 300000,
  };
  var privOpts = {
    from: gethAcct,
    data: accountBytecode,
    gas: 300000,
    privateFor: [key7],
  };

  pubAcct  = accountContract.new(1000, pubOpts,  createCb("public account"));
  privAcct = accountContract.new(2000, privOpts, createCb("private account"));
}

function doTransfer() {
  // Attempt transfer from private account to public. This fails.

  privAcct.transferTo.sendTransaction(
    pubAcct.address, // recipient
    500, // amount
    {
      from: gethAcct,
      to: privAcct.address,
      gas: 300000,
      privateFor: [key7],
    },
    function(e, addr) {
      if (e) {
        console.log("err sending transfer", e);
      } else {
        console.log("transfer transaction send: TransactionHash: " + addr);
      }
    }
  );
}