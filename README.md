# NFT-NAMZ

This site allows you to mint an NFT with a randomly generated nickname.

### Screenshot

![Site Layout](https://user-images.githubusercontent.com/88289750/143792796-a5f0264d-d34f-454c-ab43-17033ac0b4b7.png)

### Links

- Live Site URL: [Live Site](https://nft-starter-project.itsreallydrew.repl.co/)
- Smart Contract Repo: [NFT Contract](https://github.com/itsreallydrew/nft-demo)

## My process

I wrote a smart contract following a guide from buildspace. The smart contract contains all of the logic that allows this site to mint NFTs from the front end.

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- CSS Grid

### What I learned

I learned more about Web3 and how websites can interact with smart contracts and the blockchain network. A user has to connect their wallet before being allowed to interact with the site. In order for the site to work the abi file from the smart contract must be imported into a json file to allow the data to be read and processed. If the contract is changed in anyway then the hardcoded contract address must be updated as well as the abi file located in the json.

I am most proud of being able to implement toasts to allow the user to have notifications about the actions taking place. This allowed me to learn something new that I can use in future projects whether they are related to Web3 or not.

```javascript
nftTxn &&
	// Success message toast
	toast.success('Your NFT has been minted!', {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
```

### Continued development

I am going to continue practicing writing smart contracts and building a frontend that interacts with them. One of the next things I want to learn about is optimizing smart contracts and being more efficient with the code.
