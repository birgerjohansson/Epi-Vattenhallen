# Installation instructions

## Mac mini (Epi)

Create Code directory

Install ikaros 2. Ikaros 2 is not maintaned by Lund University Cognitive Science anymore. Talk to Birger. Mental note to Birger. Disable feedback from servos. Compile the non existing fadecandy server using old code. Set the LOW_LATENCY flag in ikaros-2.


Setting up node.js and extensions. The project uses old packaged for node. 

```
brew install node

brew install nvm

nvm install *old version of npm* 

nvm install 16

nvm use 16

```
Cloning webapp


```
git clone https://github.com/birgerjohansson/Epi-Vattenhallen.git

cd Epi-Vattenhallen/epiguess

```


Install dependencis 

```
npm install

```

Start the process script

```
python3 ./process_manager.py

```

Connect to app using chome 


```
localhost:3000

```
