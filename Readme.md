# Installation instructions

## Mac mini (Epi)

Create Code directory

Install ikaros

`
https://github.com/ikaros-project/ikaros/wiki/Install
`

Compile ikaros

`
https://github.com/ikaros-project/ikaros/wiki/Compile
`

Install fade candy server (LED controller server)

`
https://github.com/ikaros-project/ikaros/wiki/Epi-setup
`

Setting low latency serial communication

`
https://github.com/ikaros-project/ikaros/wiki/Epi-setup
`

Setting up node.js and extensions

`
brew install node
`

Install node dependings in depending.txt

Cloning webapp

`
git clone https://github.com/birgerjohansson/Epi-Vattenhallen.git
`

Start fadecandy server
`
./fcserver
`

Start ikaros

`
../Bin/ikaros ../Projects/2021/Vattenhallen/EpiTorso/ExperimentSetup.ikg -t -r25
`

Start the web app

`
npm start
`

Connect to app using firefox using 

`
localhost:3000
`