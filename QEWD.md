# qewd-baseline: Minimal QEWD Set-up on which to start Application Development
 
Rob Tweed <rtweed@mgateway.com>
4 December 2019, M/Gateway Developments Ltd [http://www.mgateway.com](http://www.mgateway.com)  

Twitter: @rtweed

Google Group for discussions, support, advice etc: [http://groups.google.co.uk/group/enterprise-web-developer-community](http://groups.google.co.uk/group/enterprise-web-developer-community)


# About this Repository

This repository provides a pre-configured, minimal set-up on which you can begin
developing your APIs and/or back-end logic/message handlers for your interactive applications.

It supports two modes of operation:

1) A Dockerised version of QEWD that will run on any Linux system or on a Raspberry Pi

2) A version that will run on the InterSystems 
[AWS Community Edition of IRIS](https://aws.amazon.com/marketplace/pp/B07MSHYLF1?qid=1575041206953&sr=0-1&ref_=srh_res_product_title)

This repository also contains in-depth tutorials that will teach you how to build QEWD-based:

- [REST APIs](./REST.md)
- [interactive WebSocket-based applications](./INTERACTIVE.md)

# What is QEWD?

QEWD is a 100% Node.js-based, integrated system on which you can build the back-end logic for
both REST APIs and interactive, browser-based or Native applications.  The pre-installated 
and pre-configured components that constitute QEWD include:

- the [Express](https://www.npmjs.com/package/express) web server
- the [socket.io](https://www.npmjs.com/package/socket.io) nodule for WebSocket support
- the [ewd-qoper8](https://www.npmjs.com/package/ewd-qoper8) Queue/Worker Pool management system
- [QEWD-jsdb](https://github.com/robtweed/qewd-jsdb): an in-process multi-model database
- the [QEWD-transform-json](https://github.com/robtweed/qewd-transform-json) JSON transformation module

QEWD provides and supports Session management using either server-side Session storage (using
QEWD-JSdb) or JSON Web Tokens (JWT).

QEWD can be run either natively or as a [Dockerised version](https://hub.docker.com/repository/docker/rtweed/qewd-server)
and can be configured to support either single monolithic applications or 
applications built as MicroServices (each of which will run on its own QEWD instance).

QEWD also includes [ewd-client](https://github.com/robtweed/ewd-client), a client JavaScript library 
which allows browser or Native front-ends to communicate securely over WebSockets with 
QEWD's *socket-io* interface.  *ewd-client* can be used and easily integrated with any 
JavaScript framework.

# Getting Started

For the IRIS / AWS Version, see [these instructions](./IRIS.md).

Otherwise, the simplest way to work with QEWD is to use the pre-built Docker version which will run on
any Linux system or even on a Raspberry Pi.

Just type these commands in a Linux system or Raspberry Pi:

        cd ~
        git clone https://github.com/robtweed/qewd-baseline
        cd qewd-baseline
        source install.sh

Simply answer the questions and within a few minutes you'll have it all ready to run.

Don't worry if you don't have Docker installed (which is the only dependency) - the installer
will also install Docker if necessary (though you'll need to start a new process and re-run
the installer after it installs Docker).

When the installer has completed you have two options for starting the QEWD Docker container:

- without database persistence between Container restarts:

        cd ~/qewd-baseline
        ./start

- with database persistence between Container restarts:


        cd ~/qewd-baseline
        ./start_p


To stop the Docker Container, you should always use the command:

        cd ~/qewd-baseline
        ./stop

This cleanly and safely shuts down the database-connected QEWD Worker Processes


The QEWD-baseline Folder Structure

You'll see the following folders in your QEWD-baseline directory:

- apis: used for your REST API handler logic
- configuration: this is where your QEWD system is configured, and where your REST API routes are defined
- qewd-apps: used for your interactive applications' message handlers
- utils: used for any of your utility modules on which your REST or interactive application handler are 
dependent
- www: used as the QEWD Express web Server root path, and therefore the home for the front-end
markup, JavaScript and CSS resources of your applications

If you're running the Containerised version of QEWD, you'll also see a folder named
*yottadb*.  If you run the QEWD Container in persistent mode, this folder contains
the host files for the YottaDB database.  They are mapped for use by YottaDB within the
Container.  You should not change or move this folder or its contents, but you should back them
up regularly.

You'll also see a folder named *iris-aws*.  This contains versions of key files which 
are used if you are running on IRIS


# Developing REST APIs

[Click here](./REST.md) to learn how to create REST APIs on your QEWD system


# Developing Interactive Applications

[Click here](./INTERACTIVE.md) to learn how to create interactive applications, the
back-end of which will run on your QEWD system


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
