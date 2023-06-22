import pandas as pd
from web3 import Web3

# Initialize web3 with your preferred Ethereum provider
web3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/203a08949ac0459fa2696b2e5e130825'))

# Load ABI from JSON file
with open('ABI.json', 'r') as abi_file:
    vesting_contract_abi = json.load(abi_file)

# List of addresses to fetch data for
addresses = [
    "0x55451679778eEAB90876EA0dA6A74914b90373e9",

# Add more addresses as needed
]

# Create an empty table to store the data
data = {
    "Address": [],
    "Token Balance": [],
    "Vesting Schedule": []
}
df = pd.DataFrame(data)

# Fetch data for each address
for address in addresses:
    # Convert the address to a checksum address
    checksum_address = Web3.toChecksumAddress(address)

    # Address of the existing Token Vesting contract
    vesting_contract_address = checksum_address

    # Create an instance of the Token Vesting contract
    vesting_contract = web3.eth.contract(address=vesting_contract_address, abi=vesting_contract_abi)

    # Get the token balance of the address
    cliff = vesting_contract.functions.cliffDuration(checksum_address).call()

    # Get the vesting schedule of the address
    duration = vesting_contract.functions.duration(checksum_address).call()

    # Append the data to the table
    df = df.append({
        "Address": checksum_address,
        "Cliff": cliff,
        "Vesting Schedule": duration
    }, ignore_index=True)

# Print the table
print(df)