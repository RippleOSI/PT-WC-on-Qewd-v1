# PTWQ - Open Source Telehealth Solution by the Ripple Foundation

Open Source Telehealth Solution developed by the the Ripple Foundation - featuring PulseTile, Qewd, YottaDB and Jitsi open source technologies.
For any related code/information/discussion/questions/issues please visit this related discussion forum which is open to all;

[Visit Discussion](https://gitter.im/Ripple-Foundation/Open-Source-TeleHealth)
 
### Contributors 

[![](https://github.com/tony-shannon.png?size=50)](https://github.com/tony-shannon) [![](https://github.com/yudin-s.png?size=50)](https://github.com/yudin-s)



# About this Repository

This repository provides a Open Source Telehealth app based on QEWD framework that allow dynamically extending and modifying 

It supports two modes of operation:

1) A Dockerised version of QEWD that will run on any Linux system or on a Raspberry Pi

2) A version that will run on the InterSystems 
[AWS Community Edition of IRIS](https://aws.amazon.com/marketplace/pp/B07MSHYLF1?qid=1575041206953&sr=0-1&ref_=srh_res_product_title)

This repository also contains in-depth tutorials that will teach you how to build QEWD-based:

- [QEWD](./QEWD.md) 
- [REST APIs](./REST.md)
- [interactive WebSocket-based applications](./INTERACTIVE.md)


# Getting Started

For the IRIS / AWS Version, see [these instructions](./IRIS.md).

Otherwise, the simplest way to work with QEWD is to use the pre-built Docker version which will run on
any Linux system or even on a Raspberry Pi.

Just type these commands in a Linux system or Raspberry Pi:

        cd ~
        git clone https://github.com/RippleOSI/OS-TeleHealth
        cd OS-TeleHealth
        source install.sh

Simply answer the questions and within a few minutes you'll have it all ready to run.

Don't worry if you don't have Docker installed (which is the only dependency) - the installer
will also install Docker if necessary (though you'll need to start a new process and re-run
the installer after it installs Docker).

When the installer has completed you have two options for starting the QEWD Docker container:

- without database persistence between Container restarts:

        cd ~/OS-TeleHealth
        ./start

- with database persistence between Container restarts:


        cd ~/OS-TeleHealth
        ./start_p


To stop the Docker Container, you should always use the command:

        cd ~/qewd-baseline
        ./stop

This cleanly and safely shuts down the database-connected QEWD Worker Processes


## The OS-TeleHealth Folder and File Structure

Website Structure 

- www/pt-wc-q/ : Main Folder with website pages and components structure. 
- www/pt-wc-q/app.js : Entity point of project building and execution 
- www/pt-wc-q/css : Global Stylesheet files. We are using https://startbootstrap.com/themes/sb-admin-2/ as main template. 

#### Inside www/pt-wc-q/js 

- utils - Helper functions and classes 
- researching - Examples and samples of the component building processes 
- pages - static pages mgWebComponents object 
 
#### File naming rules 

`[page name]-page.js ` File with custom mgWebComponents page structure
`[page name]_page_state.js ` File with schema for CRUD page builder (see adminui/components/adminui-crud.js to understand how building is happens) 
`[page name]_modal.js ` File that is uses adminui-modal.js from adminui component section 


### About core framework 

[Click Here](QEWD.md) to learn about QEWD 

### Developing REST APIs

[Click here](./REST.md) to learn how to create REST APIs on your QEWD system

### Developing Interactive Applications

[Click here](./INTERACTIVE.md) to learn how to create interactive applications, the
back-end of which will run on your QEWD system for got better understanding how project was builded. 

## License

 Copyright (c) 2019 M/Gateway Developments Ltd,                           
 Redhill, Surrey UK.                                                      
 All rights reserved.                                                     
                                                                           
  http://www.mgateway.com                                                  
  Email: rtweed@mgateway.com                                               
                                                                           
                                                                           
  Licensed under the Apache License, Version 2.0 (the "License");          
  you may not use this file except in compliance with the License.         
  You may obtain a copy of the License at                                  
                                                                           
      http://www.apache.org/licenses/LICENSE-2.0                           
                                                                           
  Unless required by applicable law or agreed to in writing, software      
  distributed under the License is distributed on an "AS IS" BASIS,        
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
  See the License for the specific language governing permissions and      
   limitations under the License.      

