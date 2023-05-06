'use client'
import {useEffect, useState} from 'react';
import Web3 from 'web3';

//External web3
export default function Web3Observer(){
  let web3: Web3
//   const getNodeInfo = () => {
//     web3.eth.getNodeInfo(function (error, result) {
//         if (error) {
//             console.error("error", error);
//         }
//         else {
//             console.log("result", result);
//             $('#NodeInfo').val(result);
//         }
//     });
//   }
   
 
  const [balances, setBalances] = useState([])
  const [accounts, setAccounts] = useState<string[]>([])
    //   useEffect(() => {
        
    //     /* Get Node Info */
    
        
    //     /*Get Balance */
   
        
    //     $('#checkBalance').click(function () {
    //         var _account = $('#Account').val();
    //         web3.eth.getBalance(_account).then(function (result) {
    //             console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
    //             $('#Balance').val(web3.utils.fromWei(result, 'ether'));
    //         });
    //     });
        
        
    //     /* Transfer */
    //     $('#Transfer').click(function () {
    //         $('#Tx').text('');
    //         var _from = $('#From').val();
    //         var _to = $('#To').val();
    //         var _Amount = $('#Amount').val();
    //         var txnObject = {
    //             "from": _from,
    //             "to": _to,
    //             "value": web3.utils.toWei(_Amount, 'ether'),
    //             // "gas": 21000,         (optional)
    //             // "gasPrice": 4500000,  (optional)
    //             // "data": 'For testing' (optional)
    //             // "nonce": 10           (optional)
    //         }
        
    //         web3.eth.sendTransaction(txnObject, function (error, result) {
    //             if (error) {
    //                 console.log("Transaction error", error);
    //             }
    //             else {
    //                 var txn_hash = result; //Get transaction hash
    //                 $('#Tx').text(txn_hash);
    //             }
    //         });
        
    //     });
    //   })
  useEffect( () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            console.log(error);
        }
        setAccounts(accounts)
        // web3.eth.getBalance(accounts[0]).then(function (result) {
        //     console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
        //     $('#Balance').val(web3.utils.fromWei(result, 'ether'));
        // });
    });
    
  }, [])  
  return (
    <div>
        {
          accounts?.map( account =>
            <li>{account}</li>
          )
        }
    </div>
  )
}








